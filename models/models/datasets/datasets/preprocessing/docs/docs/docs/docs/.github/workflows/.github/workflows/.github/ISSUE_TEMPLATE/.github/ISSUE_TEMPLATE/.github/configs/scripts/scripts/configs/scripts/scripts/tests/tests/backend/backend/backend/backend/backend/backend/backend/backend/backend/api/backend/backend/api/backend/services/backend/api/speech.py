"""
===============================================================================
ACCESS-XR Speech Recognition API
===============================================================================

Speech transcription endpoints.

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
    SpeechPrediction,
)

from backend.services.speech_service import (
    SpeechService,
)

router = APIRouter(
    prefix="/speech",
    tags=["Speech Recognition"],
)


# =============================================================================
# Speech Recognition
# =============================================================================

@router.post(
    "/transcribe",
    response_model=SpeechPrediction,
    status_code=status.HTTP_200_OK,
)
async def transcribe_audio(

    audio: UploadFile = File(...),

    resources=Depends(
        get_inference_resources
    ),

):

    supported_types = {

        "audio/wav",

        "audio/x-wav",

        "audio/mpeg",

        "audio/mp3",

        "audio/flac",

        "audio/ogg",

        "audio/webm",

    }

    if audio.content_type not in supported_types:

        raise HTTPException(

            status_code=415,

            detail="Unsupported audio format.",

        )

    suffix = Path(audio.filename).suffix

    with NamedTemporaryFile(

        delete=False,

        suffix=suffix,

    ) as tmp:

        tmp.write(await audio.read())

        audio_path = Path(tmp.name)

    service = SpeechService(

        model=resources["models"][1],

        config=resources["model_config"].speech,

    )

    result = service.transcribe(

        audio_path=audio_path,

    )

    return SpeechPrediction(

        text=result["text"],

        confidence=result["confidence"],

        language=result.get("language"),

        inference_time_ms=result.get(

            "inference_time_ms"

        ),

    )


# =============================================================================
# Supported Languages
# =============================================================================

@router.get("/languages")
async def supported_languages():

    return {

        "languages": [

            "auto",

            "en",

            "ta",

            "hi",

            "fr",

            "de",

            "es",

            "zh",

            "ja",

            "ko",

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

    cfg = resources["model_config"].speech

    return {

        "architecture": cfg.architecture,

        "checkpoint": cfg.checkpoint,

        "confidence_threshold":

            cfg.confidence_threshold,

    }
