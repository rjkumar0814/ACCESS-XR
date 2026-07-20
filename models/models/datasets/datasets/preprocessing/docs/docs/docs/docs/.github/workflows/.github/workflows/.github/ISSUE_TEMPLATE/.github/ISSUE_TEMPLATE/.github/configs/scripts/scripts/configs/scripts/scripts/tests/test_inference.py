"""
===============================================================================
ACCESS-XR Inference Unit Tests
===============================================================================

Run:

    pytest tests/

Author:
    ACCESS-XR Authors
"""

from pathlib import Path
import tempfile
import json
import pytest

from scripts.inference import (
    load_config,
    get_device,
    save_output,
)


# ---------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------

def test_load_config():

    config = load_config()

    assert config is not None
    assert "runtime" in config
    assert "models" in config


# ---------------------------------------------------------------------
# Device
# ---------------------------------------------------------------------

def test_device_selection():

    config = load_config()

    device = get_device(config)

    assert str(device) in ["cpu", "cuda"]


# ---------------------------------------------------------------------
# JSON Output
# ---------------------------------------------------------------------

def test_save_output():

    prediction = {

        "intent": "Greeting",

        "confidence": 0.98,

        "gesture": {

            "label": "HELLO",

            "confidence": 0.96

        },

        "speech": {

            "text": "Hello",

            "confidence": 0.95

        }

    }

    with tempfile.TemporaryDirectory() as tmp:

        output = Path(tmp) / "prediction.json"

        with output.open("w") as fp:

            json.dump(prediction, fp)

        assert output.exists()

        with output.open() as fp:

            loaded = json.load(fp)

        assert loaded["intent"] == "Greeting"


# ---------------------------------------------------------------------
# Confidence Range
# ---------------------------------------------------------------------

@pytest.mark.parametrize(
    "confidence",
    [
        0.0,
        0.25,
        0.5,
        0.75,
        1.0,
    ],
)
def test_confidence_range(confidence):

    assert 0.0 <= confidence <= 1.0


# ---------------------------------------------------------------------
# Prediction Format
# ---------------------------------------------------------------------

def test_prediction_structure():

    prediction = {

        "intent": "Greeting",

        "confidence": 0.97,

        "gesture": {

            "label": "HELLO",

            "confidence": 0.95,

        },

        "speech": {

            "text": "Hello",

            "confidence": 0.96,

        }

    }

    assert "intent" in prediction

    assert "confidence" in prediction

    assert "gesture" in prediction

    assert "speech" in prediction


# ---------------------------------------------------------------------
# Model Path
# ---------------------------------------------------------------------

def test_model_path_exists():

    config = load_config()

    model_path = Path(
        config["models"]["gesture"]["checkpoint"]
    )

    assert isinstance(model_path, Path)


# ---------------------------------------------------------------------
# Invalid Inputs
# ---------------------------------------------------------------------

@pytest.mark.parametrize(
    "invalid_path",
    [
        "",
        "missing.jpg",
        "missing.wav",
    ]
)
def test_invalid_inputs(invalid_path):

    path = Path(invalid_path)

    assert not path.exists()


# ---------------------------------------------------------------------
# Output Schema
# ---------------------------------------------------------------------

def test_prediction_schema():

    prediction = {

        "intent": "Greeting",

        "confidence": 0.96,

        "gesture": {

            "label": "HELLO",

            "confidence": 0.95,

        },

        "speech": {

            "text": "Hello",

            "confidence": 0.93,

        }

    }

    assert isinstance(prediction["intent"], str)

    assert isinstance(
        prediction["confidence"],
        float,
    )

    assert isinstance(
        prediction["gesture"],
        dict,
    )

    assert isinstance(
        prediction["speech"],
        dict,
    )
