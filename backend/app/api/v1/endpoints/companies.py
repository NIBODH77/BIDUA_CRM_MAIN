# # from typing import Any, List
# # from fastapi import APIRouter, Depends, HTTPException
# # from sqlalchemy.orm import Session
# # from app import crud, schemas
# # from app.core.database import get_db

# # router = APIRouter()

# # @router.get("/", response_model=List[schemas.CompanyRead])
# # def read_companies(
# #     db: Session = Depends(get_db),
# #     skip: int = 0,
# #     limit: int = 100,
# # ) -> Any:
# #     """
# #     Retrieve companies.
# #     """
# #     companies = crud.company.get_multi(db, skip=skip, limit=limit)
# #     return companies

# # @router.post("/", response_model=schemas.CompanyRead)
# # def create_company(
# #     *,
# #     db: Session = Depends(get_db),
# #     company_in: schemas.CompanyCreate,
# # ) -> Any:
# #     """
# #     Create new company.
# #     """
# #     company = crud.company.create(db, obj_in=company_in)
# #     return company

# # @router.get("/{company_id}", response_model=schemas.CompanyRead)
# # def read_company(
# #     company_id: int,
# #     db: Session = Depends(get_db),
# # ) -> Any:
# #     """
# #     Get company by ID.
# #     """
# #     company = crud.company.get(db, id=company_id)
# #     if not company:
# #         raise HTTPException(status_code=404, detail="Company not found")
# #     return company

# # @router.delete("/{company_id}")
# # def delete_company(
# #     *,
# #     db: Session = Depends(get_db),
# #     company_id: int,
# # ) -> Any:
# #     """
# #     Delete company.
# #     """
# #     company = crud.company.get(db, id=company_id)
# #     if not company:
# #         raise HTTPException(status_code=404, detail="Company not found")
# #     company = crud.company.remove(db, id=company_id)
# #     return {"message": "Company deleted successfully"}






# # from typing import Any, List
# # from sqlalchemy.ext.asyncio import AsyncSession

# # from app import crud, schemas
# # from app.core.database import get_db
# # from fastapi import APIRouter, Depends, HTTPException, Query, status, Response

# # ⛔️ अगर write ops secure करने हैं:
# # from app.api.deps import get_current_active_user


# # app/api/v1/endpoints/companies.py
# from fastapi import APIRouter, Depends, HTTPException, status, Response, Query
# from typing import Any, List

# from sqlalchemy.ext.asyncio import AsyncSession
# from app.crud.companies import address , company # ⬅ direct import
# from app.core.database import get_db
# from app import  schemas



# router = APIRouter(tags=["companies"])


# @router.get("/", response_model=List[schemas.CompanyRead], summary="List companies")
# async def read_companies(
#     db: AsyncSession = Depends(get_db),
#     skip: int = Query(0, ge=0),
#     limit: int = Query(100, ge=1, le=200),
# ) -> Any:
#     """
#     Retrieve companies (paginated).
#     """
#     companies = await address.get_multi(db, skip=skip, limit=limit)
#     return companies


# @router.post(
#     "/",
#     response_model=schemas.CompanyRead,
#     status_code=status.HTTP_201_CREATED,
#     summary="Create company",
# )
# async def create_company(
#     *,
#     db: AsyncSession = Depends(get_db),
#     company_in: schemas.CompanyCreate,
#     # current_user: User = Depends(get_current_active_user)  # अगर चाहिए
# ) -> Any:
#     """
#     Create new company.
#     """
#     company = await address.create(db, obj_in=company_in)
#     return company


# @router.get(
#     "/{company_id}",
#     response_model=schemas.CompanyRead,
#     summary="Get company by ID",
# )
# async def read_company(
#     company_id: int,
#     db: AsyncSession = Depends(get_db),
# ) -> Any:
#     """
#     Get company by ID.
#     """
#     company = await address.get(db, id=company_id)
#     if not company:
#         raise HTTPException(status_code=404, detail="Company not found")
#     return company



# @router.delete(
#     "/{company_id}",
#     status_code=status.HTTP_204_NO_CONTENT,
#     response_class=Response,              # 👈 add this
#     summary="Delete company",
# )
# async def delete_company(
#     *,
#     db: AsyncSession = Depends(get_db),
#     company_id: int,
# ) -> None:                                # 👈 (optional) make it clear there's no body
#     company = await address.get(db, id=company_id)
#     if not company:
#         raise HTTPException(status_code=404, detail="Company not found")
#     await address.remove(db, id=company_id)
#     return None  





from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, Query, status, Response
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.crud.companies import company, address
from app.schemas.schemas import CompanyCreate, CompanyRead, AddressCreate, AddressRead
from app.core.database import get_db

router = APIRouter(tags=["companies"])


# --------------------------
# Company Endpoints
# --------------------------
@router.get("/", response_model=List[CompanyRead], summary="List companies")
async def read_companies(
    db: AsyncSession = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=200),
) -> Any:
    companies_list = await company.get_multi(db, skip=skip, limit=limit)
    return companies_list


@router.post(
    "/",
    response_model=CompanyRead,
    status_code=status.HTTP_201_CREATED,
    summary="Create company",
)
async def create_company(
    *,
    db: AsyncSession = Depends(get_db),
    company_in: CompanyCreate,
) -> Any:
    # 🔐 Step 1: Check Duplicate GSTIN
    existing = await company.get_by_gstin(db, gstin=company_in.gstin)
    if existing:
        raise HTTPException(
            status_code=400,
            detail="This GSTIN is already registered with another company.",
        )

    # 🛠 Step 2: Create Company
    new_company = await company.create(db, obj_in=company_in)
    return new_company


@router.get("/{company_id}", response_model=CompanyRead, summary="Get company by ID")
async def read_company(
    company_id: int,
    db: AsyncSession = Depends(get_db),
) -> Any:
    db_company = await company.get(db, id=company_id)
    if not db_company:
        raise HTTPException(status_code=404, detail="Company not found")

    # 🚫 Prevent Lazy Loading Crash
    await db.refresh(db_company)
    return db_company


@router.delete(
    "/{company_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    response_class=Response,
    summary="Delete company",
)
async def delete_company(
    company_id: int,
    db: AsyncSession = Depends(get_db),
) -> None:
    db_company = await company.get(db, id=company_id)
    if not db_company:
        raise HTTPException(status_code=404, detail="Company not found")
    await company.remove(db, id=company_id)
    return None


# --------------------------
# Address Endpoints
# --------------------------
@router.post(
    "/address/",
    response_model=AddressRead,
    status_code=status.HTTP_201_CREATED,
    summary="Create Address",
)
async def create_address(
    *,
    db: AsyncSession = Depends(get_db),
    address_in: AddressCreate,
) -> Any:
    new_address = await address.create(db, obj_in=address_in)
    return new_address


@router.get("/address/", response_model=List[AddressRead], summary="List Addresses")
async def read_addresses(
    db: AsyncSession = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=200),
) -> Any:
    addresses_list = await address.get_multi(db, skip=skip, limit=limit)
    return addresses_list
