from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import List, Optional
from datetime import date, timedelta

from app.core.database import get_db
from app.models.models import AttendanceRecord, Employee, AttendanceStatus
from app.schemas.schemas import AttendanceRecordResponse

router = APIRouter()


@router.get("", response_model=List[AttendanceRecordResponse])
async def get_team_attendance(
    manager_id: int = Query(..., description="Manager's employee ID"),
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    db: AsyncSession = Depends(get_db)
):
    team_result = await db.execute(
        select(Employee.id).where(Employee.manager_id == manager_id)
    )
    team_ids = [row[0] for row in team_result.fetchall()]
    
    if not team_ids:
        return []
    
    query = select(AttendanceRecord).where(AttendanceRecord.employee_id.in_(team_ids))
    
    if start_date:
        query = query.where(AttendanceRecord.date >= start_date)
    if end_date:
        query = query.where(AttendanceRecord.date <= end_date)
    
    query = query.order_by(AttendanceRecord.date.desc())
    
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/today")
async def get_today_attendance(
    manager_id: int = Query(..., description="Manager's employee ID"),
    db: AsyncSession = Depends(get_db)
):
    today = date.today()
    
    team_result = await db.execute(
        select(Employee).where(Employee.manager_id == manager_id)
    )
    team_members = team_result.scalars().all()
    
    if not team_members:
        return {"team_size": 0, "present": 0, "absent": 0, "late": 0, "on_leave": 0}
    
    team_ids = [e.id for e in team_members]
    
    attendance_result = await db.execute(
        select(AttendanceRecord)
        .where(AttendanceRecord.employee_id.in_(team_ids))
        .where(AttendanceRecord.date == today)
    )
    attendance_records = attendance_result.scalars().all()
    
    present = sum(1 for r in attendance_records if r.status == AttendanceStatus.present)
    late = sum(1 for r in attendance_records if r.status == AttendanceStatus.late)
    half_day = sum(1 for r in attendance_records if r.status == AttendanceStatus.half_day)
    
    marked_ids = {r.employee_id for r in attendance_records}
    absent = len(team_ids) - len(marked_ids)
    
    return {
        "team_size": len(team_members),
        "present": present,
        "absent": absent,
        "late": late,
        "half_day": half_day,
        "attendance_rate": round((present + late + half_day) / len(team_members) * 100, 2) if team_members else 0
    }


@router.get("/summary")
async def get_attendance_summary(
    manager_id: int = Query(..., description="Manager's employee ID"),
    month: int = Query(..., ge=1, le=12),
    year: int = Query(..., ge=2020),
    db: AsyncSession = Depends(get_db)
):
    team_result = await db.execute(
        select(Employee.id).where(Employee.manager_id == manager_id)
    )
    team_ids = [row[0] for row in team_result.fetchall()]
    
    if not team_ids:
        return {"message": "No team members found"}
    
    start_date = date(year, month, 1)
    if month == 12:
        end_date = date(year + 1, 1, 1) - timedelta(days=1)
    else:
        end_date = date(year, month + 1, 1) - timedelta(days=1)
    
    result = await db.execute(
        select(
            AttendanceRecord.employee_id,
            AttendanceRecord.status,
            func.count(AttendanceRecord.id).label("count")
        )
        .where(AttendanceRecord.employee_id.in_(team_ids))
        .where(AttendanceRecord.date >= start_date)
        .where(AttendanceRecord.date <= end_date)
        .group_by(AttendanceRecord.employee_id, AttendanceRecord.status)
    )
    
    summary = {}
    for row in result.fetchall():
        emp_id = row[0]
        status = row[1].value if row[1] else "unknown"
        count = row[2]
        
        if emp_id not in summary:
            summary[emp_id] = {}
        summary[emp_id][status] = count
    
    return {
        "month": month,
        "year": year,
        "employee_summary": summary
    }
