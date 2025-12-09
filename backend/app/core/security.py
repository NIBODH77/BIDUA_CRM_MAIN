# app/core/security.py में add करें
from fastapi import HTTPException, Depends
from app.core.auth import get_current_user

# Role-based permission dependencies
async def get_admin_user(current_user=Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user

async def get_manager_user(current_user=Depends(get_current_user)):
    if current_user.role not in ["admin", "manager"]:
        raise HTTPException(status_code=403, detail="Manager access required")
    return current_user

async def get_sales_user(current_user=Depends(get_current_user)):
    if current_user.role not in ["admin", "manager", "sales_executive"]:
        raise HTTPException(status_code=403, detail="Sales access required")
    return current_user

async def get_documentation_user(current_user=Depends(get_current_user)):
    if current_user.role not in ["admin", "manager", "documentation"]:
        raise HTTPException(status_code=403, detail="Documentation access required")
    return current_user