
import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import AsyncSessionLocal
from app.models.models import Lead, LeadActivity, SupportTicket, ChatThread, ChatMessage, LeadStatus, LeadStage, ActivityType, TicketPriority, TicketStatus, MessageType, MessageDirection, MessageStatus
from sqlalchemy import select
from datetime import date, datetime
from decimal import Decimal

async def seed_crm_data():
    async with AsyncSessionLocal() as db:
        try:
            # Get employee IDs
            from app.models.models import Employee
            result = await db.execute(select(Employee).limit(3))
            employees = result.scalars().all()
            
            if not employees:
                print("⚠️ No employees found. Please seed employees first.")
                return

            # Create Leads
            leads = [
                Lead(
                    name="Acme Corporation",
                    email="contact@acme.com",
                    phone="9876543220",
                    company="Acme Corp",
                    status=LeadStatus.hot,
                    stage=LeadStage.qualified,
                    value=Decimal("500000.00"),
                    source="Website",
                    employee_id=employees[0].id,
                    assigned_to_employee_id=employees[0].id,
                    last_contact=date.today(),
                    next_follow_up=date(2025, 2, 15),
                    notes="Interested in enterprise solution",
                    lead_score=85,
                    created_at=datetime.utcnow()
                ),
                Lead(
                    name="Tech Innovations Ltd",
                    email="info@techinnovations.com",
                    phone="9876543221",
                    company="Tech Innovations",
                    status=LeadStatus.warm,
                    stage=LeadStage.proposal,
                    value=Decimal("300000.00"),
                    source="Referral",
                    employee_id=employees[1].id if len(employees) > 1 else employees[0].id,
                    assigned_to_employee_id=employees[1].id if len(employees) > 1 else employees[0].id,
                    last_contact=date.today(),
                    next_follow_up=date(2025, 2, 10),
                    notes="Requested detailed proposal",
                    lead_score=70,
                    created_at=datetime.utcnow()
                ),
                Lead(
                    name="Global Services Inc",
                    email="contact@globalservices.com",
                    phone="9876543222",
                    company="Global Services",
                    status=LeadStatus.cold,
                    stage=LeadStage.lead,
                    value=Decimal("150000.00"),
                    source="Cold Call",
                    employee_id=employees[2].id if len(employees) > 2 else employees[0].id,
                    assigned_to_employee_id=employees[2].id if len(employees) > 2 else employees[0].id,
                    next_follow_up=date(2025, 3, 1),
                    notes="Need to follow up next month",
                    lead_score=40,
                    created_at=datetime.utcnow()
                ),
            ]
            db.add_all(leads)
            await db.commit()

            for lead in leads:
                await db.refresh(lead)

            # Create Lead Activities
            activities = [
                LeadActivity(
                    lead_id=leads[0].id,
                    employee_id=employees[0].id,
                    activity_type=ActivityType.call,
                    subject="Initial Discovery Call",
                    description="Discussed requirements and budget",
                    duration_minutes=30,
                    outcome="Positive",
                    scheduled_at=datetime(2025, 1, 20, 10, 0),
                    completed_at=datetime(2025, 1, 20, 10, 30),
                    created_at=datetime.utcnow()
                ),
                LeadActivity(
                    lead_id=leads[0].id,
                    employee_id=employees[0].id,
                    activity_type=ActivityType.email,
                    subject="Product Demo Invitation",
                    description="Sent demo invitation for next week",
                    outcome="Scheduled",
                    scheduled_at=datetime(2025, 1, 25, 14, 0),
                    created_at=datetime.utcnow()
                ),
                LeadActivity(
                    lead_id=leads[1].id,
                    employee_id=employees[1].id if len(employees) > 1 else employees[0].id,
                    activity_type=ActivityType.meeting,
                    subject="Requirements Gathering",
                    description="Met to discuss technical requirements",
                    duration_minutes=60,
                    outcome="Positive",
                    scheduled_at=datetime(2025, 1, 22, 11, 0),
                    completed_at=datetime(2025, 1, 22, 12, 0),
                    created_at=datetime.utcnow()
                ),
            ]
            db.add_all(activities)
            await db.commit()

            # Create Support Tickets
            tickets = [
                SupportTicket(
                    ticket_number="TKT-2025-001",
                    title="Integration Issue",
                    description="Having trouble integrating API",
                    customer_id=leads[0].id,
                    assigned_to_employee_id=employees[0].id,
                    customer_name="Acme Corporation",
                    customer_email="contact@acme.com",
                    priority=TicketPriority.high,
                    status=TicketStatus.in_progress,
                    category="Technical",
                    subcategory="API",
                    created_at=datetime.utcnow()
                ),
                SupportTicket(
                    ticket_number="TKT-2025-002",
                    title="Billing Query",
                    description="Question about invoice",
                    customer_id=leads[1].id,
                    assigned_to_employee_id=employees[1].id if len(employees) > 1 else employees[0].id,
                    customer_name="Tech Innovations Ltd",
                    customer_email="info@techinnovations.com",
                    priority=TicketPriority.medium,
                    status=TicketStatus.open,
                    category="Billing",
                    created_at=datetime.utcnow()
                ),
            ]
            db.add_all(tickets)
            await db.commit()

            # Create Chat Threads
            chat_threads = [
                ChatThread(
                    lead_id=leads[0].id,
                    employee_id=employees[0].id,
                    subject="Product Inquiry",
                    status="active",
                    last_message_at=datetime.utcnow(),
                    message_count=3,
                    created_at=datetime.utcnow()
                ),
                ChatThread(
                    lead_id=leads[1].id,
                    employee_id=employees[1].id if len(employees) > 1 else employees[0].id,
                    subject="Demo Request",
                    status="active",
                    last_message_at=datetime.utcnow(),
                    message_count=2,
                    created_at=datetime.utcnow()
                ),
            ]
            db.add_all(chat_threads)
            await db.commit()

            for thread in chat_threads:
                await db.refresh(thread)

            # Create Chat Messages
            messages = [
                ChatMessage(
                    thread_id=chat_threads[0].id,
                    sender_type="lead",
                    sender_id=leads[0].id,
                    message_type=MessageType.text,
                    content="Hi, I'm interested in your enterprise solution",
                    status=MessageStatus.read,
                    direction=MessageDirection.lead_to_employee,
                    read_by_employee=True,
                    read_by_lead=True,
                    created_at=datetime.utcnow()
                ),
                ChatMessage(
                    thread_id=chat_threads[0].id,
                    sender_type="employee",
                    sender_id=employees[0].id,
                    message_type=MessageType.text,
                    content="Hello! I'd be happy to help. Can you tell me more about your requirements?",
                    status=MessageStatus.read,
                    direction=MessageDirection.employee_to_lead,
                    read_by_employee=True,
                    read_by_lead=True,
                    created_at=datetime.utcnow()
                ),
            ]
            db.add_all(messages)
            await db.commit()
            
            print("✅ CRM data seeded successfully!")
            
        except Exception as e:
            print(f"❌ Error seeding CRM data: {e}")
            await db.rollback()

if __name__ == "__main__":
    asyncio.run(seed_crm_data())
