# # app/crud/crm_lead.py
# from __future__ import annotations
# from typing import Optional, Tuple, List
# from datetime import date, datetime

# from sqlalchemy import select, func, or_
# from sqlalchemy.ext.asyncio import AsyncSession

# from app.models.models import Lead, LeadActivity, Employee
# from app.schemas.schemas import (
#     LeadCreate,
#     LeadResponse,            # only for typing clarity (not strictly required)
#     LeadActivityCreate,
#     LeadActivityResponse,    # only for typing clarity
# )

# class CRMLeadCRUD:
#     # -----------------------
#     # Leads
#     # -----------------------
#     async def get_lead(self, db: AsyncSession, lead_id: int) -> Optional[Lead]:
#         return await db.get(Lead, lead_id)

#     async def list_leads(
#         self,
#         db: AsyncSession,
#         *,
#         q: Optional[str] = None,
#         status: Optional[str] = None,
#         stage: Optional[str] = None,
#         assigned_to_employee_id: Optional[int] = None,
#         employee_id: Optional[int] = None,
#         min_value: Optional[float] = None,
#         max_value: Optional[float] = None,
#         last_contact_from: Optional[date] = None,
#         last_contact_to: Optional[date] = None,
#         order_by: str = "created_at",
#         order_dir: str = "desc",
#         skip: int = 0,
#         limit: int = 50,
#     ) -> Tuple[List[Lead], int]:
#         filters = []

#         if status:
#             filters.append(Lead.status == status)
#         if stage:
#             filters.append(Lead.stage == stage)
#         if assigned_to_employee_id:
#             filters.append(Lead.assigned_to_employee_id == assigned_to_employee_id)
#         if employee_id:
#             filters.append(Lead.employee_id == employee_id)
#         if min_value is not None:
#             filters.append(Lead.value >= min_value)
#         if max_value is not None:
#             filters.append(Lead.value <= max_value)
#         if last_contact_from:
#             filters.append(Lead.last_contact >= last_contact_from)
#         if last_contact_to:
#             filters.append(Lead.last_contact <= last_contact_to)

#         if q:
#             like = f"%{q}%"
#             filters.append(
#                 or_(
#                     Lead.name.ilike(like),
#                     Lead.email.ilike(like),
#                     Lead.phone.ilike(like),
#                     Lead.company.ilike(like),
#                     Lead.source.ilike(like),
#                     Lead.notes.ilike(like),
#                 )
#             )

#         stmt = select(Lead)
#         count_stmt = select(func.count()).select_from(Lead)

#         for f in filters:
#             stmt = stmt.where(f)
#             count_stmt = count_stmt.where(f)

#         # ordering
#         order_map = {
#             "created_at": Lead.created_at,
#             "updated_at": Lead.updated_at,
#             "value": Lead.value,
#             "lead_score": Lead.lead_score,
#         }
#         order_col = order_map.get(order_by, Lead.created_at)
#         stmt = stmt.order_by(order_col.asc() if order_dir == "asc" else order_col.desc())
#         stmt = stmt.offset(skip).limit(limit)

#         total = (await db.execute(count_stmt)).scalar_one()
#         res = await db.execute(stmt)
#         rows = res.scalars().all()
#         return rows, total

#     async def create_lead(self, db: AsyncSession, payload: LeadCreate) -> Lead:
#         lead = Lead(
#             name=payload.name,
#             email=payload.email,
#             phone=payload.phone,
#             company=payload.company,
#             status=payload.status,
#             stage=payload.stage,
#             value=payload.value,
#             source=payload.source,
#             last_contact=payload.last_contact,
#             next_follow_up=payload.next_follow_up,
#             notes=payload.notes,
#             lead_score=payload.lead_score or 0,
#             assigned_to_employee_id=payload.assigned_to_employee_id,
#         )
#         db.add(lead)
#         await db.commit()
#         await db.refresh(lead)
#         return lead

