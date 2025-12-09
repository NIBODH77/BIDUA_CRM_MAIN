from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional, Dict, Any
from datetime import datetime
import json
import logging
from sqlalchemy import select, asc, and_
from app.core.database import get_db
from app.core.auth import get_current_user, get_current_employee
from app.crud.lead_chat import crud_lead_chat
from app.schemas.schemas import *
from app.models.models import *
from sqlalchemy.orm import selectinload

router = APIRouter()
logger = logging.getLogger(__name__)

# WebSocket connection manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, Any] = {}

    async def connect(self, websocket, user_type: str, user_id: int):
        await websocket.accept()
        connection_key = f"{user_type}_{user_id}"
        self.active_connections[connection_key] = websocket
        logger.info(f"WebSocket connected: {connection_key}")

    def disconnect(self, user_type: str, user_id: int):
        connection_key = f"{user_type}_{user_id}"
        self.active_connections.pop(connection_key, None)
        logger.info(f"WebSocket disconnected: {connection_key}")

    async def send_personal_message(self, message: str, user_type: str, user_id: int):
        connection_key = f"{user_type}_{user_id}"
        if connection_key in self.active_connections:
            try:
                await self.active_connections[connection_key].send_text(message)
            except Exception as e:
                logger.error(f"Error sending message to {connection_key}: {e}")
                self.disconnect(user_type, user_id)

    async def broadcast_to_thread(self, message: str, thread_id: int, db: AsyncSession):
        participants = await crud_lead_chat.get_active_thread_participants(db, thread_id)
        for participant in participants:
            await self.send_personal_message(
                message,
                participant["participant_type"],
                participant["participant_id"]
            )

manager = ConnectionManager()

# ==================== DEBUG & TEST ENDPOINTS ====================

