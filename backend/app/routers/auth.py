from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.auth_service import login_user, register_user


router = APIRouter()


@router.post(
    "/register",
    status_code=status.HTTP_201_CREATED,
)
def register(
    user_data: dict,
    db: Session = Depends(get_db),
):
    name = user_data.get("name")
    email = user_data.get("email")
    password = user_data.get("password")

    if not name or not email or not password:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Name, email, and password are required",
        )

    try:
        user = register_user(
            db=db,
            name=name,
            email=email,
            password=password,
        )

        return {
            "id": user.id,
            "name": user.name,
            "email": user.email,
        }

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )


@router.post("/login")
def login(
    user_data: dict,
    db: Session = Depends(get_db),
):
    email = user_data.get("email")
    password = user_data.get("password")

    if not email or not password:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Email and password are required",
        )

    try:
        access_token = login_user(
            db=db,
            email=email,
            password=password,
        )

        return {
            "access_token": access_token,
            "token_type": "bearer",
        }

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(exc),
            headers={
                "WWW-Authenticate": "Bearer",
            },
        )