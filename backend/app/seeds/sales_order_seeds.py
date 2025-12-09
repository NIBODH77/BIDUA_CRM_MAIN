
import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import AsyncSessionLocal
from app.models.models import SalesOrder, SalesOrderItem
from sqlalchemy import select
from datetime import date, datetime
from decimal import Decimal

async def seed_sales_order_data():
    async with AsyncSessionLocal() as db:
        try:
            # Get company IDs
            from app.models.models import Company, Product, Lead
            
            company_result = await db.execute(select(Company).limit(2))
            companies = company_result.scalars().all()
            
            product_result = await db.execute(select(Product).limit(4))
            products = product_result.scalars().all()
            
            lead_result = await db.execute(select(Lead).limit(2))
            leads = lead_result.scalars().all()
            
            if not companies or not products:
                print("⚠️ No companies or products found. Please seed them first.")
                return

            # Create Sales Orders
            sales_orders = [
                SalesOrder(
                    company_id=companies[0].id,
                    order_date=date(2025, 1, 15),
                    due_date=date(2025, 2, 15),
                    notes="Bulk order for office supplies",
                    lead_id=leads[0].id if leads else None
                ),
                SalesOrder(
                    company_id=companies[0].id,
                    order_date=date(2025, 1, 20),
                    due_date=date(2025, 2, 20),
                    notes="Software licenses for team",
                    lead_id=leads[1].id if len(leads) > 1 else (leads[0].id if leads else None)
                ),
                SalesOrder(
                    company_id=companies[1].id if len(companies) > 1 else companies[0].id,
                    order_date=date(2025, 1, 25),
                    due_date=date(2025, 3, 1),
                    notes="Hardware upgrade order"
                ),
            ]
            db.add_all(sales_orders)
            await db.commit()

            for order in sales_orders:
                await db.refresh(order)

            # Create Sales Order Items
            order_items = [
                # Items for Order 1
                SalesOrderItem(
                    sales_order_id=sales_orders[0].id,
                    product_id=products[0].id,
                    quantity=10,
                    unit_price=products[0].price
                ),
                SalesOrderItem(
                    sales_order_id=sales_orders[0].id,
                    product_id=products[1].id,
                    quantity=5,
                    unit_price=products[1].price
                ),
                # Items for Order 2
                SalesOrderItem(
                    sales_order_id=sales_orders[1].id,
                    product_id=products[2].id if len(products) > 2 else products[0].id,
                    quantity=20,
                    unit_price=products[2].price if len(products) > 2 else products[0].price
                ),
                SalesOrderItem(
                    sales_order_id=sales_orders[1].id,
                    product_id=products[3].id if len(products) > 3 else products[1].id,
                    quantity=15,
                    unit_price=products[3].price if len(products) > 3 else products[1].price
                ),
                # Items for Order 3
                SalesOrderItem(
                    sales_order_id=sales_orders[2].id,
                    product_id=products[0].id,
                    quantity=25,
                    unit_price=products[0].price
                ),
            ]
            db.add_all(order_items)
            await db.commit()
            
            print("✅ Sales Order data seeded successfully!")
            
        except Exception as e:
            print(f"❌ Error seeding sales order data: {e}")
            await db.rollback()

if __name__ == "__main__":
    asyncio.run(seed_sales_order_data())
