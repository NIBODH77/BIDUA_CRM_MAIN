from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, update
from typing import List, Optional
from datetime import datetime

from app.core.database import get_db
from app.models.models import Notification
from app.schemas.schemas import NotificationResponse

router = APIRouter()


@router.get("", response_model=List[NotificationResponse])
async def get_notifications(
    employee_id: int = Query(..., description="Employee ID"),
    unread_only: bool = False,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: AsyncSession = Depends(get_db)
):
    from app.models.models import Employee
    
    employee = await db.get(Employee, employee_id)
    if not employee or not employee.user_id:
        raise HTTPException(status_code=404, detail="Employee not found or not linked to user")
    
    query = select(Notification).where(Notification.user_id == employee.user_id)
    
    if unread_only:
        query = query.where(Notification.is_read == False)
    
    query = query.order_by(Notification.created_at.desc()).offset(skip).limit(limit)
    
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/unread-count")
async def get_unread_count(
    employee_id: int = Query(..., description="Employee ID"),
    db: AsyncSession = Depends(get_db)
):
    from app.models.models import Employee
    
    employee = await db.get(Employee, employee_id)
    if not employee or not employee.user_id:
        raise HTTPException(status_code=404, detail="Employee not found or not linked to user")
    
    count = await db.scalar(
        select(func.count(Notification.id))
        .where(Notification.user_id == employee.user_id)
        .where(Notification.is_read == False)
    )
    
    return {"unread_count": count or 0}


@router.put("/{notification_id}/read")
async def mark_as_read(
    notification_id: int,
    employee_id: int = Query(..., description="Employee ID"),
    db: AsyncSession = Depends(get_db)
):
    from app.models.models import Employee
    
    employee = await db.get(Employee, employee_id)
    if not employee or not employee.user_id:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    notification = await db.get(Notification, notification_id)
    
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    
    if notification.user_id != employee.user_id:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    notification.is_read = True
    notification.read_at = datetime.utcnow()
    await db.commit()
    
    return {"message": "Notification marked as read"}


@router.put("/mark-all-read")
async def mark_all_as_read(
    employee_id: int = Query(..., description="Employee ID"),
    db: AsyncSession = Depends(get_db)
):
    from app.models.models import Employee
    
    employee = await db.get(Employee, employee_id)
    if not employee or not employee.user_id:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    await db.execute(
        update(Notification)
        .where(Notification.user_id == employee.user_id)
        .where(Notification.is_read == False)
        .values(is_read=True, read_at=datetime.utcnow())
    )
    await db.commit()
    
    return {"message": "All notifications marked as read"}


@router.delete("/{notification_id}")
async def delete_notification(
    notification_id: int,
    employee_id: int = Query(..., description="Employee ID"),
    db: AsyncSession = Depends(get_db)
):
    from app.models.models import Employee
    
    employee = await db.get(Employee, employee_id)
    if not employee or not employee.user_id:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    notification = await db.get(Notification, notification_id)
    
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    
    if notification.user_id != employee.user_id:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    await db.delete(notification)
    await db.commit()
    
    return {"message": "Notification deleted"}
