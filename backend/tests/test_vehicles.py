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
    assert float(data["price"]) == 25000
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

    headers = {
        "Authorization": f"Bearer {token}",
    }

    create_response = client.post(
        "/api/vehicles",
        headers=headers,
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
        headers=headers,
    )

    assert response.status_code == 200

    data = response.json()

    assert isinstance(data, list)
    assert len(data) == 1
    assert data[0]["make"] == "Honda"
    assert data[0]["model"] == "Civic"


def test_authenticated_user_can_search_vehicles():
    register_response = client.post(
        "/api/auth/register",
        json={
            "name": "Search Test User",
            "email": "search@example.com",
            "password": "Password123!",
        },
    )

    assert register_response.status_code == 201

    login_response = client.post(
        "/api/auth/login",
        json={
            "email": "search@example.com",
            "password": "Password123!",
        },
    )

    assert login_response.status_code == 200

    token = login_response.json()["access_token"]

    headers = {
        "Authorization": f"Bearer {token}",
    }

    vehicles = [
        {
            "make": "Toyota",
            "model": "Camry",
            "category": "Sedan",
            "price": 25000,
            "quantity": 5,
        },
        {
            "make": "Honda",
            "model": "Civic",
            "category": "Sedan",
            "price": 22000,
            "quantity": 3,
        },
        {
            "make": "BMW",
            "model": "X5",
            "category": "SUV",
            "price": 60000,
            "quantity": 2,
        },
    ]

    for vehicle in vehicles:
        response = client.post(
            "/api/vehicles",
            headers=headers,
            json=vehicle,
        )

        assert response.status_code == 201

    response = client.get(
        "/api/vehicles/search?make=Toyota",
        headers=headers,
    )

    assert response.status_code == 200

    data = response.json()

    assert len(data) == 1
    assert data[0]["make"] == "Toyota"


def test_search_vehicles_by_category():
    register_response = client.post(
        "/api/auth/register",
        json={
            "name": "Category Search User",
            "email": "category-search@example.com",
            "password": "Password123!",
        },
    )

    assert register_response.status_code == 201

    login_response = client.post(
        "/api/auth/login",
        json={
            "email": "category-search@example.com",
            "password": "Password123!",
        },
    )

    assert login_response.status_code == 200

    token = login_response.json()["access_token"]

    headers = {
        "Authorization": f"Bearer {token}",
    }

    vehicles = [
        {
            "make": "Toyota",
            "model": "RAV4",
            "category": "SUV",
            "price": 32000,
            "quantity": 4,
        },
        {
            "make": "Honda",
            "model": "Civic",
            "category": "Sedan",
            "price": 22000,
            "quantity": 3,
        },
        {
            "make": "BMW",
            "model": "X5",
            "category": "SUV",
            "price": 60000,
            "quantity": 2,
        },
    ]

    for vehicle in vehicles:
        response = client.post(
            "/api/vehicles",
            headers=headers,
            json=vehicle,
        )

        assert response.status_code == 201

    response = client.get(
        "/api/vehicles/search?category=SUV",
        headers=headers,
    )

    assert response.status_code == 200

    data = response.json()

    assert len(data) == 2

    for vehicle in data:
        assert vehicle["category"] == "SUV"


def test_search_vehicles_by_price_range():
    register_response = client.post(
        "/api/auth/register",
        json={
            "name": "Price Search User",
            "email": "price-search@example.com",
            "password": "Password123!",
        },
    )

    assert register_response.status_code == 201

    login_response = client.post(
        "/api/auth/login",
        json={
            "email": "price-search@example.com",
            "password": "Password123!",
        },
    )

    assert login_response.status_code == 200

    token = login_response.json()["access_token"]

    headers = {
        "Authorization": f"Bearer {token}",
    }

    vehicles = [
        {
            "make": "Toyota",
            "model": "Corolla",
            "category": "Sedan",
            "price": 20000,
            "quantity": 4,
        },
        {
            "make": "Toyota",
            "model": "Camry",
            "category": "Sedan",
            "price": 30000,
            "quantity": 3,
        },
        {
            "make": "BMW",
            "model": "X5",
            "category": "SUV",
            "price": 60000,
            "quantity": 2,
        },
    ]

    for vehicle in vehicles:
        response = client.post(
            "/api/vehicles",
            headers=headers,
            json=vehicle,
        )

        assert response.status_code == 201

    response = client.get(
        "/api/vehicles/search?min_price=25000&max_price=35000",
        headers=headers,
    )

    assert response.status_code == 200

    data = response.json()

    assert len(data) == 1
    assert data[0]["model"] == "Camry"


