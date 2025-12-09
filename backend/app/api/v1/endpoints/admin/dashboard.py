from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from decimal import Decimal

from app.core.database import get_db
from app.models.models import User, Employee, Lead, SupportTicket, LeaveRequest, SalesOrder
from app.models.models import EmployeeStatus, TicketStatus, LeaveStatus
from app.schemas.schemas import AdminDashboardStats

router = APIRouter()


@router.get("", response_model=AdminDashboardStats)
async def get_admin_dashboard(db: AsyncSession = Depends(get_db)):
    total_users = await db.scalar(select(func.count(User.id)))
    total_employees = await db.scalar(select(func.count(Employee.id)))
    total_leads = await db.scalar(select(func.count(Lead.id)))
    total_tickets = await db.scalar(select(func.count(SupportTicket.id)))
    
    active_employees = await db.scalar(
        select(func.count(Employee.id)).where(Employee.status == EmployeeStatus.active)
    )
    
    pending_leaves = await db.scalar(
        select(func.count(LeaveRequest.id)).where(LeaveRequest.status == LeaveStatus.pending)
    )
    
    open_tickets = await db.scalar(
        select(func.count(SupportTicket.id)).where(SupportTicket.status == TicketStatus.open)
    )
    
    revenue_result = await db.scalar(
        select(func.coalesce(func.sum(SalesOrder.total_amount), Decimal("0")))
    )
    
    return AdminDashboardStats(
        total_users=total_users or 0,
        total_employees=total_employees or 0,
        total_leads=total_leads or 0,
        total_tickets=total_tickets or 0,
        active_employees=active_employees or 0,
        pending_leaves=pending_leaves or 0,
        open_tickets=open_tickets or 0,
        revenue_this_month=revenue_result or Decimal("0")
    )
