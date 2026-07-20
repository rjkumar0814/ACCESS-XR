"""
===============================================================================
ACCESS-XR Speech Recognition Service
===============================================================================

Speech inference service.

Author:
    ACCESS-XR Authors
"""

from pathlib import Path
import time


class SpeechService:

    def __init__(

        self,

        model,

        config,

    ):

        self.model = model

        self.config = config

    def transcribe(

        self,

        audio_path: Path,

    ):

        start = time.perf_counter()

        # --------------------------------------------------------
        # TODO
        # Replace with Whisper inference
        # --------------------------------------------------------

        result = {

            "text": "Hello",

            "confidence": 0.97,

            "language": "en",

        }

        result["inference_time_ms"] = (

            time.perf_counter() - start

        ) * 1000

        return result
