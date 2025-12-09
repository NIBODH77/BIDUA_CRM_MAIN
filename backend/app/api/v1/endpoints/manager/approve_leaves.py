from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from datetime import datetime

from app.core.database import get_db
from app.models.models import LeaveRequest, Employee, LeaveApproval, LeaveStatus
from app.schemas.schemas import LeaveRequestResponse

router = APIRouter()


@router.get("/pending", response_model=List[LeaveRequestResponse])
async def get_pending_leaves(
    manager_id: int = Query(..., description="Manager's employee ID"),
    db: AsyncSession = Depends(get_db)
):
    team_result = await db.execute(
        select(Employee.id).where(Employee.manager_id == manager_id)
    )
    team_ids = [row[0] for row in team_result.fetchall()]
    
    if not team_ids:
        return []
    
    result = await db.execute(
        select(LeaveRequest)
        .where(LeaveRequest.employee_id.in_(team_ids))
        .where(LeaveRequest.status == LeaveStatus.pending)
    )
    
    return result.scalars().all()


@router.post("/{leave_id}/approve")
async def approve_leave(
    leave_id: int,
    manager_id: int = Query(..., description="Manager's employee ID"),
    comments: str = Query(None),
    db: AsyncSession = Depends(get_db)
):
    leave_request = await db.get(LeaveRequest, leave_id)
    
    if not leave_request:
        raise HTTPException(status_code=404, detail="Leave request not found")
    
    employee = await db.get(Employee, leave_request.employee_id)
    if not employee or employee.manager_id != manager_id:
        raise HTTPException(status_code=403, detail="Not authorized to approve this leave")
    
    leave_request.status = LeaveStatus.approved
    
    approval = LeaveApproval(
        leave_request_id=leave_id,
        approver_id=manager_id,
        action="approved",
        comments=comments,
        action_at=datetime.utcnow()
    )
    db.add(approval)
    
    await db.commit()
    
    return {"message": "Leave approved successfully"}


@router.post("/{leave_id}/reject")
async def reject_leave(
    leave_id: int,
    manager_id: int = Query(..., description="Manager's employee ID"),
    comments: str = Query(..., description="Reason for rejection"),
    db: AsyncSession = Depends(get_db)
):
    leave_request = await db.get(LeaveRequest, leave_id)
    
    if not leave_request:
        raise HTTPException(status_code=404, detail="Leave request not found")
    
    employee = await db.get(Employee, leave_request.employee_id)
    if not employee or employee.manager_id != manager_id:
        raise HTTPException(status_code=403, detail="Not authorized to reject this leave")
    
    leave_request.status = LeaveStatus.rejected
    
    approval = LeaveApproval(
        leave_request_id=leave_id,
        approver_id=manager_id,
        action="rejected",
        comments=comments,
        action_at=datetime.utcnow()
    )
    db.add(approval)
    
    await db.commit()
    
    return {"message": "Leave rejected successfully"}
