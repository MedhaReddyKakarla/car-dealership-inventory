from sqlalchemy.orm import Session

from app.models.user import User
from app.services.security import (
    create_access_token,
    hash_password,
    verify_password,
)


def register_user(
    db: Session,
    name: str,
    email: str,
    password: str,
) -> User:
    existing_user = db.query(User).filter(User.email == email).first()

    if existing_user:
        raise ValueError("Email already registered")

    user = User(
        name=name,
        email=email,
        password_hash=hash_password(password),
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def login_user(
    db: Session,
    email: str,
    password: str,
) -> str:
    user = db.query(User).filter(User.email == email).first()

    if not user:
        raise ValueError("Invalid email or password")

    if not verify_password(password, user.password_hash):
        raise ValueError("Invalid email or password")

    return create_access_token(
        user_id=user.id,
        email=user.email,
    )