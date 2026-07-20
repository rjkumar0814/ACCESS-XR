"""
===============================================================================
ACCESS-XR Dependency Injection
===============================================================================

Reusable FastAPI dependencies.

Author:
    ACCESS-XR Authors
"""

from functools import lru_cache
import logging
import time

from fastapi import Depends, HTTPException, Request

from backend.config import (
    api,
    runtime,
    models as model_config,
)

from scripts.inference import (
    load_models,
    get_device,
)

# =============================================================================
# Logger
# =============================================================================

logger = logging.getLogger("access-xr")


# =============================================================================
# Configuration
# =============================================================================

@lru_cache(maxsize=1)
def get_runtime_config():
    """Return runtime configuration."""
    return runtime


@lru_cache(maxsize=1)
def get_api_config():
    """Return API configuration."""
    return api


@lru_cache(maxsize=1)
def get_model_config():
    """Return model configuration."""
    return model_config


# =============================================================================
# Device
# =============================================================================

@lru_cache(maxsize=1)
def get_compute_device():
    """Initialize compute device once."""
    return get_device(
        {
            "runtime": {
                "device": runtime.device
            }
        }
    )


# =============================================================================
# Model Loader
# =============================================================================

@lru_cache(maxsize=1)
def get_models():
    """
    Load models once during application lifetime.
    """

    logger.info("Loading ACCESS-XR models...")

    device = get_compute_device()

    models = load_models(
        {
            "runtime": {
                "device": runtime.device
            },
            "models": {
                "gesture": model_config.gesture.model_dump(),
                "speech": model_config.speech.model_dump(),
                "fusion": model_config.fusion.model_dump(),
            },
        },
        device,
    )

    logger.info("Models loaded successfully.")

    return models


# =============================================================================
# Logger Dependency
# =============================================================================

def get_logger():

    return logger


# =============================================================================
# Request Timer
# =============================================================================

async def request_timer(request: Request):

    start = time.perf_counter()

    yield

    elapsed = (
        time.perf_counter() - start
    ) * 1000

    logger.info(
        "%s %s %.2f ms",
        request.method,
        request.url.path,
        elapsed,
    )


# =============================================================================
# Optional API Key Authentication
# =============================================================================

API_KEY = None


def verify_api_key(
    request: Request,
):

    if API_KEY is None:

        return True

    supplied = request.headers.get(
        "X-API-Key"
    )

    if supplied != API_KEY:

        raise HTTPException(
            status_code=401,
            detail="Invalid API key.",
        )

    return True


# =============================================================================
# Combined Dependency
# =============================================================================

def get_inference_resources(

    runtime_config=Depends(
        get_runtime_config
    ),

    model_cfg=Depends(
        get_model_config
    ),

    loaded_models=Depends(
        get_models
    ),

):

    return {

        "runtime": runtime_config,

        "models": loaded_models,

        "model_config": model_cfg,

    }
