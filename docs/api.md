# ACCESS-XR API Documentation

## Overview

The ACCESS-XR backend is implemented using **FastAPI** and exposes RESTful endpoints for multimodal inference, including gesture recognition, speech transcription, semantic fusion, and system monitoring.

The backend is designed to be lightweight, modular, and easily deployable on local machines, cloud platforms, and edge devices.

---

# Base URL

Local deployment

```
http://127.0.0.1:8000
```

Production deployment

```
https://your-server-domain/api
```

---

# Interactive Documentation

FastAPI automatically generates interactive documentation.

Swagger UI

```
http://127.0.0.1:8000/docs
```

ReDoc

```
http://127.0.0.1:8000/redoc
```

---

# API Overview

| Endpoint | Method | Description |
|-----------|--------|-------------|
| `/` | GET | Service information |
| `/health` | GET | Health check |
| `/predict/gesture` | POST | Gesture recognition |
| `/predict/speech` | POST | Speech transcription |
| `/predict/fusion` | POST | Multimodal fusion |
| `/version` | GET | API version |

---

# Health Check

## GET /health

Returns the operational status of the backend.

### Request

```
GET /health
```

### Response

```json
{
  "status": "healthy",
  "server": "ACCESS-XR",
  "version": "1.0.0"
}
```

HTTP Status

```
200 OK
```

---

# Version Information

## GET /version

Returns software version information.

### Response

```json
{
  "name": "ACCESS-XR",
  "version": "1.0.0",
  "framework": "FastAPI"
}
```

---

# Gesture Recognition

## POST /predict/gesture

Accepts an image and returns the detected gesture.

### Request

Content-Type

```
multipart/form-data
```

Field

| Name | Type | Description |
|------|------|-------------|
| image | File | RGB image |

Example

```bash
curl -X POST \
-F "image=@sample.jpg" \
http://127.0.0.1:8000/predict/gesture
```

### Response

```json
{
  "gesture": "Hello",
  "confidence": 0.98,
  "bounding_box": [
    102,
    45,
    289,
    376
  ]
}
```

---

# Speech Recognition

## POST /predict/speech

Transcribes uploaded speech.

### Request

```
multipart/form-data
```

Field

| Name | Type |
|------|------|
| audio | File |

Example

```bash
curl -X POST \
-F "audio=@speech.wav" \
http://127.0.0.1:8000/predict/speech
```

### Response

```json
{
  "transcript": "Hello everyone.",
  "confidence": 0.97
}
```

---

# Multimodal Fusion

## POST /predict/fusion

Combines gesture and speech predictions into a unified semantic output.

### Request

```
multipart/form-data
```

Fields

| Name | Type |
|------|------|
| image | File |
| audio | File |

Example

```bash
curl -X POST \
-F "image=@gesture.jpg" \
-F "audio=@speech.wav" \
http://127.0.0.1:8000/predict/fusion
```

### Response

```json
{
  "gesture": "Hello",
  "speech": "Hello everyone",
  "semantic_output": "Greeting",
  "fusion_confidence": 0.99,
  "latency_ms": 83
}
```

---

# Response Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Invalid request |
| 404 | Resource not found |
| 415 | Unsupported media type |
| 422 | Validation error |
| 500 | Internal server error |

---

# Error Response

Example

```json
{
  "detail": "Uploaded image is invalid."
}
```

---

# Authentication

Current release

```
Authentication is not required.
```

Future releases may support:

- API Keys
- OAuth2
- JWT Authentication

---

# File Requirements

## Images

Supported formats

- JPG
- JPEG
- PNG

Maximum recommended resolution

```
1920 × 1080
```

---

## Audio

Supported formats

- WAV
- MP3
- FLAC

Recommended sampling rate

```
16 kHz
```

---

# Performance

Typical inference latency depends on hardware.

Example values

| Module | Approximate Latency |
|---------|--------------------|
| Gesture Recognition | 20–40 ms |
| Speech Recognition | 40–80 ms |
| Fusion | <10 ms |

These values should be updated using benchmark results from your experiments.

---

# Example Workflow

```
Client

↓

Capture Image

↓

Capture Audio

↓

POST Request

↓

FastAPI Backend

↓

Gesture Model

↓

Speech Model

↓

Fusion Engine

↓

JSON Response

↓

Frontend Rendering
```

---

# Integration Example

Python

```python
import requests

url = "http://127.0.0.1:8000/predict/gesture"

with open("sample.jpg", "rb") as image:
    response = requests.post(
        url,
        files={"image": image}
    )

print(response.json())
```

---

# React Native Integration

The frontend sends captured media using multipart form uploads.

Typical workflow

```
Camera

↓

FormData

↓

fetch()

↓

FastAPI

↓

JSON Response

↓

UI Update
```

---

# API Versioning

The current release is

```
v1.0.0
```

Future API changes should preserve backward compatibility whenever possible.

---

# Repository Structure

```
backend/

    main.py

    routes/

    services/

    models/

    utils/

    config.py
```

---

# Notes

This API documentation describes the reference implementation accompanying the ACCESS-XR publication. Actual endpoints and request schemas should remain synchronized with the implementation as the project evolves.
