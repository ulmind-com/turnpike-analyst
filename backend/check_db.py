import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

async def main():
    client = AsyncIOMotorClient("mongodb+srv://tituroyfan_db_user:eC8E5s33kq365O0d@cluster0.ytcf2kl.mongodb.net/?appName=Cluster0")
    db = client.get_database("turnpike_analyst")
    services = await db.services.find({}).to_list(100)
    for s in services:
        print(f"{s['title']} - {s.get('parent_category')} - {s.get('sub_service_type')}")

if __name__ == "__main__":
    asyncio.run(main())
