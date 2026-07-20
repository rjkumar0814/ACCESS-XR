from fastapi import FastAPI

from backend.api.health import router as health_router

app = FastAPI(
    title="ACCESS-XR API",
    version="1.0.0",
)

app.include_router(health_router)
