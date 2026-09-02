import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone

async def main():
    client = AsyncIOMotorClient("mongodb+srv://tituroyfan_db_user:eC8E5s33kq365O0d@cluster0.ytcf2kl.mongodb.net/?appName=Cluster0")
    db = client.get_database("turnpike_analyst")
    
    missing = [
        {"title": "Artificial & Augmented Intelligence", "parent_category": "AI & AUTOMATION"},
        {"title": "Data & Analytics", "parent_category": "AI & AUTOMATION"},
        {"title": "Design & Experience", "parent_category": "DESIGN & EXPERIENCE"},
        {"title": "Digital Marketing & Interaction", "parent_category": "DESIGN & EXPERIENCE"}
    ]
    
    for m in missing:
        slug = m["title"].lower().replace(" & ", "-").replace(" ", "-")
        service = {
            "title": m["title"],
            "slug": slug,
            "parent_category": m["parent_category"],
            "sub_service_type": "STRATEGIC_ADVISORY",
            "short_description": f"{m['title']} solutions.",
            "full_description": f"Comprehensive {m['title']} services for enterprise clients.",
            "supported_platforms": ["Web", "Mobile"],
            "is_featured": False,
            "sections": [],
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        }
        await db.services.insert_one(service)
        print(f"Inserted: {m['title']}")

asyncio.run(main())
