from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from typing import List, Optional
from datetime import datetime

from app.core.database import get_db
from app.models.models import AuditLog, AuditLogAction
from app.schemas.schemas import AuditLogResponse

router = APIRouter()


@router.get("", response_model=List[AuditLogResponse])
async def get_audit_logs(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    user_id: Optional[int] = None,
    entity_type: Optional[str] = None,
    action: Optional[str] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(AuditLog).order_by(desc(AuditLog.created_at))
    
    if user_id:
        query = query.where(AuditLog.user_id == user_id)
    if entity_type:
        query = query.where(AuditLog.entity_type == entity_type)
    if action:
        query = query.where(AuditLog.action == action)
    if start_date:
        query = query.where(AuditLog.created_at >= start_date)
    if end_date:
        query = query.where(AuditLog.created_at <= end_date)
    
    query = query.offset(skip).limit(limit)
    result = await db.execute(query)
    
    return result.scalars().all()


@router.get("/{log_id}", response_model=AuditLogResponse)
async def get_audit_log(log_id: int, db: AsyncSession = Depends(get_db)):
    log = await db.get(AuditLog, log_id)
    
    if not log:
        raise HTTPException(status_code=404, detail="Audit log not found")
    
    return log


@router.get("/entity/{entity_type}/{entity_id}", response_model=List[AuditLogResponse])
async def get_entity_audit_logs(
    entity_type: str,
    entity_id: int,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(AuditLog)
        .where(AuditLog.entity_type == entity_type)
        .where(AuditLog.entity_id == entity_id)
        .order_by(desc(AuditLog.created_at))
    )
    
    return result.scalars().all()
