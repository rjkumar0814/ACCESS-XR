"""
===============================================================================
ACCESS-XR Middleware
===============================================================================

Production middleware for FastAPI.

Features
--------
- Request ID generation
- Processing time measurement
- Request/response logging
- Security headers
- CORS
- GZip compression

Author:
    ACCESS-XR Authors
"""

import logging
import time
import uuid

from fastapi import FastAPI, Request
from fastapi.responses import Response
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.gzip import GZipMiddleware

from backend.config import api

logger = logging.getLogger("access-xr")


# =============================================================================
# Request Logging Middleware
# =============================================================================

async def logging_middleware(
    request: Request,
    call_next,
):

    request_id = str(uuid.uuid4())

    start = time.perf_counter()

    logger.info(
        "[%s] %s %s",
        request_id,
        request.method,
        request.url.path,
    )

    response = await call_next(request)

    elapsed = (
        time.perf_counter() - start
    ) * 1000

    response.headers["X-Request-ID"] = request_id
    response.headers["X-Process-Time-ms"] = f"{elapsed:.2f}"

    logger.info(
        "[%s] %d %.2f ms",
        request_id,
        response.status_code,
        elapsed,
    )

    return response


# =============================================================================
# Security Headers
# =============================================================================

async def security_headers(
    request: Request,
    call_next,
):

    response: Response = await call_next(request)

    response.headers["X-Content-Type-Options"] = "nosniff"

    response.headers["X-Frame-Options"] = "DENY"

    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"

    response.headers["Permissions-Policy"] = (
        "camera=(), microphone=(), geolocation=()"
    )

    response.headers["Cache-Control"] = "no-store"

    return response


# =============================================================================
# Register Middleware
# =============================================================================

def register_middleware(app: FastAPI):

    # ----------------------------------------------------------
    # CORS
    # ----------------------------------------------------------

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # ----------------------------------------------------------
    # Compression
    # ----------------------------------------------------------

    app.add_middleware(
        GZipMiddleware,
        minimum_size=1024,
    )

    # ----------------------------------------------------------
    # Custom Middleware
    # ----------------------------------------------------------

    app.middleware("http")(
        logging_middleware
    )

    app.middleware("http")(
        security_headers
    )

    logger.info("Middleware registered.")
