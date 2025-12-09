from datetime import date, time
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

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
from app.models.models import AttendanceStatus, LeaveStatus, LeaveType

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
@router.post("/attendance/clock-in", response_model=AttendanceRecordResponse, status_code=status.HTTP_201_CREATED)
async def clock_in(
    payload: AttendanceRecordCreate,
    db: AsyncSession = Depends(get_db)
):
    # Check if already clocked in today
    existing = await attendance_crud.get_today_attendance(db, payload.employee_id)
    if existing:
        raise HTTPException(status_code=400, detail="Already clocked in today")
    
    return await attendance_crud.create_attendance_record(db, payload)

@router.post("/attendance/{record_id}/clock-out", response_model=AttendanceRecordResponse)
async def clock_out(
    record_id: int,
    clock_out: time = Query(..., description="Clock-out time"),
    db: AsyncSession = Depends(get_db)
):
    record = await attendance_crud.clock_out_attendance(db, record_id, clock_out)
    if not record:
        raise HTTPException(status_code=404, detail="Attendance record not found")
    return record

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
@router.post("/leave-requests", response_model=LeaveRequestResponse, status_code=status.HTTP_201_CREATED)
async def create_leave_request(
    payload: LeaveRequestCreate,
    db: AsyncSession = Depends(get_db)
):
    return await leave_crud.create_leave_request(db, payload)

@router.get("/leave-requests", response_model=List[LeaveRequestResponse])
async def list_leave_requests(
    employee_id: Optional[int] = Query(None),
    status: Optional[LeaveStatus] = Query(None),
    start_date: Optional[date] = Query(None),
    end_date: Optional[date] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=200),
    db: AsyncSession = Depends(get_db)
):
    return await leave_crud.list_leave_requests(
        db, employee_id=employee_id, status=status, 
        start_date=start_date, end_date=end_date, skip=skip, limit=limit
    )

@router.get("/leave-requests/{request_id}", response_model=LeaveRequestResponse)
async def get_leave_request(
    request_id: int,
    db: AsyncSession = Depends(get_db)
):
    request = await leave_crud.get_leave_request(db, request_id)
    if not request:
        raise HTTPException(status_code=404, detail="Leave request not found")
    return request

@router.patch("/leave-requests/{request_id}/status")
async def update_leave_request_status(
    request_id: int,
    status: LeaveStatus,
    approved_by: Optional[int] = Query(None),
    comments: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db)
):
    request = await leave_crud.update_leave_request_status(
        db, request_id, status, approved_by, comments
    )
    if not request:
        raise HTTPException(status_code=404, detail="Leave request not found")
    return {"message": "Leave request status updated successfully", "request": request}

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
    # print("================== pending ===============", pending_leaves)

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





