from fastapi import FastAPI

from app.database import Base, engine
from app.models.user import User
from app.models.vehicle import Vehicle
from app.routers.auth import router as auth_router
from app.routers.vehicles import router as vehicles_router


Base.metadata.create_all(bind=engine)


app = FastAPI(title="Car Dealership Inventory API")


app.include_router(
    auth_router,
    prefix="/api/auth",
    tags=["Authentication"],
)

app.include_router(
    vehicles_router,
    prefix="/api/vehicles",
    tags=["Vehicles"],
)