import pytest

from app.database import SessionLocal
from app.models.user import User
from app.models.vehicle import Vehicle


TEST_EMAILS = {
    "medha@example.com",
    "duplicate@example.com",
    "hash@example.com",
    "login@example.com",
    "wrong-password@example.com",
    "vehicle@example.com",
    "list@example.com",
    "search@example.com",
    "category-search@example.com",
    "price-search@example.com",
    "update@example.com",
    "admin@example.com",
    "regular-delete@example.com",
    "admin-not-found@example.com",
    "pagination@example.com",
}


@pytest.fixture(autouse=True)
def clean_test_data():
    db = SessionLocal()

    try:
        db.query(Vehicle).delete(
            synchronize_session=False
        )

        db.query(User).filter(
            User.email.in_(TEST_EMAILS)
        ).delete(
            synchronize_session=False
        )

        db.commit()
    finally:
        db.close()

    yield

    db = SessionLocal()

    try:
        db.query(Vehicle).delete(
            synchronize_session=False
        )

        db.query(User).filter(
            User.email.in_(TEST_EMAILS)
        ).delete(
            synchronize_session=False
        )

        db.commit()
    finally:
        db.close()