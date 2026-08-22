from fastapi import FastAPI

from app.routers.auth import router as auth_router


app = FastAPI(title="Car Dealership Inventory API")

app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])