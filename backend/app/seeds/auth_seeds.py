
import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import AsyncSessionLocal
from app.models.auth.user import User, UserRoleEnum
from app.models.auth.role import Role
from app.models.auth.permission import Permission
from app.core.auth import get_password_hash
from datetime import datetime

async def seed_auth_data():
    async with AsyncSessionLocal() as db:
        try:
            # Create Permissions
            permissions = [
                Permission(code="user.create", description="Create users"),
                Permission(code="user.read", description="Read users"),
                Permission(code="user.update", description="Update users"),
                Permission(code="user.delete", description="Delete users"),
                Permission(code="employee.manage", description="Manage employees"),
                Permission(code="attendance.manage", description="Manage attendance"),
                Permission(code="leave.approve", description="Approve leaves"),
                Permission(code="payroll.manage", description="Manage payroll"),
                Permission(code="crm.manage", description="Manage CRM"),
                Permission(code="reports.view", description="View reports"),
            ]
            db.add_all(permissions)
            await db.commit()

            # Create Roles
            admin_role = Role(name="admin", description="Administrator with full access")
            manager_role = Role(name="manager", description="Manager with team access")
            employee_role = Role(name="employee", description="Regular employee")
            sales_role = Role(name="sales_executive", description="Sales Executive")
            doc_role = Role(name="documentation", description="Documentation access")

            db.add_all([admin_role, manager_role, employee_role, sales_role, doc_role])
            await db.commit()

            # Create Users
            users = [
                User(
                    username="admin",
                    email="admin@company.com",
                    hashed_password=get_password_hash("admin123"),
                    role=UserRoleEnum.admin,
                    department="IT",
                    is_active=True,
                    created_at=datetime.utcnow()
                ),
                User(
                    username="manager1",
                    email="manager@company.com",
                    hashed_password=get_password_hash("manager123"),
                    role=UserRoleEnum.manager,
                    department="Sales",
                    is_active=True,
                    created_at=datetime.utcnow()
                ),
                User(
                    username="employee1",
                    email="employee1@company.com",
                    hashed_password=get_password_hash("employee123"),
                    role=UserRoleEnum.employee,
                    department="Development",
                    is_active=True,
                    created_at=datetime.utcnow()
                ),
                User(
                    username="sales1",
                    email="sales@company.com",
                    hashed_password=get_password_hash("sales123"),
                    role=UserRoleEnum.sales_executive,
                    department="Sales",
                    is_active=True,
                    created_at=datetime.utcnow()
                ),
            ]
            db.add_all(users)
            await db.commit()
            
            print("✅ Auth data seeded successfully!")
            
        except Exception as e:
            print(f"❌ Error seeding auth data: {e}")
            await db.rollback()

if __name__ == "__main__":
    asyncio.run(seed_auth_data())
