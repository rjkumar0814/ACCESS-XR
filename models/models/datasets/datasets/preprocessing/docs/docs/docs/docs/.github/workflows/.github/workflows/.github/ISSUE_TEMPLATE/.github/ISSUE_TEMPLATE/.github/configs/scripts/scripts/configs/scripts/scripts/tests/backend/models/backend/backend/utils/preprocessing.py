"""
===============================================================================
ACCESS-XR Preprocessing Utilities
===============================================================================

Shared preprocessing utilities for multimodal inference.

Features
--------
- Image loading
- Image validation
- Image preprocessing
- Audio loading
- Audio resampling
- Audio normalization
- Tensor conversion

Author:
    ACCESS-XR Authors
"""

from __future__ import annotations

from pathlib import Path
from typing import Tuple

import cv2
import librosa
import numpy as np
import torch
from PIL import Image


SUPPORTED_IMAGE_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".bmp",
    ".webp",
}

SUPPORTED_AUDIO_EXTENSIONS = {
    ".wav",
    ".mp3",
    ".ogg",
    ".flac",
    ".m4a",
    ".webm",
}


# =============================================================================
# Image Validation
# =============================================================================

def validate_image(path: Path) -> None:
    """
    Validate an image file.
    """

    if not path.exists():
        raise FileNotFoundError(path)

    if path.suffix.lower() not in SUPPORTED_IMAGE_EXTENSIONS:
        raise ValueError(
            f"Unsupported image format: {path.suffix}"
        )


# =============================================================================
# Audio Validation
# =============================================================================

def validate_audio(path: Path) -> None:
    """
    Validate an audio file.
    """

    if not path.exists():
        raise FileNotFoundError(path)

    if path.suffix.lower() not in SUPPORTED_AUDIO_EXTENSIONS:
        raise ValueError(
            f"Unsupported audio format: {path.suffix}"
        )


# =============================================================================
# Load Image
# =============================================================================

def load_image(
    image_path: Path,
) -> np.ndarray:
    """
    Load image using OpenCV.
    """

    validate_image(image_path)

    image = cv2.imread(str(image_path))

    if image is None:
        raise ValueError(
            "Unable to read image."
        )

    image = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2RGB,
    )

    return image


# =============================================================================
# Resize Image
# =============================================================================

def resize_image(
    image: np.ndarray,
    size: Tuple[int, int],
) -> np.ndarray:

    return cv2.resize(
        image,
        size,
        interpolation=cv2.INTER_LINEAR,
    )


# =============================================================================
# Normalize Image
# =============================================================================

def normalize_image(
    image: np.ndarray,
) -> np.ndarray:

    image = image.astype(np.float32)

    image /= 255.0

    return image


# =============================================================================
# Convert Image to Tensor
# =============================================================================

def image_to_tensor(
    image: np.ndarray,
) -> torch.Tensor:

    tensor = torch.from_numpy(image)

    tensor = tensor.permute(
        2,
        0,
        1,
    )

    tensor = tensor.unsqueeze(0)

    return tensor.float()


# =============================================================================
# Complete Image Pipeline
# =============================================================================

def preprocess_image(
    image_path: Path,
    image_size: Tuple[int, int] = (640, 640),
) -> torch.Tensor:

    image = load_image(image_path)

    image = resize_image(
        image,
        image_size,
    )

    image = normalize_image(image)

    return image_to_tensor(image)


# =============================================================================
# Load Audio
# =============================================================================

def load_audio(
    audio_path: Path,
    sample_rate: int = 16000,
):

    validate_audio(audio_path)

    waveform, sr = librosa.load(
        audio_path,
        sr=sample_rate,
        mono=True,
    )

    return waveform, sr


# =============================================================================
# Normalize Audio
# =============================================================================

def normalize_audio(
    waveform: np.ndarray,
):

    peak = np.max(
        np.abs(waveform)
    )

    if peak > 0:

        waveform = waveform / peak

    return waveform


# =============================================================================
# Audio Tensor
# =============================================================================

def audio_to_tensor(
    waveform: np.ndarray,
):

    return torch.tensor(
        waveform,
        dtype=torch.float32,
    )


# =============================================================================
# Complete Audio Pipeline
# =============================================================================

def preprocess_audio(
    audio_path: Path,
    sample_rate: int = 16000,
):

    waveform, sr = load_audio(
        audio_path,
        sample_rate,
    )

    waveform = normalize_audio(
        waveform,
    )

    return audio_to_tensor(
        waveform,
    )
