
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def list_performance_reviews():
    return {"message": "Performance endpoint"}
