from datetime import datetime, timezone
from typing import Optional, Dict, Any
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.schemas.user import UserCreate
from app.core.security import get_password_hash
from app.models.enums import UserRole

async def ensure_user_indexes(db: AsyncIOMotorDatabase):
    await db.users.create_index("email", unique=True)

async def get_user_by_email(db: AsyncIOMotorDatabase, email: str) -> Optional[Dict[str, Any]]:
    return await db.users.find_one({"email": email})

async def get_user_by_id(db: AsyncIOMotorDatabase, user_id: str) -> Optional[Dict[str, Any]]:
    if not ObjectId.is_valid(user_id):
        return None
    return await db.users.find_one({"_id": ObjectId(user_id)})

async def create_user(db: AsyncIOMotorDatabase, user_in: UserCreate, role: UserRole = None) -> Dict[str, Any]:
    user_dict = user_in.model_dump(exclude={"password"})
    user_dict["hashed_password"] = get_password_hash(user_in.password)
    if role:
        user_dict["role"] = role.value
    else:
        user_dict["role"] = user_in.role.value
    user_dict["is_active"] = True
    user_dict["created_at"] = datetime.now(timezone.utc)
    
    result = await db.users.insert_one(user_dict)
    user_dict["_id"] = result.inserted_id
    return user_dict
