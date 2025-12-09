# app/schemas/crm.py

from typing import Annotated, Optional, List
from decimal import Decimal
from datetime import datetime, date
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from enum import Enum

# Typed aliases (v2-way)
Money12_2 = Annotated[Decimal, Field(max_digits=12, decimal_places=2)]
NonNegInt = Annotated[int, Field(ge=0)]

class LeadStatus(str, Enum):
    hot="hot"; warm="warm"; cold="cold"

class LeadStage(str, Enum):
    lead="lead"; qualified="qualified"; proposal="proposal"; negotiation="negotiation"; closed_won="closed-won"; closed_lost="closed-lost"

class ActivityType(str, Enum):
    call="call"; email="email"; meeting="meeting"; note="note"; status_change="status_change"

class TicketPriority(str, Enum):
    low="low"; medium="medium"; high="high"; urgent="urgent"

class TicketStatus(str, Enum):
    open="open"; in_progress="in-progress"; resolved="resolved"; closed="closed"

# ---- Leads ----
class LeadBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: str
    status: LeadStatus = LeadStatus.warm
    stage: LeadStage = LeadStage.lead
    value: Money12_2 = Decimal("0")
    source: Optional[str] = None
    assigned_to_employee_id: Optional[int] = None
    last_contact: Optional[date] = None
    next_follow_up: Optional[date] = None
    notes: Optional[str] = None
    lead_score: NonNegInt = 0

class LeadCreate(LeadBase): pass

class LeadUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    status: Optional[LeadStatus] = None
    stage: Optional[LeadStage] = None
    value: Optional[Money12_2] = None
    source: Optional[str] = None
    assigned_to_employee_id: Optional[int] = None
    last_contact: Optional[date] = None
    next_follow_up: Optional[date] = None
    notes: Optional[str] = None
    lead_score: Optional[NonNegInt] = None

class LeadOut(LeadBase):
    id: int
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)

# ---- Activities ----
class ActivityBase(BaseModel):
    activity_type: ActivityType
    subject: str
    description: Optional[str] = None
    duration_minutes: Optional[int] = None
    outcome: Optional[str] = None
    scheduled_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None

class ActivityCreate(ActivityBase):
    lead_id: int
    employee_id: int

class ActivityOut(ActivityBase):
    id: int
    lead_id: int
    employee_id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# ---- Tickets ----
class TicketBase(BaseModel):
    title: str
    description: str
    priority: TicketPriority = TicketPriority.medium
    status: TicketStatus = TicketStatus.open
    category: Optional[str] = None
    subcategory: Optional[str] = None
    customer_id: Optional[int] = None
    customer_name: str
    customer_email: EmailStr
    assigned_to_employee_id: Optional[int] = None

class TicketCreate(TicketBase): pass

class TicketUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[TicketPriority] = None
    status: Optional[TicketStatus] = None
    category: Optional[str] = None
    subcategory: Optional[str] = None
    customer_id: Optional[int] = None
    customer_name: Optional[str] = None
    customer_email: Optional[EmailStr] = None
    assigned_to_employee_id: Optional[int] = None
    resolution: Optional[str] = None
    resolved_at: Optional[datetime] = None

class TicketOut(TicketBase):
    id: int
    ticket_number: str
    created_at: datetime
    updated_at: datetime
    resolved_at: Optional[datetime] = None
    resolution: Optional[str] = None
    model_config = ConfigDict(from_attributes=True)

# ---- Comments ----
class CommentBase(BaseModel):
    content: str
    is_internal: bool = False
    attachments: Optional[dict] = None

class CommentCreate(CommentBase):
    ticket_id: int
    author_id: int

class CommentOut(CommentBase):
    id: int
    ticket_id: int
    author_id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
