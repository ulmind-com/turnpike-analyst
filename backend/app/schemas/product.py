from typing import Dict, List, Any, Optional
from pydantic import Field, EmailStr
from app.schemas.common import BaseSchema, PyObjectId
from app.models.enums import ProductCode, Department

class PricingTier(BaseSchema):
    tier_name: str
    price_string: str
    features: List[str] = Field(default_factory=list)
    description: Optional[str] = None

class ProductBase(BaseSchema):
    product_code: ProductCode
    name: str
    tagline: str
    description: str
    key_features: List[str] = Field(default_factory=list)
    supported_environments: List[str] = Field(default_factory=list)
    pricing_tiers: List[Dict[str, Any]] = Field(default_factory=list)
    is_active: bool = True

class ProductCreate(ProductBase):
    pass

class ProductResponse(ProductBase):
    id: PyObjectId = Field(default_factory=lambda: "000000000000000000000000", alias="_id")

class DemoRequestCreate(BaseSchema):
    product_code: ProductCode
    full_name: str
    email: EmailStr
    phone: str
    company: str
    department: Department = Department.TECHNICAL_TEAM
    subject: Optional[str] = "Requesting Product Demo"
    message: Optional[str] = None
