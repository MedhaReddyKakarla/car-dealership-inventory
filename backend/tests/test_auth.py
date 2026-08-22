from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_register_user():
    response = client.post(
        "/api/auth/register",
        json={
            "name": "Medha",
            "email": "medha@example.com",
            "password": "Password123!",
        },
    )

    assert response.status_code == 201

    data = response.json()

    assert data["name"] == "Medha"
    assert data["email"] == "medha@example.com"
    assert "password" not in data


def test_register_duplicate_email():
    first_response = client.post(
        "/api/auth/register",
        json={
            "name": "Medha",
            "email": "duplicate@example.com",
            "password": "Password123!",
        },
    )

    assert first_response.status_code == 201

    second_response = client.post(
        "/api/auth/register",
        json={
            "name": "Another User",
            "email": "duplicate@example.com",
            "password": "Different123!",
        },
    )

    assert second_response.status_code == 400