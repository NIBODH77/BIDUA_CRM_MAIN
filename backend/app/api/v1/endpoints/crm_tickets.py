# from typing import List, Optional
# from fastapi import APIRouter, Depends, HTTPException, Query, status
# from sqlalchemy.orm import Session
# from app.core.database import get_db
# from app.schemas.crm import TicketCreate, TicketUpdate, TicketOut, CommentCreate, CommentOut
# from app.crud import crm as crud

# router = APIRouter()

# @router.post("", response_model=TicketOut, status_code=status.HTTP_201_CREATED)
# def create_ticket(payload: TicketCreate, db: Session = Depends(get_db)):
#     return crud.create_ticket(db, payload)

# @router.get("/{ticket_id}", response_model=TicketOut)
# def get_ticket(ticket_id: int, db: Session = Depends(get_db)):
#     t = crud.get_ticket(db, ticket_id)
#     if not t: raise HTTPException(404, "Ticket not found")
#     return t

# @router.patch("/{ticket_id}", response_model=TicketOut)
# def update_ticket(ticket_id: int, payload: TicketUpdate, db: Session = Depends(get_db)):
#     t = crud.get_ticket(db, ticket_id)
#     if not t: raise HTTPException(404, "Ticket not found")
#     return crud.update_ticket(db, t, payload)

# @router.get("", response_model=List[TicketOut])
# def list_tickets(
#     db: Session = Depends(get_db),
#     q: Optional[str] = None,
#     status: Optional[str] = None,
#     priority: Optional[str] = None,
#     assigned_to: Optional[int] = Query(None),
#     skip: int = Query(0, ge=0),
#     limit: int = Query(20, ge=1, le=200),
# ):
#     rows, _ = crud.list_tickets(db, q, status, priority, assigned_to, skip, limit)
#     return rows

# # comments
# @router.post("/{ticket_id}/comments", response_model=CommentOut, status_code=status.HTTP_201_CREATED)
# def add_comment(ticket_id: int, payload: CommentCreate, db: Session = Depends(get_db)):
#     if payload.ticket_id != ticket_id:
#         raise HTTPException(400, "ticket_id mismatch")
#     return crud.add_comment(db, payload)

# @router.get("/{ticket_id}/comments", response_model=List[CommentOut])
# def list_comments(ticket_id: int, db: Session = Depends(get_db)):
#     return crud.list_comments(db, ticket_id)




from __future__ import annotations

from typing import List, Optional
from datetime import datetime, date

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select, or_, and_, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.models import SupportTicket, TicketComment, Lead, Employee, User
from app.schemas.schemas import (
    SupportTicketCreate,
    SupportTicketResponse,
    TicketCommentCreate,
    TicketCommentResponse,
)

router = APIRouter()


# -------------------------------
# Helpers
# -------------------------------
def _search_clause(term: Optional[str]):
    if not term:
        return None
    like = f"%{term}%"
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


def _generate_ticket_number() -> str:
    # Example: TCK-20251006-134523-XYZ (time-based + short hash)
    now = datetime.utcnow()
    base = now.strftime("TCK-%Y%m%d-%H%M%S")
    # short random-ish suffix from microseconds
    suffix = hex(now.microsecond)[2:].upper().rjust(5, "0")[:5]
    return f"{base}-{suffix}"


# -------------------------------
# List Tickets (with filters)
# -------------------------------
@router.get("/", response_model=List[SupportTicketResponse])
async def list_tickets(
    *,
    db: AsyncSession = Depends(get_db),
    q: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    priority: Optional[str] = Query(None),
    customer_id: Optional[int] = Query(None),
    assigned_to_employee_id: Optional[int] = Query(None),
    created_from: Optional[date] = Query(None),
    created_to: Optional[date] = Query(None),
    order_by: Optional[str] = Query("created_at", description="created_at|updated_at|priority|status"),
    order_dir: Optional[str] = Query("desc", description="asc|desc"),
    skip: int = 0,
    limit: int = 50,
):
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

    search_clause = _search_clause(q)
    if search_clause is not None:
        filters.append(search_clause)

    stmt = select(SupportTicket).where(and_(*filters)) if filters else select(SupportTicket)

    order_map = {
        "created_at": SupportTicket.created_at,
        "updated_at": SupportTicket.updated_at,
        "priority": SupportTicket.priority,
        "status": SupportTicket.status,
    }
    order_col = order_map.get(order_by, SupportTicket.created_at)
    stmt = stmt.order_by(order_col.asc() if order_dir == "asc" else order_col.desc())
    stmt = stmt.offset(skip).limit(limit)

    result = await db.execute(stmt)
    return result.scalars().all()


