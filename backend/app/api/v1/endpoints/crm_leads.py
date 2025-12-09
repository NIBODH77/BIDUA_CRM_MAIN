from __future__ import annotations

from typing import List, Optional
from datetime import date, datetime
from fastapi import APIRouter, Depends, HTTPException, Query, status, Response
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func,and_
from sqlalchemy.orm import Session
from app.models.models import Employee, Lead, User, LeadStatus, LeadStage
from app.core.database import get_db
from app.crud.crm_lead import crm_lead
from app.schemas.schemas import (
    LeadCreate,
    LeadUpdate,
    LeadResponse,
    LeadActivityCreate,
    LeadActivityResponse,
)
from pydantic import BaseModel
from app.core.auth import get_current_user


router = APIRouter()



# ---- Partial payload model ----

# -------------------------------
# PATCH payload model (partial)
# -------------------------------
class LeadUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    status: Optional[str] = None
    stage: Optional[str] = None
    value: Optional[float] = None
    source: Optional[str] = None
    last_contact: Optional[date] = None
    next_follow_up: Optional[date] = None
    notes: Optional[str] = None
    lead_score: Optional[int] = None
    assigned_to_employee_id: Optional[int] = None



# -------------------------------
# List Leads (with filters) - SINGLE ENDPOINT
# -------------------------------
@router.get("/", response_model=dict)
async def list_leads(
    *,
    db: AsyncSession = Depends(get_db),
    q: Optional[str] = Query(None, description="Free-text search on lead fields"),
    status: Optional[str] = Query(None),
    stage: Optional[str] = Query(None),
    assigned_to_employee_id: Optional[int] = Query(None),
    employee_id: Optional[int] = Query(None),
    min_value: Optional[float] = Query(None),
    max_value: Optional[float] = Query(None),
    last_contact_from: Optional[date] = Query(None),
    last_contact_to: Optional[date] = Query(None),
    order_by: Optional[str] = Query("created_at", description="created_at|updated_at|value|lead_score"),
    order_dir: Optional[str] = Query("desc", description="asc|desc"),
    skip: int = 0,
    limit: int = 50,
):
    rows, total = await crm_lead.list_leads(
        db,
        q=q,
        status=status,
        stage=stage,
        assigned_to_employee_id=assigned_to_employee_id,
        employee_id=employee_id,
        min_value=min_value,
        max_value=max_value,
        last_contact_from=last_contact_from,
        last_contact_to=last_contact_to,
        order_by=order_by or "created_at",
        order_dir=order_dir or "desc",
        skip=skip,
        limit=limit,
    )

    # Convert SQLAlchemy objects to dictionaries with employee data
    leads_data = []
    for lead in rows:
        lead_dict = {
            'id': str(lead.id),
            'status': lead.status,
            'name': lead.name,
            'email': lead.email,
            'phone': lead.phone,
            'company': lead.company,
            'stage': lead.stage,
            'value': float(lead.value) if lead.value else 0.0,
            'source': lead.source,
            'assigned_to_employee_id': lead.assigned_to_employee_id,
            # Employee data agar relation hai to
            'assigned_employee': None
        }
        
        # Agar lead ke saath employee data prefetched hai to use karo
        if hasattr(lead, 'assigned_employee') and lead.assigned_employee:
            employee = lead.assigned_employee
            lead_dict['assigned_employee'] = {
                'id': employee.id,
                'name': employee.name,
                'email': employee.email,
                'phone': employee.phone,
                'department': employee.department
            }
        
        leads_data.append(lead_dict)

    # Calculate hot leads count from filtered results
    filtered_hot_count = sum(1 for lead in rows if lead.status == 'hot')

    # Agar total hot leads count chahiye (sab leads mein se), to alag query karo:
    total_hot_query = select(func.count(Lead.id)).where(Lead.status == 'hot')
    total_hot_result = await db.execute(total_hot_query)
    total_hot_count = total_hot_result.scalar_one()

    return {
        "leads": leads_data,
        "total": total,
        "hot_leads_count": total_hot_count,  # ya filtered_hot_count - choose as needed
        "filtered_hot_leads_count": filtered_hot_count,  # New field for filtered hot count
        "filtered_count": len(rows)
    }



