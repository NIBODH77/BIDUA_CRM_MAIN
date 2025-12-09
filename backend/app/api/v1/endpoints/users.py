# from typing import Any, List
# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# # from app import crud, schemas
# from app.schemas import schemas
# from app.api import deps
# from app.core.database import get_db
# from app.core.auth import get_current_active_user
# from app import crud

# router = APIRouter()

# @router.get("/", response_model=List[schemas.UserRead])
# def read_users(
#     db: Session = Depends(get_db),
#     current_user = Depends(get_current_active_user),
#     skip: int = 0,
#     limit: int = 100,
# ) -> Any:
#     """
#     Retrieve users (requires authentication).
#     """
#     users = crud.user.get_multi(db, skip=skip, limit=limit)
#     return users

# # User creation is now handled by /auth/register endpoint

# @router.get("/{user_id}", response_model=schemas.UserRead)
# def read_user(
#     user_id: int,
#     db: Session = Depends(get_db),
#     current_user = Depends(get_current_active_user),
# ) -> Any:
#     """
#     Get user by ID (requires authentication).
#     """
#     user = crud.user.get(db, id=user_id)
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")
#     return user

# @router.put("/{user_id}", response_model=schemas.UserRead)
# def update_user(
#     *,
#     db: Session = Depends(get_db),
#     user_id: int,
#     user_in: schemas.UserUpdate,
# ) -> Any:
#     """
#     Update user.
#     """
#     user = crud.user.get(db, id=user_id)
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")
#     user = crud.user.update(db, db_obj=user, obj_in=user_in)
#     return user

# @router.delete("/{user_id}")
# def delete_user(
#     *,
#     db: Session = Depends(get_db),
#     user_id: int,
# ) -> Any:
#     """
#     Delete user.
#     """
#     user = crud.user.get(db, id=user_id)
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")
#     user = crud.user.remove(db, id=user_id)
#     return {"message": "User deleted successfully"}






from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas import schemas
from app.api import deps
from app.core.database import get_db
from app.core.auth import get_current_active_user
from app import crud

from app.crud.users import user  # ✅ import the instance directly

router = APIRouter()

@router.get("/", response_model=List[schemas.UserRead])
async def read_users(
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_active_user),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve users (requires authentication).
    """
    users = await user.get_multi(db, skip=skip, limit=limit)
    return users


@router.get("/{user_id}", response_model=schemas.UserRead)
async def read_user(
    user_id: int,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_active_user),
) -> Any:
    """
    Get user by ID (requires authentication).
    """
    user_obj = await user.get(db, id=user_id)
    if not user_obj:
        raise HTTPException(status_code=404, detail="User not found")
    return user_obj


@router.put("/{user_id}", response_model=schemas.UserRead)
async def update_user(
    *,
    db: AsyncSession = Depends(get_db),
    user_id: int,
    user_in: schemas.UserUpdate,
) -> Any:
    """
    Update user.
    """
    user_obj = await user.get(db, id=user_id)
    if not user_obj:
        raise HTTPException(status_code=404, detail="User not found")
    user_obj = await user.update(db, db_obj=user_obj, obj_in=user_in)
    return user_obj


@router.delete("/{user_id}")
async def delete_user(
    *,
    db: AsyncSession = Depends(get_db),
    user_id: int,
) -> Any:
    """
    Delete user.
    """
    user_obj = await user.get(db, id=user_id)
    if not user_obj:
        raise HTTPException(status_code=404, detail="User not found")
    await user.remove(db, id=user_id)
    return {"message": "User deleted successfully"}
