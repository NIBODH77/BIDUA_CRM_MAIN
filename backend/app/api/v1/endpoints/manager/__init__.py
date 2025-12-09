from fastapi import APIRouter
from . import team_overview, approve_leaves, assign_tasks, team_attendance, performance_reviews

router = APIRouter()

router.include_router(team_overview.router, prefix="/team-overview", tags=["Manager - Team Overview"])
router.include_router(approve_leaves.router, prefix="/approve-leaves", tags=["Manager - Leave Approvals"])
router.include_router(assign_tasks.router, prefix="/assign-tasks", tags=["Manager - Task Assignment"])
router.include_router(team_attendance.router, prefix="/team-attendance", tags=["Manager - Team Attendance"])
router.include_router(performance_reviews.router, prefix="/performance-reviews", tags=["Manager - Performance Reviews"])
