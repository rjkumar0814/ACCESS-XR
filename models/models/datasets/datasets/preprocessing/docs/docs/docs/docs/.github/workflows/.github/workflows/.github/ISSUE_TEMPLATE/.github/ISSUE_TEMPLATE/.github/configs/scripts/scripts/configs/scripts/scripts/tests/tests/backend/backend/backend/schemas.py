"""
===============================================================================
ACCESS-XR API Schemas
===============================================================================

Pydantic models for request and response validation.

Author:
    ACCESS-XR Authors
"""

from typing import Optional, Literal

from pydantic import BaseModel, ConfigDict, Field


# =============================================================================
# Base Models
# =============================================================================

class APIResponse(BaseModel):
    """Base API response."""

    success: bool = True
    message: str = "Request completed successfully."

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "success": True,
                "message": "Operation completed."
            }
        }
    )


# =============================================================================
# Health
# =============================================================================

class HealthResponse(APIResponse):

    status: Literal["healthy", "degraded", "unhealthy"]

    version: str

    uptime: Optional[str] = None


# =============================================================================
# Gesture
# =============================================================================

class GesturePrediction(BaseModel):

    label: str

    confidence: float = Field(
        ge=0.0,
        le=1.0,
    )

    inference_time_ms: Optional[float] = None


# =============================================================================
# Speech
# =============================================================================

class SpeechPrediction(BaseModel):

    text: str

    confidence: float = Field(
        ge=0.0,
        le=1.0,
    )

    language: Optional[str] = None

    inference_time_ms: Optional[float] = None


# =============================================================================
# Multimodal Prediction
# =============================================================================

class PredictionResponse(APIResponse):

    intent: str

    confidence: float = Field(
        ge=0.0,
        le=1.0,
    )

    gesture: Optional[GesturePrediction] = None

    speech: Optional[SpeechPrediction] = None

    model_version: Optional[str] = None

    processing_time_ms: Optional[float] = None


# =============================================================================
# Error
# =============================================================================

class ErrorResponse(BaseModel):

    success: bool = False

    error: str

    detail: Optional[str] = None

    error_code: Optional[str] = None


# =============================================================================
# Model Information
# =============================================================================

class ModelInfo(BaseModel):

    name: str

    version: str

    architecture: str

    framework: str

    checkpoint: str


class ModelInfoResponse(APIResponse):

    gesture: ModelInfo

    speech: ModelInfo

    fusion: ModelInfo


# =============================================================================
# Metrics
# =============================================================================

class MetricsResponse(APIResponse):

    requests_served: int

    average_latency_ms: float

    average_confidence: float

    uptime: str
