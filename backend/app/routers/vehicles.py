from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies.auth import (
    get_current_admin,
    get_current_user,
)
from app.models.user import User
from app.schemas.vehicle import VehicleCreate, VehicleResponse
from app.services.vehicle_service import (
    create_vehicle,
    delete_vehicle,
    get_all_vehicles,
    search_vehicles,
    update_vehicle,
)


router = APIRouter()


@router.post(
    "",
    response_model=VehicleResponse,
    status_code=status.HTTP_201_CREATED,
)
def add_vehicle(
    vehicle_data: VehicleCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_vehicle(
        db=db,
        vehicle_data=vehicle_data,
    )


@router.get(
    "",
    response_model=list[VehicleResponse],
    status_code=status.HTTP_200_OK,
)
def list_vehicles(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_all_vehicles(db=db)


@router.get(
    "/search",
    response_model=list[VehicleResponse],
    status_code=status.HTTP_200_OK,
)
def search_vehicle_inventory(
    make: str | None = Query(default=None),
    model: str | None = Query(default=None),
    category: str | None = Query(default=None),
    min_price: float | None = Query(default=None, ge=0),
    max_price: float | None = Query(default=None, ge=0),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return search_vehicles(
        db=db,
        make=make,
        model=model,
        category=category,
        min_price=min_price,
        max_price=max_price,
    )


@router.put(
    "/{vehicle_id}",
    response_model=VehicleResponse,
    status_code=status.HTTP_200_OK,
)
def edit_vehicle(
    vehicle_id: int,
    vehicle_data: VehicleCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    vehicle = update_vehicle(
        db=db,
        vehicle_id=vehicle_id,
        vehicle_data=vehicle_data,
    )

    if vehicle is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vehicle not found",
        )

    return vehicle


@router.delete(
    "/{vehicle_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def remove_vehicle(
    vehicle_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    deleted = delete_vehicle(
        db=db,
        vehicle_id=vehicle_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vehicle not found",
        )

    return None