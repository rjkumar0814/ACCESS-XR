#!/usr/bin/env python3
"""
===============================================================================
ACCESS-XR Dataset Preparation Script
===============================================================================

This script:

1. Validates the dataset directory structure.
2. Scans gesture and speech datasets.
3. Generates metadata.json.
4. Reports missing or unsupported files.
5. Produces a dataset summary.

Usage:
    python scripts/prepare_dataset.py

Author:
    ACCESS-XR Authors
"""

from pathlib import Path
import json
import hashlib

SUPPORTED_IMAGES = {".jpg", ".jpeg", ".png", ".bmp"}
SUPPORTED_AUDIO = {".wav", ".mp3", ".flac"}

ROOT = Path("datasets")

DATASETS = {
    "gesture": ROOT / "gesture",
    "speech": ROOT / "speech",
}

OUTPUT = ROOT / "metadata.json"


def sha256(path: Path) -> str:
    """Compute SHA-256 checksum."""
    h = hashlib.sha256()
    with path.open("rb") as f:
        while True:
            chunk = f.read(8192)
            if not chunk:
                break
            h.update(chunk)
    return h.hexdigest()


def scan_directory(directory: Path, allowed_extensions):
    """Scan a dataset directory."""
    records = []

    if not directory.exists():
        print(f"[WARNING] Missing directory: {directory}")
        return records

    for file in sorted(directory.rglob("*")):

        if not file.is_file():
            continue

        if file.suffix.lower() not in allowed_extensions:
            continue

        records.append(
            {
                "path": str(file.relative_to(ROOT)),
                "size_bytes": file.stat().st_size,
                "sha256": sha256(file),
            }
        )

    return records


def summarize(metadata):

    print("\n==============================")
    print("ACCESS-XR DATASET SUMMARY")
    print("==============================")

    total = 0

    for name, items in metadata.items():
        print(f"{name:10s}: {len(items):5d} files")
        total += len(items)

    print("------------------------------")
    print(f"Total Files : {total}")
    print("==============================\n")


def main():

    metadata = {}

    metadata["gesture"] = scan_directory(
        DATASETS["gesture"],
        SUPPORTED_IMAGES,
    )

    metadata["speech"] = scan_directory(
        DATASETS["speech"],
        SUPPORTED_AUDIO,
    )

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    with OUTPUT.open("w") as fp:
        json.dump(metadata, fp, indent=4)

    summarize(metadata)

    print(f"Metadata saved to: {OUTPUT}")


if __name__ == "__main__":
    main()