@router.get("/debug-auth")
async def debug_auth(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Debug endpoint to check authentication and employee association"""
    from sqlalchemy import select

    result = await db.execute(select(Employee).filter(Employee.user_id == current_user.id))
    employee = result.scalar_one_or_none()

    return {
        "user_info": {
            "id": current_user.id,
            "username": current_user.username,
            "email": current_user.email,
            "role": current_user.role
        },
        "employee_info": {
            "has_employee_record": employee is not None,
            "employee_id": employee.id if employee else None,
            "employee_name": employee.name if employee else None
        }
    }

@router.get("/test-auth")
async def test_employee_auth(current_employee: Employee = Depends(get_current_employee)):
    """Test if employee authentication works"""
    return {
        "message": "Employee authentication successful",
        "employee_id": current_employee.id,
        "employee_name": current_employee.name,
        "user_id": current_employee.user_id
    }

# ==================== THREAD ENDPOINTS ====================

@router.get("/threads/", response_model=ChatThreadListResponse)
async def get_my_threads(
    db: AsyncSession = Depends(get_db),
    current_employee: Employee = Depends(get_current_employee),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=200),
    status: Optional[str] = Query(None),
    has_unread: Optional[bool] = Query(None)
):
    """Get all threads for current employee with optional filters"""
    try:
        threads = await crud_lead_chat.get_threads_by_employee(db, current_employee.id, skip, limit)

        if status:
            threads = [t for t in threads if t.status == status]

        thread_responses = []
        for thread in threads:
            unread_count = await crud_lead_chat.get_unread_count(db, thread.id, "employee")

            if has_unread and unread_count == 0:
                continue

            thread_data = {
                "id": thread.id,
                "subject": thread.subject,
                "lead_id": thread.lead_id,
                "employee_id": thread.employee_id,
                "status": thread.status,
                "last_message_at": thread.last_message_at,
                "message_count": thread.message_count,
                "created_at": thread.created_at,
                "updated_at": thread.updated_at,
                "lead": {
                    "id": thread.lead.id,
                    "name": thread.lead.name,
                    "email": getattr(thread.lead, 'email', None),
                    "phone": getattr(thread.lead, 'phone', None)
                } if thread.lead else None,
                "employee": {
                    "id": thread.employee.id,
                    "name": thread.employee.name,
                    "user_id": thread.employee.user_id
                } if thread.employee else None
            }
            thread_responses.append(ChatThreadSimpleResponse(**thread_data))

        total = len(thread_responses)

        return ChatThreadListResponse(
            threads=thread_responses,
            total=total,
            page=skip // limit + 1 if limit > 0 else 1,
            size=limit,
            has_next=len(threads) == limit
        )

    except Exception as e:
        logger.error(f"Error getting threads: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error retrieving threads"
        )

@router.get("/threads/lead/{lead_id}", response_model=List[ChatThreadSimpleResponse])
async def get_threads_with_lead(
    lead_id: int,
    db: AsyncSession = Depends(get_db),
    current_employee: Employee = Depends(get_current_employee)
):
    """Get threads between current employee and specific lead"""
    try:
        threads = await crud_lead_chat.get_threads_by_lead(db, lead_id)

        employee_threads = [
            thread for thread in threads
            if thread.employee_id == current_employee.id
        ]

        thread_responses = []
        for thread in employee_threads:
            thread_data = {
                "id": thread.id,
                "subject": thread.subject,
                "lead_id": thread.lead_id,
                "employee_id": thread.employee_id,
                "status": thread.status,
                "last_message_at": thread.last_message_at,
                "message_count": thread.message_count,
                "created_at": thread.created_at,
                "updated_at": thread.updated_at,
                "lead": {
                    "id": thread.lead.id,
                    "name": thread.lead.name,
                    "email": getattr(thread.lead, 'email', None)
                } if thread.lead else None,
                "employee": {
                    "id": thread.employee.id,
                    "name": thread.employee.name,
                    "user_id": thread.employee.user_id
                } if thread.employee else None
            }
            thread_responses.append(ChatThreadSimpleResponse(**thread_data))

        return thread_responses

    except Exception as e:
        logger.error(f"Error getting threads with lead {lead_id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error retrieving threads"
        )

@router.post("/threads/", response_model=ChatThreadSimpleResponse, status_code=status.HTTP_201_CREATED)
async def create_thread(
    thread_in: CreateThreadRequest,
    db: AsyncSession = Depends(get_db),
    current_employee: Employee = Depends(get_current_employee)
):
    """Create a new chat thread with a lead"""
    try:
        from sqlalchemy import select
        result = await db.execute(select(Lead).filter(Lead.id == thread_in.lead_id))
        lead = result.scalar_one_or_none()

        if not lead:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Lead not found"
            )

        existing_thread = await crud_lead_chat.get_thread_by_participants(
            db, thread_in.lead_id, current_employee.id
        )
        if existing_thread:
            thread_data = {
                "id": existing_thread.id,
                "subject": existing_thread.subject,
                "lead_id": existing_thread.lead_id,
                "employee_id": existing_thread.employee_id,
                "status": existing_thread.status,
                "last_message_at": existing_thread.last_message_at,
                "message_count": existing_thread.message_count,
                "created_at": existing_thread.created_at,
                "updated_at": existing_thread.updated_at,
                "lead": {
                    "id": existing_thread.lead.id,
                    "name": existing_thread.lead.name,
                    "email": getattr(existing_thread.lead, 'email', None)
                } if existing_thread.lead else None,
                "employee": {
                    "id": existing_thread.employee.id,
                    "name": existing_thread.employee.name,
                    "user_id": existing_thread.employee.user_id
                } if existing_thread.employee else None
            }
            return ChatThreadSimpleResponse(**thread_data)

        thread_data = ChatThreadCreate(
            lead_id=thread_in.lead_id,
            employee_id=current_employee.id,
            subject=thread_in.subject or f"Chat with {lead.name}",
            status="active"
        )

        db_thread = await crud_lead_chat.create_thread(db, thread_data)

        if thread_in.initial_message and thread_in.initial_message.strip():
            message_data = ChatMessageCreate(
                thread_id=db_thread.id,
                sender_type="employee",
                sender_id=current_employee.id,
                direction=MessageDirection.employee_to_lead,
                content=thread_in.initial_message.strip(),
                message_type=MessageType.text
            )
            await crud_lead_chat.create_message(db, message_data)

        response_data = {
            "id": db_thread.id,
            "subject": db_thread.subject,
            "lead_id": db_thread.lead_id,
            "employee_id": db_thread.employee_id,
            "status": db_thread.status,
            "last_message_at": db_thread.last_message_at,
            "message_count": db_thread.message_count,
            "created_at": db_thread.created_at,
            "updated_at": db_thread.updated_at,
            "lead": {
                "id": lead.id,
                "name": lead.name,
                "email": getattr(lead, 'email', None)
            },
            "employee": {
                "id": current_employee.id,
                "name": current_employee.name,
                "user_id": current_employee.user_id
            }
        }

        return ChatThreadSimpleResponse(**response_data)

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating thread: {e}")
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating thread: {str(e)}"
        )

@router.get("/threads/{thread_id}", response_model=ChatThreadDetailResponse)
async def get_thread(
    thread_id: int,
    db: AsyncSession = Depends(get_db),
    current_employee: Employee = Depends(get_current_employee)
):
    """Get specific thread details with messages"""
    try:
        is_participant = await crud_lead_chat.is_user_thread_participant(
            db, thread_id, "employee", current_employee.id
        )
        if not is_participant:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to access this thread"
            )

        thread_result = await db.execute(
            select(ChatThread)
            .options(
                selectinload(ChatThread.lead),
                selectinload(ChatThread.employee)
            )
            .filter(ChatThread.id == thread_id)
        )
        thread = thread_result.scalar_one_or_none()

        if not thread:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Thread not found"
            )

        messages_result = await db.execute(
            select(ChatMessage)
            .filter(ChatMessage.thread_id == thread_id)
            .order_by(asc(ChatMessage.created_at))
        )
        messages = messages_result.scalars().all()

        thread_data = {
            "id": thread.id,
            "subject": thread.subject,
            "lead_id": thread.lead_id,
            "employee_id": thread.employee_id,
            "status": thread.status,
            "last_message_at": thread.last_message_at,
            "message_count": thread.message_count,
            "created_at": thread.created_at,
            "updated_at": thread.updated_at,
            "lead": {
                "id": thread.lead.id,
                "name": thread.lead.name,
                "email": getattr(thread.lead, 'email', None)
            } if thread.lead else None,
            "employee": {
                "id": thread.employee.id,
                "name": thread.employee.name,
                "user_id": thread.employee.user_id
            } if thread.employee else None,
            "messages": []
        }

        for message in messages:
            message_data = {
                "id": message.id,
                "content": message.content,
                "message_type": message.message_type,
                "sender_type": message.sender_type,
                "sender_id": message.sender_id,
                "direction": message.direction,
                "status": message.status,
                "created_at": message.created_at,
                "read_by_employee": message.read_by_employee,
                "read_by_lead": message.read_by_lead,
                "attachment_url": message.attachment_url,
                "file_name": message.file_name,
                "file_size": message.file_size,
                "thread_id": message.thread_id
            }
            thread_data["messages"].append(SimplifiedChatMessageResponse(**message_data))

        return ChatThreadDetailResponse(**thread_data)

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting thread {thread_id}: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving thread: {str(e)}"
        )

@router.put("/threads/{thread_id}", response_model=ChatThreadSimpleResponse)
async def update_thread(
    thread_id: int,
    thread_in: ChatThreadUpdate,
    db: AsyncSession = Depends(get_db),
    current_employee: Employee = Depends(get_current_employee)
):
    """Update thread information"""
    try:
        is_participant = await crud_lead_chat.is_user_thread_participant(
            db, thread_id, "employee", current_employee.id
        )
        if not is_participant:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to update this thread"
            )

        updated_thread = await crud_lead_chat.update_thread(db, thread_id, thread_in)
        if not updated_thread:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Thread not found"
            )

        thread_data = {
            "id": updated_thread.id,
            "subject": updated_thread.subject,
            "lead_id": updated_thread.lead_id,
            "employee_id": updated_thread.employee_id,
            "status": updated_thread.status,
            "last_message_at": updated_thread.last_message_at,
            "message_count": updated_thread.message_count,
            "created_at": updated_thread.created_at,
            "updated_at": updated_thread.updated_at,
            "lead": {
                "id": updated_thread.lead.id,
                "name": updated_thread.lead.name,
                "email": getattr(updated_thread.lead, 'email', None)
            } if updated_thread.lead else None,
            "employee": {
                "id": updated_thread.employee.id,
                "name": updated_thread.employee.name,
                "user_id": updated_thread.employee.user_id
            } if updated_thread.employee else None
        }

        return ChatThreadSimpleResponse(**thread_data)

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating thread {thread_id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error updating thread"
        )

@router.post("/threads/{thread_id}/close", response_model=ChatThreadSimpleResponse)
async def close_thread(
    thread_id: int,
    db: AsyncSession = Depends(get_db),
    current_employee: Employee = Depends(get_current_employee)
):
    """Close a thread"""
    try:
        logger.info(f"Attempting to close thread {thread_id} for employee {current_employee.id}")

        is_participant = await crud_lead_chat.is_user_thread_participant(
            db, thread_id, "employee", current_employee.id
        )
        if not is_participant:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to close this thread"
            )

        from sqlalchemy import update
        from datetime import datetime

        stmt = (
            update(ChatThread)
            .where(ChatThread.id == thread_id)
            .values(status="closed", updated_at=datetime.utcnow())
        )

        await db.execute(stmt)
        await db.commit()

        result = await db.execute(
            select(ChatThread)
            .options(selectinload(ChatThread.lead), selectinload(ChatThread.employee))
            .filter(ChatThread.id == thread_id)
        )
        closed_thread = result.scalar_one_or_none()

        if not closed_thread:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Thread not found after update"
            )

        thread_data = {
            "id": closed_thread.id,
            "subject": closed_thread.subject,
            "lead_id": closed_thread.lead_id,
            "employee_id": closed_thread.employee_id,
            "status": closed_thread.status,
            "last_message_at": closed_thread.last_message_at,
            "message_count": closed_thread.message_count,
            "created_at": closed_thread.created_at,
            "updated_at": closed_thread.updated_at,
            "lead": {
                "id": closed_thread.lead.id,
                "name": closed_thread.lead.name,
                "email": getattr(closed_thread.lead, 'email', None)
            } if closed_thread.lead else None,
            "employee": {
                "id": closed_thread.employee.id,
                "name": closed_thread.employee.name,
                "user_id": closed_thread.employee.user_id
            } if closed_thread.employee else None
        }

        logger.info(f"Successfully closed thread {thread_id}")
        return ChatThreadSimpleResponse(**thread_data)

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error closing thread {thread_id}: {str(e)}", exc_info=True)
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error closing thread: {str(e)}"
        )

# ==================== MESSAGE ENDPOINTS ====================

@router.get("/threads/{thread_id}/messages", response_model=ChatMessageListResponse)
async def get_thread_messages(
    thread_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=200),
    before: Optional[datetime] = Query(None),
    after: Optional[datetime] = Query(None),
    db: AsyncSession = Depends(get_db),
    current_employee: Employee = Depends(get_current_employee)
):
    """Get messages from a thread with pagination"""
    try:
        logger.info(f"GET: Getting messages for thread {thread_id}")

        is_participant = await crud_lead_chat.is_user_thread_participant(
            db, thread_id, "employee", current_employee.id
        )
        if not is_participant:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to access this thread"
            )

        from sqlalchemy import select
        query = select(ChatMessage).filter(ChatMessage.thread_id == thread_id)

        if before:
            query = query.filter(ChatMessage.created_at < before)
        if after:
            query = query.filter(ChatMessage.created_at > after)

        query = query.order_by(asc(ChatMessage.created_at)).offset(skip).limit(limit)

        result = await db.execute(query)
        messages = result.scalars().all()

        logger.info(f"Retrieved {len(messages)} messages")

        message_responses = []
        for message in messages:
            try:
                message_data = {
                    "id": message.id,
                    "content": message.content,
                    "message_type": message.message_type,
                    "sender_type": message.sender_type,
                    "sender_id": message.sender_id,
                    "direction": message.direction,
                    "status": message.status,
                    "created_at": message.created_at,
                    "read_by_employee": message.read_by_employee,
                    "read_by_lead": message.read_by_lead,
                    "attachment_url": message.attachment_url,
                    "file_name": message.file_name,
                    "file_size": message.file_size,
                    "thread_id": message.thread_id
                }
                message_responses.append(SimplifiedChatMessageResponse(**message_data))
            except Exception as msg_error:
                logger.error(f"Error processing message {message.id}: {msg_error}")
                continue

        total = len(message_responses)

        response = ChatMessageListResponse(
            messages=message_responses,
            total=total,
            page=skip // limit + 1 if limit > 0 else 1,
            size=limit,
            has_next=len(messages) == limit
        )

        logger.info(f"Successfully returning {len(message_responses)} messages")
        return response

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting messages for thread {thread_id}: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving messages: {str(e)}"
        )

@router.post("/threads/{thread_id}/messages", response_model=SimplifiedChatMessageResponse, status_code=status.HTTP_201_CREATED)
async def send_thread_message(
    thread_id: int,
    message_in: SendMessageRequest,
    db: AsyncSession = Depends(get_db),
    current_employee: Employee = Depends(get_current_employee)
):
    """Send a message in a thread"""
    try:
        logger.info(f"POST: Sending message to thread {thread_id}")

        is_participant = await crud_lead_chat.is_user_thread_participant(
            db, thread_id, "employee", current_employee.id
        )
        if not is_participant:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to send messages in this thread"
            )

        from sqlalchemy import select
        thread_result = await db.execute(
            select(ChatThread).filter(ChatThread.id == thread_id)
        )
        thread = thread_result.scalar_one_or_none()
        if not thread:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Thread not found"
            )

        message_data = ChatMessageCreate(
            thread_id=thread_id,
            sender_type="employee",
            sender_id=current_employee.id,
            direction=MessageDirection.employee_to_lead,
            content=message_in.content,
            message_type=message_in.message_type,
            attachment_url=message_in.attachment_url,
            file_name=message_in.file_name,
            file_size=message_in.file_size
        )

        db_message = ChatMessage(**message_data.dict())
        db.add(db_message)

        from datetime import datetime
        thread.last_message_at = datetime.utcnow()
        thread.message_count += 1
        thread.updated_at = datetime.utcnow()

        await db.commit()
        await db.refresh(db_message)

        response_data = {
            "id": db_message.id,
            "content": db_message.content,
            "message_type": db_message.message_type,
            "sender_type": db_message.sender_type,
            "sender_id": db_message.sender_id,
            "direction": db_message.direction,
            "status": db_message.status,
            "created_at": db_message.created_at,
            "read_by_employee": db_message.read_by_employee,
            "read_by_lead": db_message.read_by_lead,
            "attachment_url": db_message.attachment_url,
            "file_name": db_message.file_name,
            "file_size": db_message.file_size,
            "thread_id": db_message.thread_id
        }

        logger.info(f"Successfully sent message {db_message.id}")
        return SimplifiedChatMessageResponse(**response_data)

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error sending message in thread {thread_id}: {str(e)}", exc_info=True)
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error sending message: {str(e)}"
        )

@router.post("/messages/mark-read/", status_code=status.HTTP_200_OK)
async def mark_messages_as_read(
    read_request: MarkAsReadRequest,
    db: AsyncSession = Depends(get_db),
    current_employee: Employee = Depends(get_current_employee)
):
    """Mark specific messages as read"""
    try:
        if not read_request.message_ids:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No message IDs provided"
            )

        updated_count = await crud_lead_chat.mark_messages_as_read(
            db, read_request.message_ids, "employee", current_employee.id
        )

        return {
            "message": f"Marked {updated_count} messages as read",
            "updated_count": updated_count
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error marking messages as read: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error marking messages as read"
        )

@router.post("/threads/{thread_id}/mark-read/", status_code=status.HTTP_200_OK)
async def mark_thread_as_read(
    thread_id: int,
    db: AsyncSession = Depends(get_db),
    current_employee: Employee = Depends(get_current_employee)
):
    """Mark all messages in thread as read"""
    try:
        is_participant = await crud_lead_chat.is_user_thread_participant(
            db, thread_id, "employee", current_employee.id
        )
        if not is_participant:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to access this thread"
            )

        updated_count = await crud_lead_chat.mark_thread_messages_as_read(
            db, thread_id, "employee", current_employee.id
        )

        return {
            "message": f"Marked {updated_count} messages as read",
            "updated_count": updated_count
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error marking thread {thread_id} as read: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error marking thread as read"
        )

@router.get("/threads/{thread_id}/unread-count")
async def get_unread_count(
    thread_id: int,
    db: AsyncSession = Depends(get_db),
    current_employee: Employee = Depends(get_current_employee)
):
    """Get count of unread messages in thread"""
    try:
        is_participant = await crud_lead_chat.is_user_thread_participant(
            db, thread_id, "employee", current_employee.id
        )
        if not is_participant:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to access this thread"
            )

        unread_count = await crud_lead_chat.get_unread_count(db, thread_id, "employee")

        return {"unread_count": unread_count}

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting unread count for thread {thread_id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error getting unread count"
        )

@router.get("/threads/{thread_id}/search")
async def search_messages(
    thread_id: int,
    query: str = Query(..., min_length=1, max_length=100),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
    current_employee: Employee = Depends(get_current_employee)
):
    """Search messages in a thread"""
    try:
        is_participant = await crud_lead_chat.is_user_thread_participant(
            db, thread_id, "employee", current_employee.id
        )
        if not is_participant:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to access this thread"
            )

        messages = await crud_lead_chat.search_messages(db, thread_id, query, skip, limit)

        message_responses = []
        for message in messages:
            message_data = {
                "id": message.id,
                "content": message.content,
                "message_type": message.message_type,
                "sender_type": message.sender_type,
                "sender_id": message.sender_id,
                "direction": message.direction,
                "status": message.status,
                "created_at": message.created_at,
                "read_by_employee": message.read_by_employee,
                "read_by_lead": message.read_by_lead,
                "attachment_url": message.attachment_url,
                "file_name": message.file_name,
                "file_size": message.file_size,
                "thread_id": message.thread_id
            }
            message_responses.append(SimplifiedChatMessageResponse(**message_data))

        return {
            "query": query,
            "results": message_responses,
            "total": len(message_responses),
            "has_more": len(messages) == limit
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error searching messages in thread {thread_id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error searching messages"
        )

@router.get("/threads/{thread_id}/stats")
async def get_thread_stats(
    thread_id: int,
    db: AsyncSession = Depends(get_db),
    current_employee: Employee = Depends(get_current_employee)
):
    """Get statistics for a thread"""
    try:
        is_participant = await crud_lead_chat.is_user_thread_participant(
            db, thread_id, "employee", current_employee.id
        )
        if not is_participant:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to access this thread"
            )

        stats = await crud_lead_chat.get_thread_stats(db, thread_id)
        return stats

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting stats for thread {thread_id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error getting thread statistics"
        )

@router.get("/my-threads-with-unread")
async def get_my_threads_with_unread_counts(
    db: AsyncSession = Depends(get_db),
    current_employee: Employee = Depends(get_current_employee)
):
    """Get threads for current employee with unread message counts"""
    try:
        threads_with_unread = await crud_lead_chat.get_user_threads_with_unread_counts(
            db, "employee", current_employee.id
        )
        return {"threads": threads_with_unread}

    except Exception as e:
        logger.error(f"Error getting threads with unread counts: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error retrieving threads with unread counts"
        )

# ==================== LEAD ENDPOINTS ====================

@router.get("/lead/{lead_id}/threads/", response_model=List[ChatThreadSimpleResponse])
async def get_lead_threads(
    lead_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=200),
    db: AsyncSession = Depends(get_db)
):
    """Get all threads for a specific lead"""
    try:
        result = await db.execute(select(Lead).filter(Lead.id == lead_id))
        lead = result.scalar_one_or_none()

        if not lead:
            raise HTTPException(status_code=404, detail="Lead not found")

        threads = await crud_lead_chat.get_threads_by_lead(db, lead_id, skip, limit)

        thread_responses = []
        for thread in threads:
            thread_response = ChatThreadSimpleResponse(
                id=thread.id,
                subject=thread.subject,
                lead_id=thread.lead_id,
                employee_id=thread.employee_id,
                status=thread.status,
                last_message_at=thread.last_message_at,
                message_count=thread.message_count,
                created_at=thread.created_at,
                updated_at=thread.updated_at,
                lead=SimplifiedLeadResponse(
                    id=lead.id,
                    name=lead.name,
                    email=lead.email
                ),
                employee=SimplifiedEmployeeResponse(
                    id=thread.employee.id,
                    name=thread.employee.name,
                    user_id=thread.employee.user_id
                ) if thread.employee else None
            )
            thread_responses.append(thread_response)

        return thread_responses

    except Exception as e:
        logger.error(f"Error getting lead threads: {str(e)}")
        raise HTTPException(status_code=500, detail="Error retrieving threads")