#     async def update_lead_full(self, db: AsyncSession, lead: Lead, payload: LeadCreate) -> Lead:
#         # full update (PUT semantics)
#         for field in (
#             "name", "email", "phone", "company", "status", "stage", "value", "source",
#             "last_contact", "next_follow_up", "notes", "lead_score", "assigned_to_employee_id"
#         ):
#             setattr(lead, field, getattr(payload, field))
#         lead.updated_at = datetime.utcnow()
#         await db.commit()
#         await db.refresh(lead)
#         return lead

#     async def update_lead_partial(self, db: AsyncSession, lead: Lead, patch_data: dict) -> Lead:
#         # partial update (PATCH semantics)
#         for k, v in patch_data.items():
#             setattr(lead, k, v)
#         lead.updated_at = datetime.utcnow()
#         await db.commit()
#         await db.refresh(lead)
#         return lead

#     async def delete_lead(self, db: AsyncSession, lead: Lead) -> None:
#         await db.delete(lead)
#         await db.commit()

#     # -----------------------
#     # Lead Activities
#     # -----------------------
#     async def list_activities_for_lead(
#         self, db: AsyncSession, lead_id: int, *, skip: int = 0, limit: int = 100
#     ) -> List[LeadActivity]:
#         stmt = (
#             select(LeadActivity)
#             .where(LeadActivity.lead_id == lead_id)
#             .order_by(LeadActivity.created_at.desc())
#             .offset(skip).limit(limit)
#         )
#         res = await db.execute(stmt)
#         return res.scalars().all()

#     async def create_activity(self, db: AsyncSession, payload: LeadActivityCreate) -> LeadActivity:
#         # ensure lead exists
#         if not await db.get(Lead, payload.lead_id):
#             raise ValueError("Lead not found")

#         # optional: validate employee exists
#         if payload.employee_id and not await db.get(Employee, payload.employee_id):
#             raise ValueError("Employee (activity owner) not found")

#         act = LeadActivity(
#             lead_id=payload.lead_id,
#             employee_id=payload.employee_id,
#             activity_type=payload.activity_type,
#             subject=payload.subject,
#             description=payload.description,
#             duration_minutes=payload.duration_minutes,
#             outcome=payload.outcome,
#             scheduled_at=payload.scheduled_at,
#             completed_at=payload.completed_at,
#             created_at=datetime.utcnow(),
#         )
#         db.add(act)
#         await db.commit()
#         await db.refresh(act)
#         return act


# crm_lead = CRMLeadCRUD()









# app/crud/crm_lead.py
from __future__ import annotations
from typing import Optional, Tuple, List
from datetime import date, datetime

from sqlalchemy import select, func, or_
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.models import Lead, LeadActivity, Employee
from app.schemas.schemas import LeadCreate, LeadActivityCreate

# -----------------------------------------------------------------------------
# Business rules (toggleable)
# -----------------------------------------------------------------------------

# अगर transition rules enforce करने हैं, तो ऊपर ENFORCE_STATUS_TRANSITIONS = True कर दें।
# If True, enforce allowed status transitions
ENFORCE_STATUS_TRANSITIONS = True

# Allowed transitions (enable via flag above)
ALLOWED_STATUS_TRANSITIONS = {
    "cold": ["warm", "lost"],
    "warm": ["hot", "lost"],
    "hot":  ["closed_won", "lost"],
    "closed_won": [],
    "lost": [],
}

def determine_status(score: int) -> str:
    """
    Auto-determine lead status from score.
    Adjust thresholds as needed.
    """
    if score >= 100:
        return "closed_won"
    if score > 70:
        return "hot"
    if score > 30:
        return "warm"
    return "cold"

def _validate_status_transition(current_status: Optional[str], new_status: str) -> None:
    if not ENFORCE_STATUS_TRANSITIONS:
        return
    if not current_status:
        return
    allowed = ALLOWED_STATUS_TRANSITIONS.get(current_status, [])
    if allowed and new_status not in allowed:
        raise ValueError(
            f"Invalid status change from '{current_status}' to '{new_status}'. Allowed: {allowed}"
        )

