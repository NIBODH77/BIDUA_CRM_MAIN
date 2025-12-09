
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def list_activities():
    return {"message": "Activities endpoint - to be implemented"}
