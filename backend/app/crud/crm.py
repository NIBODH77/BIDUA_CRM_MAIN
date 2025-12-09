# # app/crud/crm.py
# from typing import Optional, Tuple, List
# from sqlalchemy.orm import Session
# from sqlalchemy import select, func, desc, asc, and_, or_
# from datetime import date, datetime
# from app.models.models import Lead, LeadActivity, SupportTicket, TicketComment

# # --------- Leads ----------
# def create_lead(db: Session, data) -> Lead:
#     obj = Lead(**data.dict())
#     db.add(obj); db.commit(); db.refresh(obj)
#     return obj

# def get_lead(db: Session, lead_id: int) -> Optional[Lead]:
#     return db.get(Lead, lead_id)

# def update_lead(db: Session, lead: Lead, data) -> Lead:
#     for k, v in data.dict(exclude_unset=True).items(): setattr(lead, k, v)
#     db.add(lead); db.commit(); db.refresh(lead)
#     return lead

# def delete_lead(db: Session, lead: Lead) -> None:
#     db.delete(lead); db.commit()

# def list_leads(
#     db: Session,
#     q: Optional[str],
#     status: Optional[str],
#     stage: Optional[str],
#     owner_id: Optional[int],
#     min_value: Optional[float],
#     max_value: Optional[float],
#     next_from: Optional[date],
#     next_to: Optional[date],
#     order_by: str,
#     order_dir: str,
#     skip: int, limit: int,
# ) -> Tuple[List[Lead], int]:
#     stmt = select(Lead)
#     f = []
#     if q:
#         ilike = f"%{q}%"
#         f.append(or_(Lead.name.ilike(ilike), Lead.email.ilike(ilike), Lead.company.ilike(ilike)))
#     if status: f.append(Lead.status == status)
#     if stage: f.append(Lead.stage == stage)
#     if owner_id: f.append(Lead.assigned_to_employee_id == owner_id)
#     if min_value is not None: f.append(Lead.value >= min_value)
#     if max_value is not None: f.append(Lead.value <= max_value)
#     if next_from: f.append(Lead.next_follow_up >= next_from)
#     if next_to: f.append(Lead.next_follow_up <= next_to)
#     if f: stmt = stmt.where(and_(*f))

#     col = getattr(Lead, order_by, Lead.created_at)
#     stmt = stmt.order_by(desc(col) if order_dir == "desc" else asc(col))

#     total = db.execute(select(func.count()).select_from(stmt.subquery())).scalar_one()
#     rows = db.execute(stmt.offset(skip).limit(limit)).scalars().all()
#     return rows, total

# # --------- Activities ----------
# def create_activity(db: Session, data) -> LeadActivity:
#     obj = LeadActivity(**data.dict())
#     db.add(obj); db.commit(); db.refresh(obj)
#     return obj

# def list_activities_for_lead(db: Session, lead_id: int) -> List[LeadActivity]:
#     stmt = select(LeadActivity).where(LeadActivity.lead_id == lead_id).order_by(LeadActivity.scheduled_at.desc())
#     return db.execute(stmt).scalars().all()

# # --------- Tickets ----------
# def create_ticket(db: Session, data) -> SupportTicket:
#     # simple ticket number generator; customize as needed
#     prefix = datetime.utcnow().strftime("T%y%m%d")
#     seq = db.execute(select(func.coalesce(func.max(SupportTicket.id), 0) + 1)).scalar_one()
#     ticket_number = f"{prefix}-{seq:06d}"
#     obj = SupportTicket(ticket_number=ticket_number, **data.dict())
#     db.add(obj); db.commit(); db.refresh(obj)
#     return obj

# def get_ticket(db: Session, ticket_id: int) -> Optional[SupportTicket]:
#     return db.get(SupportTicket, ticket_id)

# def update_ticket(db: Session, ticket: SupportTicket, data) -> SupportTicket:
#     for k, v in data.dict(exclude_unset=True).items(): setattr(ticket, k, v)
#     db.add(ticket); db.commit(); db.refresh(ticket)
#     return ticket

# def list_tickets(db: Session, q: Optional[str], status: Optional[str], priority: Optional[str],
#                  owner_id: Optional[int], skip: int, limit: int):
#     stmt = select(SupportTicket)
#     f = []
#     if q:
#         ilike = f"%{q}%"
#         f.append(or_(SupportTicket.title.ilike(ilike), SupportTicket.description.ilike(ilike)))
#     if status: f.append(SupportTicket.status == status)
#     if priority: f.append(SupportTicket.priority == priority)
#     if owner_id: f.append(SupportTicket.assigned_to_employee_id == owner_id)
#     if f: stmt = stmt.where(and_(*f))
#     stmt = stmt.order_by(SupportTicket.created_at.desc())
#     total = db.execute(select(func.count()).select_from(stmt.subquery())).scalar_one()
#     rows = db.execute(stmt.offset(skip).limit(limit)).scalars().all()
#     return rows, total

# # --------- Comments ----------
# def add_comment(db: Session, data) -> TicketComment:
#     obj = TicketComment(**data.dict())
#     db.add(obj); db.commit(); db.refresh(obj)
#     return obj

# def list_comments(db: Session, ticket_id: int) -> List[TicketComment]:
#     stmt = select(TicketComment).where(TicketComment.ticket_id == ticket_id).order_by(TicketComment.created_at.asc())
#     return db.execute(stmt).scalars().all()




