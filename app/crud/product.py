from datetime import datetime, timezone, timedelta
from typing import List, Optional, Dict, Any
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.schemas.product import ProductCreate, DemoRequestCreate
from app.models.enums import LeadType, LeadStatus

async def ensure_product_indexes(db: AsyncIOMotorDatabase):
    await db.products.create_index("product_code", unique=True)

async def get_products(db: AsyncIOMotorDatabase) -> List[Dict[str, Any]]:
    cursor = db.products.find({"is_active": True})
    return await cursor.to_list(length=100)

async def get_product_by_code(db: AsyncIOMotorDatabase, code: str) -> Optional[Dict[str, Any]]:
    return await db.products.find_one({"product_code": code})

async def create_product(db: AsyncIOMotorDatabase, product_in: ProductCreate) -> Dict[str, Any]:
    p_dict = product_in.model_dump()
    p_dict["product_code"] = product_in.product_code.value
    result = await db.products.insert_one(p_dict)
    p_dict["_id"] = result.inserted_id
    return p_dict

async def create_demo_request(db: AsyncIOMotorDatabase, demo_in: DemoRequestCreate) -> Dict[str, Any]:
    now = datetime.now(timezone.utc)
    demo_dict = demo_in.model_dump()
    demo_dict["product_code"] = demo_in.product_code.value
    demo_dict["department"] = demo_in.department.value
    demo_dict["type"] = LeadType.PRODUCT_DEMO.value
    demo_dict["status"] = LeadStatus.PENDING.value
    demo_dict["service_id"] = None
    demo_dict["created_at"] = now
    demo_dict["sla_reply_deadline"] = now + timedelta(hours=8)
    result = await db.appointments_and_leads.insert_one(demo_dict)
    demo_dict["_id"] = result.inserted_id
    return demo_dict
