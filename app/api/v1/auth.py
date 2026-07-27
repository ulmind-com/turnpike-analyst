from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from motor.motor_asyncio import AsyncIOMotorDatabase
from jose import JWTError
from app.db.mongodb import get_db
from app.schemas.user import UserCreate, UserResponse
from app.schemas.auth import Token, LoginResponse, RefreshTokenRequest
from app.crud.user import get_user_by_email, get_user_by_id, create_user
from app.core.security import verify_password, create_access_token, create_refresh_token, decode_token
from app.api.deps import get_current_active_user

router = APIRouter()

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register_user(user_in: UserCreate, db: AsyncIOMotorDatabase = Depends(get_db)):
    existing = await get_user_by_email(db, user_in.email)
    if existing:
        raise HTTPException(status_code=400, detail="User with this email already exists.")
    user = await create_user(db, user_in)
    return user

@router.post("/login", response_model=LoginResponse)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncIOMotorDatabase = Depends(get_db)):
    user = await get_user_by_email(db, form_data.username)
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not user.get("is_active", True):
        raise HTTPException(status_code=400, detail="Inactive user")
    
    sub = str(user["_id"])
    access_token = create_access_token(sub)
    refresh_token = create_refresh_token(sub)
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": user
    }

@router.post("/refresh-token", response_model=Token)
async def refresh_token(token_in: RefreshTokenRequest, db: AsyncIOMotorDatabase = Depends(get_db)):
    try:
        payload = decode_token(token_in.refresh_token)
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=400, detail="Invalid token type")
        sub = payload.get("sub")
        if not sub:
            raise HTTPException(status_code=400, detail="Invalid token payload")
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate refresh token")
    
    user = await get_user_by_id(db, sub)
    if not user and "@" in sub:
        user = await get_user_by_email(db, sub)
    if not user or not user.get("is_active", True):
        raise HTTPException(status_code=404, detail="User not found or inactive")
    
    new_access_token = create_access_token(str(user["_id"]))
    new_refresh_token = create_refresh_token(str(user["_id"]))
    return {
        "access_token": new_access_token,
        "refresh_token": new_refresh_token,
        "token_type": "bearer"
    }

@router.get("/me", response_model=UserResponse)
async def read_users_me(current_user: dict = Depends(get_current_active_user)):
    return current_user
