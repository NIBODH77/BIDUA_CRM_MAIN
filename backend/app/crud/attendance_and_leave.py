from datetime import date, datetime, time
from typing import List, Optional, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_, or_, func
from sqlalchemy.orm import selectinload

from app.models.models import (
    AttendanceRecord, AttendanceBreak, GeofenceLocation, AttendancePolicy,
    LeaveRequest, LeaveBalance, LeavePolicy, CompanyHoliday, LeaveApproval,
    Employee, AttendanceStatus, LeaveStatus, LeaveType, BreakType
)
from app.schemas.schemas import (
    AttendanceRecordCreate, AttendanceRecordResponse,
    AttendanceBreakCreate, AttendanceBreakResponse,
    GeofenceLocationCreate, GeofenceLocationResponse,
    AttendancePolicyCreate, AttendancePolicyResponse,
    LeaveRequestCreate, LeaveRequestResponse,
    LeaveBalanceCreate, LeaveBalanceResponse,
    LeavePolicyCreate, LeavePolicyResponse,
    CompanyHolidayCreate, CompanyHolidayResponse
)


class AttendanceCRUD:
    # ==================== Geofence Locations ====================
    
    async def create_geofence_location(
        self, db: AsyncSession, obj_in: GeofenceLocationCreate
    ) -> GeofenceLocation:
        db_obj = GeofenceLocation(**obj_in.model_dump())
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def get_geofence_location(
        self, db: AsyncSession, location_id: int
    ) -> Optional[GeofenceLocation]:
        result = await db.execute(
            select(GeofenceLocation).where(GeofenceLocation.id == location_id)
        )
        return result.scalar_one_or_none()

    async def list_geofence_locations(
        self, db: AsyncSession, skip: int = 0, limit: int = 100, is_active: bool = True
    ) -> List[GeofenceLocation]:
        query = select(GeofenceLocation)
        if is_active:
            query = query.where(GeofenceLocation.is_active == True)
        result = await db.execute(query.offset(skip).limit(limit))
        return result.scalars().all()

    async def update_geofence_location(
        self, db: AsyncSession, db_obj: GeofenceLocation, obj_in: Dict[str, Any]
    ) -> GeofenceLocation:
        for field, value in obj_in.items():
            setattr(db_obj, field, value)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def delete_geofence_location(self, db: AsyncSession, location_id: int) -> bool:
        location = await self.get_geofence_location(db, location_id)
        if not location:
            return False
        await db.delete(location)
        await db.commit()
        return True

    # ==================== Attendance Records ====================
    
    async def create_attendance_record(
        self, db: AsyncSession, obj_in: AttendanceRecordCreate
    ) -> AttendanceRecord:
        # Calculate total hours if clock_out is provided
        total_hours = 0
        if obj_in.clock_out:
            clock_in_dt = datetime.combine(obj_in.date, obj_in.clock_in)
            clock_out_dt = datetime.combine(obj_in.date, obj_in.clock_out)
            total_hours = (clock_out_dt - clock_in_dt).total_seconds() / 3600

        db_obj = AttendanceRecord(
            **obj_in.model_dump(),
            total_hours=total_hours
        )
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def get_attendance_record(
        self, db: AsyncSession, record_id: int
    ) -> Optional[AttendanceRecord]:
        result = await db.execute(
            select(AttendanceRecord)
            .options(selectinload(AttendanceRecord.breaks))
            .where(AttendanceRecord.id == record_id)
        )
        return result.scalar_one_or_none()

    async def list_attendance_records(
        self, db: AsyncSession,
        employee_id: Optional[int] = None,
        start_date: Optional[date] = None,
        end_date: Optional[date] = None,
        status: Optional[AttendanceStatus] = None,
        skip: int = 0, limit: int = 100
    ) -> List[AttendanceRecord]:
        query = select(AttendanceRecord).options(selectinload(AttendanceRecord.breaks))
        
        filters = []
        if employee_id:
            filters.append(AttendanceRecord.employee_id == employee_id)
        if start_date:
            filters.append(AttendanceRecord.date >= start_date)
        if end_date:
            filters.append(AttendanceRecord.date <= end_date)
        if status:
            filters.append(AttendanceRecord.status == status)
            
        if filters:
            query = query.where(and_(*filters))
            
        query = query.order_by(AttendanceRecord.date.desc(), AttendanceRecord.clock_in.desc())
        result = await db.execute(query.offset(skip).limit(limit))
        return result.scalars().all()

    async def get_today_attendance(
        self, db: AsyncSession, employee_id: int
    ) -> Optional[AttendanceRecord]:
        today = date.today()
        result = await db.execute(
            select(AttendanceRecord)
            .where(
                and_(
                    AttendanceRecord.employee_id == employee_id,
                    AttendanceRecord.date == today
                )
            )
        )
        return result.scalar_one_or_none()

    async def clock_out_attendance(
        self, db: AsyncSession, record_id: int, clock_out: time
    ) -> Optional[AttendanceRecord]:
        record = await self.get_attendance_record(db, record_id)
        if not record:
            return None
            
        record.clock_out = clock_out
        
        # Calculate total hours
        clock_in_dt = datetime.combine(record.date, record.clock_in)
        clock_out_dt = datetime.combine(record.date, clock_out)
        total_hours = (clock_out_dt - clock_in_dt).total_seconds() / 3600
        record.total_hours = total_hours
        
        await db.commit()
        await db.refresh(record)
        return record

    # ==================== Attendance Breaks ====================
    
    async def create_attendance_break(
        self, db: AsyncSession, obj_in: AttendanceBreakCreate
    ) -> AttendanceBreak:
        db_obj = AttendanceBreak(**obj_in.model_dump())
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def end_attendance_break(
        self, db: AsyncSession, break_id: int, break_end: time
    ) -> Optional[AttendanceBreak]:
        break_record = await db.get(AttendanceBreak, break_id)
        if not break_record:
            return None
            
        break_record.break_end = break_end
        
        # Calculate duration
        break_start_dt = datetime.combine(date.today(), break_record.break_start)
        break_end_dt = datetime.combine(date.today(), break_end)
        duration_minutes = (break_end_dt - break_start_dt).total_seconds() / 60
        break_record.duration_minutes = int(duration_minutes)
        
        await db.commit()
        await db.refresh(break_record)
        return break_record

    # ==================== Attendance Policies ====================
    
    async def create_attendance_policy(
        self, db: AsyncSession, obj_in: AttendancePolicyCreate
    ) -> AttendancePolicy:
        db_obj = AttendancePolicy(**obj_in.model_dump())
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def get_attendance_policy(
        self, db: AsyncSession, policy_id: int
    ) -> Optional[AttendancePolicy]:
        result = await db.execute(
            select(AttendancePolicy).where(AttendancePolicy.id == policy_id)
        )
        return result.scalar_one_or_none()

    async def list_attendance_policies(
        self, db: AsyncSession, is_active: bool = True, skip: int = 0, limit: int = 100
    ) -> List[AttendancePolicy]:
        query = select(AttendancePolicy)
        if is_active:
            query = query.where(AttendancePolicy.is_active == True)
        result = await db.execute(query.offset(skip).limit(limit))
        return result.scalars().all()


