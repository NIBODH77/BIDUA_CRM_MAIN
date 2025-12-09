# from typing import Any, Dict, Generic, List, Optional, Type, TypeVar, Union
# from fastapi.encoders import jsonable_encoder
# from pydantic import BaseModel
# from sqlalchemy.orm import Session
# from app.models.models import Base

# ModelType = TypeVar("ModelType", bound=Base)
# CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
# UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)

# class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
#     def __init__(self, model: Type[ModelType]):
#         """
#         CRUD object with default methods to Create, Read, Update, Delete (CRUD).
#         """
#         self.model = model

#     def get(self, db: Session, id: Any) -> Optional[ModelType]:
#         return db.query(self.model).filter(self.model.id == id).first()

#     def get_multi(
#         self, db: Session, *, skip: int = 0, limit: int = 100
#     ) -> List[ModelType]:
#         return db.query(self.model).offset(skip).limit(limit).all()

#     def create(self, db: Session, *, obj_in: CreateSchemaType) -> ModelType:
#         obj_in_data = jsonable_encoder(obj_in)
#         db_obj = self.model(**obj_in_data)
#         db.add(db_obj)
#         db.commit()
#         db.refresh(db_obj)
#         return db_obj

#     def update(
#         self,
#         db: Session,
#         *,
#         db_obj: ModelType,
#         obj_in: Union[UpdateSchemaType, Dict[str, Any]]
#     ) -> ModelType:
#         obj_data = jsonable_encoder(db_obj)
#         if isinstance(obj_in, dict):
#             update_data = obj_in
#         else:
#             update_data = obj_in.dict(exclude_unset=True)
#         for field in obj_data:
#             if field in update_data:
#                 setattr(db_obj, field, update_data[field])
#         db.add(db_obj)
#         db.commit()
#         db.refresh(db_obj)
#         return db_obj

#     def remove(self, db: Session, *, id: int) -> Optional[ModelType]:
#         obj = db.get(self.model, id)
#         if obj:
#             db.delete(obj)
#             db.commit()
#         return obj





from typing import Any, Dict, Generic, List, Optional, Type, TypeVar, Union
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession  # ✅ AsyncSession
from sqlalchemy import select # ✅ Async queries
from app.core.database import Base  # ✅ Import Base from database

ModelType = TypeVar("ModelType", bound=Base)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)

class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, model: Type[ModelType]):
        """
        Async CRUD object with default methods to Create, Read, Update, Delete.
        """
        self.model = model

    async def get(self, db: AsyncSession, id: Any) -> Optional[ModelType]:
        # ✅ Async query
        result = await db.execute(select(self.model).filter(self.model.id == id))
        return result.scalar_one_or_none()

    async def get_by_email(self, db: AsyncSession, email: str) -> Optional[ModelType]:
        # ✅ Async query by email
        result = await db.execute(select(self.model).filter(self.model.email == email))
        return result.scalar_one_or_none()

    async def get_multi(
        self, db: AsyncSession, *, skip: int = 0, limit: int = 100
    ) -> List[ModelType]:
        # ✅ Async multi query
        result = await db.execute(select(self.model).offset(skip).limit(limit))
        return result.scalars().all()

    async def create(self, db: AsyncSession, *, obj_in: Union[CreateSchemaType, Dict[str, Any]]):
        if isinstance(obj_in, dict):
            obj_data = obj_in
        else:
            # ✅ Use obj_in.model_dump() if using Pydantic v2
            # ✅ or obj_in.dict() with exclude_unset for Pydantic v1
            obj_data = obj_in.model_dump(exclude_unset=True)
        db_obj = self.model(**obj_data)
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def update(
        self,
        db: AsyncSession,
        *,
        db_obj: ModelType,
        obj_in: Union[UpdateSchemaType, Dict[str, Any]]
    ) -> ModelType:
        obj_data = jsonable_encoder(db_obj)
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.model_dump(exclude_unset=True)  # ✅ model_dump for Pydantic v2
        
        for field in obj_data:
            if field in update_data:
                setattr(db_obj, field, update_data[field])
        
        db.add(db_obj)
        await db.commit()  # ✅ Async commit
        await db.refresh(db_obj)  # ✅ Async refresh
        return db_obj

    async def remove(self, db: AsyncSession, *, id: int) -> Optional[ModelType]:
        # ✅ Async delete
        result = await db.execute(select(self.model).filter(self.model.id == id))
        obj = result.scalar_one_or_none()
        if obj:
            await db.delete(obj)
            await db.commit()
        return obj