from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import datetime, date
from typing import List, Dict, Any

from app.core.database import get_db
from app.models.models import (
    Employee, AttendanceRecord, LeaveRequest, SalesOrder, 
    Lead, SupportTicket, PayrollRecord
)
from app.schemas.schemas import ReportRequest, ReportResponse

router = APIRouter()


@router.post("/generate", response_model=ReportResponse)
async def generate_report(
    request: ReportRequest,
    db: AsyncSession = Depends(get_db)
):
    data = []
    summary = {}
    
    if request.report_type == "attendance":
        query = select(AttendanceRecord)
        if request.start_date:
            query = query.where(AttendanceRecord.date >= request.start_date)
        if request.end_date:
            query = query.where(AttendanceRecord.date <= request.end_date)
        
        result = await db.execute(query)
        records = result.scalars().all()
        
        data = [
            {
                "id": r.id,
                "employee_id": r.employee_id,
                "date": str(r.date),
                "status": r.status.value if r.status else None,
                "clock_in": str(r.clock_in_time) if r.clock_in_time else None,
                "clock_out": str(r.clock_out_time) if r.clock_out_time else None,
            }
            for r in records
        ]
        
        summary = {
            "total_records": len(records),
        }
        
    elif request.report_type == "leave":
        query = select(LeaveRequest)
        if request.start_date:
            query = query.where(LeaveRequest.start_date >= request.start_date)
        if request.end_date:
            query = query.where(LeaveRequest.end_date <= request.end_date)
        
        result = await db.execute(query)
        records = result.scalars().all()
        
        data = [
            {
                "id": r.id,
                "employee_id": r.employee_id,
                "leave_type": r.leave_type.value if r.leave_type else None,
                "start_date": str(r.start_date),
                "end_date": str(r.end_date),
                "status": r.status.value if r.status else None,
                "reason": r.reason,
            }
            for r in records
        ]
        
        summary = {
            "total_requests": len(records),
        }
        
    elif request.report_type == "sales":
        query = select(SalesOrder)
        if request.start_date:
            query = query.where(func.date(SalesOrder.order_date) >= request.start_date)
        if request.end_date:
            query = query.where(func.date(SalesOrder.order_date) <= request.end_date)
        
        result = await db.execute(query)
        records = result.scalars().all()
        
        total_revenue = sum(float(r.total_amount or 0) for r in records)
        
        data = [
            {
                "id": r.id,
                "order_number": r.order_number,
                "order_date": str(r.order_date),
                "total_amount": float(r.total_amount or 0),
                "status": r.status,
            }
            for r in records
        ]
        
        summary = {
            "total_orders": len(records),
            "total_revenue": total_revenue,
        }
        
    elif request.report_type == "crm":
        query = select(Lead)
        result = await db.execute(query)
        leads = result.scalars().all()
        
        data = [
            {
                "id": l.id,
                "name": l.name,
                "email": l.email,
                "status": l.status.value if l.status else None,
                "stage": l.stage.value if l.stage else None,
                "value": float(l.value or 0),
            }
            for l in leads
        ]
        
        summary = {
            "total_leads": len(leads),
            "total_value": sum(float(l.value or 0) for l in leads),
        }
        
    elif request.report_type == "payroll":
        query = select(PayrollRecord)
        result = await db.execute(query)
        records = result.scalars().all()
        
        data = [
            {
                "id": r.id,
                "employee_id": r.employee_id,
                "month": r.month,
                "year": r.year,
                "gross_salary": float(r.gross_salary or 0),
                "net_salary": float(r.net_salary or 0),
                "status": r.status.value if r.status else None,
            }
            for r in records
        ]
        
        summary = {
            "total_records": len(records),
            "total_gross": sum(float(r.gross_salary or 0) for r in records),
            "total_net": sum(float(r.net_salary or 0) for r in records),
        }
    else:
        raise HTTPException(status_code=400, detail=f"Unknown report type: {request.report_type}")
    
    return ReportResponse(
        report_type=request.report_type,
        generated_at=datetime.utcnow(),
        data=data,
        summary=summary
    )
