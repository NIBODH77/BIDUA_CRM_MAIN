# # from typing import Any, List
# # from fastapi import APIRouter, Depends, HTTPException
# # from sqlalchemy.orm import Session
# # from app import crud, schemas
# # from app.core.database import get_db

# # router = APIRouter()

# # @router.get("/", response_model=List[schemas.EmployeeRead])
# # def read_employees(
# #     db: Session = Depends(get_db),
# #     skip: int = 0,
# #     limit: int = 100,
# # ) -> Any:
# #     """
# #     Retrieve employees.
# #     """
# #     employees = crud.employee.get_multi(db, skip=skip, limit=limit)
# #     return employees

# # @router.post("/", response_model=schemas.EmployeeRead)
# # def create_employee(
# #     *,
# #     db: Session = Depends(get_db),
# #     employee_in: schemas.EmployeeBase,
# # ) -> Any:
# #     """
# #     Create new employee.
# #     """
# #     employee = crud.employee.create(db, obj_in=employee_in)
# #     return employee

# # @router.get("/{employee_id}", response_model=schemas.EmployeeRead)
# # def read_employee(
# #     employee_id: int,
# #     db: Session = Depends(get_db),
# # ) -> Any:
# #     """
# #     Get employee by ID.
# #     """
# #     employee = crud.employee.get(db, id=employee_id)
# #     if not employee:
# #         raise HTTPException(status_code=404, detail="Employee not found")
# #     return employee

# # @router.delete("/{employee_id}")
# # def delete_employee(
# #     *,
# #     db: Session = Depends(get_db),
# #     employee_id: int,
# # ) -> Any:
# #     """
# #     Delete employee.
# #     """
# #     employee = crud.employee.get(db, id=employee_id)
# #     if not employee:
# #         raise HTTPException(status_code=404, detail="Employee not found")
# #     employee = crud.employee.remove(db, id=employee_id)
# #     return {"message": "Employee deleted successfully"}





# # from typing import Any, List
# # from fastapi import APIRouter, Depends, HTTPException
# # from sqlalchemy.ext.asyncio import AsyncSession

# # from app.schemas import schemas
# # from app.core.database import get_db
# # from app.crud.employees import employee  # ✅ import the instance directly

# # router = APIRouter()

# # # -------------------------------
# # # Get all employees
# # # -------------------------------
# # @router.get("/", response_model=List[schemas.EmployeeRead])
# # async def read_employees(
# #     db: AsyncSession = Depends(get_db),
# #     skip: int = 0,
# #     limit: int = 100,
# # ) -> Any:
# #     """
# #     Retrieve employees.
# #     """
# #     crud_employees = await employee.get_multi(db, skip=skip, limit=limit)
# #     return crud_employees


# # # -------------------------------
# # # Create new employee
# # # -------------------------------
# # @router.post("/", response_model=schemas.EmployeeRead)
# # async def create_employee(
# #     *,
# #     db: AsyncSession = Depends(get_db),
# #     employee_in: schemas.EmployeeBase,
# # ) -> Any:
# #     """
# #     Create new employee.
# #     """
# #     crud_employee = await employee.create(db, obj_in=employee_in)
# #     return crud_employee


# # # -------------------------------
# # # Get employee by ID
# # # -------------------------------
# # @router.get("/{employee_id}", response_model=schemas.EmployeeRead)
# # async def read_employee(
# #     employee_id: int,
# #     db: AsyncSession = Depends(get_db),
# # ) -> Any:
# #     """
# #     Get employee by ID.
# #     """
# #     crud_employee = await employee.get(db, id=employee_id)
# #     if not crud_employee:
# #         raise HTTPException(status_code=404, detail="Employee not found")
# #     return crud_employee

# # # -------------------------------
# # # Delete employee
# # # -------------------------------
# # @router.delete("/{employee_id}")
# # async def delete_employee(
# #     *,
# #     db: AsyncSession = Depends(get_db),
# #     employee_id: int,
# # ) -> Any:
# #     """
# #     Delete employee.
# #     """
# #     crud_employee = await employee.get(db, id=employee_id)
# #     if not crud_employee:
# #         raise HTTPException(status_code=404, detail="Employee not found")
# #     await employee.remove(db, id=employee_id)
# #     return {"message": "Employee deleted successfully"}





