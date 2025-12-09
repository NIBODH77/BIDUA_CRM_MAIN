
from fastapi import APIRouter

router = APIRouter()

@router.get("/{employee_id}/addresses")
async def list_employee_addresses(employee_id: int):
    return {"message": f"Addresses for employee {employee_id}"}
