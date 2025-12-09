# app/crud/crm_ticket.py
from __future__ import annotations
from typing import Optional, Tuple, List
from datetime import datetime, date

from sqlalchemy import select, func, or_
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.models import SupportTicket, TicketComment, Lead, Employee, User
from app.schemas.schemas import (
    SupportTicketCreate,
    TicketCommentCreate,
)

class CRMTicketCRUD:
    # -----------------------
    # Helpers
    # -----------------------
    def _search_clause(self, q: Optional[str]):
        if not q:
            return None
        like = f"%{q}%"
        return or_(
            SupportTicket.ticket_number.ilike(like),
            SupportTicket.title.ilike(like),
            SupportTicket.description.ilike(like),
            SupportTicket.customer_name.ilike(like),
            SupportTicket.customer_email.ilike(like),
            SupportTicket.category.ilike(like),
            SupportTicket.subcategory.ilike(like),
            SupportTicket.resolution.ilike(like),
        )

    def _generate_ticket_number(self) -> str:
        # TCK-YYYYMMDD-HHMMSS-<microsecond hex 5>
        now = datetime.utcnow()
        base = now.strftime("TCK-%Y%m%d-%H%M%S")
        suffix = hex(now.microsecond)[2:].upper().rjust(5, "0")[:5]
        return f"{base}-{suffix}"

    # -----------------------
    # Tickets
    # -----------------------
    async def get_ticket(self, db: AsyncSession, ticket_id: int) -> Optional[SupportTicket]:
        return await db.get(SupportTicket, ticket_id)

    async def list_tickets(
        self,
        db: AsyncSession,
        *,
        q: Optional[str] = None,
        status: Optional[str] = None,
        priority: Optional[str] = None,
        customer_id: Optional[int] = None,
        assigned_to_employee_id: Optional[int] = None,
        created_from: Optional[date] = None,
        created_to: Optional[date] = None,
        order_by: str = "created_at",
        order_dir: str = "desc",
        skip: int = 0,
        limit: int = 50,
    ) -> Tuple[List[SupportTicket], int]:
        filters = []
        if status:
            filters.append(SupportTicket.status == status)
        if priority:
            filters.append(SupportTicket.priority == priority)
        if customer_id:
            filters.append(SupportTicket.customer_id == customer_id)
        if assigned_to_employee_id:
            filters.append(SupportTicket.assigned_to_employee_id == assigned_to_employee_id)
        if created_from:
            filters.append(func.date(SupportTicket.created_at) >= created_from)
        if created_to:
            filters.append(func.date(SupportTicket.created_at) <= created_to)

        sc = self._search_clause(q)
        if sc is not None:
            filters.append(sc)

        stmt = select(SupportTicket)
        count_stmt = select(func.count()).select_from(SupportTicket)
        for f in filters:
            stmt = stmt.where(f)
            count_stmt = count_stmt.where(f)

        order_map = {
            "created_at": SupportTicket.created_at,
            "updated_at": SupportTicket.updated_at,
            "priority": SupportTicket.priority,
            "status": SupportTicket.status,
        }
        order_col = order_map.get(order_by, SupportTicket.created_at)
        stmt = stmt.order_by(order_col.asc() if order_dir == "asc" else order_col.desc())
        stmt = stmt.offset(skip).limit(limit)

        total = (await db.execute(count_stmt)).scalar_one()
        res = await db.execute(stmt)
        rows = res.scalars().all()
        return rows, total

    async def create_ticket(self, db: AsyncSession, payload: SupportTicketCreate) -> SupportTicket:
        # optional validations
        if payload.customer_id:
            if not await db.get(Lead, payload.customer_id):
                raise ValueError("Customer (Lead) not found")
        if payload.assigned_to_employee_id:
            if not await db.get(Employee, payload.assigned_to_employee_id):
                raise ValueError("Assignee (Employee) not found")

        ticket = SupportTicket(
            ticket_number=self._generate_ticket_number(),
            title=payload.title,
            description=payload.description,
            customer_id=payload.customer_id,
            assigned_to_employee_id=payload.assigned_to_employee_id,
            customer_name=payload.customer_name,
            customer_email=payload.customer_email,
            priority=payload.priority,
            status=payload.status,
            category=payload.category,
            subcategory=payload.subcategory,
            resolution=payload.resolution,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        db.add(ticket)
        await db.commit()
        await db.refresh(ticket)
        return ticket

    async def update_ticket_full(
        self, db: AsyncSession, ticket: SupportTicket, payload: SupportTicketCreate
    ) -> SupportTicket:
        if payload.customer_id and not await db.get(Lead, payload.customer_id):
            raise ValueError("Customer (Lead) not found")
        if payload.assigned_to_employee_id and not await db.get(Employee, payload.assigned_to_employee_id):
            raise ValueError("Assignee (Employee) not found")

        for field in (
            "title", "description", "customer_id", "assigned_to_employee_id",
            "customer_name", "customer_email", "priority", "status",
            "category", "subcategory", "resolution"
        ):
            setattr(ticket, field, getattr(payload, field))

        ticket.updated_at = datetime.utcnow()
        await db.commit()
        await db.refresh(ticket)
        return ticket

    async def update_ticket_partial(
        self, db: AsyncSession, ticket: SupportTicket, patch_data: dict
    ) -> SupportTicket:
        if "customer_id" in patch_data and patch_data["customer_id"]:
            if not await db.get(Lead, patch_data["customer_id"]):
                raise ValueError("Customer (Lead) not found")
        if "assigned_to_employee_id" in patch_data and patch_data["assigned_to_employee_id"]:
            if not await db.get(Employee, patch_data["assigned_to_employee_id"]):
                raise ValueError("Assignee (Employee) not found")

        for k, v in patch_data.items():
            setattr(ticket, k, v)

        ticket.updated_at = datetime.utcnow()
        await db.commit()
        await db.refresh(ticket)
        return ticket

    async def delete_ticket(self, db: AsyncSession, ticket: SupportTicket) -> None:
        await db.delete(ticket)
        await db.commit()

    # -----------------------
    # Comments
    # -----------------------
    async def list_comments(
        self, db: AsyncSession, ticket_id: int, *, skip: int = 0, limit: int = 100
    ) -> List[TicketComment]:
        stmt = (
            select(TicketComment)
            .where(TicketComment.ticket_id == ticket_id)
            .order_by(TicketComment.created_at.asc())
            .offset(skip).limit(limit)
        )
        res = await db.execute(stmt)
        return res.scalars().all()

    async def add_comment(self, db: AsyncSession, payload: TicketCommentCreate) -> TicketComment:
        if not await db.get(SupportTicket, payload.ticket_id):
            raise ValueError("Ticket not found")
        if payload.author_id and not await db.get(User, payload.author_id):
            raise ValueError("Author (User) not found")

        cm = TicketComment(
            ticket_id=payload.ticket_id,
            author_id=payload.author_id,
            content=payload.content,
            is_internal=payload.is_internal,
            attachments=payload.attachments,
            created_at=datetime.utcnow(),
        )
        db.add(cm)
        await db.commit()
        await db.refresh(cm)
        return cm


crm_ticket = CRMTicketCRUD()
