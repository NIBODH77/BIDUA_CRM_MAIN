
import asyncio
from auth_seeds import seed_auth_data
from employee_seeds import seed_employee_data
from company_product_seeds import seed_company_product_data
from crm_seeds import seed_crm_data
from attendance_leave_seeds import seed_attendance_leave_data
from project_task_seeds import seed_project_task_data
from sales_order_seeds import seed_sales_order_data

async def run_all_seeds():
    """Run all seed files in the correct order"""
    print("🌱 Starting database seeding process...\n")
    
    try:
        print("1️⃣ Seeding Auth data (Users, Roles, Permissions)...")
        await seed_auth_data()
        
        print("\n2️⃣ Seeding Employee data...")
        await seed_employee_data()
        
        print("\n3️⃣ Seeding Company and Product data...")
        await seed_company_product_data()
        
        print("\n4️⃣ Seeding CRM data (Leads, Tickets, Chats)...")
        await seed_crm_data()
        
        print("\n5️⃣ Seeding Attendance and Leave data...")
        await seed_attendance_leave_data()
        
        print("\n6️⃣ Seeding Project and Task data...")
        await seed_project_task_data()
        
        print("\n7️⃣ Seeding Sales Order data...")
        await seed_sales_order_data()
        
        print("\n✅ All seeds completed successfully! 🎉")
        
    except Exception as e:
        print(f"\n❌ Error during seeding: {e}")
        raise

if __name__ == "__main__":
    asyncio.run(run_all_seeds())
