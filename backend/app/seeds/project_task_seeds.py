
import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import AsyncSessionLocal
from app.models.models import Project, Task, TaskDependency, ProjectStatus, TaskPriority, DependencyType
from sqlalchemy import select
from datetime import date, datetime
from decimal import Decimal

async def seed_project_task_data():
    async with AsyncSessionLocal() as db:
        try:
            # Get employee IDs
            from app.models.models import Employee
            result = await db.execute(select(Employee).limit(3))
            employees = result.scalars().all()
            
            if not employees:
                print("⚠️ No employees found. Please seed employees first.")
                return

            # Create Projects
            projects = [
                Project(
                    name="ERP Implementation",
                    description="Implement complete ERP system",
                    manager_id=employees[0].id,
                    start_date=date(2025, 1, 1),
                    end_date=date(2025, 12, 31),
                    status=ProjectStatus.active,
                    budget=Decimal("5000000.00"),
                    created_at=datetime.utcnow()
                ),
                Project(
                    name="Mobile App Development",
                    description="Develop mobile app for customers",
                    manager_id=employees[1].id if len(employees) > 1 else employees[0].id,
                    start_date=date(2025, 2, 1),
                    end_date=date(2025, 8, 31),
                    status=ProjectStatus.active,
                    budget=Decimal("2000000.00"),
                    created_at=datetime.utcnow()
                ),
                Project(
                    name="Website Redesign",
                    description="Redesign company website",
                    manager_id=employees[0].id,
                    start_date=date(2025, 1, 15),
                    end_date=date(2025, 6, 30),
                    status=ProjectStatus.active,
                    budget=Decimal("500000.00"),
                    created_at=datetime.utcnow()
                ),
            ]
            db.add_all(projects)
            await db.commit()

            for proj in projects:
                await db.refresh(proj)

            # Create Tasks
            tasks = [
                Task(
                    project_id=projects[0].id,
                    title="Database Design",
                    description="Design database schema for ERP",
                    assigned_to=employees[0].id,
                    priority=TaskPriority.high,
                    status="in-progress",
                    due_date=date(2025, 2, 28),
                    estimated_hours=Decimal("80.00"),
                    actual_hours=Decimal("40.00"),
                    created_at=datetime.utcnow()
                ),
                Task(
                    project_id=projects[0].id,
                    title="Frontend Development",
                    description="Develop frontend modules",
                    assigned_to=employees[1].id if len(employees) > 1 else employees[0].id,
                    priority=TaskPriority.high,
                    status="todo",
                    due_date=date(2025, 5, 31),
                    estimated_hours=Decimal("200.00"),
                    created_at=datetime.utcnow()
                ),
                Task(
                    project_id=projects[0].id,
                    title="Backend API Development",
                    description="Develop REST APIs",
                    assigned_to=employees[0].id,
                    priority=TaskPriority.high,
                    status="todo",
                    due_date=date(2025, 4, 30),
                    estimated_hours=Decimal("150.00"),
                    created_at=datetime.utcnow()
                ),
                Task(
                    project_id=projects[1].id,
                    title="UI/UX Design",
                    description="Design mobile app interface",
                    assigned_to=employees[2].id if len(employees) > 2 else employees[0].id,
                    priority=TaskPriority.medium,
                    status="in-progress",
                    due_date=date(2025, 3, 31),
                    estimated_hours=Decimal("60.00"),
                    actual_hours=Decimal("30.00"),
                    created_at=datetime.utcnow()
                ),
                Task(
                    project_id=projects[2].id,
                    title="Homepage Redesign",
                    description="Redesign homepage layout",
                    assigned_to=employees[1].id if len(employees) > 1 else employees[0].id,
                    priority=TaskPriority.medium,
                    status="completed",
                    due_date=date(2025, 2, 15),
                    estimated_hours=Decimal("40.00"),
                    actual_hours=Decimal("35.00"),
                    created_at=datetime.utcnow()
                ),
            ]
            db.add_all(tasks)
            await db.commit()

            for task in tasks:
                await db.refresh(task)

            # Create Task Dependencies
            dependencies = [
                TaskDependency(
                    task_id=tasks[1].id,  # Frontend Development
                    depends_on_task_id=tasks[0].id,  # Database Design
                    dependency_type=DependencyType.finish_to_start,
                    created_at=datetime.utcnow()
                ),
                TaskDependency(
                    task_id=tasks[2].id,  # Backend API Development
                    depends_on_task_id=tasks[0].id,  # Database Design
                    dependency_type=DependencyType.finish_to_start,
                    created_at=datetime.utcnow()
                ),
            ]
            db.add_all(dependencies)
            await db.commit()
            
            print("✅ Project and Task data seeded successfully!")
            
        except Exception as e:
            print(f"❌ Error seeding project/task data: {e}")
            await db.rollback()

if __name__ == "__main__":
    asyncio.run(seed_project_task_data())
