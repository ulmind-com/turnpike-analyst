import asyncio
import logging
import sys
from app.db.mongodb import db_client, get_db

logging.basicConfig(level=logging.WARNING)

async def verify():
    print("\nConnecting to remote MongoDB Atlas cluster...")
    db_client.connect_db()
    db = get_db()
    try:
        print("\n==================================================")
        print("    TURNPIKE ANALYST MONGODB ATLAS HEALTH CHECK    ")
        print("==================================================")
        print(f" [*] Users Collection:           {await db.users.count_documents({})} records")
        print(f" [*] Services Catalog:           {await db.services.count_documents({})} records")
        print(f" [*] Proprietary Products:       {await db.products.count_documents({})} records")
        print(f" [*] Training Courses:           {await db.courses_and_training.count_documents({})} records")
        print(f" [*] CMS Blog Articles:          {await db.blogs_and_articles.count_documents({})} records")
        print(f" [*] Appointments & Leads:       {await db.appointments_and_leads.count_documents({})} records")
        print(f" [*] Newsletter Subscribers:     {await db.newsletters.count_documents({})} records")
        print("==================================================")
        print(" [OK] Status: MongoDB Atlas connection is running PERFECTLY!")
        print("==================================================\n")
    except Exception as e:
        print(f" [ERROR] Diagnostic encountered an issue: {e}")
    finally:
        db_client.close_db()

if __name__ == "__main__":
    asyncio.run(verify())