class LeaveCRUD:
    # ==================== Leave Requests ====================
    
    async def create_leave_request(
        self, db: AsyncSession, obj_in: LeaveRequestCreate
    ) -> LeaveRequest:
        # Calculate number of days
        days = (obj_in.end_date - obj_in.start_date).days + 1
        
        db_obj = LeaveRequest(
            **obj_in.model_dump(),
            days=days
        )
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def get_leave_request(
        self, db: AsyncSession, request_id: int
    ) -> Optional[LeaveRequest]:
        result = await db.execute(
            select(LeaveRequest)
            .options(selectinload(LeaveRequest.approvals))
            .where(LeaveRequest.id == request_id)
        )
        return result.scalar_one_or_none()

    async def list_leave_requests(
        self, db: AsyncSession,
        employee_id: Optional[int] = None,
        status: Optional[LeaveStatus] = None,
        start_date: Optional[date] = None,
        end_date: Optional[date] = None,
        skip: int = 0, limit: int = 100
    ) -> List[LeaveRequest]:
        query = select(LeaveRequest).options(selectinload(LeaveRequest.approvals))
        
        filters = []
        if employee_id:
            filters.append(LeaveRequest.employee_id == employee_id)
        if status:
            filters.append(LeaveRequest.status == status)
        if start_date:
            filters.append(LeaveRequest.start_date >= start_date)
        if end_date:
            filters.append(LeaveRequest.end_date <= end_date)
            
        if filters:
            query = query.where(and_(*filters))
            
        query = query.order_by(LeaveRequest.applied_at.desc())
        result = await db.execute(query.offset(skip).limit(limit))
        return result.scalars().all()

    async def update_leave_request_status(
        self, db: AsyncSession, request_id: int, status: LeaveStatus,
        approved_by: Optional[int] = None, comments: Optional[str] = None
    ) -> Optional[LeaveRequest]:
        request = await self.get_leave_request(db, request_id)
        if not request:
            return None
            
        request.status = status
        if status == LeaveStatus.approved:
            request.approved_by = approved_by
            request.approved_at = datetime.utcnow()
        elif status == LeaveStatus.rejected:
            request.rejected_by = approved_by
            request.rejected_at = datetime.utcnow()
            
        if comments:
            request.comments = comments
            
        await db.commit()
        await db.refresh(request)
        return request

    # ==================== Leave Balances ====================
    
    async def get_leave_balance(
        self, db: AsyncSession, employee_id: int, leave_type: LeaveType, year: int
    ) -> Optional[LeaveBalance]:
        result = await db.execute(
            select(LeaveBalance).where(
                and_(
                    LeaveBalance.employee_id == employee_id,
                    LeaveBalance.leave_type == leave_type,
                    LeaveBalance.year == year
                )
            )
        )
        return result.scalar_one_or_none()

    async def create_or_update_leave_balance(
        self, db: AsyncSession, obj_in: LeaveBalanceCreate
    ) -> LeaveBalance:
        # Check if balance already exists
        existing = await self.get_leave_balance(
            db, obj_in.employee_id, obj_in.leave_type, obj_in.year
        )
        
        if existing:
            for field, value in obj_in.model_dump(exclude={'id'}).items():
                setattr(existing, field, value)
            await db.commit()
            await db.refresh(existing)
            return existing
        else:
            db_obj = LeaveBalance(**obj_in.model_dump())
            db.add(db_obj)
            await db.commit()
            await db.refresh(db_obj)
            return db_obj

    # ==================== Leave Policies ====================
    
    async def create_leave_policy(
        self, db: AsyncSession, obj_in: LeavePolicyCreate
    ) -> LeavePolicy:
        db_obj = LeavePolicy(**obj_in.model_dump())
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def get_leave_policy(
        self, db: AsyncSession, policy_id: int
    ) -> Optional[LeavePolicy]:
        result = await db.execute(
            select(LeavePolicy).where(LeavePolicy.id == policy_id)
        )
        return result.scalar_one_or_none()

    async def list_leave_policies(
        self, db: AsyncSession, is_active: bool = True, skip: int = 0, limit: int = 100
    ) -> List[LeavePolicy]:
        query = select(LeavePolicy)
        if is_active:
            query = query.where(LeavePolicy.is_active == True)
        result = await db.execute(query.offset(skip).limit(limit))
        return result.scalars().all()

    # ==================== Company Holidays ====================
    
    async def create_company_holiday(
        self, db: AsyncSession, obj_in: CompanyHolidayCreate
    ) -> CompanyHoliday:
        db_obj = CompanyHoliday(**obj_in.model_dump())
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def list_company_holidays(
        self, db: AsyncSession, year: Optional[int] = None, skip: int = 0, limit: int = 100
    ) -> List[CompanyHoliday]:
        query = select(CompanyHoliday)
        if year:
            query = query.where(
                or_(
                    func.extract('year', CompanyHoliday.date) == year,
                    CompanyHoliday.date >= date(year, 1, 1)
                )
            )
        result = await db.execute(query.offset(skip).limit(limit))
        return result.scalars().all()

    # ==================== Dashboard Statistics ====================
    
    async def get_today_attendance_count(self, db: AsyncSession) -> int:
        today = date.today()
        result = await db.execute(
            select(func.count(AttendanceRecord.id))
            .where(AttendanceRecord.date == today)
        )
        return result.scalar_one() or 0

    async def get_pending_leaves_count(self, db: AsyncSession) -> int:
        result = await db.execute(
            select(func.count(LeaveRequest.id))
            .where(LeaveRequest.status == LeaveStatus.pending)
        )
        return result.scalar_one() or 0

    async def get_employee_attendance_summary(
        self, db: AsyncSession, employee_id: int, month: int, year: int
    ) -> Dict[str, Any]:
        # Get present days count
        present_result = await db.execute(
            select(func.count(AttendanceRecord.id))
            .where(
                and_(
                    AttendanceRecord.employee_id == employee_id,
                    func.extract('month', AttendanceRecord.date) == month,
                    func.extract('year', AttendanceRecord.date) == year,
                    AttendanceRecord.status == AttendanceStatus.present
                )
            )
        )
        present_days = present_result.scalar_one() or 0
        
        # Get leave days count
        leave_result = await db.execute(
            select(func.sum(LeaveRequest.days))
            .where(
                and_(
                    LeaveRequest.employee_id == employee_id,
                    func.extract('month', LeaveRequest.start_date) == month,
                    func.extract('year', LeaveRequest.start_date) == year,
                    LeaveRequest.status == LeaveStatus.approved
                )
            )
        )
        leave_days = leave_result.scalar_one() or 0
        
        return {
            "present_days": present_days,
            "leave_days": leave_days,
            "working_days": 22  # You can calculate this based on your business logic
        }


# Create instances
attendance_crud = AttendanceCRUD()
leave_crud = LeaveCRUD()