@router.get("/sales-pipeline-dashboard", response_model=dict)
async def get_sales_pipeline_dashboard(db: AsyncSession = Depends(get_db)):
    """
    Sales Pipeline Dashboard ke liye specific data
    """
    
    # 1. Total Pipeline Value (sabhi leads ki total value)
    total_value_query = select(func.coalesce(func.sum(Lead.value), 0))
    total_result = await db.execute(total_value_query)
    total_pipeline_value = total_result.scalar_one()
    
    # 2. Closed Won deals ki total worth
    won_value_query = select(func.coalesce(func.sum(Lead.value), 0)).where(Lead.stage == 'closed-won')
    won_result = await db.execute(won_value_query)
    won_value = won_result.scalar_one()
    
    # 3. Total Leads Count (Active Leads)
    total_leads_query = select(func.count(Lead.id))
    total_leads_result = await db.execute(total_leads_query)
    total_leads = total_leads_result.scalar_one()
    
    # 4. Conversion Rate
    won_leads_query = select(func.count(Lead.id)).where(Lead.stage == 'closed-won')
    won_leads_result = await db.execute(won_leads_query)
    won_leads_count = won_leads_result.scalar_one()
    
    conversion_rate = 0.0
    if total_leads > 0:
        conversion_rate = round((won_leads_count / total_leads) * 100, 1)
    
    # 5. Pipeline Breakdown - har stage ke liye count aur value + latest lead name
    stages = ['lead', 'qualified', 'proposal', 'negotiation', 'closed-won', 'closed-lost']
    pipeline_breakdown = {}
    
    for stage in stages:
        # Stage ke leads ki count aur total value
        stage_query = select(
            func.count(Lead.id).label("count"),
            func.coalesce(func.sum(Lead.value), 0).label("total_value")
        ).where(Lead.stage == stage)
        
        stage_result = await db.execute(stage_query)
        stage_data = stage_result.first()
        
        # ✅ NEW: Har stage ki SABSE RECENT lead ka name aur company
        latest_lead_query = (
            select(Lead.name, Lead.company)
            .where(Lead.stage == stage)
            .order_by(Lead.created_at.desc())
            .limit(1)  # Sirf sabse recent wala
        )
        latest_lead_result = await db.execute(latest_lead_query)
        latest_lead = latest_lead_result.first()
        
        # Agar koi lead hai to name aur company lo, nahi to None
        latest_lead_name = None
        latest_lead_company = None
        if latest_lead:
            latest_lead_name, latest_lead_company = latest_lead
        
        pipeline_breakdown[stage] = {
            "count": stage_data.count,
            "total_value": float(stage_data.total_value),
            "latest_lead_name": latest_lead_name,  # ✅ Sabse recent lead ka name
            "latest_lead_company": latest_lead_company  # ✅ Sabse recent lead ki company
        }
    
    # 6. Recent Leads (latest 5 leads overall)
    recent_leads_query = select(Lead).order_by(Lead.created_at.desc()).limit(5)
    recent_leads_result = await db.execute(recent_leads_query)
    recent_leads = recent_leads_result.scalars().all()
    
    recent_leads_data = []
    for lead in recent_leads:
        recent_leads_data.append({
            "id": lead.id,
            "name": lead.name,
            "company": lead.company,
            "value": float(lead.value) if lead.value else 0,
            "stage": lead.stage,
            "status": lead.status
        })
    
    return {
        # Overview Data
        "overview": {
            "total_pipeline_value": float(total_pipeline_value),
            "won_deals_value": float(won_value),
            "conversion_rate": conversion_rate,
            "active_leads": total_leads
        },
        
        # Pipeline Breakdown
        "pipeline_breakdown": {
            "lead": {
                "count": pipeline_breakdown['lead']['count'],
                "total_value": pipeline_breakdown['lead']['total_value'],
                "latest_lead_name": pipeline_breakdown['lead']['latest_lead_name'],  # ✅ Added
                "latest_lead_company": pipeline_breakdown['lead']['latest_lead_company']  # ✅ Added
            },
            "qualified": {
                "count": pipeline_breakdown['qualified']['count'],
                "total_value": pipeline_breakdown['qualified']['total_value'],
                "latest_lead_name": pipeline_breakdown['qualified']['latest_lead_name'],  # ✅ Added
                "latest_lead_company": pipeline_breakdown['qualified']['latest_lead_company']  # ✅ Added
            },
            "proposal": {
                "count": pipeline_breakdown['proposal']['count'],
                "total_value": pipeline_breakdown['proposal']['total_value'],
                "latest_lead_name": pipeline_breakdown['proposal']['latest_lead_name'],  # ✅ Added
                "latest_lead_company": pipeline_breakdown['proposal']['latest_lead_company']  # ✅ Added
            },
            "negotiation": {
                "count": pipeline_breakdown['negotiation']['count'],
                "total_value": pipeline_breakdown['negotiation']['total_value'],
                "latest_lead_name": pipeline_breakdown['negotiation']['latest_lead_name'],  # ✅ Added
                "latest_lead_company": pipeline_breakdown['negotiation']['latest_lead_company']  # ✅ Added
            },
            "closed_won": {
                "count": pipeline_breakdown['closed-won']['count'],
                "total_value": pipeline_breakdown['closed-won']['total_value'],
                "latest_lead_name": pipeline_breakdown['closed-won']['latest_lead_name'],  # ✅ Added
                "latest_lead_company": pipeline_breakdown['closed-won']['latest_lead_company']  # ✅ Added
            },
            "closed_lost": {
                "count": pipeline_breakdown['closed-lost']['count'],
                "total_value": pipeline_breakdown['closed-lost']['total_value'],
                "latest_lead_name": pipeline_breakdown['closed-lost']['latest_lead_name'],  # ✅ Added
                "latest_lead_company": pipeline_breakdown['closed-lost']['latest_lead_company']  # ✅ Added
            }
        },
        
        # Recent Leads
        "recent_leads": recent_leads_data
    }



