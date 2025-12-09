# from typing import Any, Dict, Optional, Union, List
# from sqlalchemy.orm import Session
# from app.crud.base import CRUDBase
# from app.models.models import Employee, Attendance
# from app.schemas.schemas import EmployeeRead

# class CRUDEmployee(CRUDBase[Employee, Any, Any]):
#     def get_by_emp_code(self, db: Session, *, emp_code: str) -> Optional[Employee]:
#         return db.query(Employee).filter(Employee.emp_code == emp_code).first()

#     def get_by_email(self, db: Session, *, email: str) -> Optional[Employee]:
#         return db.query(Employee).filter(Employee.email == email).first()

# employee = CRUDEmployee(Employee)

# class CRUDAttendance(CRUDBase[Attendance, Any, Any]):
#     def get_by_employee_date(self, db: Session, *, employee_id: int, date: str) -> Optional[Attendance]:
#         return db.query(Attendance).filter(
#             Attendance.employee_id == employee_id,
#             Attendance.date == date
#         ).first()

# attendance = CRUDAttendance(Attendance)





from typing import Any, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.crud.base import CRUDBase
from app.models.models import Employee, AttendanceRecord


class CRUDEmployee(CRUDBase[Employee, Any, Any]):
    async def get_by_emp_code(self, db: AsyncSession, *, emp_code: str) -> Optional[Employee]:
        result = await db.execute(select(Employee).where(Employee.emp_code == emp_code))
        return result.scalars().first()

    async def get_by_email(self, db: AsyncSession, *, email: str) -> Optional[Employee]:
        result = await db.execute(select(Employee).where(Employee.email == email))
        return result.scalars().first()
    
        
    async def get_by_user_id(self, db: AsyncSession, user_id: int) -> Optional[Employee]:
        result = await db.execute(
            select(Employee).where(Employee.user_id == user_id)
        )
        return result.scalar_one_or_none()

employee = CRUDEmployee(Employee)


class CRUDAttendance(CRUDBase[AttendanceRecord, Any, Any]):
    async def get_by_employee_date(self, db: AsyncSession, *, employee_id: int, date: str) -> Optional[AttendanceRecord]:
        result = await db.execute(
            select(AttendanceRecord).where(
                AttendanceRecord.employee_id == employee_id,
                AttendanceRecord.date == date
            )
        )
        return result.scalars().first()
    
    

attendance = CRUDAttendance(AttendanceRecord)




