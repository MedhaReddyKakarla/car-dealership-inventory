from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.auth_service import login_user, register_user


router = APIRouter()


class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(
    user: RegisterRequest,
    db: Session = Depends(get_db),
):
    try:
        created_user = register_user(
            db=db,
            name=user.name,
            email=user.email,
            password=user.password,
        )
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error),
        )

    return {
        "id": created_user.id,
        "name": created_user.name,
        "email": created_user.email,
    }


@router.post("/login")
def login(
    credentials: LoginRequest,
    db: Session = Depends(get_db),
):
    try:
        access_token = login_user(
            db=db,
            email=credentials.email,
            password=credentials.password,
        )
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(error),
        )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }