
from fastapi import APIRouter

router = APIRouter()

@router.get("/{company_id}/addresses")
async def list_company_addresses(company_id: int):
    return {"message": f"Addresses for company {company_id}"}
