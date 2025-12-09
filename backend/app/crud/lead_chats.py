# # # from sqlalchemy.orm import Session
# # # from sqlalchemy import and_, or_, desc, asc
# # # from typing import List, Optional, Dict, Any
# # # from datetime import datetime, timedelta

# # # from app.models.models import ChatThread, ChatMessage, ChatParticipant, Lead, Employee
# # # from app.schemas.schemas import (
# # #     ChatThreadCreate, ChatThreadUpdate, 
# # #     ChatMessageCreate, ChatMessageUpdate,
# # #     ChatParticipantCreate
# # # )

# # # class CRUDLeadChat:
# # #     def __init__(self):
# # #         pass

# # #     # Thread Operations
# # #     def get_thread_by_id(self, db: Session, thread_id: int) -> Optional[ChatThread]:
# # #         return db.query(ChatThread).filter(ChatThread.id == thread_id).first()

# # #     def get_threads_by_lead(self, db: Session, lead_id: int, skip: int = 0, limit: int = 100) -> List[ChatThread]:
# # #         return db.query(ChatThread)\
# # #             .filter(ChatThread.lead_id == lead_id)\
# # #             .order_by(desc(ChatThread.last_message_at))\
# # #             .offset(skip)\
# # #             .limit(limit)\
# # #             .all()

# # #     def get_threads_by_employee(self, db: Session, employee_id: int, skip: int = 0, limit: int = 100) -> List[ChatThread]:
# # #         return db.query(ChatThread)\
# # #             .filter(ChatThread.employee_id == employee_id)\
# # #             .order_by(desc(ChatThread.last_message_at))\
# # #             .offset(skip)\
# # #             .limit(limit)\
# # #             .all()

# # #     def get_thread_by_participants(self, db: Session, lead_id: int, employee_id: int) -> Optional[ChatThread]:
# # #         return db.query(ChatThread)\
# # #             .filter(
# # #                 ChatThread.lead_id == lead_id,
# # #                 ChatThread.employee_id == employee_id
# # #             )\
# # #             .first()

# # #     def create_thread(self, db: Session, thread_in: ChatThreadCreate) -> ChatThread:
# # #         db_thread = ChatThread(**thread_in.dict())
# # #         db.add(db_thread)
# # #         db.commit()
# # #         db.refresh(db_thread)
        
# # #         # Create participants
# # #         self._create_participants(db, db_thread.id, thread_in.lead_id, thread_in.employee_id)
        
# # #         return db_thread

# # #     def update_thread(self, db: Session, thread_id: int, thread_in: ChatThreadUpdate) -> Optional[ChatThread]:
# # #         db_thread = self.get_thread_by_id(db, thread_id)
# # #         if db_thread:
# # #             update_data = thread_in.dict(exclude_unset=True)
# # #             for field, value in update_data.items():
# # #                 setattr(db_thread, field, value)
# # #             db_thread.updated_at = datetime.utcnow()
# # #             db.commit()
# # #             db.refresh(db_thread)
# # #         return db_thread

# # #     def close_thread(self, db: Session, thread_id: int) -> Optional[ChatThread]:
# # #         return self.update_thread(db, thread_id, ChatThreadUpdate(status="closed"))

# # #     # Message Operations
# # #     def get_message_by_id(self, db: Session, message_id: int) -> Optional[ChatMessage]:
# # #         return db.query(ChatMessage).filter(ChatMessage.id == message_id).first()

# # #     def get_messages_by_thread(
# # #         self, 
# # #         db: Session, 
# # #         thread_id: int, 
# # #         skip: int = 0, 
# # #         limit: int = 100,
# # #         before: Optional[datetime] = None
# # #     ) -> List[ChatMessage]:
# # #         query = db.query(ChatMessage).filter(ChatMessage.thread_id == thread_id)
        
# # #         if before:
# # #             query = query.filter(ChatMessage.created_at < before)
            
# # #         return query\
# # #             .order_by(asc(ChatMessage.created_at))\
# # #             .offset(skip)\
# # #             .limit(limit)\
# # #             .all()

# # #     def create_message(self, db: Session, message_in: ChatMessageCreate) -> ChatMessage:
# # #         db_message = ChatMessage(**message_in.dict())
# # #         db.add(db_message)
        
# # #         # Update thread's last message timestamp and count
# # #         thread = self.get_thread_by_id(db, message_in.thread_id)
# # #         if thread:
# # #             thread.last_message_at = datetime.utcnow()
# # #             thread.message_count = thread.message_count + 1 if thread.message_count else 1
# # #             thread.updated_at = datetime.utcnow()
        
# # #         db.commit()
# # #         db.refresh(db_message)
# # #         return db_message

# # #     def mark_messages_as_read(
# # #         self, 
# # #         db: Session, 
# # #         message_ids: List[int], 
# # #         reader_type: str,
# # #         reader_id: int
# # #     ) -> int:
# # #         """Mark messages as read and return count of updated messages"""
# # #         result = db.query(ChatMessage)\
# # #             .filter(ChatMessage.id.in_(message_ids))\
# # #             .update({
# # #                 'read_by_employee' if reader_type == 'employee' else 'read_by_lead': True,
# # #                 'read_at': datetime.utcnow(),
# # #                 'updated_at': datetime.utcnow()
# # #             }, synchronize_session=False)
        
# # #         db.commit()
# # #         return result

# # #     def mark_thread_messages_as_read(
# # #         self, 
# # #         db: Session, 
# # #         thread_id: int, 
# # #         reader_type: str,
# # #         reader_id: int
# # #     ) -> int:
# # #         """Mark all unread messages in thread as read"""
# # #         filter_condition = and_(
# # #             ChatMessage.thread_id == thread_id,
# # #             ChatMessage.sender_type != reader_type,
# # #             getattr(ChatMessage, f'read_by_{reader_type}') == False
# # #         )
        
# # #         result = db.query(ChatMessage)\
# # #             .filter(filter_condition)\
# # #             .update({
# # #                 f'read_by_{reader_type}': True,
# # #                 'read_at': datetime.utcnow(),
# # #                 'updated_at': datetime.utcnow()
# # #             }, synchronize_session=False)
        
# # #         db.commit()
# # #         return result

# # #     def get_unread_count(self, db: Session, thread_id: int, user_type: str) -> int:
# # #         """Get count of unread messages for a user in a thread"""
# # #         return db.query(ChatMessage)\
# # #             .filter(
# # #                 ChatMessage.thread_id == thread_id,
# # #                 ChatMessage.sender_type != user_type,
# # #                 getattr(ChatMessage, f'read_by_{user_type}') == False
# # #             )\
# # #             .count()

# # #     # Participant Operations
# # #     def _create_participants(self, db: Session, thread_id: int, lead_id: int, employee_id: int):
# # #         """Create both participants for a thread"""
# # #         participants = [
# # #             ChatParticipant(
# # #                 thread_id=thread_id,
# # #                 participant_type="lead",
# # #                 participant_id=lead_id
# # #             ),
# # #             ChatParticipant(
# # #                 thread_id=thread_id,
# # #                 participant_type="employee", 
# # #                 participant_id=employee_id
# # #             )
# # #         ]
        
