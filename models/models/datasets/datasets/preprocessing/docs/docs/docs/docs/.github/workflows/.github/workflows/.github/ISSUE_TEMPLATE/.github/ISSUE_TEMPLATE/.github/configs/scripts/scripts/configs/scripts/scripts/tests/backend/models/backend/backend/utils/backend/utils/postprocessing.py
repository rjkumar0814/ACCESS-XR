"""
===============================================================================
ACCESS-XR Postprocessing Utilities
===============================================================================

Shared postprocessing utilities for multimodal inference.

Features
--------
- Confidence calibration
- Confidence thresholding
- Label mapping
- Semantic normalization
- Prediction ranking
- Unified response formatting

Author:
    ACCESS-XR Authors
"""

from __future__ import annotations

from typing import Dict, List, Optional


# =============================================================================
# Confidence Calibration
# =============================================================================

def calibrate_confidence(
    confidence: float,
    temperature: float = 1.0,
) -> float:
    """
    Temperature-based confidence calibration.
    """

    if temperature <= 0:
        raise ValueError(
            "Temperature must be positive."
        )

    calibrated = confidence ** (1 / temperature)

    return round(
        min(max(calibrated, 0.0), 1.0),
        4,
    )


# =============================================================================
# Confidence Threshold
# =============================================================================

def passes_threshold(
    confidence: float,
    threshold: float,
) -> bool:

    return confidence >= threshold


# =============================================================================
# Label Mapping
# =============================================================================

def map_label(
    label: str,
    mapping: Optional[Dict[str, str]] = None,
) -> str:
    """
    Convert internal labels into user-friendly labels.
    """

    if mapping is None:
        return label

    return mapping.get(
        label,
        label,
    )


# =============================================================================
# Normalize Text
# =============================================================================

def normalize_text(
    text: str,
) -> str:

    return " ".join(
        text.strip().split()
    )


# =============================================================================
# Prediction Ranking
# =============================================================================

def rank_predictions(
    predictions: List[Dict],
) -> List[Dict]:

    return sorted(

        predictions,

        key=lambda x: x["confidence"],

        reverse=True,

    )


# =============================================================================
# Gesture Output
# =============================================================================

def build_gesture_response(
    label: str,
    confidence: float,
    threshold: float,
):

    confidence = calibrate_confidence(
        confidence
    )

    return {

        "label": label,

        "confidence": confidence,

        "accepted": passes_threshold(

            confidence,

            threshold,

        ),

    }


# =============================================================================
# Speech Output
# =============================================================================

def build_speech_response(

    text: str,

    confidence: float,

    language: str,

    threshold: float,

):

    confidence = calibrate_confidence(
        confidence
    )

    return {

        "text": normalize_text(text),

        "confidence": confidence,

        "language": language,

        "accepted": passes_threshold(

            confidence,

            threshold,

        ),

    }


# =============================================================================
# Multimodal Output
# =============================================================================

def build_multimodal_response(

    prediction: str,

    confidence: float,

    modality: str,

    explanation: str,

    gesture=None,

    speech=None,

):

    return {

        "prediction": prediction,

        "confidence": calibrate_confidence(

            confidence

        ),

        "modality": modality,

        "gesture": gesture,

        "speech": speech,

        "explanation": explanation,

    }


# =============================================================================
# Top-K Predictions
# =============================================================================

def top_k_predictions(

    predictions: List[Dict],

    k: int = 5,

):

    ranked = rank_predictions(
        predictions
    )

    return ranked[:k]
