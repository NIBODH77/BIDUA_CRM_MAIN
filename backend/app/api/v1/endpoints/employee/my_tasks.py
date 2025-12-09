from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional
from datetime import datetime

from app.core.database import get_db
from app.models.models import Task, TaskTimeEntry
from app.schemas.schemas import TaskResponse, TaskUpdate

router = APIRouter()


@router.get("", response_model=List[TaskResponse])
async def get_my_tasks(
    employee_id: int = Query(..., description="Employee ID"),
    status: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(Task).where(Task.assigned_to_id == employee_id)
    
    if status:
        query = query.where(Task.status == status)
    
    query = query.order_by(Task.due_date.asc())
    
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/{task_id}", response_model=TaskResponse)
async def get_task(
    task_id: int,
    employee_id: int = Query(..., description="Employee ID"),
    db: AsyncSession = Depends(get_db)
):
    task = await db.get(Task, task_id)
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    if task.assigned_to_id != employee_id:
        raise HTTPException(status_code=403, detail="Not authorized to view this task")
    
    return task


@router.put("/{task_id}/status")
async def update_task_status(
    task_id: int,
    status: str = Query(..., description="New status"),
    employee_id: int = Query(..., description="Employee ID"),
    db: AsyncSession = Depends(get_db)
):
    task = await db.get(Task, task_id)
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    if task.assigned_to_id != employee_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this task")
    
    task.status = status
    if status == "completed":
        task.completed_at = datetime.utcnow()
    
    await db.commit()
    
    return {"message": f"Task status updated to {status}"}


@router.put("/{task_id}/progress")
async def update_task_progress(
    task_id: int,
    progress: int = Query(..., ge=0, le=100, description="Progress percentage"),
    employee_id: int = Query(..., description="Employee ID"),
    db: AsyncSession = Depends(get_db)
):
    task = await db.get(Task, task_id)
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    if task.assigned_to_id != employee_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this task")
    
    task.progress = progress
    if progress == 100:
        task.status = "completed"
        task.completed_at = datetime.utcnow()
    
    await db.commit()
    
    return {"message": f"Task progress updated to {progress}%"}


@router.post("/{task_id}/log-time")
async def log_time(
    task_id: int,
    hours: float = Query(..., gt=0, description="Hours worked"),
    description: str = Query(None),
    employee_id: int = Query(..., description="Employee ID"),
    db: AsyncSession = Depends(get_db)
):
    task = await db.get(Task, task_id)
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    if task.assigned_to_id != employee_id:
        raise HTTPException(status_code=403, detail="Not authorized to log time on this task")
    
    time_entry = TaskTimeEntry(
        task_id=task_id,
        employee_id=employee_id,
        hours_spent=hours,
        description=description
    )
    db.add(time_entry)
    await db.commit()
    
    return {"message": f"Logged {hours} hours on task"}
