from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from typing import List

from app.core.database import get_db
from app.models.models import User
from app.schemas.schemas import BulkUserAction, BulkActionResponse

router = APIRouter()


@router.post("", response_model=BulkActionResponse)
async def perform_bulk_action(
    action_request: BulkUserAction,
    db: AsyncSession = Depends(get_db)
):
    failed_ids = []
    affected_count = 0
    
    if action_request.action == "activate":
        stmt = (
            update(User)
            .where(User.id.in_(action_request.user_ids))
            .values(is_active=True)
        )
        result = await db.execute(stmt)
        affected_count = result.rowcount
        
    elif action_request.action == "deactivate":
        stmt = (
            update(User)
            .where(User.id.in_(action_request.user_ids))
            .values(is_active=False)
        )
        result = await db.execute(stmt)
        affected_count = result.rowcount
        
    elif action_request.action == "change_role":
        if not action_request.params or "role" not in action_request.params:
            raise HTTPException(status_code=400, detail="Role parameter required")
        
        stmt = (
            update(User)
            .where(User.id.in_(action_request.user_ids))
            .values(role=action_request.params["role"])
        )
        result = await db.execute(stmt)
        affected_count = result.rowcount
        
    elif action_request.action == "delete":
        for user_id in action_request.user_ids:
            user = await db.get(User, user_id)
            if user:
                await db.delete(user)
                affected_count += 1
            else:
                failed_ids.append(user_id)
    else:
        raise HTTPException(status_code=400, detail=f"Unknown action: {action_request.action}")
    
    await db.commit()
    
    return BulkActionResponse(
        success=len(failed_ids) == 0,
        affected_count=affected_count,
        message=f"Successfully performed {action_request.action} on {affected_count} users",
        failed_ids=failed_ids
    )
