"""
===============================================================================
ACCESS-XR FastAPI Backend
===============================================================================

Author:
    ACCESS-XR Authors

Run:

    uvicorn backend.main:app --reload
"""

from pathlib import Path
import logging

import yaml
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from scripts.inference import (
    load_models,
    get_device,
    predict_gesture,
    transcribe,
    fuse_predictions,
)

# ---------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------

CONFIG_PATH = Path("configs/default.yaml")

with CONFIG_PATH.open("r") as fp:
    config = yaml.safe_load(fp)

device = get_device(config)

models = load_models(config, device)

# ---------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
)

logger = logging.getLogger("access-xr")

# ---------------------------------------------------------------------
# FastAPI
# ---------------------------------------------------------------------

app = FastAPI(
    title="ACCESS-XR API",
    description="Unified Multimodal Communication API for Extended Reality",
    version="1.0.0",
)

# ---------------------------------------------------------------------
# Response Models
# ---------------------------------------------------------------------

class HealthResponse(BaseModel):
    status: str
    version: str


class PredictionResponse(BaseModel):
    intent: str
    confidence: float
    gesture: dict | None
    speech: dict | None


# ---------------------------------------------------------------------
# Root
# ---------------------------------------------------------------------

@app.get("/")
def root():

    return {
        "project": "ACCESS-XR",
        "version": "1.0.0",
        "documentation": "/docs",
    }


# ---------------------------------------------------------------------
# Health
# ---------------------------------------------------------------------

@app.get(
    "/health",
    response_model=HealthResponse,
)
def health():

    return HealthResponse(
        status="healthy",
        version="1.0.0",
    )


# ---------------------------------------------------------------------
# Gesture Endpoint
# ---------------------------------------------------------------------

@app.post("/gesture")
async def gesture(
    image: UploadFile = File(...)
):

    result = predict_gesture(
        image.filename,
        models[0],
    )

    return result


# ---------------------------------------------------------------------
# Speech Endpoint
# ---------------------------------------------------------------------

@app.post("/speech")
async def speech(
    audio: UploadFile = File(...)
):

    result = transcribe(
        audio.filename,
        models[1],
    )

    return result


# ---------------------------------------------------------------------
# Multimodal Prediction
# ---------------------------------------------------------------------

@app.post(
    "/predict",
    response_model=PredictionResponse,
)
async def predict(

    image: UploadFile | None = File(default=None),

    audio: UploadFile | None = File(default=None),

):

    if image is None and audio is None:

        raise HTTPException(
            status_code=400,
            detail="Provide an image, audio, or both.",
        )

    gesture_result = None
    speech_result = None

    if image is not None:

        gesture_result = predict_gesture(
            image.filename,
            models[0],
        )

    if audio is not None:

        speech_result = transcribe(
            audio.filename,
            models[1],
        )

    prediction = fuse_predictions(
        gesture_result,
        speech_result,
        models[2],
    )

    return PredictionResponse(**prediction)


# ---------------------------------------------------------------------
# Exception Handler
# ---------------------------------------------------------------------

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):

    logger.exception(exc)

    return JSONResponse(
        status_code=500,
        content={
            "detail": "Internal server error."
        },
    )
