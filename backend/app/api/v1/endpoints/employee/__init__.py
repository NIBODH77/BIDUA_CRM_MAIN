from fastapi import APIRouter
from . import my_tasks, my_leaves, my_attendance, my_payslips, my_documents, notifications

router = APIRouter()

router.include_router(my_tasks.router, prefix="/my-tasks", tags=["Employee - My Tasks"])
router.include_router(my_leaves.router, prefix="/my-leaves", tags=["Employee - My Leaves"])
router.include_router(my_attendance.router, prefix="/my-attendance", tags=["Employee - My Attendance"])
router.include_router(my_payslips.router, prefix="/my-payslips", tags=["Employee - My Payslips"])
router.include_router(my_documents.router, prefix="/my-documents", tags=["Employee - My Documents"])
router.include_router(notifications.router, prefix="/notifications", tags=["Employee - Notifications"])
