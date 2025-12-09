
import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import AsyncSessionLocal
from app.models.models import GeofenceLocation, AttendanceRecord, AttendanceBreak, LeaveRequest, LeaveBalance, CompanyHoliday, AttendanceStatus, BreakType, LeaveType, LeaveStatus
from sqlalchemy import select
from datetime import date, time, datetime
from decimal import Decimal

async def seed_attendance_leave_data():
    async with AsyncSessionLocal() as db:
        try:
            # Get employee IDs
            from app.models.models import Employee
            result = await db.execute(select(Employee).limit(3))
            employees = result.scalars().all()
            
            if not employees:
                print("⚠️ No employees found. Please seed employees first.")
                return

            # Create Geofence Locations
            geofence_locations = [
                GeofenceLocation(
                    name="Head Office Bangalore",
                    address="123 MG Road, Bangalore",
                    latitude=Decimal("12.9716"),
                    longitude=Decimal("77.5946"),
                    radius=Decimal("100.00"),
                    timezone="Asia/Kolkata",
                    working_hours_start=time(9, 0),
                    working_hours_end=time(18, 0),
                    is_active=True,
                    created_at=datetime.utcnow()
                ),
                GeofenceLocation(
                    name="Branch Office Delhi",
                    address="456 Connaught Place, Delhi",
                    latitude=Decimal("28.6139"),
                    longitude=Decimal("77.2090"),
                    radius=Decimal("150.00"),
                    timezone="Asia/Kolkata",
                    working_hours_start=time(9, 30),
                    working_hours_end=time(18, 30),
                    is_active=True,
                    created_at=datetime.utcnow()
                ),
            ]
            db.add_all(geofence_locations)
            await db.commit()

            for loc in geofence_locations:
                await db.refresh(loc)

            # Create Attendance Records
            attendance_records = [
                AttendanceRecord(
                    employee_id=employees[0].id,
                    date=date.today(),
                    clock_in=time(9, 5),
                    clock_out=time(18, 10),
                    total_hours=Decimal("8.08"),
                    break_hours=Decimal("1.00"),
                    overtime_hours=Decimal("0.00"),
                    status=AttendanceStatus.present,
                    location_name="Head Office Bangalore",
                    latitude=Decimal("12.9716"),
                    longitude=Decimal("77.5946"),
                    is_within_geofence=True,
                    geofence_location_id=geofence_locations[0].id,
                    created_at=datetime.utcnow()
                ),
                AttendanceRecord(
                    employee_id=employees[1].id if len(employees) > 1 else employees[0].id,
                    date=date.today(),
                    clock_in=time(9, 15),
                    clock_out=time(18, 0),
                    total_hours=Decimal("7.75"),
                    break_hours=Decimal("1.00"),
                    overtime_hours=Decimal("0.00"),
                    status=AttendanceStatus.late,
                    location_name="Head Office Bangalore",
                    latitude=Decimal("12.9720"),
                    longitude=Decimal("77.5950"),
                    is_within_geofence=True,
                    geofence_location_id=geofence_locations[0].id,
                    created_at=datetime.utcnow()
                ),
            ]
            db.add_all(attendance_records)
            await db.commit()

            for record in attendance_records:
                await db.refresh(record)

            # Create Attendance Breaks
            breaks = [
                AttendanceBreak(
                    attendance_id=attendance_records[0].id,
                    break_start=time(13, 0),
                    break_end=time(14, 0),
                    break_type=BreakType.lunch,
                    duration_minutes=60,
                    notes="Lunch break",
                    created_at=datetime.utcnow()
                ),
                AttendanceBreak(
                    attendance_id=attendance_records[0].id,
                    break_start=time(16, 0),
                    break_end=time(16, 15),
                    break_type=BreakType.tea,
                    duration_minutes=15,
                    notes="Tea break",
                    created_at=datetime.utcnow()
                ),
            ]
            db.add_all(breaks)
            await db.commit()

            # Create Leave Requests
            leave_requests = [
                LeaveRequest(
                    employee_id=employees[0].id,
                    leave_type=LeaveType.casual,
                    start_date=date(2025, 2, 20),
                    end_date=date(2025, 2, 21),
                    days=Decimal("2.00"),
                    reason="Personal work",
                    status=LeaveStatus.approved,
                    applied_at=datetime.utcnow(),
                    created_at=datetime.utcnow()
                ),
                LeaveRequest(
                    employee_id=employees[1].id if len(employees) > 1 else employees[0].id,
                    leave_type=LeaveType.sick,
                    start_date=date(2025, 2, 15),
                    end_date=date(2025, 2, 15),
                    days=Decimal("1.00"),
                    reason="Medical appointment",
                    status=LeaveStatus.pending,
                    applied_at=datetime.utcnow(),
                    created_at=datetime.utcnow()
                ),
            ]
            db.add_all(leave_requests)
            await db.commit()

            # Create Leave Balances
            leave_balances = [
                LeaveBalance(
                    employee_id=employees[0].id,
                    leave_type=LeaveType.casual,
                    year=2025,
                    allocated=Decimal("12.00"),
                    used=Decimal("2.00"),
                    pending=Decimal("0.00"),
                    carry_forward=Decimal("0.00"),
                    encashed=Decimal("0.00"),
                    created_at=datetime.utcnow()
                ),
                LeaveBalance(
                    employee_id=employees[0].id,
                    leave_type=LeaveType.sick,
                    year=2025,
                    allocated=Decimal("10.00"),
                    used=Decimal("0.00"),
                    pending=Decimal("0.00"),
                    carry_forward=Decimal("0.00"),
                    encashed=Decimal("0.00"),
                    created_at=datetime.utcnow()
                ),
            ]
            db.add_all(leave_balances)
            await db.commit()

            # Create Company Holidays
            holidays = [
                CompanyHoliday(
                    name="Republic Day",
                    date=date(2025, 1, 26),
                    is_optional=False,
                    description="National Holiday",
                    created_at=datetime.utcnow()
                ),
                CompanyHoliday(
                    name="Holi",
                    date=date(2025, 3, 14),
                    is_optional=False,
                    description="Festival of Colors",
                    created_at=datetime.utcnow()
                ),
                CompanyHoliday(
                    name="Independence Day",
                    date=date(2025, 8, 15),
                    is_optional=False,
                    description="National Holiday",
                    created_at=datetime.utcnow()
                ),
            ]
            db.add_all(holidays)
            await db.commit()
            
            print("✅ Attendance and Leave data seeded successfully!")
            
        except Exception as e:
            print(f"❌ Error seeding attendance/leave data: {e}")
            await db.rollback()

if __name__ == "__main__":
    asyncio.run(seed_attendance_leave_data())
