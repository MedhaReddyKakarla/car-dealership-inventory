import pytest

from app.database import SessionLocal
from app.models.user import User


TEST_EMAILS = {
    "medha@example.com",
    "duplicate@example.com",
    "hash@example.com",
    "login@example.com",
    "wrong-password@example.com",
    "vehicle@example.com",
}
@pytest.fixture(autouse=True)
def clean_test_users():
    db = SessionLocal()

    try:
        db.query(User).filter(User.email.in_(TEST_EMAILS)).delete(
            synchronize_session=False
        )
        db.commit()
    finally:
        db.close()

    yield

    db = SessionLocal()

    try:
        db.query(User).filter(User.email.in_(TEST_EMAILS)).delete(
            synchronize_session=False
        )
        db.commit()
    finally:
        db.close()