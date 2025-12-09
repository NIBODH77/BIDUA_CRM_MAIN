
from pydantic import BaseModel
from datetime import datetime

class IDModel(BaseModel):
    id: int

class TimestampModel(BaseModel):
    created_at: datetime
    updated_at: datetime
