from datetime import datetime, timezone
from typing import List, Optional
from pydantic import Field
from app.schemas.common import BaseSchema, PyObjectId
from app.models.enums import ParentCategory, SubServiceType

class ServiceBase(BaseSchema):
    title: str = Field(..., min_length=3, max_length=150)
    slug: str = Field(..., min_length=3, max_length=150)
    parent_category: ParentCategory
    sub_service_type: SubServiceType
    short_description: str = Field(..., max_length=500)
    full_description: str
    supported_platforms: List[str] = Field(default_factory=list)
    is_featured: bool = False

class ServiceCreate(ServiceBase):
    pass

class ServiceUpdate(BaseSchema):
    title: Optional[str] = None
    slug: Optional[str] = None
    parent_category: Optional[ParentCategory] = None
    sub_service_type: Optional[SubServiceType] = None
    short_description: Optional[str] = None
    full_description: Optional[str] = None
    supported_platforms: Optional[List[str]] = None
    is_featured: Optional[bool] = None

class ServiceResponse(ServiceBase):
    id: PyObjectId = Field(default_factory=lambda: "000000000000000000000000", alias="_id")
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
