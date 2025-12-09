
from fastapi import APIRouter

# Auth endpoints
from app.api.v1.endpoints.auth import routes as auth_routes

# User endpoints
from app.api.v1.endpoints.users import routes as user_routes

# Employee endpoints
from app.api.v1.endpoints.employees import routes as employee_routes
from app.api.v1.endpoints.employees import bank_accounts as employee_bank_routes
from app.api.v1.endpoints.employees import addresses as employee_address_routes

# Company endpoints
from app.api.v1.endpoints.companies import routes as company_routes
from app.api.v1.endpoints.companies import addresses as company_address_routes

# Product endpoints
from app.api.v1.endpoints.products import routes as product_routes
from app.api.v1.endpoints.products import categories as category_routes

# Order endpoints
from app.api.v1.endpoints.orders import routes as order_routes

# CRM endpoints
from app.api.v1.endpoints.crm import leads as crm_lead_routes
from app.api.v1.endpoints.crm import tickets as crm_ticket_routes
from app.api.v1.endpoints.crm import activities as crm_activity_routes
from app.api.v1.endpoints.crm import chats as crm_chat_routes

# HRMS endpoints
from app.api.v1.endpoints.hrms import attendance as hrms_attendance_routes
from app.api.v1.endpoints.hrms import leaves as hrms_leave_routes
from app.api.v1.endpoints.hrms import payroll as hrms_payroll_routes
from app.api.v1.endpoints.hrms import performance as hrms_performance_routes
from app.api.v1.endpoints.hrms import tasks as hrms_task_routes

# Support endpoints
from app.api.v1.endpoints.support import teams as support_team_routes

# Admin endpoints
from app.api.v1.endpoints.admin import dashboard as admin_dashboard_routes
from app.api.v1.endpoints.admin import bulk_actions as admin_bulk_routes
from app.api.v1.endpoints.admin import audit_logs as admin_audit_routes
from app.api.v1.endpoints.admin import reports as admin_report_routes

# Manager endpoints
from app.api.v1.endpoints.manager import team_overview as manager_team_routes
from app.api.v1.endpoints.manager import approve_leaves as manager_leave_routes
from app.api.v1.endpoints.manager import assign_tasks as manager_task_routes
from app.api.v1.endpoints.manager import performance_reviews as manager_perf_routes

# Employee portal endpoints
from app.api.v1.endpoints.employee import my_tasks as emp_task_routes
from app.api.v1.endpoints.employee import my_leaves as emp_leave_routes
from app.api.v1.endpoints.employee import my_attendance as emp_attendance_routes
from app.api.v1.endpoints.employee import my_payslips as emp_payslip_routes
from app.api.v1.endpoints.employee import my_documents as emp_doc_routes
from app.api.v1.endpoints.employee import notifications as emp_notif_routes

api_router = APIRouter()

# Auth
api_router.include_router(auth_routes.router, prefix="/auth", tags=["Authentication"])

# Users
api_router.include_router(user_routes.router, prefix="/users", tags=["Users"])

# Employees
api_router.include_router(employee_routes.router, prefix="/employees", tags=["Employees"])
api_router.include_router(employee_bank_routes.router, prefix="/employees", tags=["Employee Bank Accounts"])
api_router.include_router(employee_address_routes.router, prefix="/employees", tags=["Employee Addresses"])

# Companies
api_router.include_router(company_routes.router, prefix="/companies", tags=["Companies"])
api_router.include_router(company_address_routes.router, prefix="/companies", tags=["Company Addresses"])

# Products
api_router.include_router(product_routes.router, prefix="/products", tags=["Products"])
api_router.include_router(category_routes.router, prefix="/products/categories", tags=["Product Categories"])

# Orders
api_router.include_router(order_routes.router, prefix="/orders", tags=["Orders"])

# CRM
api_router.include_router(crm_lead_routes.router, prefix="/crm/leads", tags=["CRM - Leads"])
api_router.include_router(crm_ticket_routes.router, prefix="/crm/tickets", tags=["CRM - Tickets"])
api_router.include_router(crm_activity_routes.router, prefix="/crm/activities", tags=["CRM - Activities"])
api_router.include_router(crm_chat_routes.router, prefix="/crm/chats", tags=["CRM - Chats"])

# HRMS
api_router.include_router(hrms_attendance_routes.router, prefix="/hrms/attendance", tags=["HRMS - Attendance"])
api_router.include_router(hrms_leave_routes.router, prefix="/hrms/leaves", tags=["HRMS - Leaves"])
api_router.include_router(hrms_payroll_routes.router, prefix="/hrms/payroll", tags=["HRMS - Payroll"])
api_router.include_router(hrms_performance_routes.router, prefix="/hrms/performance", tags=["HRMS - Performance"])
api_router.include_router(hrms_task_routes.router, prefix="/hrms/tasks", tags=["HRMS - Tasks"])

# Support
api_router.include_router(support_team_routes.router, prefix="/support/teams", tags=["Support Teams"])

# Admin
api_router.include_router(admin_dashboard_routes.router, prefix="/admin/dashboard", tags=["Admin - Dashboard"])
api_router.include_router(admin_bulk_routes.router, prefix="/admin/bulk-actions", tags=["Admin - Bulk Actions"])
api_router.include_router(admin_audit_routes.router, prefix="/admin/audit-logs", tags=["Admin - Audit Logs"])
api_router.include_router(admin_report_routes.router, prefix="/admin/reports", tags=["Admin - Reports"])

# Manager
api_router.include_router(manager_team_routes.router, prefix="/manager/team", tags=["Manager - Team"])
api_router.include_router(manager_leave_routes.router, prefix="/manager/leaves", tags=["Manager - Leaves"])
api_router.include_router(manager_task_routes.router, prefix="/manager/tasks", tags=["Manager - Tasks"])
api_router.include_router(manager_perf_routes.router, prefix="/manager/performance", tags=["Manager - Performance"])

# Employee Portal
api_router.include_router(emp_task_routes.router, prefix="/employee/tasks", tags=["Employee - Tasks"])
api_router.include_router(emp_leave_routes.router, prefix="/employee/leaves", tags=["Employee - Leaves"])
api_router.include_router(emp_attendance_routes.router, prefix="/employee/attendance", tags=["Employee - Attendance"])
api_router.include_router(emp_payslip_routes.router, prefix="/employee/payslips", tags=["Employee - Payslips"])
api_router.include_router(emp_doc_routes.router, prefix="/employee/documents", tags=["Employee - Documents"])
api_router.include_router(emp_notif_routes.router, prefix="/employee/notifications", tags=["Employee - Notifications"])
