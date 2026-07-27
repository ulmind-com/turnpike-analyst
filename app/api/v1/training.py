from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.db.mongodb import get_db
from app.schemas.training import CourseResponse, InstructorApplicationCreate, InstructorApplicationResponse
from app.models.enums import CourseCategory, CourseLevel, ApplicationStatus
from app.crud.training import get_published_courses, get_course_by_slug, create_instructor_application, get_instructor_applications
from app.api.deps import get_current_admin

router = APIRouter()

@router.get("/courses", response_model=List[CourseResponse])
async def list_training_courses(
    category: Optional[CourseCategory] = Query(None, description="Filter by training category"),
    level: Optional[CourseLevel] = Query(None, description="Filter by course difficulty level"),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    courses = await get_published_courses(db, category=category, level=level, skip=skip, limit=limit)
    return courses

@router.get("/courses/{slug}", response_model=CourseResponse)
async def get_course_curriculum_details(slug: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    course = await get_course_by_slug(db, slug)
    if not course:
        raise HTTPException(status_code=404, detail=f"Course with slug '{slug}' not found or not published.")
    return course

@router.post("/become-instructor", response_model=InstructorApplicationResponse, status_code=status.HTTP_201_CREATED)
async def apply_to_become_instructor(app_in: InstructorApplicationCreate, db: AsyncIOMotorDatabase = Depends(get_db)):
    application = await create_instructor_application(db, app_in)
    return application

@router.get("/instructor-applications", response_model=List[InstructorApplicationResponse])
async def review_instructor_applications(
    status_filter: Optional[ApplicationStatus] = Query(None, alias="status", description="Filter by review status"),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_admin: dict = Depends(get_current_admin)
):
    applications = await get_instructor_applications(db, status=status_filter, skip=skip, limit=limit)
    return applications
