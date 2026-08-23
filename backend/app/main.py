from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models.user import User
from app.models.vehicle import Vehicle
from app.routers.auth import router as auth_router
from app.routers.vehicles import router as vehicles_router


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Car Dealership Inventory API"
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:5175",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# AUTHENTICATION ROUTES
# =========================================================

app.include_router(
    auth_router,
    prefix="/api/auth",
    tags=["Authentication"],
)


# =========================================================
# VEHICLE ROUTES
# =========================================================

app.include_router(
    vehicles_router,
    prefix="/api/vehicles",
    tags=["Vehicles"],
)