# # #         db.add_all(participants)
# # #         db.commit()

# # #     def get_thread_participants(self, db: Session, thread_id: int) -> List[ChatParticipant]:
# # #         return db.query(ChatParticipant)\
# # #             .filter(ChatParticipant.thread_id == thread_id)\
# # #             .all()

# # #     def is_user_thread_participant(self, db: Session, thread_id: int, user_type: str, user_id: int) -> bool:
# # #         return db.query(ChatParticipant)\
# # #             .filter(
# # #                 ChatParticipant.thread_id == thread_id,
# # #                 ChatParticipant.participant_type == user_type,
# # #                 ChatParticipant.participant_id == user_id,
# # #                 ChatParticipant.is_active == True
# # #             )\
# # #             .first() is not None

# # #     # Search and Analytics
# # #     def search_messages(
# # #         self, 
# # #         db: Session, 
# # #         thread_id: int, 
# # #         query: str,
# # #         skip: int = 0,
# # #         limit: int = 50
# # #     ) -> List[ChatMessage]:
# # #         return db.query(ChatMessage)\
# # #             .filter(
# # #                 ChatMessage.thread_id == thread_id,
# # #                 ChatMessage.content.ilike(f"%{query}%")
# # #             )\
# # #             .order_by(desc(ChatMessage.created_at))\
# # #             .offset(skip)\
# # #             .limit(limit)\
# # #             .all()

# # #     def get_recent_threads_for_user(
# # #         self, 
# # #         db: Session, 
# # #         user_type: str, 
# # #         user_id: int,
# # #         days: int = 30
# # #     ) -> List[ChatThread]:
# # #         since_date = datetime.utcnow() - timedelta(days=days)
        
# # #         if user_type == "employee":
# # #             return db.query(ChatThread)\
# # #                 .filter(
# # #                     ChatThread.employee_id == user_id,
# # #                     ChatThread.last_message_at >= since_date
# # #                 )\
# # #                 .order_by(desc(ChatThread.last_message_at))\
# # #                 .all()
# # #         else:  # lead
# # #             return db.query(ChatThread)\
# # #                 .filter(
# # #                     ChatThread.lead_id == user_id,
# # #                     ChatThread.last_message_at >= since_date
# # #                 )\
# # #                 .order_by(desc(ChatThread.last_message_at))\
# # #                 .all()

# # # crud_lead_chat = CRUDLeadChat()







# # from sqlalchemy.ext.asyncio import AsyncSession
# # from sqlalchemy import and_, or_, desc, asc, select, update
# # from sqlalchemy.orm import selectinload
# # from typing import List, Optional, Dict, Any
# # from datetime import datetime, timedelta

# # from app.models.models import ChatThread, ChatMessage, ChatParticipant, Lead, Employee
# # from app.schemas.schemas import (
# #     ChatThreadCreate, ChatThreadUpdate, 
# #     ChatMessageCreate, ChatMessageUpdate,
# #     ChatParticipantCreate
# # )

# # class CRUDLeadChat:
# #     def __init__(self):
# #         pass

# #     # Thread Operations
# #     async def get_thread_by_id(self, db: AsyncSession, thread_id: int) -> Optional[ChatThread]:
# #         result = await db.execute(
# #             select(ChatThread)
# #             .options(
# #                 selectinload(ChatThread.lead),
# #                 selectinload(ChatThread.employee),
# #                 selectinload(ChatThread.messages)
# #             )
# #             .filter(ChatThread.id == thread_id)
# #         )
# #         return result.scalar_one_or_none()

# #     async def get_threads_by_lead(self, db: AsyncSession, lead_id: int, skip: int = 0, limit: int = 100) -> List[ChatThread]:
# #         result = await db.execute(
# #             select(ChatThread)
# #             .options(
# #                 selectinload(ChatThread.lead),
# #                 selectinload(ChatThread.employee),
# #                 selectinload(ChatThread.messages)
# #             )
# #             .filter(ChatThread.lead_id == lead_id)
# #             .order_by(desc(ChatThread.last_message_at))
# #             .offset(skip)
# #             .limit(limit)
# #         )
# #         return result.scalars().all()

# #     async def get_threads_by_employee(self, db: AsyncSession, employee_id: int, skip: int = 0, limit: int = 100) -> List[ChatThread]:
# #         result = await db.execute(
# #             select(ChatThread)
# #             .options(
# #                 selectinload(ChatThread.lead),
# #                 selectinload(ChatThread.employee),
# #                 selectinload(ChatThread.messages)
# #             )
# #             .filter(ChatThread.employee_id == employee_id)
# #             .order_by(desc(ChatThread.last_message_at))
# #             .offset(skip)
# #             .limit(limit)
# #         )
# #         return result.scalars().all()

# #     async def get_thread_by_participants(self, db: AsyncSession, lead_id: int, employee_id: int) -> Optional[ChatThread]:
# #         result = await db.execute(
# #             select(ChatThread)
# #             .options(
# #                 selectinload(ChatThread.lead),
# #                 selectinload(ChatThread.employee)
# #             )
# #             .filter(
# #                 ChatThread.lead_id == lead_id,
# #                 ChatThread.employee_id == employee_id
# #             )
# #         )
# #         return result.scalar_one_or_none()

# #     async def create_thread(self, db: AsyncSession, thread_in: ChatThreadCreate) -> ChatThread:
# #         db_thread = ChatThread(**thread_in.dict())
# #         db.add(db_thread)
# #         await db.commit()
# #         await db.refresh(db_thread)
        
# #         # Create participants
# #         await self._create_participants(db, db_thread.id, thread_in.lead_id, thread_in.employee_id)
        
# #         return db_thread

# #     async def update_thread(self, db: AsyncSession, thread_id: int, thread_in: ChatThreadUpdate) -> Optional[ChatThread]:
# #         db_thread = await self.get_thread_by_id(db, thread_id)
# #         if db_thread:
# #             update_data = thread_in.dict(exclude_unset=True)
# #             for field, value in update_data.items():
# #                 setattr(db_thread, field, value)
# #             db_thread.updated_at = datetime.utcnow()
# #             await db.commit()
# #             await db.refresh(db_thread)
# #         return db_thread

# #     async def close_thread(self, db: AsyncSession, thread_id: int) -> Optional[ChatThread]:
# #         return await self.update_thread(db, thread_id, ChatThreadUpdate(status="closed"))

# #     # Message Operations
# #     async def get_message_by_id(self, db: AsyncSession, message_id: int) -> Optional[ChatMessage]:
# #         result = await db.execute(
# #             select(ChatMessage)
# #             .options(
# #                 selectinload(ChatMessage.thread),
# #                 selectinload(ChatMessage.sender_employee),
# #                 selectinload(ChatMessage.sender_lead)
# #             )
# #             .filter(ChatMessage.id == message_id)
# #         )
# #         return result.scalar_one_or_none()

