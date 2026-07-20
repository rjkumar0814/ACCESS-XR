"""
===============================================================================
ACCESS-XR Logging Configuration
===============================================================================

Centralized logging for ACCESS-XR.

Features
--------
- Console logging
- Rotating file logging
- Automatic log directory creation
- Optional JSON logging
- Configurable log levels

Author:
    ACCESS-XR Authors
"""

from __future__ import annotations

import json
import logging
from logging.handlers import RotatingFileHandler
from pathlib import Path
from datetime import datetime

from backend.config import logging as log_config


# =============================================================================
# Log Directory
# =============================================================================

LOG_DIR = Path(log_config.log_directory)
LOG_DIR.mkdir(parents=True, exist_ok=True)

LOG_FILE = LOG_DIR / log_config.log_filename


# =============================================================================
# JSON Formatter
# =============================================================================

class JSONFormatter(logging.Formatter):

    def format(self, record):

        payload = {

            "timestamp": datetime.utcnow().isoformat(),

            "level": record.levelname,

            "logger": record.name,

            "message": record.getMessage(),

            "module": record.module,

            "function": record.funcName,

            "line": record.lineno,

        }

        if record.exc_info:

            payload["exception"] = self.formatException(
                record.exc_info
            )

        return json.dumps(payload)


# =============================================================================
# Text Formatter
# =============================================================================

TEXT_FORMAT = (
    "%(asctime)s | "
    "%(levelname)-8s | "
    "%(name)s | "
    "%(message)s"
)

DATE_FORMAT = "%Y-%m-%d %H:%M:%S"

text_formatter = logging.Formatter(
    TEXT_FORMAT,
    DATE_FORMAT,
)

json_formatter = JSONFormatter()


# =============================================================================
# Logger Factory
# =============================================================================

def get_logger(
    name: str = "access-xr",
    json_logs: bool = False,
):

    logger = logging.getLogger(name)

    if logger.handlers:
        return logger

    logger.setLevel(
        getattr(
            logging,
            log_config.level.upper(),
            logging.INFO,
        )
    )

    # -----------------------------------------------------------------
    # Console Handler
    # -----------------------------------------------------------------

    console = logging.StreamHandler()

    console.setFormatter(
        json_formatter if json_logs
        else text_formatter
    )

    logger.addHandler(console)

    # -----------------------------------------------------------------
    # Rotating File Handler
    # -----------------------------------------------------------------

    file_handler = RotatingFileHandler(

        LOG_FILE,

        maxBytes=10 * 1024 * 1024,

        backupCount=5,

        encoding="utf-8",

    )

    file_handler.setFormatter(
        json_formatter if json_logs
        else text_formatter
    )

    logger.addHandler(file_handler)

    logger.propagate = False

    return logger


# =============================================================================
# Default Logger
# =============================================================================

logger = get_logger()
