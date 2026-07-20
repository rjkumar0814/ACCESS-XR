"""
===============================================================================
ACCESS-XR Health API
===============================================================================

Health and readiness endpoints.

Author:
    ACCESS-XR Authors
"""

from datetime import datetime
import platform
import time

import torch
from fastapi import APIRouter

from backend.schemas import (
    HealthResponse,
)

from backend.config import (
    api,
)

router = APIRouter(
    prefix="",
    tags=["Health"],
)

START_TIME = time.time()


# =============================================================================
# Root Endpoint
# =============================================================================

@router.get("/")
async def root():

    return {

        "project": "ACCESS-XR",

        "version": "1.0.0",

        "documentation": "/docs",

        "openapi": "/openapi.json",

    }


# =============================================================================
# Health Check
# =============================================================================

@router.get(
    "/health",
    response_model=HealthResponse,
)
async def health():

    uptime = int(
        time.time() - START_TIME
    )

    return HealthResponse(

        success=True,

        message="Service is operational.",

        status="healthy",

        version="1.0.0",

        uptime=f"{uptime} seconds",

    )


# =============================================================================
# Readiness Probe
# =============================================================================

@router.get("/ready")
async def readiness():

    return {

        "ready": True,

        "models_loaded": True,

        "timestamp": datetime.utcnow().isoformat(),

    }


# =============================================================================
# Liveness Probe
# =============================================================================

@router.get("/live")
async def liveness():

    return {

        "alive": True,

    }


# =============================================================================
# System Information
# =============================================================================

@router.get("/system")
async def system_information():

    return {

        "python": platform.python_version(),

        "platform": platform.platform(),

        "pytorch": torch.__version__,

        "cuda_available": torch.cuda.is_available(),

        "gpu_count": torch.cuda.device_count(),

        "api_host": api.host,

        "api_port": api.port,

    }
