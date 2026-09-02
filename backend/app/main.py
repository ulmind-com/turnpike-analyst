from contextlib import asynccontextmanager
from fastapi import FastAPI
import firebase_admin
from firebase_admin import credentials
from fastapi.middleware.cors import CORSMiddleware
from app.db.mongodb import db_client, get_db
from app.api.v1.auth import router as auth_router
from app.api.v1.services import router as services_router

from app.api.v1.leads import router as leads_router
from app.api.v1.training import router as training_router
from app.api.v1.blogs import router as blogs_router
from app.api.v1.newsletter import router as newsletter_router
from app.api.v1.content import router as content_router
from app.api.v1.users import router as users_router
from app.api.v1.activity_logs import router as activity_logs_router
from app.api.v1.cms import router as cms_router
from app.api.v1.consultants import router as consultants_router
from app.crud.user import ensure_user_indexes
from app.crud.service import ensure_service_indexes

from app.crud.lead import ensure_lead_indexes
from app.crud.training import ensure_training_indexes
from app.crud.blog import ensure_blog_indexes
from app.crud.newsletter import ensure_newsletter_indexes
from app.crud.activity_log import ensure_activity_log_indexes
from app.crud.cms import ensure_cms_indexes
from app.crud.consultant import ensure_consultant_indexes
import logging

logger = logging.getLogger("uvicorn.info")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup event: Connect to MongoDB and ensure database unique indexes
    db_client.connect_db()
    db = get_db()
    try:
        await ensure_user_indexes(db)
        await ensure_service_indexes(db)

        await ensure_lead_indexes(db)
        await ensure_training_indexes(db)
        await ensure_blog_indexes(db)
        await ensure_newsletter_indexes(db)
        await ensure_activity_log_indexes(db)
        await ensure_cms_indexes(db)
        await ensure_consultant_indexes(db)
        logger.info("All MongoDB collection indexes verified and established.")
        
        try:
            cred = credentials.Certificate("firebase_service_account.json")
            firebase_admin.initialize_app(cred)
            logger.info("Firebase Admin initialized successfully.")
        except Exception as fe:
            logger.error(f"Failed to initialize Firebase Admin: {fe}")
            
    except Exception as e:
        logger.warning(f"Note on index creation during startup (MongoDB may not be running locally): {e}")
    yield
    # Shutdown event: Close MongoDB connection gracefully
    db_client.close_db()

app = FastAPI(
    title="Turnpike Analyst Enterprise Platform API",
    description="Production-ready RESTful API backend for Turnpike Analyst covering ECM migrations (JAMES WEBB Server), AI Agent tools (Agent P8), training courses, consultations, CMS/blogging, lead capture, and role-based administration.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# Configure permissive CORS middleware for enterprise frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://turnpike-analyst.onrender.com"
    ],
    allow_origin_regex=".*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount domain endpoint routers under /api/v1 prefix
app.include_router(auth_router, prefix="/api/v1/auth", tags=["Authentication & Token Security"])
app.include_router(services_router, prefix="/api/v1/services", tags=["Enterprise Services Catalog"])

app.include_router(leads_router, prefix="/api/v1/leads", tags=["Leads & Consultation Scheduling"])
app.include_router(training_router, prefix="/api/v1/training", tags=["Training & Academy"])
app.include_router(blogs_router, prefix="/api/v1/blogs", tags=["Blog & CMS"])
app.include_router(newsletter_router, prefix="/api/v1/newsletter", tags=["Newsletter Subscriptions"])
app.include_router(content_router, prefix="/api/v1/content", tags=["Dynamic Content"])
app.include_router(users_router, prefix="/api/v1/users", tags=["User Management"])
app.include_router(activity_logs_router, prefix="/api/v1/activity-logs", tags=["Activity Logs"])
app.include_router(cms_router, prefix="/api/v1/cms", tags=["CMS Assets"])
app.include_router(consultants_router, prefix="/api/v1/consultants", tags=["Consultants"])

@app.get("/", tags=["System Health Check"])
async def root_health_check():
    return {
        "status": "online",
        "portal": "Turnpike Analyst Enterprise Platform Backend",
        "documentation_swagger": "/docs",
        "documentation_redoc": "/redoc",
        "version": "1.0.0",
        "architecture": "Async FastAPI + MongoDB Motor + Pydantic v2"
    }
