"""
===============================================================================
ACCESS-XR Multimodal Prediction API
===============================================================================

Unified multimodal inference endpoint.

Supported Modes
---------------
1. Gesture only
2. Speech only
3. Gesture + Speech (Fusion)

Author:
    ACCESS-XR Authors
"""

from pathlib import Path
from tempfile import NamedTemporaryFile

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
    MultimodalPrediction,
)

from backend.services.gesture_service import (
    GestureService,
)

from backend.services.speech_service import (
    SpeechService,
)

from backend.services.fusion_service import (
    FusionService,
)

router = APIRouter(
    prefix="/predict",
    tags=["Multimodal Prediction"],
)


# =============================================================================
# Unified Prediction Endpoint
# =============================================================================

@router.post(
    "",
    response_model=MultimodalPrediction,
    status_code=status.HTTP_200_OK,
)
async def predict(

    image: UploadFile | None = File(default=None),

    audio: UploadFile | None = File(default=None),

    resources=Depends(
        get_inference_resources
    ),

):

    if image is None and audio is None:

        raise HTTPException(

            status_code=400,

            detail="At least one modality must be provided.",

        )

    gesture_result = None
    speech_result = None

    # ------------------------------------------------------------------
    # Gesture
    # ------------------------------------------------------------------

    if image is not None:

        suffix = Path(image.filename).suffix

        with NamedTemporaryFile(
            delete=False,
            suffix=suffix,
        ) as tmp:

            tmp.write(await image.read())

            image_path = Path(tmp.name)

        gesture_service = GestureService(

            model=resources["models"][0],

            config=resources["model_config"].gesture,

        )

        gesture_result = gesture_service.predict(
            image_path=image_path,
        )

    # ------------------------------------------------------------------
    # Speech
    # ------------------------------------------------------------------

    if audio is not None:

        suffix = Path(audio.filename).suffix

        with NamedTemporaryFile(
            delete=False,
            suffix=suffix,
        ) as tmp:

            tmp.write(await audio.read())

            audio_path = Path(tmp.name)

        speech_service = SpeechService(

            model=resources["models"][1],

            config=resources["model_config"].speech,

        )

        speech_result = speech_service.transcribe(
            audio_path=audio_path,
        )

    # ------------------------------------------------------------------
    # Fusion
    # ------------------------------------------------------------------

    fusion = FusionService(

        config=resources["model_config"].fusion,

    )

    prediction = fusion.predict(

        gesture=gesture_result,

        speech=speech_result,

    )

    return MultimodalPrediction(

        prediction=prediction["prediction"],

        confidence=prediction["confidence"],

        modality=prediction["modality"],

        gesture=gesture_result,

        speech=speech_result,

        explanation=prediction["explanation"],

    )
