# ACCESS-XR Deployment Guide

## Overview

This guide describes how to deploy the ACCESS-XR framework in different environments, including:

- Local development
- Docker containers
- Cloud platforms
- Edge devices
- XR applications
- Production environments

The deployment architecture is designed to be modular, allowing the frontend, backend, and machine learning models to be deployed independently.

---

# Deployment Architecture

```
                     ACCESS-XR Deployment

        React Native / XR Client
                  │
                  │ HTTPS
                  ▼
        FastAPI Backend Server
                  │
     ┌────────────┼────────────┐
     │            │            │
     ▼            ▼            ▼
 YOLOv8      Whisper ASR    Fusion Engine
     │            │            │
     └────────────┴────────────┘
                  │
                  ▼
         Semantic Mapping Layer
                  │
                  ▼
          Accessible XR Output
```

---

# Prerequisites

## Software

- Python 3.10+
- Node.js 18+
- npm or yarn
- Git

Optional

- Docker
- Docker Compose
- NVIDIA CUDA Toolkit (GPU deployment)

---

# Local Deployment

## Clone Repository

```bash
git clone https://github.com/<username>/ACCESS-XR.git
cd ACCESS-XR
```

---

## Backend Setup

Create a virtual environment.

```bash
python -m venv .venv
```

Activate it.

Linux/macOS

```bash
source .venv/bin/activate
```

Windows

```powershell
.venv\Scripts\activate
```

Install dependencies.

```bash
pip install -r backend/requirements.txt
```

Start the FastAPI server.

```bash
uvicorn backend.main:app --reload
```

The backend is available at:

```
http://127.0.0.1:8000
```

---

## Frontend Setup

Install JavaScript dependencies.

```bash
npm install
```

Run the Expo development server.

```bash
npx expo start
```

---

# Docker Deployment

Example Dockerfile

```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY backend/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build the image.

```bash
docker build -t access-xr .
```

Run the container.

```bash
docker run -p 8000:8000 access-xr
```

---

# Docker Compose

Example `docker-compose.yml`

```yaml
version: "3.9"

services:

  access-xr:

    build: .

    ports:
      - "8000:8000"

    restart: unless-stopped
```

Start the application.

```bash
docker compose up
```

---

# Cloud Deployment

ACCESS-XR can be deployed on:

- AWS
- Microsoft Azure
- Google Cloud Platform
- DigitalOcean
- Oracle Cloud
- Kubernetes clusters

Typical deployment architecture:

```
Internet
     │
Load Balancer
     │
FastAPI Server
     │
GPU Inference
     │
Model Storage
```

---

# Edge Deployment

The modular architecture allows deployment on edge devices such as:

- NVIDIA Jetson
- Intel NUC
- High-performance embedded systems

Recommendations:

- Use smaller Whisper models when resources are limited.
- Quantize models if appropriate.
- Optimize inference using hardware acceleration where supported.

---

# Mobile Integration

The React Native frontend communicates with the backend using REST APIs.

Example configuration:

```
Frontend

↓

REST API

↓

FastAPI Backend

↓

JSON Response

↓

User Interface
```

Ensure the backend URL is updated appropriately for local, staging, or production environments.

---

# Environment Variables

Store configuration values in a `.env` file.

Example:

```text
APP_ENV=production
HOST=0.0.0.0
PORT=8000
MODEL_PATH=models/access_xr_yolov8.pt
WHISPER_MODEL=base
LOG_LEVEL=INFO
```

Do not commit sensitive information such as API keys or credentials.

---

# Logging

Recommended logging levels:

- INFO
- WARNING
- ERROR

Store logs separately from application code.

Example directory:

```
logs/

    accessxr.log
```

---

# Monitoring

Recommended production monitoring:

- CPU utilization
- GPU utilization
- Memory usage
- API response times
- Request throughput
- Error rates

Tools such as Prometheus and Grafana can be integrated for operational monitoring.

---

# Performance Optimization

Recommendations:

- Enable GPU acceleration when available.
- Cache models in memory.
- Use asynchronous API endpoints where appropriate.
- Optimize image resolution for inference.
- Batch requests if supported by the application.

---

# Security Recommendations

For production deployments:

- Enable HTTPS.
- Restrict API access through authentication.
- Validate uploaded files.
- Keep dependencies up to date.
- Avoid hard-coded secrets.
- Use a reverse proxy (e.g., Nginx) in front of the FastAPI application.
- Configure appropriate rate limiting and request size limits.

---

# Backup and Recovery

Regularly back up:

- Configuration files
- Model checkpoints
- Logs (if required)
- Deployment manifests

Maintain versioned backups for reproducibility.

---

# Troubleshooting

## Backend fails to start

- Verify Python version.
- Confirm all dependencies are installed.
- Check that model paths are valid.

---

## Frontend cannot connect

- Ensure the backend is running.
- Verify the API URL.
- Check firewall and network settings.

---

## GPU unavailable

- Verify CUDA installation.
- Confirm the installed PyTorch build supports the GPU.
- Check `nvidia-smi` output.

---

# Deployment Checklist

Before deployment, verify:

- Repository cloned successfully.
- Dependencies installed.
- Models available.
- Environment variables configured.
- Backend starts without errors.
- Frontend connects to backend.
- API endpoints respond correctly.
- Logging enabled.
- HTTPS configured for production.
- Security settings reviewed.

---

# Related Documentation

- `docs/api.md`
- `docs/architecture.md`
- `docs/reproducibility.md`
- `docs/benchmark.md`

---

# Citation

If ACCESS-XR is deployed in academic or industrial research, please cite the accompanying publication and this repository.
