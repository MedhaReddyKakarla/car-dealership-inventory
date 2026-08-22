from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies.auth import get_current_user, require_admin
from app.models.user import User
from app.schemas.vehicle import (
    VehicleCreate,
    VehicleListResponse,
    VehicleResponse,
    VehicleUpdate,
)
from app.services.vehicle_service import (
    create_vehicle,
    delete_vehicle,
    get_all_vehicles,
    get_paginated_vehicles,
    search_vehicles,
    update_vehicle,
)


router = APIRouter()


@router.post(
    "",
    response_model=VehicleResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_vehicle_endpoint(
    vehicle_data: VehicleCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        return create_vehicle(
            db=db,
            vehicle_data=vehicle_data,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )


@router.get(
    "",
    response_model=None,
)
def list_vehicles(
    page: int | None = Query(
        default=None,
        ge=1,
    ),
    limit: int | None = Query(
        default=None,
        ge=1,
        le=100,
    ),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if page is None and limit is None:
        return get_all_vehicles(db=db)

    if page is None:
        page = 1

    if limit is None:
        limit = 10

    vehicles, total, pages = get_paginated_vehicles(
        db=db,
        page=page,
        limit=limit,
    )

    return {
        "items": vehicles,
        "page": page,
        "limit": limit,
        "total": total,
        "pages": pages,
    }


@router.get(
    "/search",
    response_model=list[VehicleResponse],
)
def search_vehicle_endpoint(
    make: str | None = None,
    model: str | None = None,
    category: str | None = None,
    min_price: float | None = Query(
        default=None,
        ge=0,
    ),
    max_price: float | None = Query(
        default=None,
        ge=0,
    ),
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
)
def update_vehicle_endpoint(
    vehicle_id: int,
    vehicle_data: VehicleUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        vehicle = update_vehicle(
            db=db,
            vehicle_id=vehicle_id,
            vehicle_data=vehicle_data,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
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
def delete_vehicle_endpoint(
    vehicle_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
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