from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional
from datetime import datetime

from app.core.database import get_db
from app.models.models import PerformanceReview, Employee, ReviewStatus, ReviewType
from app.schemas.schemas import PerformanceReviewCreate, PerformanceReviewUpdate, PerformanceReviewResponse

router = APIRouter()


@router.get("", response_model=List[PerformanceReviewResponse])
async def get_team_reviews(
    manager_id: int = Query(..., description="Manager's employee ID"),
    status: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    team_result = await db.execute(
        select(Employee.id).where(Employee.manager_id == manager_id)
    )
    team_ids = [row[0] for row in team_result.fetchall()]
    
    if not team_ids:
        return []
    
    query = select(PerformanceReview).where(PerformanceReview.employee_id.in_(team_ids))
    
    if status:
        query = query.where(PerformanceReview.status == status)
    
    result = await db.execute(query)
    return result.scalars().all()


@router.post("", response_model=PerformanceReviewResponse)
async def create_review(
    review_data: PerformanceReviewCreate,
    manager_id: int = Query(..., description="Manager's employee ID"),
    db: AsyncSession = Depends(get_db)
):
    employee = await db.get(Employee, review_data.employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    if employee.manager_id != manager_id:
        raise HTTPException(status_code=403, detail="Can only create reviews for your team members")
    
    review = PerformanceReview(
        **review_data.model_dump(),
        reviewer_id=manager_id,
        status=ReviewStatus.draft
    )
    db.add(review)
    await db.commit()
    await db.refresh(review)
    
    return review


@router.get("/{review_id}", response_model=PerformanceReviewResponse)
async def get_review(
    review_id: int,
    db: AsyncSession = Depends(get_db)
):
    review = await db.get(PerformanceReview, review_id)
    
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    
    return review


@router.put("/{review_id}", response_model=PerformanceReviewResponse)
async def update_review(
    review_id: int,
    review_data: PerformanceReviewUpdate,
    manager_id: int = Query(..., description="Manager's employee ID"),
    db: AsyncSession = Depends(get_db)
):
    review = await db.get(PerformanceReview, review_id)
    
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    
    if review.reviewer_id != manager_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this review")
    
    update_data = review_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(review, field, value)
    
    await db.commit()
    await db.refresh(review)
    
    return review


@router.post("/{review_id}/submit")
async def submit_review(
    review_id: int,
    manager_id: int = Query(..., description="Manager's employee ID"),
    db: AsyncSession = Depends(get_db)
):
    review = await db.get(PerformanceReview, review_id)
    
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    
    if review.reviewer_id != manager_id:
        raise HTTPException(status_code=403, detail="Not authorized to submit this review")
    
    review.status = ReviewStatus.completed
    review.completed_at = datetime.utcnow()
    
    await db.commit()
    
    return {"message": "Review submitted successfully"}
