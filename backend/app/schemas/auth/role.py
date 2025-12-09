
from pydantic import BaseModel
from typing import Optional, List

class RoleBase(BaseModel):
    name: str
    description: Optional[str] = None

class RoleCreate(RoleBase):
    permissions: List[int] = []

class RoleResponse(RoleBase):
    id: int
    
    class Config:
        from_attributes = True
