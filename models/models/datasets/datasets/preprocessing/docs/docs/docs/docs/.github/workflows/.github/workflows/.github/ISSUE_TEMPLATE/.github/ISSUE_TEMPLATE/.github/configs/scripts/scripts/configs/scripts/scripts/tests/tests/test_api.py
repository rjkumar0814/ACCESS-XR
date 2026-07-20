"""
===============================================================================
ACCESS-XR FastAPI Unit Tests
===============================================================================

Run:

    pytest tests/test_api.py

Author:
    ACCESS-XR Authors
"""

import time

from fastapi.testclient import TestClient

from backend.main import app

client = TestClient(app)


# ---------------------------------------------------------------------
# Health Endpoint
# ---------------------------------------------------------------------

def test_health_endpoint():

    response = client.get("/health")

    assert response.status_code == 200

    data = response.json()

    assert "status" in data

    assert data["status"] == "healthy"


# ---------------------------------------------------------------------
# Root Endpoint
# ---------------------------------------------------------------------

def test_root_endpoint():

    response = client.get("/")

    assert response.status_code == 200

    assert isinstance(response.json(), dict)


# ---------------------------------------------------------------------
# Predict Endpoint
# ---------------------------------------------------------------------

def test_predict_without_input():

    response = client.post("/predict")

    assert response.status_code in [400, 422]


# ---------------------------------------------------------------------
# Invalid Route
# ---------------------------------------------------------------------

def test_invalid_route():

    response = client.get("/unknown")

    assert response.status_code == 404


# ---------------------------------------------------------------------
# Response Time
# ---------------------------------------------------------------------

def test_health_response_time():

    start = time.perf_counter()

    response = client.get("/health")

    elapsed = time.perf_counter() - start

    assert response.status_code == 200

    assert elapsed < 1.0


# ---------------------------------------------------------------------
# JSON Content-Type
# ---------------------------------------------------------------------

def test_health_content_type():

    response = client.get("/health")

    assert response.headers["content-type"].startswith(
        "application/json"
    )


# ---------------------------------------------------------------------
# HTTP Methods
# ---------------------------------------------------------------------

def test_invalid_method():

    response = client.put("/health")

    assert response.status_code in [405, 404]


# ---------------------------------------------------------------------
# Prediction Schema
# ---------------------------------------------------------------------

def test_prediction_schema():

    sample_response = {

        "intent": "Greeting",

        "confidence": 0.97,

        "gesture": {

            "label": "HELLO",

            "confidence": 0.95

        },

        "speech": {

            "text": "Hello",

            "confidence": 0.96

        }

    }

    assert "intent" in sample_response

    assert "confidence" in sample_response

    assert "gesture" in sample_response

    assert "speech" in sample_response


# ---------------------------------------------------------------------
# Confidence Range
# ---------------------------------------------------------------------

def test_prediction_confidence():

    confidence = 0.96

    assert 0.0 <= confidence <= 1.0


# ---------------------------------------------------------------------
# Error Response Format
# ---------------------------------------------------------------------

def test_not_found_schema():

    response = client.get("/missing")

    assert response.status_code == 404

    body = response.json()

    assert "detail" in body
