from datetime import date, time
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import datetime, date, time

from app.core.database import get_db
from app.crud.attendance_and_leave import attendance_crud, leave_crud
from app.schemas.schemas import (
    # Attendance Schemas
    GeofenceLocationCreate, GeofenceLocationResponse,
    AttendanceRecordCreate, AttendanceRecordResponse,
    AttendanceBreakCreate, AttendanceBreakResponse,
    AttendancePolicyCreate, AttendancePolicyResponse,
    # Leave Schemas
    LeaveRequestCreate, LeaveRequestResponse,
    LeaveBalanceCreate, LeaveBalanceResponse,
    LeavePolicyCreate, LeavePolicyResponse,
    CompanyHolidayCreate, CompanyHolidayResponse
)
from app.models.models import AttendanceStatus, LeaveStatus, LeaveType, AttendanceRecord, LeaveRequest
from pydantic import BaseModel

class LeaveRequestUpdate(BaseModel):
    status: Optional[LeaveStatus] = None
    approved_by: Optional[int] = None
    approved_at: Optional[datetime] = None
    rejection_reason: Optional[str] = None

router = APIRouter()

# ==================== ATTENDANCE ENDPOINTS ====================

# ---------- Geofence Locations ----------
@router.post("/geofence-locations", response_model=GeofenceLocationResponse, status_code=status.HTTP_201_CREATED)
async def create_geofence_location(
    payload: GeofenceLocationCreate,
    db: AsyncSession = Depends(get_db)
):
    return await attendance_crud.create_geofence_location(db, payload)

@router.get("/geofence-locations", response_model=List[GeofenceLocationResponse])
async def list_geofence_locations(
    is_active: bool = Query(True),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=200),
    db: AsyncSession = Depends(get_db)
):
    return await attendance_crud.list_geofence_locations(db, skip=skip, limit=limit, is_active=is_active)

@router.get("/geofence-locations/{location_id}", response_model=GeofenceLocationResponse)
async def get_geofence_location(
    location_id: int,
    db: AsyncSession = Depends(get_db)
):
    location = await attendance_crud.get_geofence_location(db, location_id)
    if not location:
        raise HTTPException(status_code=404, detail="Geofence location not found")
    return location


# ---------- Attendance Records ----------
@router.post("/attendance/clock-in", response_model=AttendanceRecordResponse)
async def clock_in(
    attendance: AttendanceRecordCreate,
    db: AsyncSession = Depends(get_db)
):
    """Clock in attendance"""
    # Check if already clocked in today
    today = date.today()
    existing = await db.execute(
        select(AttendanceRecord).where(
            (AttendanceRecord.employee_id == attendance.employee_id) &
            (AttendanceRecord.date == today)
        )
    )
    if existing.scalars().first():
        raise HTTPException(status_code=400, detail="Already clocked in today")

    db_attendance = AttendanceRecord(
        **attendance.model_dump(),
        date=today,
        clock_in=datetime.now().time(),
        status=AttendanceStatus.present
    )
    db.add(db_attendance)
    await db.commit()
    await db.refresh(db_attendance)
    return db_attendance

@router.put("/attendance/{attendance_id}/clock-out", response_model=AttendanceRecordResponse)
async def clock_out(
    attendance_id: int,
    db: AsyncSession = Depends(get_db)
):
    """Clock out attendance"""
    result = await db.execute(
        select(AttendanceRecord).where(AttendanceRecord.id == attendance_id)
    )
    attendance = result.scalars().first()
    if not attendance:
        raise HTTPException(status_code=404, detail="Attendance record not found")

    if attendance.clock_out:
        raise HTTPException(status_code=400, detail="Already clocked out")

    attendance.clock_out = datetime.now().time()

    # Calculate total hours
    clock_in_dt = datetime.combine(date.today(), attendance.clock_in)
    clock_out_dt = datetime.combine(date.today(), attendance.clock_out)
    total_seconds = (clock_out_dt - clock_in_dt).total_seconds()
    attendance.total_hours = round(total_seconds / 3600, 2)

    await db.commit()
    await db.refresh(attendance)
    return attendance

@router.get("/attendance", response_model=List[AttendanceRecordResponse])
async def list_attendance_records(
    employee_id: Optional[int] = Query(None),
    start_date: Optional[date] = Query(None),
    end_date: Optional[date] = Query(None),
    status: Optional[AttendanceStatus] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=200),
    db: AsyncSession = Depends(get_db)
):
    return await attendance_crud.list_attendance_records(
        db, employee_id=employee_id, start_date=start_date,
        end_date=end_date, status=status, skip=skip, limit=limit
    )

@router.get("/attendance/today", response_model=Optional[AttendanceRecordResponse])
async def get_today_attendance(
    employee_id: int = Query(..., description="Employee ID"),
    db: AsyncSession = Depends(get_db)
):
    return await attendance_crud.get_today_attendance(db, employee_id)

# ---------- Attendance Breaks ----------
@router.post("/attendance-breaks", response_model=AttendanceBreakResponse, status_code=status.HTTP_201_CREATED)
async def create_attendance_break(
    payload: AttendanceBreakCreate,
    db: AsyncSession = Depends(get_db)
):
    return await attendance_crud.create_attendance_break(db, payload)

@router.post("/attendance-breaks/{break_id}/end", response_model=AttendanceBreakResponse)
async def end_attendance_break(
    break_id: int,
    break_end: time = Query(..., description="Break end time"),
    db: AsyncSession = Depends(get_db)
):
    break_record = await attendance_crud.end_attendance_break(db, break_id, break_end)
    if not break_record:
        raise HTTPException(status_code=404, detail="Break record not found")
    return break_record

