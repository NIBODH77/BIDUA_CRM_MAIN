# # from typing import Any, Dict, Optional, Union, List
# # from sqlalchemy.orm import Session
# # from app.crud.base import CRUDBase
# # from app.models.models import Account, JournalEntry, JournalEntryLine
# # from app.schemas.schemas import JournalEntryCreate

# # class CRUDAccount(CRUDBase[Account, Any, Any]):
# #     def get_by_code(self, db: Session, *, code: str) -> Optional[Account]:
# #         return db.query(Account).filter(Account.code == code).first()

# #     def get_by_type(self, db: Session, *, account_type: str, skip: int = 0, limit: int = 100) -> List[Account]:
# #         return db.query(Account).filter(Account.account_type == account_type).offset(skip).limit(limit).all()

# # account = CRUDAccount(Account)

# # class CRUDJournalEntry(CRUDBase[JournalEntry, JournalEntryCreate, Any]):
# #     def create_with_lines(self, db: Session, *, obj_in: JournalEntryCreate) -> JournalEntry:
# #         # Create the journal entry first
# #         entry_data = obj_in.dict(exclude={'lines'})
# #         db_entry = JournalEntry(**entry_data)
# #         db.add(db_entry)
# #         db.flush()  # Flush to get the ID
        
# #         # Create journal entry lines
# #         for line_data in obj_in.lines:
# #             db_line = JournalEntryLine(
# #                 journal_entry_id=db_entry.id,
# #                 **line_data.dict()
# #             )
# #             db.add(db_line)
        
# #         db.commit()
# #         db.refresh(db_entry)
# #         return db_entry

# # journal_entry = CRUDJournalEntry(JournalEntry)


# from typing import Any, List, Optional
# from sqlalchemy import select
# from sqlalchemy.ext.asyncio import AsyncSession
# from sqlalchemy.orm import selectinload

# from app.crud.base import CRUDBase
# from app.models.models import Account, JournalEntry, JournalEntryLine
# from app.schemas.schemas import AccountBase, AccountUpdate, JournalEntryCreate, JournalEntryUpdate, JournalEntryLineCreate


# # --------------------------
# # Account CRUD
# # --------------------------
# class CRUDAccount(CRUDBase[Account, AccountBase, AccountUpdate]):

#     async def get_multi(self, db: AsyncSession, *, skip: int = 0, limit: int = 100) -> List[Account]:
#         result = await db.execute(
#             select(Account)
#             .offset(skip)
#             .limit(limit)
#         )
#         return result.scalars().all()

#     async def get(self, db: AsyncSession, *, id: int) -> Optional[Account]:
#         result = await db.execute(select(Account).where(Account.id == id))
#         return result.scalars().first()


# account = CRUDAccount(Account)


# # --------------------------
# # Journal Entry CRUD
# # --------------------------
# class CRUDJournalEntry(CRUDBase[JournalEntry, JournalEntryCreate, JournalEntryUpdate]):

#     async def get_multi(self, db: AsyncSession, *, skip: int = 0, limit: int = 100) -> List[JournalEntry]:
#         result = await db.execute(
#             select(JournalEntry)
#             .options(selectinload(JournalEntry.lines))  # eager load lines
#             .offset(skip)
#             .limit(limit)
#         )
#         return result.scalars().all()

#     async def get(self, db: AsyncSession, *, id: int) -> Optional[JournalEntry]:
#         result = await db.execute(
#             select(JournalEntry)
#             .where(JournalEntry.id == id)
#             .options(selectinload(JournalEntry.lines))
#         )
#         return result.scalars().first()

#     async def create_with_lines(self, db: AsyncSession, *, obj_in: JournalEntryCreate) -> JournalEntry:
#         """
#         Create a journal entry along with its lines in a single transaction.
#         """
#         entry_data = obj_in.dict(exclude={"lines"})
#         entry = JournalEntry(**entry_data)

#         for line_in in obj_in.lines:
#             line = JournalEntryLine(**line_in.dict())
#             entry.lines.append(line)

#         db.add(entry)
#         await db.commit()
#         await db.refresh(entry)
#         return entry

#     async def remove(self, db: AsyncSession, *, id: int) -> None:
#         entry = await self.get(db, id=id)
#         if entry:
#             await db.delete(entry)
#             await db.commit()


# journal_entry = CRUDJournalEntry(JournalEntry)
