from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import List
from datetime import date

from app.core.database import get_db
from app.models.models import Employee, AttendanceRecord, LeaveRequest, Task
from app.models.models import EmployeeStatus, LeaveStatus, AttendanceStatus
from app.schemas.schemas import ManagerTeamOverview, EmployeeResponse

router = APIRouter()


@router.get("", response_model=ManagerTeamOverview)
async def get_team_overview(
    manager_id: int = Query(..., description="Manager's employee ID"),
    db: AsyncSession = Depends(get_db)
):
    today = date.today()
    
    team_result = await db.execute(
        select(Employee).where(Employee.manager_id == manager_id)
    )
    team_members = team_result.scalars().all()
    team_ids = [e.id for e in team_members]
    
    team_size = len(team_members)
    
    present_today = 0
    if team_ids:
        present_result = await db.scalar(
            select(func.count(AttendanceRecord.id))
            .where(AttendanceRecord.employee_id.in_(team_ids))
            .where(AttendanceRecord.date == today)
            .where(AttendanceRecord.status == AttendanceStatus.present)
        )
        present_today = present_result or 0
    
    on_leave = 0
    if team_ids:
        leave_result = await db.scalar(
            select(func.count(LeaveRequest.id))
            .where(LeaveRequest.employee_id.in_(team_ids))
            .where(LeaveRequest.status == LeaveStatus.approved)
            .where(LeaveRequest.start_date <= today)
            .where(LeaveRequest.end_date >= today)
        )
        on_leave = leave_result or 0
    
    pending_leaves = 0
    if team_ids:
        pending_result = await db.scalar(
            select(func.count(LeaveRequest.id))
            .where(LeaveRequest.employee_id.in_(team_ids))
            .where(LeaveRequest.status == LeaveStatus.pending)
        )
        pending_leaves = pending_result or 0
    
    active_tasks = 0
    completed_tasks = 0
    if team_ids:
        active_result = await db.scalar(
            select(func.count(Task.id))
            .where(Task.assigned_to_id.in_(team_ids))
            .where(Task.status.in_(["pending", "in-progress"]))
        )
        active_tasks = active_result or 0
        
        completed_result = await db.scalar(
            select(func.count(Task.id))
            .where(Task.assigned_to_id.in_(team_ids))
            .where(Task.status == "completed")
        )
        completed_tasks = completed_result or 0
    
    return ManagerTeamOverview(
        team_size=team_size,
        present_today=present_today,
        on_leave=on_leave,
        pending_leave_requests=pending_leaves,
        active_tasks=active_tasks,
        completed_tasks=completed_tasks
    )


@router.get("/members", response_model=List[EmployeeResponse])
async def get_team_members(
    manager_id: int = Query(..., description="Manager's employee ID"),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Employee).where(Employee.manager_id == manager_id)
    )
    return result.scalars().all()