def _validate_score_bounds(score: Optional[int]) -> None:
    if score is None:
        return
    if not (0 <= score <= 100):
        raise ValueError("lead_score must be between 0 and 100")


class CRMLeadCRUD:
    # -------------------------------------------------------------------------
    # Leads
    # -------------------------------------------------------------------------

    async def get_lead(self, db: AsyncSession, lead_id: int) -> Optional[Lead]:
        return await db.get(Lead, lead_id)

    async def list_leads(
        self,
        db: AsyncSession,
        *,
        q: Optional[str] = None,
        status: Optional[str] = None,
        stage: Optional[str] = None,
        assigned_to_employee_id: Optional[int] = None,
        employee_id: Optional[int] = None,
        min_value: Optional[float] = None,
        max_value: Optional[float] = None,
        last_contact_from: Optional[date] = None,
        last_contact_to: Optional[date] = None,
        order_by: str = "created_at",
        order_dir: str = "desc",
        skip: int = 0,
        limit: int = 50,
    ) -> Tuple[List[Lead], int]:
        """
        Paginated list with filters + total count.
        """
        filters = []

        if status:
            filters.append(Lead.status == status)
        if stage:
            filters.append(Lead.stage == stage)
        if assigned_to_employee_id:
            filters.append(Lead.assigned_to_employee_id == assigned_to_employee_id)
        if employee_id:
            filters.append(Lead.employee_id == employee_id)
        if min_value is not None:
            filters.append(Lead.value >= min_value)
        if max_value is not None:
            filters.append(Lead.value <= max_value)
        if last_contact_from:
            filters.append(Lead.last_contact >= last_contact_from)
        if last_contact_to:
            filters.append(Lead.last_contact <= last_contact_to)

        if q:
            like = f"%{q}%"
            filters.append(
                or_(
                    Lead.name.ilike(like),
                    Lead.email.ilike(like),
                    Lead.phone.ilike(like),
                    Lead.company.ilike(like),
                    Lead.source.ilike(like),
                    Lead.notes.ilike(like),
                )
            )

        stmt = select(Lead)
        count_stmt = select(func.count()).select_from(Lead)

        for f in filters:
            stmt = stmt.where(f)
            count_stmt = count_stmt.where(f)

        # ordering
        order_map = {
            "created_at": Lead.created_at,
            "updated_at": Lead.updated_at,
            "value": Lead.value,
            "lead_score": Lead.lead_score,
        }
        order_col = order_map.get(order_by, Lead.created_at)
        stmt = stmt.order_by(order_col.asc() if order_dir == "asc" else order_col.desc())
        stmt = stmt.offset(skip).limit(limit)

        total_res = await db.execute(count_stmt)
        total = total_res.scalar() or 0

        res = await db.execute(stmt)
        rows = res.scalars().all()
        return rows, total

    async def create_lead(self, db: AsyncSession, payload: LeadCreate) -> Lead:
        """
        Create new lead.
        - Validates score bounds
        - (Optional) auto-derive status from score if payload.status absent
        - Validates assignee existence if provided
        """
        # score bounds
        _validate_score_bounds(payload.lead_score)

        # assignee existence (defensive)
        if payload.assigned_to_employee_id:
            emp = await db.get(Employee, payload.assigned_to_employee_id)
            if not emp:
                raise ValueError("Assignee (Employee) not found")

        # decide status: manual beats auto
        status_value = payload.status
        if not status_value and payload.lead_score is not None:
            status_value = determine_status(payload.lead_score)

        lead = Lead(
            name=payload.name,
            email=payload.email,
            phone=payload.phone,
            company=payload.company,
            status=status_value or payload.status,   # fallback to provided
            stage=payload.stage,
            value=payload.value,
            source=payload.source,
            last_contact=payload.last_contact,
            next_follow_up=payload.next_follow_up,
            notes=payload.notes,
            lead_score=payload.lead_score or 0,
            assigned_to_employee_id=payload.assigned_to_employee_id,
        )
        db.add(lead)
        await db.commit()
        await db.refresh(lead)
        return lead

    async def update_lead_full(self, db: AsyncSession, lead: Lead, payload: LeadCreate) -> Lead:
        """
        Full update (PUT semantics).
        - Validates score bounds
        - Validates assignee existence
        - Manual status wins; otherwise, auto from score if present
        - Optional transition validation (if enabled)
        """
        _validate_score_bounds(payload.lead_score)

        # assignee existence
        if payload.assigned_to_employee_id:
            emp = await db.get(Employee, payload.assigned_to_employee_id)
            if not emp:
                raise ValueError("Assignee (Employee) not found")

        # status decision
        new_status = payload.status
        if not new_status and payload.lead_score is not None:
            new_status = determine_status(payload.lead_score)

        if new_status:
            _validate_status_transition(lead.status, new_status)

        # apply fields
        for field in (
            "name", "email", "phone", "company", "stage", "value", "source",
            "last_contact", "next_follow_up", "notes", "lead_score", "assigned_to_employee_id"
        ):
            setattr(lead, field, getattr(payload, field))

        if new_status:
            lead.status = new_status

        lead.updated_at = datetime.utcnow()
        await db.commit()
        await db.refresh(lead)
        return lead

    async def update_lead_partial(self, db: AsyncSession, lead: Lead, patch_data: dict) -> Lead:
        """
        Partial update (PATCH semantics).
        - Validates score bounds if present
        - Validates assignee existence if present
        - Hybrid rule: manual 'status' overrides; otherwise auto from 'lead_score' if present
        - Optional transition validation
        """
        # bounds check
        _validate_score_bounds(patch_data.get("lead_score"))

        # assignee existence
        assignee_id = patch_data.get("assigned_to_employee_id")
        if assignee_id:
            emp = await db.get(Employee, assignee_id)
            if not emp:
                raise ValueError("Assignee (Employee) not found")

        manual_status = patch_data.get("status")
        score_for_auto = patch_data.get("lead_score")

        # if manual status provided, (optionally) validate transition
        if manual_status:
            _validate_status_transition(lead.status, manual_status)
        else:
            # derive status from score if score present
            if score_for_auto is not None:
                patch_data["status"] = determine_status(score_for_auto)

        # apply fields
        for k, v in patch_data.items():
            setattr(lead, k, v)

        lead.updated_at = datetime.utcnow()
        await db.commit()
        await db.refresh(lead)
        return lead

    async def delete_lead(self, db: AsyncSession, lead: Lead) -> None:
        await db.delete(lead)
        await db.commit()

    # -------------------------------------------------------------------------
    # Lead Activities
    # -------------------------------------------------------------------------
    async def list_activities_for_lead(
        self, db: AsyncSession, lead_id: int, *, skip: int = 0, limit: int = 100
    ) -> List[LeadActivity]:
        stmt = (
            select(LeadActivity)
            .where(LeadActivity.lead_id == lead_id)
            .order_by(LeadActivity.created_at.desc())
            .offset(skip).limit(limit)
        )
        res = await db.execute(stmt)
        return res.scalars().all()

    async def create_activity(self, db: AsyncSession, payload: LeadActivityCreate) -> LeadActivity:
        # ensure lead exists
        if not await db.get(Lead, payload.lead_id):
            raise ValueError("Lead not found")

        # optional: validate employee exists
        if payload.employee_id and not await db.get(Employee, payload.employee_id):
            raise ValueError("Employee (activity owner) not found")

        act = LeadActivity(
            lead_id=payload.lead_id,
            employee_id=payload.employee_id,
            activity_type=payload.activity_type,
            subject=payload.subject,
            description=payload.description,
            duration_minutes=payload.duration_minutes,
            outcome=payload.outcome,
            scheduled_at=payload.scheduled_at,
            completed_at=payload.completed_at,
            created_at=datetime.utcnow(),
        )
        db.add(act)
        await db.commit()
        await db.refresh(act)
        return act


crm_lead = CRMLeadCRUD()

