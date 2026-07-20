"""
===============================================================================
ACCESS-XR Gesture Recognition API
===============================================================================

Gesture recognition endpoints.

Author:
    ACCESS-XR Authors
"""

from tempfile import NamedTemporaryFile
from pathlib import Path

from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    UploadFile,
    status,
)

from backend.dependencies import (
    get_inference_resources,
)

from backend.schemas import (
    GesturePrediction,
)

from backend.services.gesture_service import (
    GestureService,
)

router = APIRouter(
    prefix="/gesture",
    tags=["Gesture Recognition"],
)


# =============================================================================
# Predict Gesture
# =============================================================================

@router.post(
    "/predict",
    response_model=GesturePrediction,
    status_code=status.HTTP_200_OK,
)
async def predict_gesture(

    image: UploadFile = File(...),

    resources=Depends(
        get_inference_resources
    ),

):

    # ----------------------------------------------------------
    # Validate Content Type
    # ----------------------------------------------------------

    if image.content_type not in {

        "image/jpeg",

        "image/png",

        "image/bmp",

        "image/webp",

    }:

        raise HTTPException(

            status_code=415,

            detail="Unsupported image format.",

        )

    # ----------------------------------------------------------
    # Save Uploaded Image
    # ----------------------------------------------------------

    suffix = Path(image.filename).suffix

    with NamedTemporaryFile(

        delete=False,

        suffix=suffix,

    ) as tmp:

        tmp.write(await image.read())

        image_path = Path(tmp.name)

    # ----------------------------------------------------------
    # Inference
    # ----------------------------------------------------------

    service = GestureService(

        model=resources["models"][0],

        config=resources["model_config"].gesture,

    )

    prediction = service.predict(

        image_path=image_path,

    )

    return GesturePrediction(

        label=prediction["label"],

        confidence=prediction["confidence"],

        inference_time_ms=prediction.get(

            "inference_time_ms"

        ),

    )


# =============================================================================
# Supported Classes
# =============================================================================

@router.get("/classes")
async def supported_classes():

    """
    Return supported gesture labels.
    """

    return {

        "classes": [

            "HELLO",

            "THANK_YOU",

            "YES",

            "NO",

            "PLEASE",

            "STOP",

            "GOODBYE",

        ]

    }


# =============================================================================
# Model Information
# =============================================================================

@router.get("/model")
async def model_information(

    resources=Depends(

        get_inference_resources

    ),

):

    cfg = resources["model_config"].gesture

    return {

        "architecture": cfg.architecture,

        "checkpoint": cfg.checkpoint,

        "confidence_threshold":

            cfg.confidence_threshold,

    }
