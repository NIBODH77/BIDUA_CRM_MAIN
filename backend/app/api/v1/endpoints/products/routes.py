from fastapi import APIRouter, Depends, HTTPException, Query, status, Response
from typing import Any, List
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas import schemas
from app.core.database import get_db
from app.crud.products import product as crud_product, category as crud_category

router = APIRouter()


@router.get("/categories", response_model=List[schemas.CategoryRead], summary="List all categories")
async def read_categories(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100
) -> Any:
    categories = await crud_category.get_multi(db, skip=skip, limit=limit)
    return categories

@router.post("/categories", response_model=schemas.CategoryRead, status_code=status.HTTP_201_CREATED, summary="Create category")
async def create_category(
    *,
    db: AsyncSession = Depends(get_db),
    category_in: schemas.CategoryCreate
) -> Any:
    existing = await crud_category.get_by_slug(db, slug=category_in.slug)
    if existing:
        raise HTTPException(status_code=400, detail="Category with this slug already exists.")
    category = await crud_category.create(db, obj_in=category_in)
    return category

@router.get("/categories/{category_id}", response_model=schemas.CategoryRead, summary="Get category by ID")
async def read_category(category_id: int, db: AsyncSession = Depends(get_db)) -> Any:
    category = await crud_category.get(db, id=category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

@router.put("/categories/{category_id}", response_model=schemas.CategoryRead, summary="Update category")
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

@router.delete("/categories/{category_id}", status_code=status.HTTP_204_NO_CONTENT, response_class=Response, summary="Delete category")
async def delete_category(*, db: AsyncSession = Depends(get_db), category_id: int) -> None:
    db_obj = await crud_category.get(db, id=category_id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Category not found")
    await crud_category.remove(db, id=category_id)
    return None


@router.get("/", response_model=List[schemas.ProductRead], summary="List all products")
async def read_products(
    db: AsyncSession = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=200),
) -> Any:
    products = await crud_product.get_multi(db, skip=skip, limit=limit)
    return products

@router.post("/", response_model=schemas.ProductRead, status_code=status.HTTP_201_CREATED, summary="Create product")
async def create_product(
    *,
    db: AsyncSession = Depends(get_db),
    product_in: schemas.ProductCreate,
) -> Any:
    existing = await crud_product.get_by_sku(db, sku=product_in.sku)
    if existing:
        raise HTTPException(status_code=400, detail="Product with this SKU already exists.")
    product = await crud_product.create(db, obj_in=product_in)
    return product

@router.get("/{product_id}", response_model=schemas.ProductRead, summary="Get product by ID")
async def read_product(product_id: int, db: AsyncSession = Depends(get_db)) -> Any:
    product = await crud_product.get(db, id=product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.put("/{product_id}", response_model=schemas.ProductRead, summary="Update product")
async def update_product(
    *,
    db: AsyncSession = Depends(get_db),
    product_id: int,
    product_in: schemas.ProductUpdate,
) -> Any:
    db_obj = await crud_product.get(db, id=product_id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Product not found")
    product = await crud_product.update(db, db_obj=db_obj, obj_in=product_in)
    return product

@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT, response_class=Response, summary="Delete product")
async def delete_product(*, db: AsyncSession = Depends(get_db), product_id: int) -> None:
    db_obj = await crud_product.get(db, id=product_id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Product not found")
    await crud_product.remove(db, id=product_id)
    return None

@router.get("/categories/{category_id}/products", response_model=List[schemas.ProductRead], summary="Get products by category")
async def read_products_by_category(
    category_id: int,
    db: AsyncSession = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=200),
) -> Any:
    products = await crud_product.get_by_category(db, category_id=category_id, skip=skip, limit=limit)
    return products
