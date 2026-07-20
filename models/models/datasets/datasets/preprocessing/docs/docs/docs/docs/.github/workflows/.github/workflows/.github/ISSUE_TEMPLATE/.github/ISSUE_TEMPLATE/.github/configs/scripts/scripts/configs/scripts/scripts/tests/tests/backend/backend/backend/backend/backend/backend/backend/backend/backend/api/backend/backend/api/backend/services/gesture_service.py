from pathlib import Path
import time


class GestureService:

    def __init__(

        self,

        model,

        config,

    ):

        self.model = model

        self.config = config

    def predict(

        self,

        image_path: Path,

    ):

        start = time.perf_counter()

        # ------------------------------------------------------
        # TODO:
        # Replace with actual YOLOv8 inference
        # ------------------------------------------------------

        result = {

            "label": "HELLO",

            "confidence": 0.98,

        }

        result["inference_time_ms"] = (

            time.perf_counter() - start

        ) * 1000

        return result
