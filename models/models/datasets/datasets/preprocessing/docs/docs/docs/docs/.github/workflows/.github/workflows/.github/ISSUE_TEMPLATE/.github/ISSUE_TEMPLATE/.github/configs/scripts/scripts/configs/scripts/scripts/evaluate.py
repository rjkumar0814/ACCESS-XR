#!/usr/bin/env python3
"""
===============================================================================
ACCESS-XR Evaluation Script
===============================================================================

Evaluates trained ACCESS-XR models on the test dataset.

Outputs:
    evaluation.json
    metrics.csv
    confusion_matrix.csv

Usage:
    python scripts/evaluate.py
"""

from pathlib import Path
import json
import time
import yaml

import numpy as np
import pandas as pd

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    classification_report,
)

CONFIG_FILE = Path("configs/default.yaml")

OUTPUT_DIR = Path("evaluation")


# ---------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------

def load_config():

    with CONFIG_FILE.open("r") as fp:
        return yaml.safe_load(fp)


# ---------------------------------------------------------------------
# Dataset
# ---------------------------------------------------------------------

def load_test_dataset(config):

    print("Loading test dataset...")

    # TODO
    # Replace with actual dataset loader

    y_true = [
        "HELLO",
        "THANK_YOU",
        "YES",
        "NO",
        "HELLO",
    ]

    samples = [
        "sample1",
        "sample2",
        "sample3",
        "sample4",
        "sample5",
    ]

    return samples, y_true


# ---------------------------------------------------------------------
# Inference
# ---------------------------------------------------------------------

def predict(sample):

    # TODO
    # Replace with model inference

    return "HELLO"


# ---------------------------------------------------------------------
# Evaluation
# ---------------------------------------------------------------------

def evaluate(samples, y_true):

    predictions = []

    latencies = []

    for sample in samples:

        start = time.perf_counter()

        prediction = predict(sample)

        end = time.perf_counter()

        predictions.append(prediction)

        latencies.append(end - start)

    metrics = {

        "accuracy":
            accuracy_score(y_true, predictions),

        "precision":
            precision_score(
                y_true,
                predictions,
                average="weighted",
                zero_division=0,
            ),

        "recall":
            recall_score(
                y_true,
                predictions,
                average="weighted",
                zero_division=0,
            ),

        "f1_score":
            f1_score(
                y_true,
                predictions,
                average="weighted",
                zero_division=0,
            ),

        "average_latency_ms":
            float(np.mean(latencies) * 1000),

        "throughput_samples_per_second":
            float(1.0 / np.mean(latencies))
            if np.mean(latencies) > 0 else 0.0,
    }

    cm = confusion_matrix(y_true, predictions)

    report = classification_report(
        y_true,
        predictions,
        output_dict=True,
        zero_division=0,
    )

    return metrics, cm, report


# ---------------------------------------------------------------------
# Save Results
# ---------------------------------------------------------------------

def save_results(metrics, cm, report):

    OUTPUT_DIR.mkdir(exist_ok=True)

    with (OUTPUT_DIR / "evaluation.json").open("w") as fp:
        json.dump(
            {
                "metrics": metrics,
                "classification_report": report,
            },
            fp,
            indent=4,
        )

    pd.DataFrame(
        [metrics]
    ).to_csv(
        OUTPUT_DIR / "metrics.csv",
        index=False,
    )

    pd.DataFrame(cm).to_csv(
        OUTPUT_DIR / "confusion_matrix.csv",
        index=False,
    )

    print(f"Results written to {OUTPUT_DIR}")


# ---------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------

def main():

    config = load_config()

    samples, y_true = load_test_dataset(config)

    metrics, cm, report = evaluate(
        samples,
        y_true,
    )

    print("\nEvaluation Metrics\n")

    for key, value in metrics.items():

        print(f"{key:30s}: {value}")

    save_results(
        metrics,
        cm,
        report,
    )


if __name__ == "__main__":

    main()