# #     async def get_messages_by_thread(
# #         self, 
# #         db: AsyncSession, 
# #         thread_id: int, 
# #         skip: int = 0, 
# #         limit: int = 100,
# #         before: Optional[datetime] = None
# #     ) -> List[ChatMessage]:
# #         query = select(ChatMessage).filter(ChatMessage.thread_id == thread_id)
        
# #         if before:
# #             query = query.filter(ChatMessage.created_at < before)
            
# #         result = await db.execute(
# #             query.order_by(asc(ChatMessage.created_at))
# #             .offset(skip)
# #             .limit(limit)
# #         )
# #         return result.scalars().all()

# #     async def create_message(self, db: AsyncSession, message_in: ChatMessageCreate) -> ChatMessage:
# #         db_message = ChatMessage(**message_in.dict())
# #         db.add(db_message)
        
# #         # Update thread's last message timestamp and count
# #         thread = await self.get_thread_by_id(db, message_in.thread_id)
# #         if thread:
# #             thread.last_message_at = datetime.utcnow()
# #             thread.message_count = thread.message_count + 1 if thread.message_count else 1
# #             thread.updated_at = datetime.utcnow()
        
# #         await db.commit()
# #         await db.refresh(db_message)
# #         return db_message

# #     async def mark_messages_as_read(
# #         self, 
# #         db: AsyncSession, 
# #         message_ids: List[int], 
# #         reader_type: str,
# #         reader_id: int
# #     ) -> int:
# #         """Mark messages as read and return count of updated messages"""
# #         if reader_type == 'employee':
# #             update_values = {
# #                 'read_by_employee': True,
# #                 'read_at': datetime.utcnow(),
# #                 'updated_at': datetime.utcnow()
# #             }
# #         else:
# #             update_values = {
# #                 'read_by_lead': True,
# #                 'read_at': datetime.utcnow(),
# #                 'updated_at': datetime.utcnow()
# #             }
        
# #         result = await db.execute(
# #             update(ChatMessage)
# #             .where(ChatMessage.id.in_(message_ids))
# #             .values(**update_values)
# #         )
# #         await db.commit()
# #         return result.rowcount

# #     async def mark_thread_messages_as_read(
# #         self, 
# #         db: AsyncSession, 
# #         thread_id: int, 
# #         reader_type: str,
# #         reader_id: int
# #     ) -> int:
# #         """Mark all unread messages in thread as read"""
# #         if reader_type == 'employee':
# #             filter_condition = and_(
# #                 ChatMessage.thread_id == thread_id,
# #                 ChatMessage.sender_type != reader_type,
# #                 ChatMessage.read_by_employee == False
# #             )
# #             update_values = {
# #                 'read_by_employee': True,
# #                 'read_at': datetime.utcnow(),
# #                 'updated_at': datetime.utcnow()
# #             }
# #         else:
# #             filter_condition = and_(
# #                 ChatMessage.thread_id == thread_id,
# #                 ChatMessage.sender_type != reader_type,
# #                 ChatMessage.read_by_lead == False
# #             )
# #             update_values = {
# #                 'read_by_lead': True,
# #                 'read_at': datetime.utcnow(),
# #                 'updated_at': datetime.utcnow()
# #             }
        
# #         result = await db.execute(
# #             update(ChatMessage)
# #             .where(filter_condition)
# #             .values(**update_values)
# #         )
# #         await db.commit()
# #         return result.rowcount

# #     async def get_unread_count(self, db: AsyncSession, thread_id: int, user_type: str) -> int:
# #         """Get count of unread messages for a user in a thread"""
# #         if user_type == 'employee':
# #             condition = and_(
# #                 ChatMessage.thread_id == thread_id,
# #                 ChatMessage.sender_type != user_type,
# #                 ChatMessage.read_by_employee == False
# #             )
# #         else:
# #             condition = and_(
# #                 ChatMessage.thread_id == thread_id,
# #                 ChatMessage.sender_type != user_type,
# #                 ChatMessage.read_by_lead == False
# #             )
        
# #         result = await db.execute(
# #             select(ChatMessage).filter(condition)
# #         )
# #         messages = result.scalars().all()
# #         return len(messages)

# #     # Participant Operations
# #     async def _create_participants(self, db: AsyncSession, thread_id: int, lead_id: int, employee_id: int):
# #         """Create both participants for a thread"""
# #         participants = [
# #             ChatParticipant(
# #                 thread_id=thread_id,
# #                 participant_type="lead",
# #                 participant_id=lead_id
# #             ),
# #             ChatParticipant(
# #                 thread_id=thread_id,
# #                 participant_type="employee", 
# #                 participant_id=employee_id
# #             )
# #         ]
        
# #         db.add_all(participants)
# #         await db.commit()

# #     async def get_thread_participants(self, db: AsyncSession, thread_id: int) -> List[ChatParticipant]:
# #         result = await db.execute(
# #             select(ChatParticipant)
# #             .filter(ChatParticipant.thread_id == thread_id)
# #         )
# #         return result.scalars().all()

# #     async def is_user_thread_participant(self, db: AsyncSession, thread_id: int, user_type: str, user_id: int) -> bool:
# #         result = await db.execute(
# #             select(ChatParticipant)
# #             .filter(
# #                 ChatParticipant.thread_id == thread_id,
# #                 ChatParticipant.participant_type == user_type,
# #                 ChatParticipant.participant_id == user_id,
# #                 ChatParticipant.is_active == True
# #             )
# #         )
# #         return result.scalar_one_or_none() is not None

# #     # Search and Analytics
# #     async def search_messages(
# #         self, 
# #         db: AsyncSession, 
# #         thread_id: int, 
# #         query: str,
# #         skip: int = 0,
# #         limit: int = 50
# #     ) -> List[ChatMessage]:
# #         result = await db.execute(
# #             select(ChatMessage)
# #             .filter(
# #                 ChatMessage.thread_id == thread_id,
# #                 ChatMessage.content.ilike(f"%{query}%")
# #             )
# #             .order_by(desc(ChatMessage.created_at))
# #             .offset(skip)
# #             .limit(limit)
# #         )
# #         return result.scalars().all()

# #     async def get_recent_threads_for_user(
# #         self, 
# #         db: AsyncSession, 
# #         user_type: str, 
# #         user_id: int,
# #         days: int = 30
# #     ) -> List[ChatThread]:
# #         since_date = datetime.utcnow() - timedelta(days=days)
        
