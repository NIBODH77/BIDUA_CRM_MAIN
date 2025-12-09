# # from typing import Any, List
# # from fastapi import APIRouter, Depends, HTTPException
# # from sqlalchemy.orm import Session
# # from app import crud, schemas
# # from app.core.database import get_db



# # router = APIRouter()

# # @router.get("/", response_model=List[schemas.AccountResponse])
# # def read_accounts(
# #     db: Session = Depends(get_db),
# #     skip: int = 0,
# #     limit: int = 100,
# # ) -> Any:
# #     """
# #     Retrieve accounts.
# #     """
# #     accounts = crud.account.get_multi(db, skip=skip, limit=limit)
# #     return accounts

# # @router.post("/", response_model=schemas.AccountResponse)
# # def create_account(
# #     *,
# #     db: Session = Depends(get_db),
# #     account_in: schemas.AccountBase,
# # ) -> Any:
# #     """
# #     Create new account.
# #     """
# #     account = crud.account.create(db, obj_in=account_in)
# #     return account

# # @router.get("/{account_id}", response_model=schemas.AccountResponse)
# # def read_account(
# #     account_id: int,
# #     db: Session = Depends(get_db),
# # ) -> Any:
# #     """
# #     Get account by ID.
# #     """
# #     account = crud.account.get(db, id=account_id)
# #     if not account:
# #         raise HTTPException(status_code=404, detail="Account not found")
# #     return account

# # @router.post("/journal-entries/", response_model=schemas.JournalEntryRead)
# # def create_journal_entry(
# #     *,
# #     db: Session = Depends(get_db),
# #     entry_in: schemas.JournalEntryCreate,
# # ) -> Any:
# #     """
# #     Create new journal entry.
# #     """
# #     entry = crud.journal_entry.create_with_lines(db, obj_in=entry_in)
# #     return entry

# # @router.get("/journal-entries/", response_model=List[schemas.JournalEntryRead])
# # def read_journal_entries(
# #     db: Session = Depends(get_db),
# #     skip: int = 0,
# #     limit: int = 100,
# # ) -> Any:
# #     """
# #     Retrieve journal entries.
# #     """
# #     entries = crud.journal_entry.get_multi(db, skip=skip, limit=limit)
# #     return entries









# from typing import Any, List
# from fastapi import APIRouter, Depends, HTTPException, Query, status
# from sqlalchemy.ext.asyncio import AsyncSession

# from app import crud, schemas
# from app.core.database import get_db
# from app.crud.accounts import journal_entry



# router = APIRouter(tags=["accounts"])

# # -------------------------------
# # Accounts
# # -------------------------------

# @router.get("/", response_model=List[schemas.AccountResponse], summary="List accounts")
# async def read_accounts(
#     db: AsyncSession = Depends(get_db),
#     skip: int = Query(0, ge=0),
#     limit: int = Query(100, ge=1, le=200),
# ) -> Any:
#     """
#     Retrieve accounts (paginated).
#     """
#     accounts = await journal_entry.get_multi(db, skip=skip, limit=limit)
#     return accounts


# @router.post(
#     "/",
#     response_model=schemas.AccountResponse,
#     status_code=status.HTTP_201_CREATED,
#     summary="Create account",
# )
# async def create_account(
#     *,
#     db: AsyncSession = Depends(get_db),
#     account_in: schemas.AccountBase,
# ) -> Any:
#     """
#     Create new account.
#     """
#     account = await journal_entry.create(db, obj_in=account_in)
#     return account


# @router.get(
#     "/{account_id}",
#     response_model=schemas.AccountResponse,
#     summary="Get account by ID",
# )
# async def read_account(
#     account_id: int,
#     db: AsyncSession = Depends(get_db),
# ) -> Any:
#     """
#     Get account by ID.
#     """
#     account = await journal_entry.get(db, id=account_id)
#     if not account:
#         raise HTTPException(status_code=404, detail="Account not found")
#     return account


# # -------------------------------
# # Journal Entries
# # -------------------------------

# @router.post(
#     "/journal-entries",
#     response_model=schemas.JournalEntryRead,
#     status_code=status.HTTP_201_CREATED,
#     summary="Create journal entry (with lines)",
# )
# async def create_journal_entry(
#     *,
#     db: AsyncSession = Depends(get_db),
#     entry_in: schemas.JournalEntryCreate,
# ) -> Any:
#     """
#     Create new journal entry with its lines in a single transaction.
#     """
#     entry = await journal_entry.create_with_lines(db, obj_in=entry_in)
#     return entry


# @router.get(
#     "/journal-entries",
#     response_model=List[schemas.JournalEntryRead],
#     summary="List journal entries",
# )
# async def read_journal_entries(
#     db: AsyncSession = Depends(get_db),
#     skip: int = Query(0, ge=0),
#     limit: int = Query(100, ge=1, le=200),
# ) -> Any:
#     """
#     Retrieve journal entries (paginated).
#     """
#     entries = await journal_entry.get_multi(db, skip=skip, limit=limit)
#     return entries