from typing import Optional, Tuple, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, desc, asc, and_, or_
from datetime import date, datetime
from app.models.models import Lead, LeadActivity, SupportTicket, TicketComment

# --------- Leads ----------
async def create_lead(db: AsyncSession, data) -> Lead:
    obj = Lead(**data.dict())
    db.add(obj)
    await db.commit()
    await db.refresh(obj)
    return obj

async def get_lead(db: AsyncSession, lead_id: int) -> Optional[Lead]:
    return await db.get(Lead, lead_id)

async def update_lead(db: AsyncSession, lead: Lead, data) -> Lead:
    for k, v in data.dict(exclude_unset=True).items():
        setattr(lead, k, v)
    db.add(lead)
    await db.commit()
    await db.refresh(lead)
    return lead

async def delete_lead(db: AsyncSession, lead: Lead) -> None:
    await db.delete(lead)
    await db.commit()

async def list_leads(
    db: AsyncSession,
    q: Optional[str],
    status: Optional[str],
    stage: Optional[str],
    owner_id: Optional[int],
    min_value: Optional[float],
    max_value: Optional[float],
    next_from: Optional[date],
    next_to: Optional[date],
    order_by: str,
    order_dir: str,
    skip: int, limit: int,
) -> Tuple[List[Lead], int]:
    stmt = select(Lead)
    f = []
    if q:
        ilike = f"%{q}%"
        f.append(or_(Lead.name.ilike(ilike), Lead.email.ilike(ilike), Lead.company.ilike(ilike)))
    if status: f.append(Lead.status == status)
    if stage: f.append(Lead.stage == stage)
    if owner_id: f.append(Lead.assigned_to_employee_id == owner_id)
    if min_value is not None: f.append(Lead.value >= min_value)
    if max_value is not None: f.append(Lead.value <= max_value)
    if next_from: f.append(Lead.next_follow_up >= next_from)
    if next_to: f.append(Lead.next_follow_up <= next_to)
    if f: stmt = stmt.where(and_(*f))

    col = getattr(Lead, order_by, Lead.created_at)
    stmt = stmt.order_by(desc(col) if order_dir == "desc" else asc(col))

    total_result = await db.execute(select(func.count()).select_from(stmt.subquery()))
    total = total_result.scalar_one()
    rows_result = await db.execute(stmt.offset(skip).limit(limit))
    rows = rows_result.scalars().all()
    return rows, total

# --------- Activities ----------
async def create_activity(db: AsyncSession, data) -> LeadActivity:
    obj = LeadActivity(**data.dict())
    db.add(obj)
    await db.commit()
    await db.refresh(obj)
    return obj

async def list_activities_for_lead(db: AsyncSession, lead_id: int) -> List[LeadActivity]:
    stmt = select(LeadActivity).where(LeadActivity.lead_id == lead_id).order_by(LeadActivity.scheduled_at.desc())
    result = await db.execute(stmt)
    return result.scalars().all()

# --------- Tickets ----------
async def create_ticket(db: AsyncSession, data) -> SupportTicket:
    prefix = datetime.utcnow().strftime("T%y%m%d")
    seq_result = await db.execute(select(func.coalesce(func.max(SupportTicket.id), 0) + 1))
    seq = seq_result.scalar_one()
    ticket_number = f"{prefix}-{seq:06d}"
    obj = SupportTicket(ticket_number=ticket_number, **data.dict())
    db.add(obj)
    await db.commit()
    await db.refresh(obj)
    return obj

async def get_ticket(db: AsyncSession, ticket_id: int) -> Optional[SupportTicket]:
    return await db.get(SupportTicket, ticket_id)

async def update_ticket(db: AsyncSession, ticket: SupportTicket, data) -> SupportTicket:
    for k, v in data.dict(exclude_unset=True).items():
        setattr(ticket, k, v)
    db.add(ticket)
    await db.commit()
    await db.refresh(ticket)
    return ticket

async def list_tickets(db: AsyncSession, q: Optional[str], status: Optional[str], priority: Optional[str],
                 owner_id: Optional[int], skip: int, limit: int):
    stmt = select(SupportTicket)
    f = []
    if q:
        ilike = f"%{q}%"
        f.append(or_(SupportTicket.title.ilike(ilike), SupportTicket.description.ilike(ilike)))
    if status: f.append(SupportTicket.status == status)
    if priority: f.append(SupportTicket.priority == priority)
    if owner_id: f.append(SupportTicket.assigned_to_employee_id == owner_id)
    if f: stmt = stmt.where(and_(*f))
    stmt = stmt.order_by(SupportTicket.created_at.desc())
    total_result = await db.execute(select(func.count()).select_from(stmt.subquery()))
    total = total_result.scalar_one()
    rows_result = await db.execute(stmt.offset(skip).limit(limit))
    rows = rows_result.scalars().all()
    return rows, total

# --------- Comments ----------
async def add_comment(db: AsyncSession, data) -> TicketComment:
    obj = TicketComment(**data.dict())
    db.add(obj)
    await db.commit()
    await db.refresh(obj)
    return obj

async def list_comments(db: AsyncSession, ticket_id: int) -> List[TicketComment]:
    stmt = select(TicketComment).where(TicketComment.ticket_id == ticket_id).order_by(TicketComment.created_at.asc())
    result = await db.execute(stmt)
    return result.scalars().all()