# #         if user_type == "employee":
# #             result = await db.execute(
# #                 select(ChatThread)
# #                 .options(
# #                     selectinload(ChatThread.lead),
# #                     selectinload(ChatThread.messages)
# #                 )
# #                 .filter(
# #                     ChatThread.employee_id == user_id,
# #                     ChatThread.last_message_at >= since_date
# #                 )
# #                 .order_by(desc(ChatThread.last_message_at))
# #             )
# #         else:  # lead
# #             result = await db.execute(
# #                 select(ChatThread)
# #                 .options(
# #                     selectinload(ChatThread.employee),
# #                     selectinload(ChatThread.messages)
# #                 )
# #                 .filter(
# #                     ChatThread.lead_id == user_id,
# #                     ChatThread.last_message_at >= since_date
# #                 )
# #                 .order_by(desc(ChatThread.last_message_at))
# #             )
        
# #         return result.scalars().all()

# #     # Additional async methods for WebSocket
# #     async def get_thread_with_participants(self, db: AsyncSession, thread_id: int) -> Optional[ChatThread]:
# #         """Get thread with all participants for WebSocket broadcasting"""
# #         result = await db.execute(
# #             select(ChatThread)
# #             .options(
# #                 selectinload(ChatThread.lead),
# #                 selectinload(ChatThread.employee),
# #                 selectinload(ChatThread.participants)
# #             )
# #             .filter(ChatThread.id == thread_id)
# #         )
# #         return result.scalar_one_or_none()

# #     async def get_active_thread_participants(self, db: AsyncSession, thread_id: int) -> List[Dict[str, Any]]:
# #         """Get active participants for a thread for WebSocket connections"""
# #         result = await db.execute(
# #             select(ChatParticipant)
# #             .filter(
# #                 ChatParticipant.thread_id == thread_id,
# #                 ChatParticipant.is_active == True
# #             )
# #         )
# #         participants = result.scalars().all()
        
# #         participant_list = []
# #         for participant in participants:
# #             participant_list.append({
# #                 "participant_type": participant.participant_type,
# #                 "participant_id": participant.participant_id
# #             })
        
# #         return participant_list

# # crud_lead_chat = CRUDLeadChat()





# from sqlalchemy.ext.asyncio import AsyncSession
# from sqlalchemy import and_, or_, desc, asc, select, update,func
# from sqlalchemy.orm import selectinload
# from typing import List, Optional, Dict, Any
# from datetime import datetime, timedelta

# from app.models.models import ChatThread, ChatMessage, ChatParticipant, Lead, Employee
# from app.schemas.schemas import (
#     ChatThreadCreate, ChatThreadUpdate, 
#     ChatMessageCreate, ChatMessageUpdate,
#     ChatParticipantCreate
# )

# class CRUDLeadChat:
#     def __init__(self):
#         pass

#     # =========================================================================
#     # Thread Operations
#     # =========================================================================

#     async def get_thread_by_id(self, db: AsyncSession, thread_id: int) -> Optional[ChatThread]:
#         """Get thread by ID with all necessary relationships"""
#         result = await db.execute(
#             select(ChatThread)
#             .options(
#                 selectinload(ChatThread.lead),
#                 selectinload(ChatThread.employee),
#                 selectinload(ChatThread.messages).selectinload(ChatMessage.sender_employee),
#                 selectinload(ChatThread.messages).selectinload(ChatMessage.sender_lead)
#             )
#             .filter(ChatThread.id == thread_id)
#         )
#         return result.scalar_one_or_none()

#     async def get_threads_by_lead(self, db: AsyncSession, lead_id: int, skip: int = 0, limit: int = 100) -> List[ChatThread]:
#         """Get all threads for a specific lead"""
#         result = await db.execute(
#             select(ChatThread)
#             .options(
#                 selectinload(ChatThread.lead),
#                 selectinload(ChatThread.employee),
#                 selectinload(ChatThread.messages)
#             )
#             .filter(ChatThread.lead_id == lead_id)
#             .order_by(desc(ChatThread.last_message_at))
#             .offset(skip)
#             .limit(limit)
#         )
#         return result.scalars().all()

#     async def get_threads_by_employee(self, db: AsyncSession, employee_id: int, skip: int = 0, limit: int = 100) -> List[ChatThread]:
#         """Get all threads for a specific employee"""
#         result = await db.execute(
#             select(ChatThread)
#             .options(
#                 selectinload(ChatThread.lead),
#                 selectinload(ChatThread.employee),
#                 selectinload(ChatThread.messages)
#             )
#             .filter(ChatThread.employee_id == employee_id)
#             .order_by(desc(ChatThread.last_message_at))
#             .offset(skip)
#             .limit(limit)
#         )
#         return result.scalars().all()

#     async def get_thread_by_participants(self, db: AsyncSession, lead_id: int, employee_id: int) -> Optional[ChatThread]:
#         """Get thread between specific lead and employee"""
#         result = await db.execute(
#             select(ChatThread)
#             .options(
#                 selectinload(ChatThread.lead),
#                 selectinload(ChatThread.employee)
#             )
#             .filter(
#                 ChatThread.lead_id == lead_id,
#                 ChatThread.employee_id == employee_id
#             )
#         )
#         return result.scalar_one_or_none()

#     async def create_thread(self, db: AsyncSession, thread_in: ChatThreadCreate) -> ChatThread:
#         """Create a new chat thread"""
#         # Check if participants exist
#         lead_result = await db.execute(select(Lead).filter(Lead.id == thread_in.lead_id))
#         lead = lead_result.scalar_one_or_none()
#         if not lead:
#             raise ValueError(f"Lead with ID {thread_in.lead_id} not found")

#         employee_result = await db.execute(select(Employee).filter(Employee.id == thread_in.employee_id))
#         employee = employee_result.scalar_one_or_none()
#         if not employee:
#             raise ValueError(f"Employee with ID {thread_in.employee_id} not found")

#         # Create thread
#         db_thread = ChatThread(
#             lead_id=thread_in.lead_id,
#             employee_id=thread_in.employee_id,
#             subject=thread_in.subject or f"Chat with {lead.name}",
#             status=thread_in.status or "active",
#             created_at=datetime.utcnow(),
#             updated_at=datetime.utcnow(),
#             last_message_at=datetime.utcnow()
#         )
        
#         db.add(db_thread)
#         await db.commit()
#         await db.refresh(db_thread)
        
#         # Create participants
#         await self._create_participants(db, db_thread.id, thread_in.lead_id, thread_in.employee_id)
        
#         return db_thread

#     async def update_thread(self, db: AsyncSession, thread_id: int, thread_in: ChatThreadUpdate) -> Optional[ChatThread]:
#         """Update thread information"""
#         db_thread = await self.get_thread_by_id(db, thread_id)
#         if not db_thread:
#             return None

#         update_data = thread_in.dict(exclude_unset=True)
#         for field, value in update_data.items():
#             setattr(db_thread, field, value)
        
#         db_thread.updated_at = datetime.utcnow()
#         await db.commit()
#         await db.refresh(db_thread)
#         return db_thread



#     async def close_thread(self, db: AsyncSession, thread_id: int) -> Optional[ChatThread]:
#         """Close a thread"""
#         return await self.update_thread(db, thread_id, ChatThreadUpdate(status="closed"))




