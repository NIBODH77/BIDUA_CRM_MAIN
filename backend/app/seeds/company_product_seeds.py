
import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import AsyncSessionLocal
from app.models.models import Company, Address, Category, Product
from datetime import datetime
from decimal import Decimal

async def seed_company_product_data():
    async with AsyncSessionLocal() as db:
        try:
            # Create Companies
            companies = [
                Company(
                    name="Tech Solutions Pvt Ltd",
                    gstin="29ABCDE1234F1Z5",
                    contact_email="info@techsolutions.com",
                    contact_phone="080-12345678",
                    address="Bangalore"
                ),
                Company(
                    name="Digital Services India",
                    gstin="07FGHIJ5678K2M9",
                    contact_email="contact@digitalservices.in",
                    contact_phone="011-87654321",
                    address="Delhi"
                ),
            ]
            db.add_all(companies)
            await db.commit()

            for comp in companies:
                await db.refresh(comp)

            # Create Addresses
            addresses = [
                Address(
                    street="123 MG Road",
                    city="Bangalore",
                    state="Karnataka",
                    country="India",
                    zip_code="560001",
                    company_id=companies[0].id,
                    created_at=datetime.utcnow()
                ),
                Address(
                    street="456 Connaught Place",
                    city="Delhi",
                    state="Delhi",
                    country="India",
                    zip_code="110001",
                    company_id=companies[1].id,
                    created_at=datetime.utcnow()
                ),
            ]
            db.add_all(addresses)
            await db.commit()

            # Create Categories
            categories = [
                Category(
                    company_id=companies[0].id,
                    slug="electronics",
                    name="Electronics",
                    description="Electronic items and gadgets",
                    is_active=True,
                    created_at=datetime.utcnow()
                ),
                Category(
                    company_id=companies[0].id,
                    slug="software",
                    name="Software",
                    description="Software products and licenses",
                    is_active=True,
                    created_at=datetime.utcnow()
                ),
                Category(
                    company_id=companies[1].id,
                    slug="services",
                    name="Services",
                    description="Professional services",
                    is_active=True,
                    created_at=datetime.utcnow()
                ),
            ]
            db.add_all(categories)
            await db.commit()

            for cat in categories:
                await db.refresh(cat)

            # Create Products
            products = [
                Product(
                    category_id=categories[0].id,
                    sku="ELEC001",
                    name="Wireless Mouse",
                    description="Ergonomic wireless mouse",
                    price=Decimal("799.00"),
                    mrp=Decimal("999.00"),
                    stock=50,
                    is_active=True,
                    created_at=datetime.utcnow()
                ),
                Product(
                    category_id=categories[0].id,
                    sku="ELEC002",
                    name="USB Keyboard",
                    description="Mechanical keyboard with LED",
                    price=Decimal("1499.00"),
                    mrp=Decimal("1999.00"),
                    stock=30,
                    is_active=True,
                    created_at=datetime.utcnow()
                ),
                Product(
                    category_id=categories[1].id,
                    sku="SOFT001",
                    name="Antivirus License",
                    description="1 Year Premium License",
                    price=Decimal("2999.00"),
                    mrp=Decimal("3999.00"),
                    stock=100,
                    is_active=True,
                    created_at=datetime.utcnow()
                ),
                Product(
                    category_id=categories[1].id,
                    sku="SOFT002",
                    name="Office Suite",
                    description="Complete office productivity suite",
                    price=Decimal("5999.00"),
                    mrp=Decimal("7999.00"),
                    stock=75,
                    is_active=True,
                    created_at=datetime.utcnow()
                ),
            ]
            db.add_all(products)
            await db.commit()
            
            print("✅ Company and Product data seeded successfully!")
            
        except Exception as e:
            print(f"❌ Error seeding company/product data: {e}")
            await db.rollback()

if __name__ == "__main__":
    asyncio.run(seed_company_product_data())
