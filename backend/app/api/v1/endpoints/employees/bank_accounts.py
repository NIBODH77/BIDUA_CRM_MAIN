
from fastapi import APIRouter

router = APIRouter()

@router.get("/{employee_id}/bank-accounts")
async def list_employee_bank_accounts(employee_id: int):
    return {"message": f"Bank accounts for employee {employee_id}"}