#     async def reopen_thread(self, db: AsyncSession, thread_id: int) -> Optional[ChatThread]:
#         """Reopen a closed thread"""
#         return await self.update_thread(db, thread_id, ChatThreadUpdate(status="active"))

#     # =========================================================================
#     # Message Operations
#     # =========================================================================

#     async def get_message_by_id(self, db: AsyncSession, message_id: int) -> Optional[ChatMessage]:
#         """Get message by ID with relationships"""
#         result = await db.execute(
#             select(ChatMessage)
#             .options(
#                 selectinload(ChatMessage.thread),
#                 selectinload(ChatMessage.sender_employee),
#                 selectinload(ChatMessage.sender_lead)
#             )
#             .filter(ChatMessage.id == message_id)
#         )
#         return result.scalar_one_or_none()

#     async def get_messages_by_thread(
#         self, 
#         db: AsyncSession, 
#         thread_id: int, 
#         skip: int = 0, 
#         limit: int = 100,
#         before: Optional[datetime] = None,
#         after: Optional[datetime] = None
#     ) -> List[ChatMessage]:
#         """Get messages from a thread with pagination and date filters"""
#         query = select(ChatMessage).options(
#             selectinload(ChatMessage.sender_employee),
#             selectinload(ChatMessage.sender_lead)
#         ).filter(ChatMessage.thread_id == thread_id)
        
#         if before:
#             query = query.filter(ChatMessage.created_at < before)
#         if after:
#             query = query.filter(ChatMessage.created_at > after)
            
#         result = await db.execute(
#             query.order_by(asc(ChatMessage.created_at))
#             .offset(skip)
#             .limit(limit)
#         )
#         return result.scalars().all()

#     async def create_message(self, db: AsyncSession, message_in: ChatMessageCreate) -> ChatMessage:
#         """Create a new message and update thread metadata"""
#         # Verify thread exists
#         thread = await self.get_thread_by_id(db, message_in.thread_id)
#         if not thread:
#             raise ValueError(f"Thread with ID {message_in.thread_id} not found")

#         # Create message
#         db_message = ChatMessage(
#             thread_id=message_in.thread_id,
#             sender_type=message_in.sender_type,
#             sender_id=message_in.sender_id,
#             direction=message_in.direction,
#             content=message_in.content,
#             message_type=message_in.message_type,
#             attachment_url=message_in.attachment_url,
#             file_name=message_in.file_name,
#             file_size=message_in.file_size,
#             status="sent",
#             created_at=datetime.utcnow(),
#             updated_at=datetime.utcnow()
#         )
        
#         db.add(db_message)
        
#         # Update thread metadata
#         thread.last_message_at = datetime.utcnow()
#         thread.message_count = (thread.message_count or 0) + 1
#         thread.updated_at = datetime.utcnow()
        
#         await db.commit()
#         await db.refresh(db_message)
#         return db_message

#     async def mark_messages_as_read(
#         self, 
#         db: AsyncSession, 
#         message_ids: List[int], 
#         reader_type: str,
#         reader_id: int
#     ) -> int:
#         """Mark specific messages as read"""
#         if not message_ids:
#             return 0

#         if reader_type == 'employee':
#             update_values = {
#                 'read_by_employee': True,
#                 'read_at': datetime.utcnow(),
#                 'updated_at': datetime.utcnow()
#             }
#         else:
#             update_values = {
#                 'read_by_lead': True,
#                 'read_at': datetime.utcnow(),
#                 'updated_at': datetime.utcnow()
#             }
        
#         result = await db.execute(
#             update(ChatMessage)
#             .where(ChatMessage.id.in_(message_ids))
#             .values(**update_values)
#         )
#         await db.commit()
#         return result.rowcount

#     async def mark_thread_messages_as_read(
#         self, 
#         db: AsyncSession, 
#         thread_id: int, 
#         reader_type: str,
#         reader_id: int
#     ) -> int:
#         """Mark all unread messages in thread as read"""
#         if reader_type == 'employee':
#             filter_condition = and_(
#                 ChatMessage.thread_id == thread_id,
#                 ChatMessage.sender_type != reader_type,
#                 ChatMessage.read_by_employee == False
#             )
#             update_values = {
#                 'read_by_employee': True,
#                 'read_at': datetime.utcnow(),
#                 'updated_at': datetime.utcnow()
#             }
#         else:
#             filter_condition = and_(
#                 ChatMessage.thread_id == thread_id,
#                 ChatMessage.sender_type != reader_type,
#                 ChatMessage.read_by_lead == False
#             )
#             update_values = {
#                 'read_by_lead': True,
#                 'read_at': datetime.utcnow(),
#                 'updated_at': datetime.utcnow()
#             }
        
#         result = await db.execute(
#             update(ChatMessage)
#             .where(filter_condition)
#             .values(**update_values)
#         )
#         await db.commit()
#         return result.rowcount

#     async def get_unread_count(self, db: AsyncSession, thread_id: int, user_type: str) -> int:
#         """Get count of unread messages for a user in a thread"""
#         if user_type == 'employee':
#             condition = and_(
#                 ChatMessage.thread_id == thread_id,
#                 ChatMessage.sender_type != user_type,
#                 ChatMessage.read_by_employee == False
#             )
#         else:
#             condition = and_(
#                 ChatMessage.thread_id == thread_id,
#                 ChatMessage.sender_type != user_type,
#                 ChatMessage.read_by_lead == False
#             )
        
#         result = await db.execute(
#             select(func.count()).select_from(ChatMessage).filter(condition)
#         )
#         return result.scalar() or 0

#     # =========================================================================
#     # Participant Operations
#     # =========================================================================

#     async def _create_participants(self, db: AsyncSession, thread_id: int, lead_id: int, employee_id: int):
#         """Create both participants for a thread"""
#         participants = [
#             ChatParticipant(
#                 thread_id=thread_id,
#                 participant_type="lead",
#                 participant_id=lead_id,
#                 joined_at=datetime.utcnow(),
#                 is_active=True
#             ),
#             ChatParticipant(
#                 thread_id=thread_id,
#                 participant_type="employee", 
#                 participant_id=employee_id,
#                 joined_at=datetime.utcnow(),
#                 is_active=True
#             )
#         ]
        
#         db.add_all(participants)
#         await db.commit()

#     async def get_thread_participants(self, db: AsyncSession, thread_id: int) -> List[ChatParticipant]:
#         """Get all participants for a thread"""
#         result = await db.execute(
#             select(ChatParticipant)
#             .filter(ChatParticipant.thread_id == thread_id)
#         )
#         return result.scalars().all()

#     async def is_user_thread_participant(self, db: AsyncSession, thread_id: int, user_type: str, user_id: int) -> bool:
#         """Check if user is a participant in the thread"""
#         result = await db.execute(
#             select(ChatParticipant)
#             .filter(
#                 ChatParticipant.thread_id == thread_id,
#                 ChatParticipant.participant_type == user_type,
#                 ChatParticipant.participant_id == user_id,
#                 ChatParticipant.is_active == True
#             )
#         )
#         return result.scalar_one_or_none() is not None