# -------------------------------
# Get Ticket
# -------------------------------
@router.get("/{ticket_id}", response_model=SupportTicketResponse)
async def get_ticket(
    *,
    db: AsyncSession = Depends(get_db),
    ticket_id: int,
):
    ticket = await db.get(SupportTicket, ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket


# -------------------------------
# Create Ticket
# -------------------------------
@router.post("/", response_model=SupportTicketResponse, status_code=status.HTTP_201_CREATED)
async def create_ticket(
    *,
    db: AsyncSession = Depends(get_db),
    payload: SupportTicketCreate,
):
    # Optional validations
    if payload.customer_id:
        if not await db.get(Lead, payload.customer_id):
            raise HTTPException(status_code=404, detail="Customer (Lead) not found")
    if payload.assigned_to_employee_id:
        if not await db.get(Employee, payload.assigned_to_employee_id):
            raise HTTPException(status_code=404, detail="Assignee (Employee) not found")

    ticket = SupportTicket(
        ticket_number=_generate_ticket_number(),
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


# -------------------------------
# Update Ticket (PUT)
# -------------------------------
@router.put("/{ticket_id}", response_model=SupportTicketResponse)
async def update_ticket(
    *,
    db: AsyncSession = Depends(get_db),
    ticket_id: int,
    payload: SupportTicketCreate,  # For full replacement. Add TicketUpdate below for partials.
):
    ticket = await db.get(SupportTicket, ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    if payload.customer_id and not await db.get(Lead, payload.customer_id):
        raise HTTPException(status_code=404, detail="Customer (Lead) not found")
    if payload.assigned_to_employee_id and not await db.get(Employee, payload.assigned_to_employee_id):
        raise HTTPException(status_code=404, detail="Assignee (Employee) not found")

    for field in (
        "title", "description", "customer_id", "assigned_to_employee_id", "customer_name", "customer_email",
        "priority", "status", "category", "subcategory", "resolution"
    ):
        setattr(ticket, field, getattr(payload, field))

    ticket.updated_at = datetime.utcnow()
    await db.commit()
    await db.refresh(ticket)
    return ticket


# -------------------------------
# Patch Ticket (partial)
# -------------------------------
from pydantic import BaseModel, EmailStr

class TicketUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    customer_id: Optional[int] = None
    assigned_to_employee_id: Optional[int] = None
    customer_name: Optional[str] = None
    customer_email: Optional[EmailStr] = None
    priority: Optional[str] = None
    status: Optional[str] = None
    category: Optional[str] = None
    subcategory: Optional[str] = None
    resolution: Optional[str] = None



@router.patch("/{ticket_id}", response_model=SupportTicketResponse)
async def patch_ticket(
    *,
    db: AsyncSession = Depends(get_db),
    ticket_id: int,
    payload: TicketUpdate,
):
    ticket = await db.get(SupportTicket, ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    upd = payload.model_dump(exclude_unset=True)

    # validations if ids present
    if "customer_id" in upd and upd["customer_id"]:
        if not await db.get(Lead, upd["customer_id"]):
            raise HTTPException(status_code=404, detail="Customer (Lead) not found")
    if "assigned_to_employee_id" in upd and upd["assigned_to_employee_id"]:
        if not await db.get(Employee, upd["assigned_to_employee_id"]):
            raise HTTPException(status_code=404, detail="Assignee (Employee) not found")

    for k, v in upd.items():
        setattr(ticket, k, v)

    ticket.updated_at = datetime.utcnow()
    await db.commit()
    await db.refresh(ticket)
    return ticket




# -------------------------------
# Delete Ticket
# -------------------------------
@router.delete("/{ticket_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_ticket(
    *,
    db: AsyncSession = Depends(get_db),
    ticket_id: int,
):
    ticket = await db.get(SupportTicket, ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    await db.delete(ticket)
    await db.commit()
    return None


# -------------------------------
# Ticket Comments (sub-resource)
# -------------------------------
@router.get("/{ticket_id}/comments", response_model=List[TicketCommentResponse])
async def list_ticket_comments(
    *,
    db: AsyncSession = Depends(get_db),
    ticket_id: int,
    skip: int = 0,
    limit: int = 100,
):
    if not await db.get(SupportTicket, ticket_id):
        raise HTTPException(status_code=404, detail="Ticket not found")

    stmt = (
        select(TicketComment)
        .where(TicketComment.ticket_id == ticket_id)
        .order_by(TicketComment.created_at.asc())
        .offset(skip).limit(limit)
    )
    result = await db.execute(stmt)
    return result.scalars().all()


@router.post("/{ticket_id}/comments", response_model=TicketCommentResponse, status_code=status.HTTP_201_CREATED)
async def add_ticket_comment(
    *,
    db: AsyncSession = Depends(get_db),
    ticket_id: int,
    payload: TicketCommentCreate,
):
    # safety: path/body alignment
    if payload.ticket_id != ticket_id:
        raise HTTPException(status_code=400, detail="ticket_id mismatch in path and body")

    if not await db.get(SupportTicket, ticket_id):
        raise HTTPException(status_code=404, detail="Ticket not found")

    # Optional: validate author exists (User model)
    if payload.author_id and not await db.get(User, payload.author_id):
        raise HTTPException(status_code=404, detail="Author (User) not found")

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
