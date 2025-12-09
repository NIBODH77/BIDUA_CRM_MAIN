from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import List, Optional
from datetime import date, datetime, timedelta
from decimal import Decimal

from app.core.database import get_db
from app.models.models import AttendanceRecord, AttendanceStatus
from app.schemas.schemas import AttendanceRecordResponse

router = APIRouter()


@router.get("", response_model=List[AttendanceRecordResponse])
async def get_my_attendance(
    employee_id: int = Query(..., description="Employee ID"),
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(AttendanceRecord).where(AttendanceRecord.employee_id == employee_id)
    
    if start_date:
        query = query.where(AttendanceRecord.date >= start_date)
    if end_date:
        query = query.where(AttendanceRecord.date <= end_date)
    
    query = query.order_by(AttendanceRecord.date.desc())
    
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/today")
async def get_today_attendance(
    employee_id: int = Query(..., description="Employee ID"),
    db: AsyncSession = Depends(get_db)
):
    today = date.today()
    
    result = await db.execute(
        select(AttendanceRecord)
        .where(AttendanceRecord.employee_id == employee_id)
        .where(AttendanceRecord.date == today)
    )
    record = result.scalar_one_or_none()
    
    if not record:
        return {"message": "No attendance record for today", "clocked_in": False}
    
    return {
        "clocked_in": True,
        "clock_in": str(record.clock_in_time) if record.clock_in_time else None,
        "clock_out": str(record.clock_out_time) if record.clock_out_time else None,
        "status": record.status.value if record.status else None,
        "total_hours": float(record.total_hours) if record.total_hours else 0
    }


@router.post("/clock-in")
async def clock_in(
    employee_id: int = Query(..., description="Employee ID"),
    latitude: Optional[float] = None,
    longitude: Optional[float] = None,
    db: AsyncSession = Depends(get_db)
):
    today = date.today()
    now = datetime.now()
    
    existing = await db.execute(
        select(AttendanceRecord)
        .where(AttendanceRecord.employee_id == employee_id)
        .where(AttendanceRecord.date == today)
    )
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Already clocked in today")
    
    status = AttendanceStatus.present
    if now.hour >= 10:
        status = AttendanceStatus.late
    
    record = AttendanceRecord(
        employee_id=employee_id,
        date=today,
        clock_in_time=now.time(),
        status=status,
        latitude=Decimal(str(latitude)) if latitude else None,
        longitude=Decimal(str(longitude)) if longitude else None
    )
    db.add(record)
    await db.commit()
    
    return {"message": "Clocked in successfully", "time": str(now.time())}


@router.post("/clock-out")
async def clock_out(
    employee_id: int = Query(..., description="Employee ID"),
    db: AsyncSession = Depends(get_db)
):
    today = date.today()
    now = datetime.now()
    
    result = await db.execute(
        select(AttendanceRecord)
        .where(AttendanceRecord.employee_id == employee_id)
        .where(AttendanceRecord.date == today)
    )
    record = result.scalar_one_or_none()
    
    if not record:
        raise HTTPException(status_code=400, detail="Not clocked in today")
    
    if record.clock_out_time:
        raise HTTPException(status_code=400, detail="Already clocked out")
    
    record.clock_out_time = now.time()
    
    if record.clock_in_time:
        clock_in_dt = datetime.combine(today, record.clock_in_time)
        clock_out_dt = datetime.combine(today, now.time())
        hours = (clock_out_dt - clock_in_dt).total_seconds() / 3600
        record.total_hours = Decimal(str(round(hours, 2)))
    
    await db.commit()
    
    return {"message": "Clocked out successfully", "time": str(now.time())}


@router.get("/summary")
async def get_attendance_summary(
    employee_id: int = Query(..., description="Employee ID"),
    month: int = Query(..., ge=1, le=12),
    year: int = Query(..., ge=2020),
    db: AsyncSession = Depends(get_db)
):
    start_date = date(year, month, 1)
    if month == 12:
        end_date = date(year + 1, 1, 1) - timedelta(days=1)
    else:
        end_date = date(year, month + 1, 1) - timedelta(days=1)
    
    result = await db.execute(
        select(AttendanceRecord)
        .where(AttendanceRecord.employee_id == employee_id)
        .where(AttendanceRecord.date >= start_date)
        .where(AttendanceRecord.date <= end_date)
    )
    records = result.scalars().all()
    
    present = sum(1 for r in records if r.status == AttendanceStatus.present)
    late = sum(1 for r in records if r.status == AttendanceStatus.late)
    half_day = sum(1 for r in records if r.status == AttendanceStatus.half_day)
    wfh = sum(1 for r in records if r.status == AttendanceStatus.work_from_home)
    total_hours = sum(float(r.total_hours or 0) for r in records)
    
    return {
        "month": month,
        "year": year,
        "total_days": len(records),
        "present": present,
        "late": late,
        "half_day": half_day,
        "work_from_home": wfh,
        "total_hours": round(total_hours, 2)
    }
