from sqlalchemy.orm import Session

from app.models.vehicle import Vehicle
from app.schemas.vehicle import VehicleCreate


def create_vehicle(
    db: Session,
    vehicle_data: VehicleCreate,
) -> Vehicle:
    vehicle = Vehicle(
        make=vehicle_data.make,
        model=vehicle_data.model,
        category=vehicle_data.category,
        price=vehicle_data.price,
        quantity=vehicle_data.quantity,
    )

    db.add(vehicle)
    db.commit()
    db.refresh(vehicle)

    return vehicle


def get_all_vehicles(
    db: Session,
) -> list[Vehicle]:
    return (
        db.query(Vehicle)
        .filter(Vehicle.quantity > 0)
        .order_by(Vehicle.id)
        .all()
    )


def search_vehicles(
    db: Session,
    make: str | None = None,
    model: str | None = None,
    category: str | None = None,
    min_price: float | None = None,
    max_price: float | None = None,
) -> list[Vehicle]:
    query = db.query(Vehicle).filter(
        Vehicle.quantity > 0
    )

    if make is not None:
        query = query.filter(
            Vehicle.make.ilike(f"%{make}%")
        )

    if model is not None:
        query = query.filter(
            Vehicle.model.ilike(f"%{model}%")
        )

    if category is not None:
        query = query.filter(
            Vehicle.category.ilike(f"%{category}%")
        )

    if min_price is not None:
        query = query.filter(
            Vehicle.price >= min_price
        )

    if max_price is not None:
        query = query.filter(
            Vehicle.price <= max_price
        )

    return (
        query
        .order_by(Vehicle.id)
        .all()
    )