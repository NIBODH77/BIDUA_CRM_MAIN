# app/crud/support_team.py
from __future__ import annotations
from typing import Optional, Tuple, List

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError


from app.models.models import SupportTeam, SupportTeamMember
from app.models.models import Employee  # to validate employee exists
from app.schemas.schemas import (
    SupportTeamCreate, SupportTeamUpdate,
    SupportTeamMemberCreate, SupportTeamMemberUpdate
)


# from app.models.support import SupportTeam, SupportTeamMember
# from app.models.models import Employee  # to validate employee exists
# from app.schemas.support import (
#     SupportTeamCreate, SupportTeamUpdate,
#     SupportTeamMemberCreate, SupportTeamMemberUpdate
# )


class CRUDSupportTeam:
    async def get(self, db: AsyncSession, id: int) -> Optional[SupportTeam]:
        return await db.get(SupportTeam, id)

    async def get_multi(
        self,
        db: AsyncSession,
        *,
        q: Optional[str] = None,
        is_active: Optional[bool] = None,
        skip: int = 0,
        limit: int = 50,
        order_by: str = "created_at",
        order_dir: str = "desc",
    ) -> Tuple[int, List[SupportTeam]]:
        stmt = select(SupportTeam)
        count_stmt = select(func.count()).select_from(SupportTeam)

        if q:
            like = f"%{q}%"
            stmt = stmt.where(SupportTeam.name.ilike(like))
            count_stmt = count_stmt.where(SupportTeam.name.ilike(like))
        if is_active is not None:
            stmt = stmt.where(SupportTeam.is_active == is_active)
            count_stmt = count_stmt.where(SupportTeam.is_active == is_active)

        order_map = {
            "created_at": SupportTeam.created_at,
            "updated_at": SupportTeam.updated_at,
            "name": SupportTeam.name,
            "is_active": SupportTeam.is_active,
        }
        col = order_map.get(order_by, SupportTeam.created_at)
        stmt = stmt.order_by(col.asc() if order_dir == "asc" else col.desc())
        stmt = stmt.offset(skip).limit(limit)

        total = (await db.execute(count_stmt)).scalar_one()
        res = await db.execute(stmt)
        items = res.scalars().all()
        return total, items

    async def create(self, db: AsyncSession, payload: SupportTeamCreate) -> SupportTeam:
        obj = SupportTeam(**payload.model_dump())
        db.add(obj)
        try:
            await db.commit()
        except IntegrityError:
            await db.rollback()
            raise
        await db.refresh(obj)
        return obj

    async def update(self, db: AsyncSession, *, obj: SupportTeam, payload: SupportTeamUpdate) -> SupportTeam:
        for k, v in payload.model_dump(exclude_unset=True).items():
            setattr(obj, k, v)
        try:
            await db.commit()
        except IntegrityError:
            await db.rollback()
            raise
        await db.refresh(obj)
        return obj

    async def remove(self, db: AsyncSession, *, id: int) -> None:
        obj = await self.get(db, id)
        if obj is None:
            return
        await db.delete(obj)
        await db.commit()


class CRUDSupportTeamMember:
    async def list_members(
        self,
        db: AsyncSession,
        *,
        team_id: int,
        active: Optional[bool] = None,
        skip: int = 0,
        limit: int = 100,
    ) -> Tuple[int, List[SupportTeamMember]]:
        stmt = select(SupportTeamMember).where(SupportTeamMember.team_id == team_id)
        count_stmt = select(func.count()).select_from(SupportTeamMember).where(SupportTeamMember.team_id == team_id)

        if active is not None:
            stmt = stmt.where(SupportTeamMember.active == active)
            count_stmt = count_stmt.where(SupportTeamMember.active == active)

        total = (await db.execute(count_stmt)).scalar_one()
        stmt = stmt.order_by(SupportTeamMember.added_at.desc()).offset(skip).limit(limit)
        res = await db.execute(stmt)
        items = res.scalars().all()
        return total, items

    async def add_member(self, db: AsyncSession, payload: SupportTeamMemberCreate) -> SupportTeamMember:
        # team exist?
        team = await db.get(SupportTeam, payload.team_id)
        if not team:
            raise ValueError("Support team not found")

        # employee exist?
        emp = await db.get(Employee, payload.employee_id)
        if not emp:
            raise ValueError("Employee not found")

        obj = SupportTeamMember(**payload.model_dump())
        db.add(obj)
        try:
            await db.commit()
        except IntegrityError:
            await db.rollback()
            # duplicate (team_id, employee_id) or FK issue
            raise
        await db.refresh(obj)
        return obj

    async def update_member(
        self,
        db: AsyncSession,
        *,
        team_id: int,
        employee_id: int,
        payload: SupportTeamMemberUpdate
    ) -> SupportTeamMember:
        # composite PK get (SQLAlchemy 2.0+ supports dict)
        obj = await db.get(SupportTeamMember, {"team_id": team_id, "employee_id": employee_id})
        if not obj:
            raise ValueError("Member not found")
        for k, v in payload.model_dump(exclude_unset=True).items():
            setattr(obj, k, v)
        await db.commit()
        await db.refresh(obj)
        return obj

    async def remove_member(self, db: AsyncSession, *, team_id: int, employee_id: int) -> None:
        obj = await db.get(SupportTeamMember, {"team_id": team_id, "employee_id": employee_id})
        if not obj:
            return
        await db.delete(obj)
        await db.commit()


support_team = CRUDSupportTeam()
support_team_member = CRUDSupportTeamMember()
