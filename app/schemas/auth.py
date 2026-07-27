from typing import Optional
from app.schemas.common import BaseSchema
from app.schemas.user import UserResponse

class Token(BaseSchema):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

class TokenPayload(BaseSchema):
    sub: Optional[str] = None
    exp: Optional[int] = None
    type: Optional[str] = None

class RefreshTokenRequest(BaseSchema):
    refresh_token: str

class LoginResponse(Token):
    user: UserResponse
