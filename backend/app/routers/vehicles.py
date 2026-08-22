from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.vehicle import VehicleCreate, VehicleResponse
from app.services.vehicle_service import (
    create_vehicle,
    get_all_vehicles,
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