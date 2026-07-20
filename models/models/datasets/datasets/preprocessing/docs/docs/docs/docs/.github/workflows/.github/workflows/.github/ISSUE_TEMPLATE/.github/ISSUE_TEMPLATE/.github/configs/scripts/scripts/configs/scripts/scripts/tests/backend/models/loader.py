"""
===============================================================================
ACCESS-XR Model Loader
===============================================================================

Centralized model loading and lifecycle management.

Features
--------
- Lazy loading
- Model caching
- Automatic CPU/GPU selection
- Checkpoint validation
- Singleton model registry

Author:
    ACCESS-XR Authors
"""

from __future__ import annotations

from pathlib import Path
from typing import Any

import torch

try:
    from ultralytics import YOLO
except ImportError:
    YOLO = None

try:
    import whisper
except ImportError:
    whisper = None

from backend.logging import get_logger

logger = get_logger(__name__)


class ModelLoader:
    """
    Central model manager.
    """

    def __init__(self):

        self.device = (
            "cuda"
            if torch.cuda.is_available()
            else "cpu"
        )

        self._models: dict[str, Any] = {}

        logger.info(
            "Using device: %s",
            self.device,
        )

    # ------------------------------------------------------------------
    # Utilities
    # ------------------------------------------------------------------

    def _validate_checkpoint(
        self,
        checkpoint: str,
    ) -> Path:

        path = Path(checkpoint)

        if not path.exists():

            raise FileNotFoundError(
                f"Checkpoint not found: {path}"
            )

        return path

    # ------------------------------------------------------------------
    # Gesture Model
    # ------------------------------------------------------------------

    def load_gesture_model(
        self,
        checkpoint: str,
    ):

        if "gesture" in self._models:

            return self._models["gesture"]

        if YOLO is None:

            raise ImportError(
                "ultralytics is not installed."
            )

        checkpoint = self._validate_checkpoint(
            checkpoint
        )

        logger.info(
            "Loading gesture model..."
        )

        model = YOLO(str(checkpoint))

        self._models["gesture"] = model

        logger.info(
            "Gesture model loaded."
        )

        return model

    # ------------------------------------------------------------------
    # Speech Model
    # ------------------------------------------------------------------

    def load_speech_model(
        self,
        model_name: str = "base",
    ):

        if "speech" in self._models:

            return self._models["speech"]

        if whisper is None:

            raise ImportError(
                "openai-whisper is not installed."
            )

        logger.info(
            "Loading Whisper model..."
        )

        model = whisper.load_model(
            model_name,
            device=self.device,
        )

        self._models["speech"] = model

        logger.info(
            "Speech model loaded."
        )

        return model

    # ------------------------------------------------------------------
    # Fusion Model
    # ------------------------------------------------------------------

    def load_fusion_model(
        self,
        fusion_class,
        config,
    ):

        if "fusion" in self._models:

            return self._models["fusion"]

        logger.info(
            "Initializing fusion model..."
        )

        model = fusion_class(config)

        self._models["fusion"] = model

        return model

    # ------------------------------------------------------------------
    # Generic Interface
    # ------------------------------------------------------------------

    def get_model(
        self,
        name: str,
    ):

        return self._models.get(name)

    def unload_model(
        self,
        name: str,
    ):

        if name in self._models:

            logger.info(
                "Unloading %s model.",
                name,
            )

            del self._models[name]

            if torch.cuda.is_available():

                torch.cuda.empty_cache()

    def unload_all(self):

        logger.info(
            "Unloading all models."
        )

        self._models.clear()

        if torch.cuda.is_available():

            torch.cuda.empty_cache()

    def loaded_models(self):

        return list(
            self._models.keys()
        )


# =============================================================================
# Singleton Instance
# =============================================================================

model_loader = ModelLoader()
