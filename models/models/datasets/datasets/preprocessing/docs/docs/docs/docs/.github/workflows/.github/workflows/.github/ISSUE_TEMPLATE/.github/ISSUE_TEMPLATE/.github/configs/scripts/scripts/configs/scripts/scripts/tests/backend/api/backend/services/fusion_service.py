"""
===============================================================================
ACCESS-XR Fusion Service
===============================================================================

Decision-level multimodal fusion.

Author:
    ACCESS-XR Authors
"""

from typing import Optional


class FusionService:

    def __init__(

        self,

        config,

    ):

        self.config = config

    def predict(

        self,

        gesture: Optional[dict],

        speech: Optional[dict],

    ):

        if gesture and speech:

            prediction = speech["text"]

            confidence = (

                gesture["confidence"]

                + speech["confidence"]

            ) / 2

            modality = "gesture+speech"

            explanation = (

                "Prediction obtained using "
                "multimodal decision-level fusion."

            )

        elif gesture:

            prediction = gesture["label"]

            confidence = gesture["confidence"]

            modality = "gesture"

            explanation = (

                "Gesture modality only."

            )

        else:

            prediction = speech["text"]

            confidence = speech["confidence"]

            modality = "speech"

            explanation = (

                "Speech modality only."

            )

        return {

            "prediction": prediction,

            "confidence": confidence,

            "modality": modality,

            "explanation": explanation,

        }