# ---------- Attendance Policies ----------
@router.post("/attendance-policies", response_model=AttendancePolicyResponse, status_code=status.HTTP_201_CREATED)
async def create_attendance_policy(
    payload: AttendancePolicyCreate,
    db: AsyncSession = Depends(get_db)
):
    return await attendance_crud.create_attendance_policy(db, payload)

@router.get("/attendance-policies", response_model=List[AttendancePolicyResponse])
async def list_attendance_policies(
    is_active: bool = Query(True),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=200),
    db: AsyncSession = Depends(get_db)
):
    return await attendance_crud.list_attendance_policies(db, is_active=is_active, skip=skip, limit=limit)

# ==================== LEAVE ENDPOINTS ====================

# ---------- Leave Requests ----------
@router.post("/leaves", response_model=LeaveRequestResponse)
async def create_leave_request(
    leave: LeaveRequestCreate,
    db: AsyncSession = Depends(get_db)
):
    """Create leave request"""
    db_leave = LeaveRequest(**leave.model_dump(), status=LeaveStatus.pending)
    db.add(db_leave)
    await db.commit()
    await db.refresh(db_leave)
    return db_leave

@router.get("/leaves", response_model=List[LeaveRequestResponse])
async def get_leave_requests(
    employee_id: Optional[int] = None,
    status: Optional[LeaveStatus] = None,
    leave_type: Optional[LeaveType] = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(100, le=100),
    db: AsyncSession = Depends(get_db)
):
    """Get leave requests with filtering"""
    query = select(LeaveRequest)

    if employee_id:
        query = query.where(LeaveRequest.employee_id == employee_id)
    if status:
        query = query.where(LeaveRequest.status == status)
    if leave_type:
        query = query.where(LeaveRequest.leave_type == leave_type)

    query = query.offset(skip).limit(limit).order_by(LeaveRequest.applied_at.desc())
    result = await db.execute(query)
    return result.scalars().all()

@router.put("/leaves/{leave_id}", response_model=LeaveRequestResponse)
async def update_leave_request(
    leave_id: int,
    leave_update: LeaveRequestUpdate,
    db: AsyncSession = Depends(get_db)
):
    """Update/Approve/Reject leave request"""
    result = await db.execute(select(LeaveRequest).where(LeaveRequest.id == leave_id))
    leave = result.scalars().first()
    if not leave:
        raise HTTPException(status_code=404, detail="Leave request not found")

    for key, value in leave_update.model_dump(exclude_unset=True).items():
        setattr(leave, key, value)

    await db.commit()
    await db.refresh(leave)
    return leave


# ---------- Leave Balances ----------
@router.get("/leave-balances/{employee_id}", response_model=List[LeaveBalanceResponse])
async def get_employee_leave_balances(
    employee_id: int,
    year: int = Query(None, description="Year for leave balance"),
    db: AsyncSession = Depends(get_db)
):
    # This would need to be implemented based on your specific requirements
    # For now, returning empty list as placeholder
    return []

@router.post("/leave-balances", response_model=LeaveBalanceResponse, status_code=status.HTTP_201_CREATED)
async def create_leave_balance(
    payload: LeaveBalanceCreate,
    db: AsyncSession = Depends(get_db)
):
    return await leave_crud.create_or_update_leave_balance(db, payload)

# ---------- Leave Policies ----------
@router.post("/leave-policies", response_model=LeavePolicyResponse, status_code=status.HTTP_201_CREATED)
async def create_leave_policy(
    payload: LeavePolicyCreate,
    db: AsyncSession = Depends(get_db)
):
    return await leave_crud.create_leave_policy(db, payload)

@router.get("/leave-policies", response_model=List[LeavePolicyResponse])
async def list_leave_policies(
    is_active: bool = Query(True),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=200),
    db: AsyncSession = Depends(get_db)
):
    return await leave_crud.list_leave_policies(db, is_active=is_active, skip=skip, limit=limit)

# ---------- Company Holidays ----------
@router.post("/company-holidays", response_model=CompanyHolidayResponse, status_code=status.HTTP_201_CREATED)
async def create_company_holiday(
    payload: CompanyHolidayCreate,
    db: AsyncSession = Depends(get_db)
):
    return await leave_crud.create_company_holiday(db, payload)

@router.get("/company-holidays", response_model=List[CompanyHolidayResponse])
async def list_company_holidays(
    year: Optional[int] = Query(None, description="Filter by year"),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=200),
    db: AsyncSession = Depends(get_db)
):
    return await leave_crud.list_company_holidays(db, year=year, skip=skip, limit=limit)

# ==================== DASHBOARD ENDPOINTS ====================

@router.get("/dashboard/stats")
async def get_dashboard_stats(db: AsyncSession = Depends(get_db)):
    """Get dashboard statistics for attendance and leave"""
    today_attendance = await leave_crud.get_today_attendance_count(db)
    pending_leaves = await leave_crud.get_pending_leaves_count(db)

    return {
        "today_attendance": today_attendance,
        "pending_leaves": pending_leaves
    }

@router.get("/employees/{employee_id}/attendance-summary")
async def get_employee_attendance_summary(
    employee_id: int,
    month: int = Query(..., ge=1, le=12, description="Month (1-12)"),
    year: int = Query(..., ge=2020, description="Year"),
    db: AsyncSession = Depends(get_db)
):
    """Get monthly attendance summary for an employee"""
    summary = await leave_crud.get_employee_attendance_summary(db, employee_id, month, year)
    return summary