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