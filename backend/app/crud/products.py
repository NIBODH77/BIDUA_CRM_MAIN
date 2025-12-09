# from typing import Any, Dict, Optional, Union, List
# from sqlalchemy.orm import Session
# from app.crud.base import CRUDBase
# from app.models.models import Product, Category
# from app.schemas.schemas import ProductCreate, ProductUpdate

# class CRUDProduct(CRUDBase[Product, ProductCreate, ProductUpdate]):
#     def get_by_sku(self, db: Session, *, sku: str) -> Optional[Product]:
#         return db.query(Product).filter(Product.sku == sku).first()

#     def get_by_category(self, db: Session, *, category_id: int, skip: int = 0, limit: int = 100) -> List[Product]:
#         return db.query(Product).filter(Product.category_id == category_id).offset(skip).limit(limit).all()

#     def get_active_products(self, db: Session, *, skip: int = 0, limit: int = 100) -> List[Product]:
#         return db.query(Product).filter(Product.is_active == True).offset(skip).limit(limit).all()

# product = CRUDProduct(Product)

# class CRUDCategory(CRUDBase[Category, Any, Any]):
#     def get_by_name(self, db: Session, *, name: str) -> Optional[Category]:
#         return db.query(Category).filter(Category.name == name).first()

# category = CRUDCategory(Category)





# from typing import Any, Dict, Optional, List
# from sqlalchemy import select
# from sqlalchemy.ext.asyncio import AsyncSession

# from app.crud.base import CRUDBase
# from app.models.models import Product, Category
# from app.schemas.schemas import ProductCreate, ProductUpdate


# class CRUDProduct(CRUDBase[Product, ProductCreate, ProductUpdate]):
#     async def get_by_sku(self, db: AsyncSession, *, sku: str) -> Optional[Product]:
#         result = await db.execute(select(Product).where(Product.sku == sku))
#         return result.scalars().first()

#     async def get_by_category(
#         self,
#         db: AsyncSession,
#         *,
#         category_id: int,
#         skip: int = 0,
#         limit: int = 100,
#     ) -> List[Product]:
#         stmt = (
#             select(Product)
#             .where(Product.category_id == category_id)
#             .offset(skip)
#             .limit(limit)
#         )
#         result = await db.execute(stmt)
#         return result.scalars().all()

#     async def get_active_products(
#         self,
#         db: AsyncSession,
#         *,
#         skip: int = 0,
#         limit: int = 100,
#     ) -> List[Product]:
#         stmt = (
#             select(Product)
#             .where(Product.is_active.is_(True))
#             .offset(skip)
#             .limit(limit)
#         )
#         result = await db.execute(stmt)
#         return result.scalars().all()


# product = CRUDProduct(Product)


# class CRUDCategory(CRUDBase[Category, Any, Any]):
#     async def get_by_name(self, db: AsyncSession, *, name: str) -> Optional[Category]:
#         result = await db.execute(select(Category).where(Category.name == name))
#         return result.scalars().first()


# category = CRUDCategory(Category)




from typing import Any, List, Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import CRUDBase
from app.models.models import Product
from app.schemas.schemas import ProductCreate, ProductUpdate

from app.models import models
from app.schemas import schemas



class CRUDCategory(CRUDBase[models.Category, schemas.CategoryCreate, schemas.CategoryUpdate]):
    
    async def get_by_slug(self, db: AsyncSession, slug: str) -> Optional[models.Category]:
        """
        Get category by slug.
        """
        result = await db.execute(select(models.Category).where(models.Category.slug == slug))
        return result.scalar_one_or_none()

    async def get_by_company(self, db: AsyncSession, company_id: int) -> List[models.Category]:
        """
        Get all categories by company_id.
        """
        result = await db.execute(
            select(models.Category).where(models.Category.company_id == company_id)
        )
        return result.scalars().all()


# Create a singleton instance of CRUDCategory
category = CRUDCategory(models.Category)



# --------------------------
# Product CRUD
# --------------------------
class CRUDProduct(CRUDBase[Product, ProductCreate, ProductUpdate]):
    async def get_by_sku(self, db: AsyncSession, *, sku: str) -> Optional[Product]:
        """
        Get a single product by SKU
        """
        result = await db.execute(select(Product).where(Product.sku == sku))
        return result.scalars().first()

    async def get_by_category(
        self,
        db: AsyncSession,
        *,
        category_id: int,
        skip: int = 0,
        limit: int = 100,
    ) -> List[Product]:
        """
        Get all products in a specific category with pagination
        """
        stmt = select(Product).where(Product.category_id == category_id).offset(skip).limit(limit)
        result = await db.execute(stmt)
        return result.scalars().all()

    async def get_active_products(
        self,
        db: AsyncSession,
        *,
        skip: int = 0,
        limit: int = 100,
    ) -> List[Product]:
        """
        Get all active products with pagination
        """
        stmt = select(Product).where(Product.is_active.is_(True)).offset(skip).limit(limit)
        result = await db.execute(stmt)
        return result.scalars().all()


product = CRUDProduct(Product)

