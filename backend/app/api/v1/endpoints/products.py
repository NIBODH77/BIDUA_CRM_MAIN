# from typing import Any, List
# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from app.schemas import  schemas
# from app.core.database import get_db
# from app import crud

# router = APIRouter()

# @router.get("/", response_model=List[schemas.ProductRead])
# def read_products(
#     db: Session = Depends(get_db),
#     skip: int = 0,
#     limit: int = 100,
# ) -> Any:
#     """
#     Retrieve products.
#     """
#     products = crud.product.get_multi(db, skip=skip, limit=limit)
#     return products

# @router.post("/", response_model=schemas.ProductRead)
# def create_product(
#     *,
#     db: Session = Depends(get_db),
#     product_in: schemas.ProductCreate,
# ) -> Any:
#     """
#     Create new product.
#     """
#     product = crud.product.get_by_sku(db, sku=product_in.sku)
#     if product:
#         raise HTTPException(
#             status_code=400,
#             detail="Product with this SKU already exists.",
#         )
#     product = crud.product.create(db, obj_in=product_in)
#     return product

# @router.get("/{product_id}", response_model=schemas.ProductRead)
# def read_product(
#     product_id: int,
#     db: Session = Depends(get_db),
# ) -> Any:
#     """
#     Get product by ID.
#     """
#     product = crud.product.get(db, id=product_id)
#     if not product:
#         raise HTTPException(status_code=404, detail="Product not found")
#     return product

# @router.put("/{product_id}", response_model=schemas.ProductRead)
# def update_product(
#     *,
#     db: Session = Depends(get_db),
#     product_id: int,
#     product_in: schemas.ProductUpdate,
# ) -> Any:
#     """
#     Update product.
#     """
#     product = crud.product.get(db, id=product_id)
#     if not product:
#         raise HTTPException(status_code=404, detail="Product not found")
#     product = crud.product.update(db, db_obj=product, obj_in=product_in)
#     return product

# @router.delete("/{product_id}")
# def delete_product(
#     *,
#     db: Session = Depends(get_db),
#     product_id: int,
# ) -> Any:
#     """
#     Delete product.
#     """
#     product = crud.product.get(db, id=product_id)
#     if not product:
#         raise HTTPException(status_code=404, detail="Product not found")
#     product = crud.product.remove(db, id=product_id)
#     return {"message": "Product deleted successfully"}

# @router.get("/category/{category_id}", response_model=List[schemas.ProductRead])
# def read_products_by_category(
#     category_id: int,
#     db: Session = Depends(get_db),
#     skip: int = 0,
#     limit: int = 100,
# ) -> Any:
#     """
#     Get products by category.
#     """
#     products = crud.product.get_by_category(db, category_id=category_id, skip=skip, limit=limit)
#     return products





from fastapi import APIRouter, Depends, HTTPException, Query, status, Response
from typing import Any, List
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas import schemas
from app.core.database import get_db
from app.crud.products import product as crud_product,category as crud_category 

router = APIRouter()




# ----------------------------------
# CATEGORY ROUTES (ADD THIS SECTION)
# ----------------------------------






# --------------------------
# List all categories
# --------------------------
@router.get(
    "/",
    response_model=List[schemas.CategoryRead],
    summary="List all categories",
    operation_id="get_all_categories"
)
async def read_categories(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100
) -> Any:
    categories = await crud_category.get_multi(db, skip=skip, limit=limit)
    return categories


# --------------------------
# Create new category
# --------------------------
@router.post(
    "/",
    response_model=schemas.CategoryRead,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new category",
    operation_id="create_category"
)
async def create_category(
    *,
    db: AsyncSession = Depends(get_db),
    category_in: schemas.CategoryCreate
) -> Any:
    # check duplicate slug
    existing = await crud_category.get_by_slug(db, slug=category_in.slug)
    if existing:
        raise HTTPException(
            status_code=400,
            detail="Category with this slug already exists."
        )
    category = await crud_category.create(db, obj_in=category_in)
    return category


# --------------------------
# Get category by ID
# --------------------------
@router.get(
    "/category/{category_id}",
    response_model=schemas.CategoryRead,
    summary="Get category by ID",
    operation_id="get_category_by_id"
)
async def read_category(
    category_id: int,
    db: AsyncSession = Depends(get_db)
) -> Any:
    category = await crud_category.get(db, id=category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category


# --------------------------
# Update category
# --------------------------
@router.put(
    "/{category_id}",
    response_model=schemas.CategoryRead,
    summary="Update a category",
    operation_id="update_category"
)
async def update_category(
    *,
    db: AsyncSession = Depends(get_db),
    category_id: int,
    category_in: schemas.CategoryUpdate
) -> Any:
    db_obj = await crud_category.get(db, id=category_id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Category not found")
    category = await crud_category.update(db, db_obj=db_obj, obj_in=category_in)
    return category


# --------------------------
# Delete category
# --------------------------
@router.delete(
    "/{category_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    response_class=Response,
    summary="Delete a category",
    operation_id="delete_category"
)
async def delete_category(
    *,
    db: AsyncSession = Depends(get_db),
    category_id: int
) -> None:
    db_obj = await crud_category.get(db, id=category_id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Category not found")
    await crud_category.remove(db, id=category_id)
    return None




# ==================== Product Related End Point ==========================


@router.get("/category", response_model=List[schemas.ProductRead])
async def read_products(
    db: AsyncSession = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=200),
) -> Any:
    """
    Retrieve products.
    """
    products = await crud_product.get_multi(db, skip=skip, limit=limit)
    return products


@router.post(
    "/category",
    response_model=schemas.ProductRead,
    status_code=status.HTTP_201_CREATED,
)
async def create_product(
    *,
    db: AsyncSession = Depends(get_db),
    product_in: schemas.ProductCreate,
) -> Any:
    """
    Create new product.
    """
    existing = await crud_product.get_by_sku(db, sku=product_in.sku)
    if existing:
        raise HTTPException(
            status_code=400,
            detail="Product with this SKU already exists.",
        )
    product = await crud_product.create(db, obj_in=product_in)
    return product


@router.get("/category/{product_id}", response_model=schemas.ProductRead)
async def read_product(
    product_id: int,
    db: AsyncSession = Depends(get_db),
) -> Any:
    """
    Get product by ID.
    """
    product = await crud_product.get(db, id=product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.put("/category/{product_id}", response_model=schemas.ProductRead)
async def update_product(
    *,
    db: AsyncSession = Depends(get_db),
    product_id: int,
    product_in: schemas.ProductUpdate,
) -> Any:
    """
    Update product.
    """
    db_obj = await crud_product.get(db, id=product_id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Product not found")
    product = await crud_product.update(db, db_obj=db_obj, obj_in=product_in)
    return product


@router.delete(
    "/{product_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    response_class=Response,           # 👈 add this
)
async def delete_product(
    *,
    db: AsyncSession = Depends(get_db),
    product_id: int,
) -> None:                             # 👈 return type None (optional)
    db_obj = await crud_product.get(db, id=product_id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Product not found")
    await crud_product.remove(db, id=product_id)
    # return Response(status_code=status.HTTP_204_NO_CONTENT)  # optional
    return None


@router.get("/category/{category_id}", response_model=List[schemas.ProductRead])
async def read_products_by_category(
    category_id: int,
    db: AsyncSession = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=200),
) -> Any:
    """
    Get products by category.
    """
    products = await crud_product.get_by_category(
        db, category_id=category_id, skip=skip, limit=limit
    )
    return products
