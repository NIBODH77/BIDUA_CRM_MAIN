# from typing import Any, List
# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from app import crud, schemas
# from app.core.database import get_db

# router = APIRouter()

# @router.get("/", response_model=List[schemas.SalesOrderResponse])
# def read_sales_orders(
#     db: Session = Depends(get_db),
#     skip: int = 0,
#     limit: int = 100,
# ) -> Any:
#     """
#     Retrieve sales orders.
#     """
#     orders = crud.sales_order.get_multi(db, skip=skip, limit=limit)
#     return orders

# @router.post("/", response_model=schemas.SalesOrderResponse)
# def create_sales_order(
#     *,
#     db: Session = Depends(get_db),
#     order_in: schemas.SalesOrderCreate,
# ) -> Any:
#     """
#     Create new sales order.
#     """
#     order = crud.sales_order.create_with_items(db, obj_in=order_in)
#     return order

# @router.get("/{order_id}", response_model=schemas.SalesOrderResponse)
# def read_sales_order(
#     order_id: int,
#     db: Session = Depends(get_db),
# ) -> Any:
#     """
#     Get sales order by ID.
#     """
#     order = crud.sales_order.get(db, id=order_id)
#     if not order:
#         raise HTTPException(status_code=404, detail="Sales order not found")
#     return order

# @router.delete("/{order_id}")
# def delete_sales_order(
#     *,
#     db: Session = Depends(get_db),
#     order_id: int,
# ) -> Any:
#     """
#     Delete sales order.
#     """
#     order = crud.sales_order.get(db, id=order_id)
#     if not order:
#         raise HTTPException(status_code=404, detail="Sales order not found")
#     order = crud.sales_order.remove(db, id=order_id)
#     return {"message": "Sales order deleted successfully"}






from fastapi import APIRouter, Depends, HTTPException, Query, status, Response

from typing import Any, List
from sqlalchemy.ext.asyncio import AsyncSession

from app import crud, schemas
from app.core.database import get_db
from app.crud.orders import sales_order

# ⛔️ अगर write ops secure करने हैं:
# from app.api.deps import get_current_active_user

router = APIRouter()# from typing import Any, List
# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from app import crud, schemas
# from app.core.database import get_db

# router = APIRouter()

# @router.get("/", response_model=List[schemas.SalesOrderResponse])
# def read_sales_orders(
#     db: Session = Depends(get_db),
#     skip: int = 0,
#     limit: int = 100,
# ) -> Any:
#     """
#     Retrieve sales orders.
#     """
#     orders = crud.sales_order.get_multi(db, skip=skip, limit=limit)
#     return orders

# @router.post("/", response_model=schemas.SalesOrderResponse)
# def create_sales_order(
#     *,
#     db: Session = Depends(get_db),
#     order_in: schemas.SalesOrderCreate,
# ) -> Any:
#     """
#     Create new sales order.
#     """
#     order = crud.sales_order.create_with_items(db, obj_in=order_in)
#     return order

# @router.get("/{order_id}", response_model=schemas.SalesOrderResponse)
# def read_sales_order(
#     order_id: int,
#     db: Session = Depends(get_db),
# ) -> Any:
#     """
#     Get sales order by ID.
#     """
#     order = crud.sales_order.get(db, id=order_id)
#     if not order:
#         raise HTTPException(status_code=404, detail="Sales order not found")
#     return order

# @router.delete("/{order_id}")
# def delete_sales_order(
#     *,
#     db: Session = Depends(get_db),
#     order_id: int,
# ) -> Any:
#     """
#     Delete sales order.
#     """
#     order = crud.sales_order.get(db, id=order_id)
#     if not order:
#         raise HTTPException(status_code=404, detail="Sales order not found")
#     order = crud.sales_order.remove(db, id=order_id)
#     return {"message": "Sales order deleted successfully"}




from fastapi import APIRouter, Depends, HTTPException, Query, status, Response
from typing import Any, List
from sqlalchemy.ext.asyncio import AsyncSession
from app import schemas
from app.core.database import get_db
from app.crud.orders import sales_order

router = APIRouter()


# --------------------------
# List all sales orders
# --------------------------
@router.get(
    "/",
    response_model=List[schemas.SalesOrderResponse],
    summary="List sales orders",
    operation_id="get_all_sales_orders",
)
async def read_sales_orders(
    db: AsyncSession = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=200),
) -> Any:
    """
    Retrieve sales orders (paginated).
    """
    orders = await sales_order.get_multi(db, skip=skip, limit=limit)
    return orders


# --------------------------
# Create new sales order
# --------------------------
@router.post(
    "/",
    response_model=schemas.SalesOrderResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create sales order with items",
    operation_id="create_new_sales_order",
)
async def create_sales_order(
    *,
    db: AsyncSession = Depends(get_db),
    order_in: schemas.SalesOrderCreate,
) -> Any:
    """
    Create new sales order (with items) in a single transaction.
    """
    order = await sales_order.create_with_items(db, obj_in=order_in)
    return order


# --------------------------
# Get sales order by ID
# --------------------------
@router.get(
    "/{order_id}",
    response_model=schemas.SalesOrderResponse,
    summary="Get sales order by ID",
    operation_id="get_sales_order_by_id",
)
async def read_sales_order(
    order_id: int,
    db: AsyncSession = Depends(get_db),
) -> Any:
    """
    Get sales order by ID.
    """
    order = await sales_order.get(db, id=order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Sales order not found")
    return order


# --------------------------
# Delete sales order by ID
# --------------------------
@router.delete(
    "/{order_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    response_class=Response,
    summary="Delete sales order",
    operation_id="delete_sales_order_by_id",
)
async def delete_order(
    *,
    db: AsyncSession = Depends(get_db),
    order_id: int,
) -> None:
    """
    Delete sales order.
    """
    order = await sales_order.get(db, id=order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Sales order not found")
    await sales_order.remove(db, id=order_id)
    return None
