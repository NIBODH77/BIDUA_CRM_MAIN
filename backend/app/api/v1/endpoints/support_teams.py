# app/api/v1/endpoints/support_teams.py
from __future__ import annotations
from typing import Any, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status, Response
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.crud.support_teams import support_team, support_team_member

from app.schemas.schemas import (
    SupportTeamCreate, SupportTeamUpdate, SupportTeamRead, SupportTeamPage,
    SupportTeamMemberCreate, SupportTeamMemberUpdate, SupportTeamMemberRead, SupportTeamMemberPage
)


# from app.schemas.support import (
#     SupportTeamCreate, SupportTeamUpdate, SupportTeamRead, SupportTeamPage,
#     SupportTeamMemberCreate, SupportTeamMemberUpdate, SupportTeamMemberRead, SupportTeamMemberPage
# )

router = APIRouter()

# ---------- Teams ----------

@router.get("", response_model=SupportTeamPage, summary="List support teams")
async def list_teams(
    db: AsyncSession = Depends(get_db),
    q: Optional[str] = Query(None),
    is_active: Optional[bool] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    order_by: str = Query("created_at", pattern="^(created_at|updated_at|name|is_active)$"),
    order_dir: str = Query("desc", pattern="^(asc|desc)$"),
) -> Any:
    total, items = await support_team.get_multi(
        db, q=q, is_active=is_active, skip=skip, limit=limit, order_by=order_by, order_dir=order_dir
    )
    return SupportTeamPage(total=total, items=items, skip=skip, limit=limit)


@router.post("", response_model=SupportTeamRead, status_code=status.HTTP_201_CREATED, summary="Create support team")
async def create_team(
    payload: SupportTeamCreate,
    db: AsyncSession = Depends(get_db),
) -> Any:
    try:
        obj = await support_team.create(db, payload)
    except Exception:
        raise HTTPException(status_code=409, detail="Team with same name already exists")
    return obj


@router.get("/{team_id}", response_model=SupportTeamRead, summary="Get support team")
async def get_team(team_id: int, db: AsyncSession = Depends(get_db)) -> Any:
    obj = await support_team.get(db, team_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Support team not found")
    return obj


@router.put("/{team_id}", response_model=SupportTeamRead, summary="Update support team")
async def update_team(
    team_id: int,
    payload: SupportTeamUpdate,
    db: AsyncSession = Depends(get_db),
) -> Any:
    obj = await support_team.get(db, team_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Support team not found")
    try:
        obj = await support_team.update(db, obj=obj, payload=payload)
    except Exception:
        raise HTTPException(status_code=409, detail="Team name conflict")
    return obj


@router.delete(
    "/{team_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    response_class=Response,  # 204 पर body नहीं
    summary="Delete support team",
)
async def delete_team(team_id: int, db: AsyncSession = Depends(get_db)) -> None:
    obj = await support_team.get(db, team_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Support team not found")
    await support_team.remove(db, id=team_id)
    return None


# ---------- Team Members (nested) ----------

@router.get(
    "/{team_id}/members",
    response_model=SupportTeamMemberPage,
    summary="List team members"
)
async def list_team_members(
    team_id: int,
    db: AsyncSession = Depends(get_db),
    active: Optional[bool] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
) -> Any:
    if not await support_team.get(db, team_id):
        raise HTTPException(status_code=404, detail="Support team not found")

    total, items = await support_team_member.list_members(
        db, team_id=team_id, active=active, skip=skip, limit=limit
    )
    return SupportTeamMemberPage(total=total, items=items, skip=skip, limit=limit)


@router.post(
    "/{team_id}/members",
    response_model=SupportTeamMemberRead,
    status_code=status.HTTP_201_CREATED,
    summary="Add member to team",
)
async def add_member_to_team(
    team_id: int,
    payload: SupportTeamMemberCreate,
    db: AsyncSession = Depends(get_db),
) -> Any:
    if payload.team_id != team_id:
        raise HTTPException(status_code=400, detail="team_id mismatch in path and body")
    try:
        obj = await support_team_member.add_member(db, payload)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception:
        raise HTTPException(status_code=409, detail="Member already exists in team")
    return obj


@router.patch(
    "/{team_id}/members/{employee_id}",
    response_model=SupportTeamMemberRead,
    summary="Update team member",
)
async def update_member_in_team(
    team_id: int,
    employee_id: int,
    payload: SupportTeamMemberUpdate,
    db: AsyncSession = Depends(get_db),
) -> Any:
    try:
        obj = await support_team_member.update_member(
            db, team_id=team_id, employee_id=employee_id, payload=payload
        )
    except ValueError:
        raise HTTPException(status_code=404, detail="Member not found")
    return obj


@router.delete(
    "/{team_id}/members/{employee_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    response_class=Response,  # 204 पर body नहीं
    summary="Remove team member",
)
async def remove_member_from_team(
    team_id: int,
    employee_id: int,
    db: AsyncSession = Depends(get_db),
) -> None:
    await support_team_member.remove_member(db, team_id=team_id, employee_id=employee_id)
    return None
