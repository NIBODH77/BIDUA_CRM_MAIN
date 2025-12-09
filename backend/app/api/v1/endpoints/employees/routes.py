from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import List, Optional
from datetime import datetime

from app.core.database import get_db
from app.models.models import Employee, BankAccount, EmployeeAddress, EmployeeStatus
from app.schemas.schemas import (
    EmployeeCreate, EmployeeUpdate, EmployeeResponse,
    BankAccountCreate, BankAccountResponse,
    EmployeeAddressCreate, EmployeeAddressResponse
)

router = APIRouter()

@router.get("", response_model=List[EmployeeResponse])
async def get_employees(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, le=100),
    department: Optional[str] = None,
    status: Optional[EmployeeStatus] = None,
    search: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    """Get all employees with filtering"""
    query = select(Employee)

    if department:
        query = query.where(Employee.department == department)
    if status:
        query = query.where(Employee.status == status)
    if search:
        query = query.where(
            (Employee.name.ilike(f"%{search}%")) |
            (Employee.email.ilike(f"%{search}%")) |
            (Employee.employee_id.ilike(f"%{search}%"))
        )

    query = query.offset(skip).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("", response_model=EmployeeResponse)
async def create_employee(
    employee: EmployeeCreate,
    db: AsyncSession = Depends(get_db)
):
    """Create new employee"""
    existing = await db.execute(
        select(Employee).where(
            (Employee.employee_id == employee.employee_id) |
            (Employee.email == employee.email)
        )
    )
    if existing.scalars().first():
        raise HTTPException(status_code=400, detail="Employee ID or Email already exists")

    db_employee = Employee(**employee.model_dump())
    db.add(db_employee)
    await db.commit()
    await db.refresh(db_employee)
    return db_employee

@router.get("/{employee_id}", response_model=EmployeeResponse)
async def get_employee(employee_id: int, db: AsyncSession = Depends(get_db)):
    """Get employee by ID"""
    result = await db.execute(select(Employee).where(Employee.id == employee_id))
    employee = result.scalars().first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee

@router.put("/{employee_id}", response_model=EmployeeResponse)
async def update_employee(
    employee_id: int,
    employee_update: EmployeeUpdate,
    db: AsyncSession = Depends(get_db)
):
    """Update employee"""
    result = await db.execute(select(Employee).where(Employee.id == employee_id))
    employee = result.scalars().first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    for key, value in employee_update.model_dump(exclude_unset=True).items():
        setattr(employee, key, value)

    employee.updated_at = datetime.utcnow()
    await db.commit()
    await db.refresh(employee)
    return employee

@router.delete("/{employee_id}")
async def delete_employee(employee_id: int, db: AsyncSession = Depends(get_db)):
    """Delete employee (soft delete)"""
    result = await db.execute(select(Employee).where(Employee.id == employee_id))
    employee = result.scalars().first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    employee.status = EmployeeStatus.terminated
    await db.commit()
    return {"message": "Employee deactivated successfully"}

@router.get("/{employee_id}/bank-account", response_model=BankAccountResponse)
async def get_employee_bank_account(employee_id: int, db: AsyncSession = Depends(get_db)):
    """Get employee bank account"""
    result = await db.execute(
        select(BankAccount).where(BankAccount.employee_id == employee_id)
    )
    bank_account = result.scalars().first()
    if not bank_account:
        raise HTTPException(status_code=404, detail="Bank account not found")
    return bank_account

@router.post("/{employee_id}/bank-account", response_model=BankAccountResponse)
async def create_employee_bank_account(
    employee_id: int,
    bank_account: BankAccountCreate,
    db: AsyncSession = Depends(get_db)
):
    """Create employee bank account"""
    emp_result = await db.execute(select(Employee).where(Employee.id == employee_id))
    if not emp_result.scalars().first():
        raise HTTPException(status_code=404, detail="Employee not found")

    existing = await db.execute(
        select(BankAccount).where(BankAccount.employee_id == employee_id)
    )
    if existing.scalars().first():
        raise HTTPException(status_code=400, detail="Bank account already exists")

    db_bank_account = BankAccount(**bank_account.model_dump(), employee_id=employee_id)
    db.add(db_bank_account)
    await db.commit()
    await db.refresh(db_bank_account)
    return db_bank_account

@router.get("/{employee_id}/addresses", response_model=List[EmployeeAddressResponse])
async def get_employee_addresses(employee_id: int, db: AsyncSession = Depends(get_db)):
    """Get employee addresses"""
    result = await db.execute(
        select(EmployeeAddress).where(EmployeeAddress.employee_id == employee_id)
    )
    return result.scalars().all()
