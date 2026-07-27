from typing import List
from fastapi import APIRouter, Depends, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.db.mongodb import get_db
from app.schemas.product import ProductResponse, DemoRequestCreate
from app.schemas.common import MessageResponse
from app.crud.product import get_products, create_demo_request

router = APIRouter()

@router.get("/", response_model=List[ProductResponse])
async def list_products(db: AsyncIOMotorDatabase = Depends(get_db)):
    products = await get_products(db)
    return products

@router.post("/request-demo", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
async def request_product_demo(demo_in: DemoRequestCreate, db: AsyncIOMotorDatabase = Depends(get_db)):
    await create_demo_request(db, demo_in)
    return {"message": "Product demo request submitted successfully. Our engineering team will contact you within the 8-hour SLA deadline."}