# from typing import Any, List
# from fastapi import APIRouter, Depends, HTTPException,Path
# from sqlalchemy.ext.asyncio import AsyncSession

# from app.schemas.schemas import EmployeeCreate, EmployeeUpdate, EmployeeResponse
# from app.core.database import get_db
# from app.crud.employees import employee  # ✅ import the instance directly
# from sqlalchemy import select
# from app.models.models import Employee



# router = APIRouter()

# # -------------------------------
# # Get all employees
# # -------------------------------
# @router.get("/", response_model=List[EmployeeResponse])
# async def read_employees(
#     db: AsyncSession = Depends(get_db),
#     skip: int = 0,
#     limit: int = 100,
# ) -> Any:
#     """
#     Retrieve employees.
#     """
#     crud_employees = await employee.get_multi(db, skip=skip, limit=limit)
#     return crud_employees


# # -------------------------------
# # Create new employee
# # -------------------------------
# @router.post("/", response_model=EmployeeResponse)
# async def create_employee(
#     *,
#     db: AsyncSession = Depends(get_db),
#     employee_in: EmployeeCreate,
# ) -> Any:
#     """
#     Create new employee.
#     """
#     crud_employee = await employee.create(db, obj_in=employee_in)
#     return crud_employee


# # -------------------------------
# # Get employee by ID
# # -------------------------------
# # @router.get("/{employee_id}", response_model=EmployeeResponse)
# # async def read_employee(
# #     employee_id: int,
# #     db: AsyncSession = Depends(get_db),
# # ) -> Any:
# #     """
# #     Get employee by ID.
# #     """
# #     crud_employee = await employee.get(db, id=employee_id)
# #     if not crud_employee:
# #         raise HTTPException(status_code=404, detail="Employee not found")
# #     return crud_employee


# async def get_employee_by_code(db: AsyncSession, code: str):
#     stmt = select(Employee).where(Employee.employee_id == code)
#     res = await db.execute(stmt)
#     return res.scalar_one_or_none()

# @router.get(
#     "/{employee_id}",
#     response_model=EmployeeResponse,
#     summary="Read employee by employee code (EMP + digits)",
#     description="Accepts only codes like EMP002, EMP1234 (EMP + at least 3 digits).",
# )
# async def read_employee(
#     # ✅ regex: EMP + at least 3 digits (3 or 4 or 5 or more)
#     employee_id: str = Path(..., pattern=r"^EMP\d{3,}$", examples=["EMP002","EMP1234","EMP99999"]),
#     db: AsyncSession = Depends(get_db),
# ):
#     # optional: case-normalize (so emp002 also works). Remove if you want strict uppercase only.
#     employee_id = employee_id.upper()

#     emp = await get_employee_by_code(db, employee_id)
#     if not emp:
#         raise HTTPException(status_code=404, detail="Employee not found")
#     return emp



# # -------------------------------
# # Update employee
# # -------------------------------
# @router.put("/{employee_id}", response_model=EmployeeResponse)
# async def update_employee(
#     *,
#     db: AsyncSession = Depends(get_db),
#     employee_id: int,
#     employee_in: EmployeeUpdate,
# ) -> Any:
#     """
#     Update employee by ID.
#     """
#     crud_employee = await employee.get(db, id=employee_id)
#     if not crud_employee:
#         raise HTTPException(status_code=404, detail="Employee not found")

#     updated_employee = await employee.update(db, db_obj=crud_employee, obj_in=employee_in)
#     return updated_employee


# # -------------------------------
# # Delete employee
# # -------------------------------
# @router.delete("/{employee_id}")
# async def delete_employee(
#     *,
#     db: AsyncSession = Depends(get_db),
#     employee_id: int,
# ) -> Any:
#     """
#     Delete employee.
#     """
#     crud_employee = await employee.get(db, id=employee_id)
#     if not crud_employee:
#         raise HTTPException(status_code=404, detail="Employee not found")

#     await employee.remove(db, id=employee_id)
#     return {"message": "Employee deleted successfully"}










