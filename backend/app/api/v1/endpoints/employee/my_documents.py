from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional

from app.core.database import get_db
from app.models.models import Document, DocumentType
from app.schemas.schemas import DocumentResponse

router = APIRouter()


@router.get("", response_model=List[DocumentResponse])
async def get_my_documents(
    employee_id: int = Query(..., description="Employee ID"),
    doc_type: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(Document).where(Document.employee_id == employee_id)
    
    if doc_type:
        query = query.where(Document.document_type == doc_type)
    
    query = query.order_by(Document.uploaded_at.desc())
    
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/{document_id}", response_model=DocumentResponse)
async def get_document(
    document_id: int,
    employee_id: int = Query(..., description="Employee ID"),
    db: AsyncSession = Depends(get_db)
):
    document = await db.get(Document, document_id)
    
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    if document.employee_id != employee_id:
        raise HTTPException(status_code=403, detail="Not authorized to view this document")
    
    return document


@router.get("/{document_id}/download")
async def download_document(
    document_id: int,
    employee_id: int = Query(..., description="Employee ID"),
    db: AsyncSession = Depends(get_db)
):
    document = await db.get(Document, document_id)
    
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    if document.employee_id != employee_id:
        raise HTTPException(status_code=403, detail="Not authorized to download this document")
    
    return {
        "download_url": document.file_url,
        "file_name": document.file_name,
        "content_type": document.content_type
    }


@router.get("/types/list")
async def get_document_types():
    return {
        "types": [
            {"value": dt.value, "label": dt.value.replace("-", " ").title()}
            for dt in DocumentType
        ]
    }