#     async def add_participant(self, db: AsyncSession, participant_in: ChatParticipantCreate) -> ChatParticipant:
#         """Add a new participant to a thread"""
#         # Check if participant already exists
#         existing = await db.execute(
#             select(ChatParticipant)
#             .filter(
#                 ChatParticipant.thread_id == participant_in.thread_id,
#                 ChatParticipant.participant_type == participant_in.participant_type,
#                 ChatParticipant.participant_id == participant_in.participant_id
#             )
#         )
#         if existing.scalar_one_or_none():
#             raise ValueError("Participant already exists in this thread")

#         participant = ChatParticipant(
#             thread_id=participant_in.thread_id,
#             participant_type=participant_in.participant_type,
#             participant_id=participant_in.participant_id,
#             is_active=participant_in.is_active,
#             joined_at=datetime.utcnow()
#         )
        
#         db.add(participant)
#         await db.commit()
#         await db.refresh(participant)
#         return participant

#     async def remove_participant(self, db: AsyncSession, thread_id: int, participant_type: str, participant_id: int) -> bool:
#         """Remove a participant from a thread (soft delete)"""
#         result = await db.execute(
#             update(ChatParticipant)
#             .where(
#                 and_(
#                     ChatParticipant.thread_id == thread_id,
#                     ChatParticipant.participant_type == participant_type,
#                     ChatParticipant.participant_id == participant_id
#                 )
#             )
#             .values(
#                 is_active=False,
#                 left_at=datetime.utcnow()
#             )
#         )
#         await db.commit()
#         return result.rowcount > 0

#     # =========================================================================
#     # Search and Analytics
#     # =========================================================================

#     async def search_messages(
#         self, 
#         db: AsyncSession, 
#         thread_id: int, 
#         query: str,
#         skip: int = 0,
#         limit: int = 50
#     ) -> List[ChatMessage]:
#         """Search messages in a thread"""
#         result = await db.execute(
#             select(ChatMessage)
#             .options(
#                 selectinload(ChatMessage.sender_employee),
#                 selectinload(ChatMessage.sender_lead)
#             )
#             .filter(
#                 ChatMessage.thread_id == thread_id,
#                 ChatMessage.content.ilike(f"%{query}%")
#             )
#             .order_by(desc(ChatMessage.created_at))
#             .offset(skip)
#             .limit(limit)
#         )
#         return result.scalars().all()

#     async def get_recent_threads_for_user(
#         self, 
#         db: AsyncSession, 
#         user_type: str, 
#         user_id: int,
#         days: int = 30
#     ) -> List[ChatThread]:
#         """Get recent threads for a user"""
#         since_date = datetime.utcnow() - timedelta(days=days)
        
#         if user_type == "employee":
#             result = await db.execute(
#                 select(ChatThread)
#                 .options(
#                     selectinload(ChatThread.lead),
#                     selectinload(ChatThread.messages)
#                 )
#                 .filter(
#                     ChatThread.employee_id == user_id,
#                     ChatThread.last_message_at >= since_date
#                 )
#                 .order_by(desc(ChatThread.last_message_at))
#             )
#         else:  # lead
#             result = await db.execute(
#                 select(ChatThread)
#                 .options(
#                     selectinload(ChatThread.employee),
#                     selectinload(ChatThread.messages)
#                 )
#                 .filter(
#                     ChatThread.lead_id == user_id,
#                     ChatThread.last_message_at >= since_date
#                 )
#                 .order_by(desc(ChatThread.last_message_at))
#             )
        
#         return result.scalars().all()

#     async def get_thread_stats(self, db: AsyncSession, thread_id: int) -> Dict[str, Any]:
#         """Get statistics for a thread"""
#         # Total messages
#         total_msg_result = await db.execute(
#             select(func.count()).select_from(ChatMessage).filter(ChatMessage.thread_id == thread_id)
#         )
#         total_messages = total_msg_result.scalar() or 0

#         # Unread messages for each participant type
#         unread_employee_result = await db.execute(
#             select(func.count()).select_from(ChatMessage).filter(
#                 ChatMessage.thread_id == thread_id,
#                 ChatMessage.sender_type == "lead",
#                 ChatMessage.read_by_employee == False
#             )
#         )
#         unread_employee = unread_employee_result.scalar() or 0

#         unread_lead_result = await db.execute(
#             select(func.count()).select_from(ChatMessage).filter(
#                 ChatMessage.thread_id == thread_id,
#                 ChatMessage.sender_type == "employee",
#                 ChatMessage.read_by_lead == False
#             )
#         )
#         unread_lead = unread_lead_result.scalar() or 0

#         # First and last message dates
#         dates_result = await db.execute(
#             select(
#                 func.min(ChatMessage.created_at).label('first_message'),
#                 func.max(ChatMessage.created_at).label('last_message')
#             ).filter(ChatMessage.thread_id == thread_id)
#         )
#         dates = dates_result.first()

#         return {
#             "total_messages": total_messages,
#             "unread_employee": unread_employee,
#             "unread_lead": unread_lead,
#             "first_message": dates[0] if dates else None,
#             "last_message": dates[1] if dates else None
#         }

#     # =========================================================================
#     # WebSocket Support Methods
#     # =========================================================================

#     async def get_thread_with_participants(self, db: AsyncSession, thread_id: int) -> Optional[ChatThread]:
#         """Get thread with all participants for WebSocket broadcasting"""
#         result = await db.execute(
#             select(ChatThread)
#             .options(
#                 selectinload(ChatThread.lead),
#                 selectinload(ChatThread.employee),
#                 selectinload(ChatThread.participants)
#             )
#             .filter(ChatThread.id == thread_id)
#         )
#         return result.scalar_one_or_none()

#     async def get_active_thread_participants(self, db: AsyncSession, thread_id: int) -> List[Dict[str, Any]]:
#         """Get active participants for a thread for WebSocket connections"""
#         result = await db.execute(
#             select(ChatParticipant)
#             .filter(
#                 ChatParticipant.thread_id == thread_id,
#                 ChatParticipant.is_active == True
#             )
#         )
#         participants = result.scalars().all()
        
#         participant_list = []
#         for participant in participants:
#             participant_list.append({
#                 "participant_type": participant.participant_type,
#                 "participant_id": participant.participant_id
#             })
        
#         return participant_list

#     async def get_user_threads_with_unread_counts(self, db: AsyncSession, user_type: str, user_id: int) -> List[Dict[str, Any]]:
#         """Get threads for user with unread message counts"""
#         if user_type == "employee":
#             threads = await self.get_threads_by_employee(db, user_id)
#         else:
#             threads = await self.get_threads_by_lead(db, user_id)

