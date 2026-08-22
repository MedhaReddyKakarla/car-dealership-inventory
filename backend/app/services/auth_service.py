from pwdlib import PasswordHash
from sqlalchemy.orm import Session

from app.models.user import User


password_hash = PasswordHash.recommended()


def hash_password(password: str) -> str:
    return password_hash.hash(password)


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