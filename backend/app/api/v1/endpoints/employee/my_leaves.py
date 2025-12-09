from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional

from app.core.database import get_db
from app.models.models import LeaveRequest, LeaveBalance, LeaveStatus
from app.schemas.schemas import LeaveRequestCreate, LeaveRequestResponse

router = APIRouter()


@router.get("", response_model=List[LeaveRequestResponse])
async def get_my_leaves(
    employee_id: int = Query(..., description="Employee ID"),
    status: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(LeaveRequest).where(LeaveRequest.employee_id == employee_id)
    
    if status:
        query = query.where(LeaveRequest.status == status)
    
    query = query.order_by(LeaveRequest.created_at.desc())
    
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/balance")
async def get_leave_balance(
    employee_id: int = Query(..., description="Employee ID"),
    year: int = Query(None),
    db: AsyncSession = Depends(get_db)
):
    from datetime import date
    current_year = year or date.today().year
    
    result = await db.execute(
        select(LeaveBalance)
        .where(LeaveBalance.employee_id == employee_id)
        .where(LeaveBalance.year == current_year)
    )
    balances = result.scalars().all()
    
    return {
        "year": current_year,
        "balances": [
            {
                "leave_type": b.leave_type.value if b.leave_type else None,
                "total_days": b.total_days,
                "used_days": b.used_days,
                "remaining_days": b.total_days - b.used_days
            }
            for b in balances
        ]
    }


@router.post("", response_model=LeaveRequestResponse)
async def apply_leave(
    leave_data: LeaveRequestCreate,
    employee_id: int = Query(..., description="Employee ID"),
    db: AsyncSession = Depends(get_db)
):
    leave_request = LeaveRequest(
        **leave_data.model_dump(),
        employee_id=employee_id,
        status=LeaveStatus.pending
    )
    db.add(leave_request)
    await db.commit()
    await db.refresh(leave_request)
    
    return leave_request


@router.get("/{leave_id}", response_model=LeaveRequestResponse)
async def get_leave(
    leave_id: int,
    employee_id: int = Query(..., description="Employee ID"),
    db: AsyncSession = Depends(get_db)
):
    leave = await db.get(LeaveRequest, leave_id)
    
    if not leave:
        raise HTTPException(status_code=404, detail="Leave request not found")
    
    if leave.employee_id != employee_id:
        raise HTTPException(status_code=403, detail="Not authorized to view this leave")
    
    return leave


@router.delete("/{leave_id}")
async def cancel_leave(
    leave_id: int,
    employee_id: int = Query(..., description="Employee ID"),
    db: AsyncSession = Depends(get_db)
):
    leave = await db.get(LeaveRequest, leave_id)
    
    if not leave:
        raise HTTPException(status_code=404, detail="Leave request not found")
    
    if leave.employee_id != employee_id:
        raise HTTPException(status_code=403, detail="Not authorized to cancel this leave")
    
    if leave.status != LeaveStatus.pending:
        raise HTTPException(status_code=400, detail="Can only cancel pending leave requests")
    
    leave.status = LeaveStatus.cancelled
    await db.commit()
    
    return {"message": "Leave request cancelled"}
