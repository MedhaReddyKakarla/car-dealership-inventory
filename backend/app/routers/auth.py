from fastapi import APIRouter, status
from pydantic import BaseModel, EmailStr


router = APIRouter()


class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register_user(user: RegisterRequest):
    return {
        "name": user.name,
        "email": user.email,
    }