from __future__ import annotations
from typing import List, Optional
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Query, status, Path,Body
from sqlalchemy import select, or_, and_
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.models import Employee, BankAccount, EmployeeAddress, User
from app.schemas.schemas import (
    EmployeeCreate, EmployeeUpdate, EmployeeResponse as EmployeeOut,
    BankAccountCreate, BankAccountResponse,
    EmployeeAddressCreate, EmployeeAddressResponse,BankAccountUpdate
)

from sqlalchemy.orm import selectinload




router = APIRouter()




@router.get("/", response_model=List[EmployeeOut])
async def list_employees(
    db: AsyncSession = Depends(get_db),
    q: Optional[str] = None,
    department: Optional[str] = None,
    # status: Optional[str] = None,
    status: str = "active",  # default filter only active

    manager_id: Optional[int] = None,
    skip: int = 0, limit: int = 100,
):
    stmt = select(Employee)
    filters = []
    if status:
        filters.append(Employee.status == status)
    if q:
        like = f"%{q}%"
        filters.append(or_(Employee.name.ilike(like), Employee.email.ilike(like), Employee.phone.ilike(like)))
    if department:
        filters.append(Employee.department == department)
    if status:
        filters.append(Employee.status == status)
    if manager_id:
        filters.append(Employee.manager_id == manager_id)
    if filters:
        stmt = stmt.where(and_(*filters))
    stmt = stmt.order_by(Employee.created_at.desc()).offset(skip).limit(limit)
    res = await db.execute(stmt)
    return res.scalars().all()

# @router.get("/{employee_id}", response_model=EmployeeOut)
# async def get_employee(employee_id: int, db: AsyncSession = Depends(get_db)):
#     emp = await db.get(Employee, employee_id)
#     if not emp:
#         raise HTTPException(404, "Employee not found")
#     return emp



async def get_employee_by_code(db: AsyncSession, code: str):
    stmt = select(Employee).where(Employee.employee_id == code)
    res = await db.execute(stmt)
    return res.scalar_one_or_none()

@router.get(
    "/{employee_id}",
    response_model=EmployeeOut,
    summary="Read employee by employee code (EMP + digits)",
    description="Accepts only codes like EMP002, EMP1234 (EMP + at least 3 digits).",
)
async def read_employee(
    # ✅ regex: EMP + at least 3 digits (3 or 4 or 5 or more)
    employee_id: str = Path(..., pattern=r"^EMP\d{3,}$", examples=["EMP002","EMP1234","EMP99999"]),
    db: AsyncSession = Depends(get_db),
):
    # optional: case-normalize (so emp002 also works). Remove if you want strict uppercase only.
    employee_id = employee_id.upper()

    emp = await get_employee_by_code(db, employee_id)
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    return emp



@router.post("/", response_model=EmployeeOut, status_code=201)
async def create_employee(payload: EmployeeCreate, db: AsyncSession = Depends(get_db)):
    if payload.user_id and not await db.get(User, payload.user_id):
        raise HTTPException(404, "User not found")
    if payload.manager_id and not await db.get(Employee, payload.manager_id):
        raise HTTPException(404, "Manager not found")
    emp = Employee(**payload.model_dump())
    db.add(emp)
    await db.commit()
    await db.refresh(emp)
    return emp





@router.put(
    "/{employee_id}",
    response_model=EmployeeOut,
    summary="Update employee by employee code (EMP + digits)",
    description="Accepts only codes like EMP002, EMP1234 (EMP + at least 3 digits).",
)
async def update_employee(
    employee_id: str = Path(..., pattern=r"^EMP\d{3,}$", examples=["EMP002", "EMP1234", "EMP99999"]),
    payload: EmployeeUpdate = ...,
    db: AsyncSession = Depends(get_db),
):
    # ✅ normalize case (EMP002 instead of emp002)
    employee_id = employee_id.upper()

    # 🔍 Find employee by code
    emp = await get_employee_by_code(db, employee_id)
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    # ✅ Extract fields to update (only those sent)
    data = payload.model_dump(exclude_unset=True)

    # 🔁 Optional manager check
    if "manager_id" in data and data["manager_id"]:
        manager = await db.get(Employee, data["manager_id"])
        if not manager:
            raise HTTPException(status_code=404, detail="Manager not found")

    # 🔧 Apply updates dynamically
    for k, v in data.items():
        setattr(emp, k, v)

    emp.updated_at = datetime.utcnow()

    # 💾 Commit changes
    await db.commit()
    await db.refresh(emp)

    return emp


