# # from typing import Any, Dict, Optional, Union, List
# # from sqlalchemy.orm import Session
# # from app.crud.base import CRUDBase
# # from app.models.models import Company, Address
# # from app.schemas.schemas import CompanyCreate, CompanyRead

# # class CRUDCompany(CRUDBase[Company, CompanyCreate, Any]):
# #     def get_by_name(self, db: Session, *, name: str) -> Optional[Company]:
# #         return db.query(Company).filter(Company.name == name).first()

# #     def get_by_gstin(self, db: Session, *, gstin: str) -> Optional[Company]:
# #         return db.query(Company).filter(Company.gstin == gstin).first()

# # company = CRUDCompany(Company)

# # class CRUDAddress(CRUDBase[Address, Any, Any]):
# #     pass

# # address = CRUDAddress(Address)






# from typing import Any, Optional
# from sqlalchemy import select
# from sqlalchemy.ext.asyncio import AsyncSession

# from app.crud.base import CRUDBase
# from app.models.models import Company, Address
# from app.schemas.schemas import CompanyCreate


# class CRUDCompany(CRUDBase[Company, CompanyCreate, Any]):
#     async def get_by_name(self, db: AsyncSession, *, name: str) -> Optional[Company]:
#         result = await db.execute(select(Company).where(Company.name == name))
#         return result.scalars().first()

#     async def get_by_gstin(self, db: AsyncSession, *, gstin: str) -> Optional[Company]:
#         result = await db.execute(select(Company).where(Company.gstin == gstin))
#         return result.scalars().first()


# company = CRUDCompany(Company)


# class CRUDAddress(CRUDBase[Address, Any, Any]):
#     # अभी base CRUD methods ही काफी हैं, लेकिन future में
#     # address-specific filters यहाँ जोड़े जा सकते हैं।
#     pass


# address = CRUDAddress(Address)






from sqlalchemy import select
from sqlalchemy.orm import selectinload  # ← यह जोड़ना ज़रूरी है

from typing import Any, Optional, List
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import CRUDBase
from app.models.models import Company, Address
from app.schemas.schemas import CompanyCreate, CompanyUpdate, AddressCreate, AddressUpdate


# --------------------------
# Company CRUD
# --------------------------
class CRUDCompany(CRUDBase[Company, CompanyCreate, CompanyUpdate]):
    async def get_by_name(self, db: AsyncSession, *, name: str) -> Optional[Company]:
        result = await db.execute(select(Company).where(Company.name == name))
        return result.scalars().first()

    async def get_by_gstin(self, db: AsyncSession, *, gstin: str) -> Optional[Company]:
        result = await db.execute(select(Company).where(Company.gstin == gstin))
        return result.scalars().first()

    async def get_with_address(self, db: AsyncSession, *, company_id: int) -> Optional[Company]:
        """Get company with related address"""
        stmt = select(Company).where(Company.id == company_id).options(
            selectinload(Company.addresses)
        )
        result = await db.execute(stmt)
        return result.scalars().first()


company = CRUDCompany(Company)


# --------------------------
# Address CRUD
# --------------------------
class CRUDAddress(CRUDBase[Address, AddressCreate, AddressUpdate]):
    async def get_by_city(self, db: AsyncSession, *, city: str) -> List[Address]:
        result = await db.execute(select(Address).where(Address.city == city))
        return result.scalars().all()

    async def get_by_company(self, db: AsyncSession, *, company_id: int) -> List[Address]:
        """Filter addresses linked to a company"""
        stmt = select(Address).where(Address.company_id == company_id)
        result = await db.execute(stmt)
        return result.scalars().all()


address = CRUDAddress(Address)
