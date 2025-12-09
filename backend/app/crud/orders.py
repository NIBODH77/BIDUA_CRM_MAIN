# from typing import Any, Dict, Optional, Union, List
# from sqlalchemy.orm import Session
# from app.crud.base import CRUDBase
# from app.models.models import SalesOrder, SalesOrderItem
# from app.schemas.schemas import SalesOrderCreate,SalesOrderResponse

# class CRUDSalesOrder(CRUDBase[SalesOrder, SalesOrderResponse, Any]):
#     def get_by_company(self, db: Session, *, company_id: int, skip: int = 0, limit: int = 100) -> List[SalesOrder]:
#         return db.query(SalesOrder).filter(SalesOrder.company_id == company_id).offset(skip).limit(limit).all()

#     def create_with_items(self, db: Session, *, obj_in: SalesOrderCreate) -> SalesOrder:
#         # Create the order first
#         order_data = obj_in.dict(exclude={'items'})
#         db_order = SalesOrder(**order_data)
#         db.add(db_order)
#         db.flush()  # Flush to get the ID
        
#         # Create order items
#         for item_data in obj_in.items:
#             db_item = SalesOrderItem(
#                 sales_order_id=db_order.id,
#                 **item_data.dict()
#             )
#             db.add(db_item)
        
#         db.commit()
#         db.refresh(db_order)
#         return db_order

# sales_order = CRUDSalesOrder(SalesOrder)








from typing import Any, List, Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import CRUDBase
from app.models.models import SalesOrder, SalesOrderItem
from app.schemas.schemas import SalesOrderCreate, SalesOrderResponse


class CRUDSalesOrder(CRUDBase[SalesOrder, SalesOrderResponse, Any]):
    async def get_by_company(
        self,
        db: AsyncSession,
        *,
        company_id: int,
        skip: int = 0,
        limit: int = 100,
    ) -> List[SalesOrder]:
        """
        Get sales orders filtered by company ID (paginated).
        """
        stmt = (
            select(SalesOrder)
            .where(SalesOrder.company_id == company_id)
            .offset(skip)
            .limit(limit)
        )
        result = await db.execute(stmt)
        return result.scalars().all()

    async def create_with_items(
        self,
        db: AsyncSession,
        *,
        obj_in: SalesOrderCreate,
    ) -> SalesOrder:
        """
        Create a sales order with its items in a single async transaction.
        """
        # Create the order first
        order_data = obj_in.model_dump(exclude={"items"})
        db_order = SalesOrder(**order_data)
        db.add(db_order)
        await db.flush()  # get db_order.id assigned

        # Create order items
        for item_data in obj_in.items:
            db_item = SalesOrderItem(
                sales_order_id=db_order.id,
                **item_data.model_dump(),
            )
            db.add(db_item)

        await db.commit()
        await db.refresh(db_order)
        return db_order


sales_order = CRUDSalesOrder(SalesOrder)
