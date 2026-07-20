"""
===============================================================================
ACCESS-XR Validation Utilities
===============================================================================

Reusable validation functions for the ACCESS-XR backend.

Features
--------
- Image validation
- Audio validation
- MIME type validation
- File size validation
- Confidence validation
- UUID validation
- Filename sanitization
- Configuration validation

Author:
    ACCESS-XR Authors
"""

from __future__ import annotations

import re
import uuid
from pathlib import Path

# =============================================================================
# Supported MIME Types
# =============================================================================

SUPPORTED_IMAGE_TYPES = {
    "image/jpeg",
    "image/png",
    "image/bmp",
    "image/webp",
}

SUPPORTED_AUDIO_TYPES = {
    "audio/wav",
    "audio/x-wav",
    "audio/mpeg",
    "audio/mp3",
    "audio/flac",
    "audio/ogg",
    "audio/webm",
}

# 20 MB
MAX_UPLOAD_SIZE = 20 * 1024 * 1024


# =============================================================================
# MIME Type Validation
# =============================================================================

def validate_image_type(content_type: str) -> bool:
    """
    Validate image MIME type.
    """

    return content_type in SUPPORTED_IMAGE_TYPES


def validate_audio_type(content_type: str) -> bool:
    """
    Validate audio MIME type.
    """

    return content_type in SUPPORTED_AUDIO_TYPES


# =============================================================================
# File Size Validation
# =============================================================================

def validate_file_size(
    size: int,
    max_size: int = MAX_UPLOAD_SIZE,
) -> bool:
    """
    Validate uploaded file size.
    """

    return size <= max_size


# =============================================================================
# Filename Sanitization
# =============================================================================

def sanitize_filename(filename: str) -> str:
    """
    Remove unsafe filename characters.
    """

    filename = Path(filename).name

    filename = re.sub(
        r"[^A-Za-z0-9._-]",
        "_",
        filename,
    )

    return filename


# =============================================================================
# UUID Validation
# =============================================================================

def validate_uuid(value: str) -> bool:
    """
    Validate UUID string.
    """

    try:

        uuid.UUID(value)

        return True

    except ValueError:

        return False


# =============================================================================
# Confidence Validation
# =============================================================================

def validate_confidence(
    confidence: float,
) -> bool:
    """
    Confidence must lie in [0,1].
    """

    return 0.0 <= confidence <= 1.0


# =============================================================================
# Threshold Validation
# =============================================================================

def validate_threshold(
    threshold: float,
) -> bool:
    """
    Validate probability threshold.
    """

    return 0.0 <= threshold <= 1.0


# =============================================================================
# Image Extension Validation
# =============================================================================

def validate_image_extension(
    filename: str,
) -> bool:

    return Path(filename).suffix.lower() in {

        ".jpg",

        ".jpeg",

        ".png",

        ".bmp",

        ".webp",

    }


# =============================================================================
# Audio Extension Validation
# =============================================================================

def validate_audio_extension(
    filename: str,
) -> bool:

    return Path(filename).suffix.lower() in {

        ".wav",

        ".mp3",

        ".ogg",

        ".flac",

        ".m4a",

        ".webm",

    }


# =============================================================================
# Generic Configuration Validation
# =============================================================================

def validate_positive_integer(
    value: int,
) -> bool:

    return value > 0


def validate_positive_float(
    value: float,
) -> bool:

    return value > 0.0


# =============================================================================
# Checkpoint Validation
# =============================================================================

def validate_checkpoint(
    checkpoint: str,
) -> bool:
    """
    Validate checkpoint file existence.
    """

    return Path(checkpoint).exists()