# -------------------------------
# Get Lead by ID
# -------------------------------
@router.get("/{lead_id}", response_model=LeadResponse)
async def get_lead(
    *,
    db: AsyncSession = Depends(get_db),
    lead_id: int,
):
    lead = await crm_lead.get_lead(db, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return lead

# -------------------------------
# Create Lead
# -------------------------------
@router.post("/", response_model=LeadResponse, status_code=status.HTTP_201_CREATED)
async def create_lead(
    *,
    db: AsyncSession = Depends(get_db),
    payload: LeadCreate,
):
    lead = await crm_lead.create_lead(db, payload)
    return lead



@router.put(
    "/{lead_id}",
    response_model=LeadResponse,
    summary="Replace a lead (full PUT)",
)
async def update_lead_full_put(
    *,
    db: AsyncSession = Depends(get_db),
    lead_id: int,
    payload: LeadCreate,
):
    """
    Full replacement of a Lead.

    Hybrid status logic (handled in CRUD):
    - If `payload.status` is provided → manual value wins.
    - Else if `payload.lead_score` provided → status auto-derived from score
      (e.g., >=100 ⇒ `closed_won`, >70 ⇒ `hot`, >30 ⇒ `warm`, else `cold`).
    - Optional transition guard can be enabled in CRUD (ENFORCE_STATUS_TRANSITIONS).

    Also validates:
    - `lead_score` bounds (0..100)
    - `assigned_to_employee_id` existence (if provided)
    """
    lead = await crm_lead.get_lead(db, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    try:
        lead = await crm_lead.update_lead_full(db, lead, payload)
    except ValueError as e:
        # CRUD raises ValueError for domain issues (assignee missing, invalid transition, score out of range, etc.)
        raise HTTPException(status_code=400, detail=str(e))

    return lead



# ---- Auto-status from score (hybrid mode) ----
def determine_status(score: int) -> str:
    # Adjust ranges as you like
    if score >= 100:
        return "closed_won"
    if score > 70:
        return "hot"
    if score > 30:
        return "warm"
    return "cold"

# ---- (Optional) Allowed transitions; enable if needed ----
ALLOWED_STATUS_TRANSITIONS = {
    "cold": ["warm", "lost"],
    "warm": ["hot", "lost"],
    "hot":  ["closed_won", "lost"],
    "closed_won": [],
    "lost": [],
}

def validate_status_change(current_status: Optional[str], new_status: str) -> None:
    if not current_status:
        return
    allowed = ALLOWED_STATUS_TRANSITIONS.get(current_status, [])
    if allowed and new_status not in allowed:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid status change from '{current_status}' to '{new_status}'. Allowed: {allowed}"
        )

# -------------------------------
# Patch Lead (partial, integrated)
# -------------------------------
@router.patch("/{lead_id}", response_model=LeadResponse)
async def patch_lead(
    *,
    db: AsyncSession = Depends(get_db),
    lead_id: int,
    payload: LeadUpdate,
):
    # 1) fetch lead
    lead = await crm_lead.get_lead(db, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    # 2) make partial dict
    upd = payload.model_dump(exclude_unset=True)

    # 3) validate lead_score bounds (if present)
    if "lead_score" in upd:
        score = upd["lead_score"]
        if score is None or not (0 <= score <= 100):
            raise HTTPException(status_code=400, detail="lead_score must be between 0 and 100")

    # 4) assignee existence check (if present)
    if "assigned_to_employee_id" in upd and upd["assigned_to_employee_id"]:
        emp = await db.get(Employee, upd["assigned_to_employee_id"])
        if not emp:
            raise HTTPException(status_code=404, detail="Assignee (Employee) not found")

    # 5) Hybrid rule:
    #    - If client provides 'status', we keep it (manual override)
    #    - Else if client provides 'lead_score', we derive status automatically
    #    - Else leave status unchanged
    manual_status = upd.get("status")
    score_for_auto = upd.get("lead_score")

    if manual_status:
        # (Optional) validate transition (enable if you want strict workflow)
        # validate_status_change(lead.status, manual_status)
        pass
    else:
        if score_for_auto is not None:
            # अगर आप चाहते हैं कि status हमेशा manual रहे (auto ना हो), तो बस determine_status वाली लाइनें comment कर दें।
            auto_status = determine_status(score_for_auto)
            upd["status"] = auto_status  # auto-derive when manual not provided

    # 6) persist via CRUD (keeps updated_at and commit/refresh inside)
    lead = await crm_lead.update_lead_partial(db, lead, upd)
    return lead



# -------------------------------
# Delete Lead
# -------------------------------
@router.delete(
    "/{lead_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    response_class=Response,  # 204 पर body नहीं
)
async def delete_lead(
    *,
    db: AsyncSession = Depends(get_db),
    lead_id: int,
):
    lead = await crm_lead.get_lead(db, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    await crm_lead.delete_lead(db, lead)
    return None


# -------------------------------
# Lead Activities (sub-resource)
# -------------------------------
@router.get("/{lead_id}/activities", response_model=List[LeadActivityResponse])
async def list_lead_activities(
    *,
    db: AsyncSession = Depends(get_db),
    lead_id: int,
    skip: int = 0,
    limit: int = 100,
):
    # Lead existence check
    if not await crm_lead.get_lead(db, lead_id):
        raise HTTPException(status_code=404, detail="Lead not found")
    rows = await crm_lead.list_activities_for_lead(db, lead_id, skip=skip, limit=limit)
    return rows


@router.post("/{lead_id}/activities", response_model=LeadActivityResponse, status_code=status.HTTP_201_CREATED)
async def add_lead_activity(
    *,
    db: AsyncSession = Depends(get_db),
    lead_id: int,
    payload: LeadActivityCreate,
):
    if payload.lead_id != lead_id:
        raise HTTPException(status_code=400, detail="lead_id mismatch in path and body")

    try:
        act = await crm_lead.create_activity(db, payload)
    except ValueError as e:
        # propagate user-facing errors from CRUD
        raise HTTPException(status_code=404, detail=str(e))
    return act



@router.get("/debug-auth")
def debug_auth(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Debug endpoint to check authentication and employee association"""
    from app.crud.employees import employee as employee_crud
    
    # Check if user has employee record
    employee = employee_crud.get_by_user_id(db, user_id=current_user.id)
    
    return {
        "user_info": {
            "id": current_user.id,
            "username": current_user.username,
            "email": current_user.email,
            "role": current_user.role
        },
        "employee_info": {
            "has_employee_record": employee is not None,
            "employee_id": employee.id if employee else None,
            "employee_name": employee.name if employee else None
        }
    }