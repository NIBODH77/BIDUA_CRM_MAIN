from fastapi import APIRouter
from fastapi.staticfiles import StaticFiles

from app.api.v1.endpoints import auth, users, products, companies, orders, employees, accounts
from app.api.v1.endpoints import crm_leads, crm_tickets, support_teams, attendance_and_leave
from app.api.v1.endpoints import lead_chats
from app.api.v1.endpoints.admin import router as admin_router
from app.api.v1.endpoints.manager import router as manager_router
from app.api.v1.endpoints.employee import router as employee_router


api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(products.router, prefix="/products", tags=["products"])
api_router.include_router(companies.router, prefix="/companies", tags=["companies"])
api_router.include_router(orders.router, prefix="/orders", tags=["orders"])
api_router.include_router(employees.router, prefix="/employees", tags=["employees"])

# CRM Routes
api_router.include_router(crm_leads.router, prefix="/crm/leads", tags=["CRM - Leads"])
api_router.include_router(crm_tickets.router, prefix="/crm/tickets", tags=["CRM - Tickets"])
api_router.include_router(support_teams.router, prefix="/support/teams", tags=["Support Teams"])
api_router.include_router(lead_chats.router, prefix="/lead-chats", tags=["Lead Chats"])

# Attendance & Leave
api_router.include_router(attendance_and_leave.router, prefix="/attendance-leave", tags=["Attendance & Leave"])

# Role-based Routes
api_router.include_router(admin_router, prefix="/admin", tags=["Admin"])
api_router.include_router(manager_router, prefix="/manager", tags=["Manager"])
api_router.include_router(employee_router, prefix="/employee", tags=["Employee"])
