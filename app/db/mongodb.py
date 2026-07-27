from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from app.core.config import settings
import logging

logger = logging.getLogger("uvicorn.error")

class Database:
    client: AsyncIOMotorClient = None
    db: AsyncIOMotorDatabase = None

    @classmethod
    def connect_db(cls):
        logger.info(f"Connecting to MongoDB at {settings.MONGODB_URL}...")
        cls.client = AsyncIOMotorClient(settings.MONGODB_URL)
        cls.db = cls.client[settings.DATABASE_NAME]
        logger.info("Connected to MongoDB successfully.")

    @classmethod
    def close_db(cls):
        logger.info("Closing MongoDB connection...")
        if cls.client is not None:
            cls.client.close()
            logger.info("MongoDB connection closed.")

    @classmethod
    def get_database(cls) -> AsyncIOMotorDatabase:
        if cls.db is None:
            cls.connect_db()
        return cls.db

db_client = Database()

def get_db() -> AsyncIOMotorDatabase:
    return db_client.get_database()
