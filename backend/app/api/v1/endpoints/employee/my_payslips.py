from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional

from app.core.database import get_db
from app.models.models import SalarySlip, PayrollRecord
from app.schemas.schemas import SalarySlipResponse

router = APIRouter()


@router.get("", response_model=List[SalarySlipResponse])
async def get_my_payslips(
    employee_id: int = Query(..., description="Employee ID"),
    year: Optional[int] = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(SalarySlip).where(SalarySlip.employee_id == employee_id)
    
    if year:
        query = query.where(SalarySlip.year == year)
    
    query = query.order_by(SalarySlip.year.desc(), SalarySlip.month.desc())
    
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/{payslip_id}", response_model=SalarySlipResponse)
async def get_payslip(
    payslip_id: int,
    employee_id: int = Query(..., description="Employee ID"),
    db: AsyncSession = Depends(get_db)
):
    payslip = await db.get(SalarySlip, payslip_id)
    
    if not payslip:
        raise HTTPException(status_code=404, detail="Payslip not found")
    
    if payslip.employee_id != employee_id:
        raise HTTPException(status_code=403, detail="Not authorized to view this payslip")
    
    return payslip


@router.get("/year/{year}")
async def get_year_summary(
    year: int,
    employee_id: int = Query(..., description="Employee ID"),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(SalarySlip)
        .where(SalarySlip.employee_id == employee_id)
        .where(SalarySlip.year == year)
        .order_by(SalarySlip.month)
    )
    payslips = result.scalars().all()
    
    total_gross = sum(float(p.gross_salary or 0) for p in payslips)
    total_net = sum(float(p.net_salary or 0) for p in payslips)
    total_deductions = sum(float(p.total_deductions or 0) for p in payslips)
    
    return {
        "year": year,
        "months_paid": len(payslips),
        "total_gross_salary": round(total_gross, 2),
        "total_net_salary": round(total_net, 2),
        "total_deductions": round(total_deductions, 2),
        "payslips": [
            {
                "month": p.month,
                "gross_salary": float(p.gross_salary or 0),
                "net_salary": float(p.net_salary or 0)
            }
            for p in payslips
        ]
    }
