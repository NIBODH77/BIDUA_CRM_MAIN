
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, func, and_
from datetime import datetime

from app.models.models import ChatThread, ChatMessage, Lead, Employee
from app.schemas.schemas import ChatThreadCreate, ChatThreadUpdate, ChatMessageCreate


class CRUDLeadChat:
    async def get_threads_by_employee(
        self, db: AsyncSession, employee_id: int, skip: int = 0, limit: int = 100
    ) -> List[ChatThread]:
        result = await db.execute(
            select(ChatThread)
            .where(ChatThread.employee_id == employee_id)
            .order_by(ChatThread.last_message_at.desc())
            .offset(skip)
            .limit(limit)
        )
        return result.scalars().all()

    async def get_threads_by_lead(
        self, db: AsyncSession, lead_id: int, skip: int = 0, limit: int = 100
    ) -> List[ChatThread]:
        result = await db.execute(
            select(ChatThread)
            .where(ChatThread.lead_id == lead_id)
            .offset(skip)
            .limit(limit)
        )
        return result.scalars().all()

    async def get_thread_by_participants(
        self, db: AsyncSession, lead_id: int, employee_id: int
    ) -> Optional[ChatThread]:
        result = await db.execute(
            select(ChatThread)
            .where(
                and_(
                    ChatThread.lead_id == lead_id,
                    ChatThread.employee_id == employee_id
                )
            )
        )
        return result.scalar_one_or_none()

    async def create_thread(
        self, db: AsyncSession, obj_in: ChatThreadCreate
    ) -> ChatThread:
        db_obj = ChatThread(**obj_in.dict())
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def update_thread(
        self, db: AsyncSession, thread_id: int, obj_in: ChatThreadUpdate
    ) -> Optional[ChatThread]:
        result = await db.execute(
            select(ChatThread).where(ChatThread.id == thread_id)
        )
        db_obj = result.scalar_one_or_none()
        if not db_obj:
            return None
        
        update_data = obj_in.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_obj, field, value)
        
        db_obj.updated_at = datetime.utcnow()
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def create_message(
        self, db: AsyncSession, obj_in: ChatMessageCreate
    ) -> ChatMessage:
        db_obj = ChatMessage(**obj_in.dict())
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def is_user_thread_participant(
        self, db: AsyncSession, thread_id: int, user_type: str, user_id: int
    ) -> bool:
        result = await db.execute(
            select(ChatThread).where(ChatThread.id == thread_id)
        )
        thread = result.scalar_one_or_none()
        if not thread:
            return False
        
        if user_type == "employee":
            return thread.employee_id == user_id
        elif user_type == "lead":
            return thread.lead_id == user_id
        return False

    async def get_unread_count(
        self, db: AsyncSession, thread_id: int, user_type: str
    ) -> int:
        if user_type == "employee":
            result = await db.scalar(
                select(func.count(ChatMessage.id))
                .where(ChatMessage.thread_id == thread_id)
                .where(ChatMessage.read_by_employee == False)
            )
        else:
            result = await db.scalar(
                select(func.count(ChatMessage.id))
                .where(ChatMessage.thread_id == thread_id)
                .where(ChatMessage.read_by_lead == False)
            )
        return result or 0

    async def mark_messages_as_read(
        self, db: AsyncSession, message_ids: List[int], user_type: str, user_id: int
    ) -> int:
        if user_type == "employee":
            stmt = (
                update(ChatMessage)
                .where(ChatMessage.id.in_(message_ids))
                .values(read_by_employee=True)
            )
        else:
            stmt = (
                update(ChatMessage)
                .where(ChatMessage.id.in_(message_ids))
                .values(read_by_lead=True)
            )
        result = await db.execute(stmt)
        await db.commit()
        return result.rowcount

    async def mark_thread_messages_as_read(
        self, db: AsyncSession, thread_id: int, user_type: str, user_id: int
    ) -> int:
        if user_type == "employee":
            stmt = (
                update(ChatMessage)
                .where(ChatMessage.thread_id == thread_id)
                .values(read_by_employee=True)
            )
        else:
            stmt = (
                update(ChatMessage)
                .where(ChatMessage.thread_id == thread_id)
                .values(read_by_lead=True)
            )
        result = await db.execute(stmt)
        await db.commit()
        return result.rowcount

    async def list_activities_for_lead(
        self, db: AsyncSession, lead_id: int, skip: int = 0, limit: int = 100
    ) -> List[ChatMessage]:
        result = await db.execute(
            select(ChatMessage)
            .join(ChatThread)
            .where(ChatThread.lead_id == lead_id)
            .order_by(ChatMessage.created_at.desc())
            .offset(skip)
            .limit(limit)
        )
        return result.scalars().all()

    async def search_messages(
        self, db: AsyncSession, thread_id: int, query: str, skip: int = 0, limit: int = 50
    ) -> List[ChatMessage]:
        result = await db.execute(
            select(ChatMessage)
            .where(ChatMessage.thread_id == thread_id)
            .where(ChatMessage.content.ilike(f"%{query}%"))
            .offset(skip)
            .limit(limit)
        )
        return result.scalars().all()

    async def get_thread_stats(self, db: AsyncSession, thread_id: int) -> dict:
        total_messages = await db.scalar(
            select(func.count(ChatMessage.id)).where(ChatMessage.thread_id == thread_id)
        )
        return {"total_messages": total_messages or 0}

    async def get_user_threads_with_unread_counts(
        self, db: AsyncSession, user_type: str, user_id: int
    ) -> List[dict]:
        # Placeholder implementation
        return []

    async def get_active_thread_participants(
        self, db: AsyncSession, thread_id: int
    ) -> List[dict]:
        # Placeholder implementation
        return []


crud_lead_chat = CRUDLeadChat()