@router.delete("/{employee_id}", status_code=204)
async def delete_employee(employee_id: int, db: AsyncSession = Depends(get_db)):
    emp = await db.get(Employee, employee_id)
    if not emp:
        raise HTTPException(404, "Employee not found")
    await db.delete(emp)
    await db.commit()
    return None

# ---- Bank Account (1:1) ----
@router.get("/{employee_id}/bank-account", response_model=BankAccountResponse)
async def get_bank_account(employee_id: int, db: AsyncSession = Depends(get_db)):
    emp = await db.get(Employee, employee_id)
    if not emp:
        raise HTTPException(404, "Employee not found")
    if not emp.bank_account:
        raise HTTPException(404, "Bank account not found")
    return emp.bank_account



# @router.post("/{employee_id}/bank-account", response_model=BankAccountResponse, status_code=201)
# async def set_bank_account(employee_id: int, payload: BankAccountCreate, db: AsyncSession = Depends(get_db)):
#     if payload.employee_id != employee_id:
#         raise HTTPException(400, "employee_id mismatch")
#     emp = await db.get(Employee, employee_id)
#     if not emp:
#         raise HTTPException(404, "Employee not found")
#     # if exists, replace
#     if emp.bank_account:
#         await db.delete(emp.bank_account)
#         await db.flush()
#     acc = BankAccount(**payload.model_dump())
#     db.add(acc)
#     await db.commit()
#     await db.refresh(acc)
#     return acc




# @router.post(
#     "/{employee_id}/bank-account",
#     response_model=BankAccountResponse,
#     status_code=status.HTTP_201_CREATED,
#     summary="Create or update bank account by employee code",
#     description="Accepts employee code in format EMP + digits (e.g., EMP001, EMP1234). Request body must be JSON.",
# )
# async def set_bank_account(
#     employee_id: str = Path(..., pattern=r"^EMP\d{3,}$", examples=["EMP001", "EMP002", "EMP1234"]),
#     payload: BankAccountCreate = Body(...),  # ✅ Explicitly mark as JSON body
#     db: AsyncSession = Depends(get_db),
# ):
#     # 🔹 Normalize employee code
#     employee_id = employee_id.upper()

#     # 🔹 Find employee by employee code
#     # emp = await db.scalar(select(Employee).where(Employee.employee_id == employee_id))

#     emp = await db.scalar(
#         select(Employee)
#         .where(Employee.employee_id == employee_id)
#         .options(selectinload(Employee.bank_account))
#     )

#     if not emp:
#         raise HTTPException(status_code=404, detail="Employee not found")

#     # 🔹 Optional validation
#     if payload.employee_id and payload.employee_id != employee_id:
#         raise HTTPException(status_code=400, detail="employee_id mismatch")

#     # 🔹 Delete existing bank account if present
#     if emp.bank_account:
#         await db.delete(emp.bank_account)
#         await db.flush()

#     # 🔹 Create new bank account
#     acc = BankAccount(**payload.model_dump())
#     db.add(acc)
#     await db.commit()
#     await db.refresh(acc)

#     return acc




@router.post(
    "/{employee_id}/bank-account",
    response_model=BankAccountResponse,
    status_code=status.HTTP_201_CREATED,
)
async def set_bank_account(
    employee_id: str = Path(..., pattern=r"^EMP\d{3,}$"),
    payload: BankAccountCreate = Body(...),
    db: AsyncSession = Depends(get_db),
):
    employee_id = employee_id.upper()

    emp = await db.scalar(
        select(Employee)
        .where(Employee.employee_id == employee_id)
        .options(selectinload(Employee.bank_account))
    )

    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    # Delete existing bank account if present
    if emp.bank_account:
        await db.delete(emp.bank_account)
        await db.flush()

    # Create new bank account linked to employee.id
    acc = BankAccount(
        **payload.model_dump(),
        employee_id=emp.id  # 🔹 important
    )
    db.add(acc)
    await db.commit()
    await db.refresh(acc)

    return acc



