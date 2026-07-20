"""
===============================================================================
ACCESS-XR Configuration Management
===============================================================================

Loads configuration from:
1. configs/default.yaml
2. Environment variables (override)

Author:
    ACCESS-XR Authors
"""

from pathlib import Path
from typing import Optional

import yaml
from pydantic import BaseModel, Field
from pydantic_settings import BaseSettings, SettingsConfigDict


# =============================================================================
# YAML Loader
# =============================================================================

CONFIG_FILE = Path("configs/default.yaml")


def load_yaml() -> dict:

    if not CONFIG_FILE.exists():
        raise FileNotFoundError(
            f"Configuration file not found: {CONFIG_FILE}"
        )

    with CONFIG_FILE.open("r", encoding="utf-8") as fp:
        return yaml.safe_load(fp)


_yaml = load_yaml()


# =============================================================================
# Runtime
# =============================================================================

class RuntimeConfig(BaseModel):

    device: str = "auto"

    seed: int = 42

    deterministic: bool = True

    num_workers: int = 4


# =============================================================================
# API
# =============================================================================

class APIConfig(BaseModel):

    host: str = "0.0.0.0"

    port: int = 8000

    workers: int = 1

    reload: bool = False


# =============================================================================
# Logging
# =============================================================================

class LoggingConfig(BaseModel):

    level: str = "INFO"

    save_logs: bool = True

    log_directory: str = "logs"

    log_filename: str = "access_xr.log"


# =============================================================================
# Model Configuration
# =============================================================================

class ModelEntry(BaseModel):

    architecture: str

    checkpoint: Optional[str] = None

    confidence_threshold: float = Field(
        default=0.5,
        ge=0.0,
        le=1.0,
    )


class ModelConfig(BaseModel):

    gesture: ModelEntry

    speech: ModelEntry

    fusion: ModelEntry


# =============================================================================
# Dataset
# =============================================================================

class DatasetConfig(BaseModel):

    root: str = "datasets"


# =============================================================================
# Environment Settings
# =============================================================================

class Settings(BaseSettings):

    model_config = SettingsConfigDict(
        env_prefix="ACCESS_XR_",
        extra="ignore",
    )

    debug: bool = False

    api_host: Optional[str] = None

    api_port: Optional[int] = None


# =============================================================================
# Main Configuration
# =============================================================================

runtime = RuntimeConfig(
    **_yaml.get("runtime", {})
)

api = APIConfig(
    **_yaml.get("api", {})
)

logging = LoggingConfig(
    **_yaml.get("logging", {})
)

models = ModelConfig(
    **_yaml.get("models", {})
)

dataset = DatasetConfig(
    **_yaml.get("dataset", {})
)

settings = Settings()


# =============================================================================
# Helper
# =============================================================================

def get_config():

    return {
        "runtime": runtime,
        "api": api,
        "logging": logging,
        "models": models,
        "dataset": dataset,
        "settings": settings,
    }
