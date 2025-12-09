from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional
from datetime import date

from app.core.database import get_db
from app.models.models import Task, Employee
from app.schemas.schemas import TaskCreate, TaskUpdate, TaskResponse

router = APIRouter()


@router.get("", response_model=List[TaskResponse])
async def get_team_tasks(
    manager_id: int = Query(..., description="Manager's employee ID"),
    status: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    team_result = await db.execute(
        select(Employee.id).where(Employee.manager_id == manager_id)
    )
    team_ids = [row[0] for row in team_result.fetchall()]
    
    if not team_ids:
        return []
    
    query = select(Task).where(Task.assigned_to_id.in_(team_ids))
    
    if status:
        query = query.where(Task.status == status)
    
    result = await db.execute(query)
    return result.scalars().all()


@router.post("", response_model=TaskResponse)
async def create_task(
    task_data: TaskCreate,
    manager_id: int = Query(..., description="Manager's employee ID"),
    db: AsyncSession = Depends(get_db)
):
    if task_data.assigned_to_id:
        employee = await db.get(Employee, task_data.assigned_to_id)
        if not employee:
            raise HTTPException(status_code=404, detail="Assigned employee not found")
        if employee.manager_id != manager_id:
            raise HTTPException(status_code=403, detail="Can only assign tasks to your team members")
    
    task = Task(
        **task_data.model_dump(),
        assigned_by_id=manager_id,
        status="pending"
    )
    db.add(task)
    await db.commit()
    await db.refresh(task)
    
    return task


@router.put("/{task_id}", response_model=TaskResponse)
async def update_task(
    task_id: int,
    task_data: TaskUpdate,
    manager_id: int = Query(..., description="Manager's employee ID"),
    db: AsyncSession = Depends(get_db)
):
    task = await db.get(Task, task_id)
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    if task.assigned_by_id != manager_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this task")
    
    update_data = task_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(task, field, value)
    
    await db.commit()
    await db.refresh(task)
    
    return task


@router.post("/{task_id}/reassign")
async def reassign_task(
    task_id: int,
    new_assignee_id: int,
    manager_id: int = Query(..., description="Manager's employee ID"),
    db: AsyncSession = Depends(get_db)
):
    task = await db.get(Task, task_id)
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    new_employee = await db.get(Employee, new_assignee_id)
    if not new_employee or new_employee.manager_id != manager_id:
        raise HTTPException(status_code=403, detail="Can only reassign to your team members")
    
    task.assigned_to_id = new_assignee_id
    await db.commit()
    
    return {"message": "Task reassigned successfully"}
