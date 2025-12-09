
from typing import Any, Dict, Optional, Union
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.crud.base import CRUDBase
from app.models.auth.user import User
from app.schemas.auth.user import UserCreate, UserUpdate

class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    async def get_by_email(self, db: AsyncSession, *, email: str) -> Optional[User]:
        """Fetch a user by email"""
        result = await db.execute(select(User).where(User.email == email))
        return result.scalars().first()

    async def create(self, db: AsyncSession, *, obj_in: Union[UserCreate, Dict[str, Any]]) -> User:
        """Create a new user"""
        if isinstance(obj_in, dict):
            create_data = obj_in
        else:
            create_data = obj_in.model_dump()

        db_obj = User(**create_data)
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def update(
        self, db: AsyncSession, *, db_obj: User, obj_in: Union[UserUpdate, Dict[str, Any]]
    ) -> User:
        """Update user fields"""
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.model_dump(exclude_unset=True)

        for field, value in update_data.items():
            setattr(db_obj, field, value)

        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    def is_active(self, user: User) -> bool:
        """Check if user is active"""
        return user.is_active

user = CRUDUser(User)
