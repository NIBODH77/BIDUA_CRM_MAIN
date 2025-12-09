
import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import AsyncSessionLocal
from app.models.models import Employee, BankAccount, EmployeeAddress, EmployeeStatus, GenderType, MaritalStatus, AddressType, AccountType
from datetime import date, datetime
from decimal import Decimal

async def seed_employee_data():
    async with AsyncSessionLocal() as db:
        try:
            # Create Employees
            employees = [
                Employee(
                    employee_id="EMP001",
                    name="Rajesh Kumar",
                    email="rajesh.kumar@company.com",
                    phone="9876543210",
                    department="IT",
                    designation="Senior Developer",
                    joining_date=date(2020, 1, 15),
                    salary=Decimal("75000.00"),
                    status=EmployeeStatus.active,
                    address="123 MG Road, Bangalore",
                    emergency_contact="9876543211",
                    date_of_birth=date(1990, 5, 20),
                    gender=GenderType.male,
                    marital_status=MaritalStatus.married,
                    nationality="Indian",
                    blood_group="O+",
                    created_at=datetime.utcnow()
                ),
                Employee(
                    employee_id="EMP002",
                    name="Priya Sharma",
                    email="priya.sharma@company.com",
                    phone="9876543212",
                    department="HR",
                    designation="HR Manager",
                    joining_date=date(2019, 6, 10),
                    salary=Decimal("65000.00"),
                    status=EmployeeStatus.active,
                    address="456 Brigade Road, Bangalore",
                    emergency_contact="9876543213",
                    date_of_birth=date(1988, 8, 15),
                    gender=GenderType.female,
                    marital_status=MaritalStatus.single,
                    nationality="Indian",
                    blood_group="A+",
                    created_at=datetime.utcnow()
                ),
                Employee(
                    employee_id="EMP003",
                    name="Amit Verma",
                    email="amit.verma@company.com",
                    phone="9876543214",
                    department="Sales",
                    designation="Sales Executive",
                    joining_date=date(2021, 3, 1),
                    salary=Decimal("45000.00"),
                    status=EmployeeStatus.active,
                    address="789 Indiranagar, Bangalore",
                    emergency_contact="9876543215",
                    date_of_birth=date(1992, 12, 10),
                    gender=GenderType.male,
                    marital_status=MaritalStatus.single,
                    nationality="Indian",
                    blood_group="B+",
                    created_at=datetime.utcnow()
                ),
            ]
            db.add_all(employees)
            await db.commit()

            # Refresh to get IDs
            for emp in employees:
                await db.refresh(emp)

            # Create Bank Accounts
            bank_accounts = [
                BankAccount(
                    employee_id=employees[0].id,
                    account_number="123456789012",
                    bank_name="HDFC Bank",
                    ifsc_code="HDFC0001234",
                    account_holder_name="Rajesh Kumar",
                    account_type=AccountType.salary,
                    is_primary=True,
                    created_at=datetime.utcnow()
                ),
                BankAccount(
                    employee_id=employees[1].id,
                    account_number="987654321098",
                    bank_name="ICICI Bank",
                    ifsc_code="ICIC0005678",
                    account_holder_name="Priya Sharma",
                    account_type=AccountType.savings,
                    is_primary=True,
                    created_at=datetime.utcnow()
                ),
                BankAccount(
                    employee_id=employees[2].id,
                    account_number="456789012345",
                    bank_name="SBI",
                    ifsc_code="SBIN0009012",
                    account_holder_name="Amit Verma",
                    account_type=AccountType.salary,
                    is_primary=True,
                    created_at=datetime.utcnow()
                ),
            ]
            db.add_all(bank_accounts)
            await db.commit()

            # Create Employee Addresses
            addresses = [
                EmployeeAddress(
                    employee_id=employees[0].id,
                    address_type=AddressType.current,
                    line1="123 MG Road",
                    line2="Flat 4B",
                    city="Bangalore",
                    state="Karnataka",
                    postal_code="560001",
                    country="India",
                    created_at=datetime.utcnow()
                ),
                EmployeeAddress(
                    employee_id=employees[0].id,
                    address_type=AddressType.permanent,
                    line1="45 Civil Lines",
                    line2="",
                    city="Delhi",
                    state="Delhi",
                    postal_code="110054",
                    country="India",
                    created_at=datetime.utcnow()
                ),
                EmployeeAddress(
                    employee_id=employees[1].id,
                    address_type=AddressType.current,
                    line1="456 Brigade Road",
                    line2="Apartment 2C",
                    city="Bangalore",
                    state="Karnataka",
                    postal_code="560025",
                    country="India",
                    created_at=datetime.utcnow()
                ),
            ]
            db.add_all(addresses)
            await db.commit()
            
            print("✅ Employee data seeded successfully!")
            
        except Exception as e:
            print(f"❌ Error seeding employee data: {e}")
            await db.rollback()

if __name__ == "__main__":
    asyncio.run(seed_employee_data())