@router.put(
    "/{employee_id}/bank-account",
    response_model=BankAccountResponse,
    status_code=status.HTTP_200_OK,
    summary="Update or create bank account by employee code",
    description="Updates the existing bank account of the employee identified by employee code (e.g., EMP001). If not found, creates a new one.",
)
async def update_bank_account(
    employee_id: str = Path(..., pattern=r"^EMP\d{3,}$", description="Employee code, e.g., EMP001"),
    payload: BankAccountUpdate = Body(...),
    db: AsyncSession = Depends(get_db),
):
    # Normalize employee code
    employee_id = employee_id.upper()

    # 🔹 Find employee by alphanumeric employee_id (EMP001, EMP002...)
    emp = await db.scalar(
        select(Employee)
        .where(Employee.employee_id == employee_id)
        .options(selectinload(Employee.bank_account))
    )

    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    # 🔹 Case 1: Employee already has a bank account → update only given fields
    if emp.bank_account:
        update_data = payload.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(emp.bank_account, field, value)
        emp.bank_account.updated_at = datetime.utcnow()

        db.add(emp.bank_account)
        await db.commit()
        await db.refresh(emp.bank_account)
        return emp.bank_account

    # 🔹 Case 2: No bank account found → create a new one
    acc = BankAccount(
        **payload.model_dump(exclude_unset=True),
        employee_id=emp.id
    )
    db.add(acc)
    await db.commit()
    await db.refresh(acc)
    return acc


# ---- Addresses (1:N) ----
@router.get("/{employee_id}/addresses", response_model=List[EmployeeAddressResponse])
async def list_addresses(employee_id: int, db: AsyncSession = Depends(get_db)):
    emp = await db.get(Employee, employee_id)
    if not emp:
        raise HTTPException(404, "Employee not found")
    return emp.addresses

# @router.post("/{employee_id}/addresses", response_model=EmployeeAddressResponse, status_code=201)
# async def add_address(employee_id: int, payload: EmployeeAddressCreate, db: AsyncSession = Depends(get_db)):
#     if payload.employee_id != employee_id:
#         raise HTTPException(400, "employee_id mismatch")
#     if not await db.get(Employee, employee_id):
#         raise HTTPException(404, "Employee not found")
#     addr = EmployeeAddress(**payload.model_dump())
#     db.add(addr)
#     await db.commit()
#     await db.refresh(addr)
#     return addr






@router.post(
    "/{employee_id}/addresses",
    response_model=EmployeeAddressResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Add an address for an employee",
    description="Adds a new address for the employee identified by alphanumeric employee code (e.g., EMP001)."
)
async def add_address(
    employee_id: str = Path(..., pattern=r"^EMP\d{3,}$", description="Alphanumeric Employee code, e.g., EMP001"),
    payload: EmployeeAddressCreate = None,
    db: AsyncSession = Depends(get_db)
):
    # 🔹 Reject numeric employee_id (enforced by path regex)
    if employee_id.isdigit():
        raise HTTPException(status_code=400, detail="Numeric employee_id not allowed, use alphanumeric code like EMP001")

    # 🔹 Find employee by alphanumeric code
    emp = await db.scalar(select(Employee).where(Employee.employee_id == employee_id))
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    # 🔹 Optional: ensure payload.employee_id matches DB numeric ID
    if payload.employee_id and payload.employee_id != emp.id:
        raise HTTPException(status_code=400, detail="employee_id mismatch")

    # 🔹 Create address
    addr = EmployeeAddress(
        **payload.model_dump(exclude={"employee_id"}),
        employee_id=emp.id
    )
    db.add(addr)
    await db.commit()
    await db.refresh(addr)

    return addr


@router.delete("/{employee_id}/addresses/{address_id}", status_code=204)
async def delete_address(employee_id: int, address_id: int, db: AsyncSession = Depends(get_db)):
    addr = await db.get(EmployeeAddress, address_id)
    if not addr or addr.employee_id != employee_id:
        raise HTTPException(404, "Address not found")
    await db.delete(addr)
    await db.commit()
    return None


