from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models.user import User
from app.models.vehicle import Vehicle

from app.routers.auth import router as auth_router
from app.routers.vehicles import router as vehicles_router


# =========================================================
# DATABASE TABLE INITIALIZATION
# =========================================================

Base.metadata.create_all(bind=engine)


# =========================================================
# FASTAPI APPLICATION
# =========================================================

app = FastAPI(
    title="Car Dealership Inventory API",
)


# =========================================================
# CORS
# =========================================================

ALLOWED_ORIGINS = [
    # Local development
    "http://127.0.0.1:5173",
    "http://localhost:5173",

    # Production frontend
    "https://car-dealership-frontend-jvvk.onrender.com",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# HEALTH CHECK
# =========================================================

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Car Dealership Inventory API",
    }


# =========================================================
# API ROUTES
# =========================================================

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