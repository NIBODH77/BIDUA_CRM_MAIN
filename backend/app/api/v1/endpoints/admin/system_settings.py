from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List

from app.core.database import get_db
from app.models.models import SystemSettings
from app.schemas.schemas import SystemSettingsCreate, SystemSettingsUpdate, SystemSettingsResponse

router = APIRouter()


@router.get("", response_model=List[SystemSettingsResponse])
async def get_all_settings(
    category: str = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(SystemSettings)
    if category:
        query = query.where(SystemSettings.category == category)
    
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/{key}", response_model=SystemSettingsResponse)
async def get_setting(key: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(SystemSettings).where(SystemSettings.key == key)
    )
    setting = result.scalar_one_or_none()
    
    if not setting:
        raise HTTPException(status_code=404, detail="Setting not found")
    
    return setting


@router.post("", response_model=SystemSettingsResponse)
async def create_setting(
    setting_data: SystemSettingsCreate,
    db: AsyncSession = Depends(get_db)
):
    existing = await db.execute(
        select(SystemSettings).where(SystemSettings.key == setting_data.key)
    )
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Setting with this key already exists")
    
    setting = SystemSettings(**setting_data.model_dump())
    db.add(setting)
    await db.commit()
    await db.refresh(setting)
    
    return setting


@router.put("/{key}", response_model=SystemSettingsResponse)
async def update_setting(
    key: str,
    setting_data: SystemSettingsUpdate,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(SystemSettings).where(SystemSettings.key == key)
    )
    setting = result.scalar_one_or_none()
    
    if not setting:
        raise HTTPException(status_code=404, detail="Setting not found")
    
    update_data = setting_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(setting, field, value)
    
    await db.commit()
    await db.refresh(setting)
    
    return setting


@router.delete("/{key}")
async def delete_setting(key: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(SystemSettings).where(SystemSettings.key == key)
    )
    setting = result.scalar_one_or_none()
    
    if not setting:
        raise HTTPException(status_code=404, detail="Setting not found")
    
    await db.delete(setting)
    await db.commit()
    
    return {"message": "Setting deleted successfully"}