def test_authenticated_user_can_update_vehicle():
    register_response = client.post(
        "/api/auth/register",
        json={
            "name": "Update Test User",
            "email": "update@example.com",
            "password": "Password123!",
        },
    )

    assert register_response.status_code == 201

    login_response = client.post(
        "/api/auth/login",
        json={
            "email": "update@example.com",
            "password": "Password123!",
        },
    )

    assert login_response.status_code == 200

    token = login_response.json()["access_token"]

    headers = {
        "Authorization": f"Bearer {token}",
    }

    create_response = client.post(
        "/api/vehicles",
        headers=headers,
        json={
            "make": "Toyota",
            "model": "Corolla",
            "category": "Sedan",
            "price": 22000,
            "quantity": 5,
        },
    )

    assert create_response.status_code == 201

    vehicle_id = create_response.json()["id"]

    response = client.put(
        f"/api/vehicles/{vehicle_id}",
        headers=headers,
        json={
            "make": "Toyota",
            "model": "Corolla",
            "category": "Sedan",
            "price": 23000,
            "quantity": 7,
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == vehicle_id
    assert float(data["price"]) == 23000
    assert data["quantity"] == 7


def test_admin_can_delete_vehicle():
    register_response = client.post(
        "/api/auth/register",
        json={
            "name": "Admin Test User",
            "email": "admin@example.com",
            "password": "Password123!",
        },
    )

    assert register_response.status_code == 201

    from app.database import SessionLocal
    from app.models.user import User

    db = SessionLocal()

    try:
        user = (
            db.query(User)
            .filter(User.email == "admin@example.com")
            .first()
        )

        assert user is not None

        user.is_admin = True

        db.commit()
    finally:
        db.close()

    login_response = client.post(
        "/api/auth/login",
        json={
            "email": "admin@example.com",
            "password": "Password123!",
        },
    )

    assert login_response.status_code == 200

    token = login_response.json()["access_token"]

    headers = {
        "Authorization": f"Bearer {token}",
    }

    create_response = client.post(
        "/api/vehicles",
        headers=headers,
        json={
            "make": "Toyota",
            "model": "Corolla",
            "category": "Sedan",
            "price": 23000,
            "quantity": 4,
        },
    )

    assert create_response.status_code == 201

    vehicle_id = create_response.json()["id"]

    delete_response = client.delete(
        f"/api/vehicles/{vehicle_id}",
        headers=headers,
    )

    assert delete_response.status_code == 204

    get_response = client.get(
        "/api/vehicles",
        headers=headers,
    )

    assert get_response.status_code == 200
    assert get_response.json() == []


def test_regular_user_cannot_delete_vehicle():
    register_response = client.post(
        "/api/auth/register",
        json={
            "name": "Regular Delete User",
            "email": "regular-delete@example.com",
            "password": "Password123!",
        },
    )

    assert register_response.status_code == 201

    login_response = client.post(
        "/api/auth/login",
        json={
            "email": "regular-delete@example.com",
            "password": "Password123!",
        },
    )

    assert login_response.status_code == 200

    token = login_response.json()["access_token"]

    headers = {
        "Authorization": f"Bearer {token}",
    }

    create_response = client.post(
        "/api/vehicles",
        headers=headers,
        json={
            "make": "Honda",
            "model": "City",
            "category": "Sedan",
            "price": 18000,
            "quantity": 2,
        },
    )

    assert create_response.status_code == 201

    vehicle_id = create_response.json()["id"]

    delete_response = client.delete(
        f"/api/vehicles/{vehicle_id}",
        headers=headers,
    )

    assert delete_response.status_code == 403


def test_admin_cannot_delete_nonexistent_vehicle():
    register_response = client.post(
        "/api/auth/register",
        json={
            "name": "Admin Not Found User",
            "email": "admin-not-found@example.com",
            "password": "Password123!",
        },
    )

    assert register_response.status_code == 201

    from app.database import SessionLocal
    from app.models.user import User

    db = SessionLocal()

    try:
        user = (
            db.query(User)
            .filter(
                User.email == "admin-not-found@example.com"
            )
            .first()
        )

        assert user is not None

        user.is_admin = True

        db.commit()
    finally:
        db.close()

    login_response = client.post(
        "/api/auth/login",
        json={
            "email": "admin-not-found@example.com",
            "password": "Password123!",
        },
    )

    assert login_response.status_code == 200

    token = login_response.json()["access_token"]

    response = client.delete(
        "/api/vehicles/999999",
        headers={
            "Authorization": f"Bearer {token}",
        },
    )

    assert response.status_code == 404
def test_authenticated_user_can_paginate_vehicles():
    register_response = client.post(
        "/api/auth/register",
        json={
            "name": "Pagination Test User",
            "email": "pagination@example.com",
            "password": "Password123!",
        },
    )

    assert register_response.status_code == 201

    login_response = client.post(
        "/api/auth/login",
        json={
            "email": "pagination@example.com",
            "password": "Password123!",
        },
    )

    assert login_response.status_code == 200

    token = login_response.json()["access_token"]

    headers = {
        "Authorization": f"Bearer {token}",
    }

    vehicles = [
        {
            "make": "Toyota",
            "model": "Camry",
            "category": "Sedan",
            "price": 25000,
            "quantity": 5,
        },
        {
            "make": "Honda",
            "model": "Civic",
            "category": "Sedan",
            "price": 22000,
            "quantity": 3,
        },
        {
            "make": "BMW",
            "model": "X5",
            "category": "SUV",
            "price": 60000,
            "quantity": 2,
        },
        {
            "make": "Audi",
            "model": "Q5",
            "category": "SUV",
            "price": 55000,
            "quantity": 4,
        },
        {
            "make": "Ford",
            "model": "Mustang",
            "category": "Sports",
            "price": 45000,
            "quantity": 2,
        },
    ]

    for vehicle in vehicles:
        response = client.post(
            "/api/vehicles",
            headers=headers,
            json=vehicle,
        )

        assert response.status_code == 201

    response = client.get(
        "/api/vehicles?page=1&limit=2",
        headers=headers,
    )

    assert response.status_code == 200

    data = response.json()

    assert "items" in data
    assert "page" in data
    assert "limit" in data
    assert "total" in data
    assert "pages" in data

    assert len(data["items"]) == 2
    assert data["page"] == 1
    assert data["limit"] == 2
    assert data["total"] == 5
    assert data["pages"] == 3

    response = client.get(
        "/api/vehicles?page=2&limit=2",
        headers=headers,
    )

    assert response.status_code == 200

    data = response.json()

    assert len(data["items"]) == 2
    assert data["page"] == 2
    assert data["limit"] == 2
    assert data["total"] == 5
    assert data["pages"] == 3

    response = client.get(
        "/api/vehicles?page=3&limit=2",
        headers=headers,
    )

    assert response.status_code == 200

    data = response.json()

    assert len(data["items"]) == 1
    assert data["page"] == 3
    assert data["limit"] == 2
    assert data["total"] == 5
    assert data["pages"] == 3

def test_vehicle_cannot_have_negative_price():
    register_response = client.post(
        "/api/auth/register",
        json={
            "name": "Validation User",
            "email": "validation-price@example.com",
            "password": "Password123!",
        },
    )

    assert register_response.status_code == 201

    login_response = client.post(
        "/api/auth/login",
        json={
            "email": "validation-price@example.com",
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
            "price": -1000,
            "quantity": 5,
        },
    )

    assert response.status_code == 422


def test_vehicle_cannot_have_negative_quantity():
    register_response = client.post(
        "/api/auth/register",
        json={
            "name": "Validation User",
            "email": "validation-quantity@example.com",
            "password": "Password123!",
        },
    )

    assert register_response.status_code == 201

    login_response = client.post(
        "/api/auth/login",
        json={
            "email": "validation-quantity@example.com",
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
            "make": "Honda",
            "model": "Civic",
            "category": "Sedan",
            "price": 22000,
            "quantity": -5,
        },
    )

    assert response.status_code == 422


def test_vehicle_cannot_have_zero_price():
    register_response = client.post(
        "/api/auth/register",
        json={
            "name": "Zero Price User",
            "email": "zero-price@example.com",
            "password": "Password123!",
        },
    )

    assert register_response.status_code == 201

    login_response = client.post(
        "/api/auth/login",
        json={
            "email": "zero-price@example.com",
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
            "make": "Honda",
            "model": "City",
            "category": "Sedan",
            "price": 0,
            "quantity": 2,
        },
    )

    assert response.status_code == 422

def test_vehicle_cannot_have_empty_make():
    register_response = client.post(
        "/api/auth/register",
        json={
            "name": "Empty Make User",
            "email": "empty-make@example.com",
            "password": "Password123!",
        },
    )

    assert register_response.status_code == 201

    login_response = client.post(
        "/api/auth/login",
        json={
            "email": "empty-make@example.com",
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
            "make": "",
            "model": "Camry",
            "category": "Sedan",
            "price": 25000,
            "quantity": 5,
        },
    )

    assert response.status_code == 422


def test_vehicle_cannot_have_empty_model():
    register_response = client.post(
        "/api/auth/register",
        json={
            "name": "Empty Model User",
            "email": "empty-model@example.com",
            "password": "Password123!",
        },
    )

    assert register_response.status_code == 201

    login_response = client.post(
        "/api/auth/login",
        json={
            "email": "empty-model@example.com",
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
            "model": "",
            "category": "Sedan",
            "price": 25000,
            "quantity": 5,
        },
    )

    assert response.status_code == 422


def test_vehicle_cannot_have_empty_category():
    register_response = client.post(
        "/api/auth/register",
        json={
            "name": "Empty Category User",
            "email": "empty-category@example.com",
            "password": "Password123!",
        },
    )

    assert register_response.status_code == 201

    login_response = client.post(
        "/api/auth/login",
        json={
            "email": "empty-category@example.com",
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
            "category": "",
            "price": 25000,
            "quantity": 5,
        },
    )

    assert response.status_code == 422

def test_duplicate_vehicle_cannot_be_created():
    register_response = client.post(
        "/api/auth/register",
        json={
            "name": "Duplicate Vehicle User",
            "email": "duplicate-vehicle@example.com",
            "password": "Password123!",
        },
    )

    assert register_response.status_code == 201

    login_response = client.post(
        "/api/auth/login",
        json={
            "email": "duplicate-vehicle@example.com",
            "password": "Password123!",
        },
    )

    assert login_response.status_code == 200

    token = login_response.json()["access_token"]

    headers = {
        "Authorization": f"Bearer {token}",
    }

    vehicle = {
        "make": "Toyota",
        "model": "Camry",
        "category": "Sedan",
        "price": 25000,
        "quantity": 5,
    }

    first_response = client.post(
        "/api/vehicles",
        headers=headers,
        json=vehicle,
    )

    assert first_response.status_code == 201

    second_response = client.post(
        "/api/vehicles",
        headers=headers,
        json=vehicle,
    )

    assert second_response.status_code == 400

def test_regular_user_cannot_update_another_users_vehicle():
    # Create first user
    register_response = client.post(
        "/api/auth/register",
        json={
            "name": "Vehicle Owner",
            "email": "vehicle-owner@example.com",
            "password": "Password123!",
        },
    )

    assert register_response.status_code == 201

    login_response = client.post(
        "/api/auth/login",
        json={
            "email": "vehicle-owner@example.com",
            "password": "Password123!",
        },
    )

    assert login_response.status_code == 200

    owner_token = login_response.json()["access_token"]

    owner_headers = {
        "Authorization": f"Bearer {owner_token}",
    }

    # Owner creates vehicle
    create_response = client.post(
        "/api/vehicles",
        headers=owner_headers,
        json={
            "make": "Toyota",
            "model": "Camry",
            "category": "Sedan",
            "price": 25000,
            "quantity": 5,
        },
    )

    assert create_response.status_code == 201

    vehicle_id = create_response.json()["id"]

    # Create second user
    register_response = client.post(
        "/api/auth/register",
        json={
            "name": "Other User",
            "email": "other-vehicle-user@example.com",
            "password": "Password123!",
        },
    )

    assert register_response.status_code == 201

    login_response = client.post(
        "/api/auth/login",
        json={
            "email": "other-vehicle-user@example.com",
            "password": "Password123!",
        },
    )

    assert login_response.status_code == 200

    other_token = login_response.json()["access_token"]

    other_headers = {
        "Authorization": f"Bearer {other_token}",
    }

    # Other user attempts to update owner's vehicle
    response = client.put(
        f"/api/vehicles/{vehicle_id}",
        headers=other_headers,
        json={
            "make": "Honda",
            "model": "Civic",
            "category": "Sedan",
            "price": 22000,
            "quantity": 3,
        },
    )

    assert response.status_code == 403