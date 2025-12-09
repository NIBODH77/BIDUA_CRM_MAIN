from fastapi import APIRouter
from . import dashboard, bulk_actions, system_settings, audit_logs, reports

router = APIRouter()

router.include_router(dashboard.router, prefix="/dashboard", tags=["Admin - Dashboard"])
router.include_router(bulk_actions.router, prefix="/users/bulk-actions", tags=["Admin - Bulk Actions"])
router.include_router(system_settings.router, prefix="/system-settings", tags=["Admin - System Settings"])
router.include_router(audit_logs.router, prefix="/audit-logs", tags=["Admin - Audit Logs"])
router.include_router(reports.router, prefix="/reports", tags=["Admin - Reports"])