#         threads_with_unread = []
#         for thread in threads:
#             unread_count = await self.get_unread_count(db, thread.id, user_type)
#             thread_data = {
#                 "id": thread.id,
#                 "subject": thread.subject,
#                 "status": thread.status,
#                 "last_message_at": thread.last_message_at,
#                 "message_count": thread.message_count,
#                 "unread_count": unread_count,
#                 "lead": {
#                     "id": thread.lead.id,
#                     "name": thread.lead.name
#                 } if thread.lead else None,
#                 "employee": {
#                     "id": thread.employee.id,
#                     "name": thread.employee.name
#                 } if thread.employee else None
#             }
#             threads_with_unread.append(thread_data)

#         return threads_with_unread


# crud_lead_chat = CRUDLeadChat()








# app/crud/lead_chats.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, and_, or_, func
from sqlalchemy.orm import selectinload
from typing import List, Optional, Dict, Any
from datetime import datetime
import logging
from app.models.models import ChatThread, ChatMessage, Lead, Employee
from app.schemas.schemas import ChatThreadCreate, ChatMessageCreate, ChatThreadUpdate

logger = logging.getLogger(__name__)

class LeadChatsCRUD:
    def __init__(self):
        pass

    # ==================== THREAD OPERATIONS ====================

    async def get_threads_by_employee(
        self, 
        db: AsyncSession, 
        employee_id: int, 
        skip: int = 0, 
        limit: int = 100
    ) -> List[ChatThread]:
        """Get all threads for an employee"""
        try:
            result = await db.execute(
                select(ChatThread)
                .options(selectinload(ChatThread.lead))
                .filter(ChatThread.employee_id == employee_id)
                .order_by(ChatThread.last_message_at.desc())
                .offset(skip)
                .limit(limit)
            )
            return result.scalars().all()
        except Exception as e:
            logger.error(f"Error getting threads for employee {employee_id}: {e}")
            return []

    async def get_threads_by_lead(
        self, 
        db: AsyncSession, 
        lead_id: int
    ) -> List[ChatThread]:
        """Get all threads for a lead"""
        try:
            result = await db.execute(
                select(ChatThread)
                .options(selectinload(ChatThread.employee))
                .filter(ChatThread.lead_id == lead_id)
                .order_by(ChatThread.last_message_at.desc())
            )
            return result.scalars().all()
        except Exception as e:
            logger.error(f"Error getting threads for lead {lead_id}: {e}")
            return []

    async def get_thread_by_participants(
        self, 
        db: AsyncSession, 
        lead_id: int, 
        employee_id: int
    ) -> Optional[ChatThread]:
        """Get thread between specific lead and employee"""
        try:
            result = await db.execute(
                select(ChatThread)
                .options(selectinload(ChatThread.lead), selectinload(ChatThread.employee))
                .filter(
                    and_(
                        ChatThread.lead_id == lead_id,
                        ChatThread.employee_id == employee_id
                    )
                )
            )
            return result.scalar_one_or_none()
        except Exception as e:
            logger.error(f"Error getting thread for lead {lead_id} and employee {employee_id}: {e}")
            return None

    async def create_thread(
        self, 
        db: AsyncSession, 
        thread_data: ChatThreadCreate
    ) -> ChatThread:
        """Create a new chat thread"""
        try:
            db_thread = ChatThread(**thread_data.dict())
            db.add(db_thread)
            await db.commit()
            await db.refresh(db_thread)
            
            # Reload with relationships
            result = await db.execute(
                select(ChatThread)
                .options(selectinload(ChatThread.lead), selectinload(ChatThread.employee))
                .filter(ChatThread.id == db_thread.id)
            )
            return result.scalar_one()
        except Exception as e:
            await db.rollback()
            logger.error(f"Error creating thread: {e}")
            raise

    async def update_thread(
        self, 
        db: AsyncSession, 
        thread_id: int, 
        thread_data: ChatThreadUpdate
    ) -> Optional[ChatThread]:
        """Update thread information"""
        try:
            # Get existing thread
            result = await db.execute(
                select(ChatThread)
                .filter(ChatThread.id == thread_id)
            )
            thread = result.scalar_one_or_none()
            
            if not thread:
                return None

            # Update fields
            update_data = thread_data.dict(exclude_unset=True)
            for field, value in update_data.items():
                setattr(thread, field, value)
            
            thread.updated_at = datetime.utcnow()
            
            await db.commit()
            await db.refresh(thread)
            return thread
        except Exception as e:
            await db.rollback()
            logger.error(f"Error updating thread {thread_id}: {e}")
            return None

    async def is_user_thread_participant(
        self, 
        db: AsyncSession, 
        thread_id: int, 
        user_type: str, 
        user_id: int
    ) -> bool:
        """Check if user is participant in thread"""
        try:
            if user_type == "employee":
                result = await db.execute(
                    select(ChatThread.id)
                    .filter(
                        and_(
                            ChatThread.id == thread_id,
                            ChatThread.employee_id == user_id
                        )
                    )
                )
            else:  # lead
                result = await db.execute(
                    select(ChatThread.id)
                    .filter(
                        and_(
                            ChatThread.id == thread_id,
                            ChatThread.lead_id == user_id
                        )
                    )
                )
            
            return result.scalar_one_or_none() is not None
        except Exception as e:
            logger.error(f"Error checking thread participant: {e}")
            return False

    # ==================== MESSAGE OPERATIONS ====================

    async def create_message(
        self, 
        db: AsyncSession, 
        message_data: ChatMessageCreate
    ) -> ChatMessage:
        """Create a new message"""
        try:
            db_message = ChatMessage(**message_data.dict())
            db.add(db_message)
            
            # Update thread's last message timestamp and count
            await db.execute(
                update(ChatThread)
                .where(ChatThread.id == message_data.thread_id)
                .values(
                    last_message_at=datetime.utcnow(),
                    message_count=ChatThread.message_count + 1,
                    updated_at=datetime.utcnow()
                )
            )
            
            await db.commit()
            await db.refresh(db_message)
            return db_message
        except Exception as e:
            await db.rollback()
            logger.error(f"Error creating message: {e}")
            raise

    async def get_thread_messages(
        self, 
        db: AsyncSession, 
        thread_id: int, 
        skip: int = 0, 
        limit: int = 100
    ) -> List[ChatMessage]:
        """Get messages from a thread"""
        try:
            result = await db.execute(
                select(ChatMessage)
                .filter(ChatMessage.thread_id == thread_id)
                .order_by(ChatMessage.created_at.asc())
                .offset(skip)
                .limit(limit)
            )
            return result.scalars().all()
        except Exception as e:
            logger.error(f"Error getting messages for thread {thread_id}: {e}")
            return []

    async def mark_messages_as_read(
        self, 
        db: AsyncSession, 
        message_ids: List[int], 
        reader_type: str, 
        reader_id: int
    ) -> int:
        """Mark specific messages as read"""
        try:
            if reader_type == "employee":
                stmt = (
                    update(ChatMessage)
                    .where(ChatMessage.id.in_(message_ids))
                    .values(read_by_employee=True)
                )
            else:  # lead
                stmt = (
                    update(ChatMessage)
                    .where(ChatMessage.id.in_(message_ids))
                    .values(read_by_lead=True)
                )
            
            result = await db.execute(stmt)
            await db.commit()
            return result.rowcount
        except Exception as e:
            await db.rollback()
            logger.error(f"Error marking messages as read: {e}")
            return 0

    async def mark_thread_messages_as_read(
        self, 
        db: AsyncSession, 
        thread_id: int, 
        reader_type: str, 
        reader_id: int
    ) -> int:
        """Mark all messages in thread as read"""
        try:
            # First verify access
            is_participant = await self.is_user_thread_participant(db, thread_id, reader_type, reader_id)
            if not is_participant:
                return 0

            if reader_type == "employee":
                stmt = (
                    update(ChatMessage)
                    .where(
                        and_(
                            ChatMessage.thread_id == thread_id,
                            ChatMessage.sender_type == "lead",
                            ChatMessage.read_by_employee == False
                        )
                    )
                    .values(read_by_employee=True)
                )
            else:  # lead
                stmt = (
                    update(ChatMessage)
                    .where(
                        and_(
                            ChatMessage.thread_id == thread_id,
                            ChatMessage.sender_type == "employee",
                            ChatMessage.read_by_lead == False
                        )
                    )
                    .values(read_by_lead=True)
                )
            
            result = await db.execute(stmt)
            await db.commit()
            return result.rowcount
        except Exception as e:
            await db.rollback()
            logger.error(f"Error marking thread messages as read: {e}")
            return 0

    # ==================== UTILITY OPERATIONS ====================

    async def get_unread_count(
        self, 
        db: AsyncSession, 
        thread_id: int, 
        user_type: str
    ) -> int:
        """Get count of unread messages in thread"""
        try:
            if user_type == "employee":
                result = await db.execute(
                    select(func.count(ChatMessage.id))
                    .filter(
                        and_(
                            ChatMessage.thread_id == thread_id,
                            ChatMessage.sender_type == "lead",
                            ChatMessage.read_by_employee == False
                        )
                    )
                )
            else:  # lead
                result = await db.execute(
                    select(func.count(ChatMessage.id))
                    .filter(
                        and_(
                            ChatMessage.thread_id == thread_id,
                            ChatMessage.sender_type == "employee",
                            ChatMessage.read_by_lead == False
                        )
                    )
                )
            
            return result.scalar() or 0
        except Exception as e:
            logger.error(f"Error getting unread count for thread {thread_id}: {e}")
            return 0

    async def search_messages(
        self, 
        db: AsyncSession, 
        thread_id: int, 
        query: str, 
        skip: int = 0, 
        limit: int = 50
    ) -> List[ChatMessage]:
        """Search messages in a thread"""
        try:
            result = await db.execute(
                select(ChatMessage)
                .filter(
                    and_(
                        ChatMessage.thread_id == thread_id,
                        ChatMessage.content.ilike(f"%{query}%")
                    )
                )
                .order_by(ChatMessage.created_at.desc())
                .offset(skip)
                .limit(limit)
            )
            return result.scalars().all()
        except Exception as e:
            logger.error(f"Error searching messages in thread {thread_id}: {e}")
            return []

    async def get_thread_stats(
        self, 
        db: AsyncSession, 
        thread_id: int
    ) -> Dict[str, Any]:
        """Get statistics for a thread"""
        try:
            # Total messages
            total_result = await db.execute(
                select(func.count(ChatMessage.id))
                .filter(ChatMessage.thread_id == thread_id)
            )
            total_messages = total_result.scalar() or 0

            # Employee messages
            employee_result = await db.execute(
                select(func.count(ChatMessage.id))
                .filter(
                    and_(
                        ChatMessage.thread_id == thread_id,
                        ChatMessage.sender_type == "employee"
                    )
                )
            )
            employee_messages = employee_result.scalar() or 0

            # Lead messages
            lead_result = await db.execute(
                select(func.count(ChatMessage.id))
                .filter(
                    and_(
                        ChatMessage.thread_id == thread_id,
                        ChatMessage.sender_type == "lead"
                    )
                )
            )
            lead_messages = lead_result.scalar() or 0

            # First message date
            first_msg_result = await db.execute(
                select(ChatMessage.created_at)
                .filter(ChatMessage.thread_id == thread_id)
                .order_by(ChatMessage.created_at.asc())
                .limit(1)
            )
            first_message_date = first_msg_result.scalar()

            # Last message date
            last_msg_result = await db.execute(
                select(ChatMessage.created_at)
                .filter(ChatMessage.thread_id == thread_id)
                .order_by(ChatMessage.created_at.desc())
                .limit(1)
            )
            last_message_date = last_msg_result.scalar()

            return {
                "total_messages": total_messages,
                "employee_messages": employee_messages,
                "lead_messages": lead_messages,
                "first_message_date": first_message_date,
                "last_message_date": last_message_date,
                "thread_id": thread_id
            }
        except Exception as e:
            logger.error(f"Error getting stats for thread {thread_id}: {e}")
            return {}

    async def get_user_threads_with_unread_counts(
        self, 
        db: AsyncSession, 
        user_type: str, 
        user_id: int
    ) -> List[Dict[str, Any]]:
        """Get threads with unread message counts for user"""
        try:
            if user_type == "employee":
                threads = await self.get_threads_by_employee(db, user_id)
            else:
                threads = await self.get_threads_by_lead(db, user_id)

            threads_with_unread = []
            for thread in threads:
                unread_count = await self.get_unread_count(db, thread.id, user_type)
                threads_with_unread.append({
                    "thread_id": thread.id,
                    "subject": thread.subject,
                    "unread_count": unread_count,
                    "last_message_at": thread.last_message_at,
                    "status": thread.status
                })

            return threads_with_unread
        except Exception as e:
            logger.error(f"Error getting threads with unread counts: {e}")
            return []

    async def get_active_thread_participants(
        self, 
        db: AsyncSession, 
        thread_id: int
    ) -> List[Dict[str, Any]]:
        """Get active participants for a thread (for WebSocket broadcasting)"""
        try:
            result = await db.execute(
                select(ChatThread)
                .options(selectinload(ChatThread.employee), selectinload(ChatThread.lead))
                .filter(ChatThread.id == thread_id)
            )
            thread = result.scalar_one_or_none()
            
            if not thread:
                return []

            participants = []
            if thread.employee:
                participants.append({
                    "participant_type": "employee",
                    "participant_id": thread.employee.id
                })
            if thread.lead:
                participants.append({
                    "participant_type": "lead", 
                    "participant_id": thread.lead.id
                })

            return participants
        except Exception as e:
            logger.error(f"Error getting thread participants: {e}")
            return []

# Create global instance
crud_lead_chats = LeadChatsCRUD()