
from fastapi import APIRouter
from app.api.v1.endpoints.attendance_and_leave import router as attendance_leave_router

router = APIRouter()

# Include existing attendance endpoints
router.include_router(attendance_leave_router, tags=["Attendance"])
