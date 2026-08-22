from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_authenticated_user_can_create_vehicle():
    register_response = client.post(
        "/api/auth/register",
        json={
            "name": "Vehicle Test User",
            "email": "vehicle@example.com",
            "password": "Password123!",
        },
    )

    assert register_response.status_code == 201

    login_response = client.post(
        "/api/auth/login",
        json={
            "email": "vehicle@example.com",
            "password": "Password123!",
        },
    )

    assert login_response.status_code == 200

    token = login_response.json()["access_token"]

    response = client.post(
        "/api/vehicles",
        headers={
            "Authorization": f"Bearer {token}",
        },
        json={
            "make": "Toyota",
            "model": "Camry",
            "category": "Sedan",
            "price": 25000,
            "quantity": 5,
        },
    )

    assert response.status_code == 201

    data = response.json()

    assert data["make"] == "Toyota"
    assert data["model"] == "Camry"
    assert data["category"] == "Sedan"
    assert data["price"] == 25000
    assert data["quantity"] == 5


def test_authenticated_user_can_list_vehicles():
    register_response = client.post(
        "/api/auth/register",
        json={
            "name": "List Test User",
            "email": "list@example.com",
            "password": "Password123!",
        },
    )

    assert register_response.status_code == 201

    login_response = client.post(
        "/api/auth/login",
        json={
            "email": "list@example.com",
            "password": "Password123!",
        },
    )

    assert login_response.status_code == 200

    token = login_response.json()["access_token"]

    create_response = client.post(
        "/api/vehicles",
        headers={
            "Authorization": f"Bearer {token}",
        },
        json={
            "make": "Honda",
            "model": "Civic",
            "category": "Sedan",
            "price": 22000,
            "quantity": 3,
        },
    )

    assert create_response.status_code == 201

    response = client.get(
        "/api/vehicles",
        headers={
            "Authorization": f"Bearer {token}",
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert isinstance(data, list)
    assert len(data) == 1

    assert data[0]["make"] == "Honda"
    assert data[0]["model"] == "Civic"
    assert data[0]["category"] == "Sedan"
    assert data[0]["price"] == 22000
    assert data[0]["quantity"] == 3