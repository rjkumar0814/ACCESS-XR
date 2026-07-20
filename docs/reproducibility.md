# Reproducibility Guide

## Overview

This document describes how to reproduce the experiments presented in the paper:

> **ACCESS-XR: A Unified Multimodal System for Inclusive and Accessible Communication in Extended Reality**

The repository is organized to enable reproducible training, inference, and evaluation of the multimodal framework.

---

# System Requirements

## Operating Systems

ACCESS-XR has been tested on:

- Ubuntu 22.04 LTS
- Windows 11
- macOS (Apple Silicon and Intel)

Linux is recommended for large-scale experiments.

---

# Hardware Requirements

Minimum configuration

| Component | Requirement |
|-----------|-------------|
| CPU | Intel Core i5 / AMD Ryzen 5 |
| RAM | 16 GB |
| GPU | NVIDIA GTX 1660 or equivalent |
| Storage | 20 GB free space |

Recommended configuration

| Component | Requirement |
|-----------|-------------|
| CPU | Intel Core i7 / Ryzen 7 or newer |
| RAM | 32 GB or higher |
| GPU | NVIDIA RTX 3080 / RTX 4090 |
| CUDA | Version compatible with installed PyTorch |
| Storage | SSD with at least 50 GB free |

---

# Software Environment

Recommended versions:

| Software | Version |
|----------|---------|
| Python | 3.10 |
| PyTorch | 2.4 |
| FastAPI | 0.115+ |
| Ultralytics | 8.x |
| OpenCV | 4.10 |
| Whisper | Latest stable release |

The complete environment can be created using either:

```
pip install -r backend/requirements.txt
```

or

```
conda env create -f environment.yml
```

---

# Repository Setup

Clone the repository:

```bash
git clone https://github.com/<username>/ACCESS-XR.git
```

Enter the project directory:

```bash
cd ACCESS-XR
```

Install dependencies:

```bash
pip install -r backend/requirements.txt
```

---

# Dataset Preparation

Place datasets in the following directory structure:

```
datasets/

    gestures/
        train/
        validation/
        test/

    speech/
        train/
        validation/
        test/
```

If preprocessing scripts are provided:

```bash
python scripts/prepare_dataset.py
```

The paper should be consulted for details regarding:

- dataset selection
- preprocessing
- train/validation/test splits
- annotation protocol
- inclusion and exclusion criteria

---

# Model Weights

If pretrained models are available:

```
models/

    access_xr_yolov8.pt

    whisper/
```

If the models are distributed separately, download them according to the instructions in:

```
models/README.md
```

---

# Running the Backend

Start the FastAPI server:

```bash
uvicorn backend.main:app --reload
```

Default endpoint:

```
http://127.0.0.1:8000
```

Interactive API documentation:

```
http://127.0.0.1:8000/docs
```

---

# Running the Frontend

Install JavaScript dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npx expo start
```

---

# Experimental Configuration

Researchers should document the following information before reproducing experiments.

## Training Parameters

| Parameter | Example |
|-----------|---------|
| Batch Size | 32 |
| Epochs | 100 |
| Optimizer | AdamW |
| Learning Rate | 0.0001 |
| Weight Decay | 0.00001 |
| Scheduler | Cosine Annealing |

Replace these example values with the exact settings used in the paper.

---

# Random Seed

To improve reproducibility, fix random seeds consistently.

Example:

```python
import random
import numpy as np
import torch

random.seed(42)
np.random.seed(42)
torch.manual_seed(42)
torch.cuda.manual_seed_all(42)
```

---

# Evaluation

Typical evaluation metrics include:

Gesture recognition

- Accuracy
- Precision
- Recall
- F1-score
- mAP

Speech recognition

- Word Error Rate (WER)
- Character Error Rate (CER)

Multimodal fusion

- Accuracy
- Precision
- Recall
- F1-score
- Latency

Accessibility performance

- End-to-end response time
- System throughput
- Robustness under noisy conditions

Use the metrics reported in the paper for direct comparison.

---

# Reproducing Results

A typical workflow is:

```
Prepare datasets

↓

Install dependencies

↓

Download pretrained models

↓

Start backend

↓

Launch frontend

↓

Run inference

↓

Evaluate outputs

↓

Compare metrics with published results
```

---

# Expected Outputs

The system should produce:

- detected gestures
- speech transcripts
- fused semantic predictions
- accessibility-oriented communication outputs

Performance should be compared against the values reported in the publication.

---

# Common Issues

## CUDA not detected

Verify:

```
nvidia-smi
```

and ensure that the installed PyTorch build supports your CUDA version.

---

## Missing model weights

Check:

```
models/
```

and download pretrained checkpoints if required.

---

## Dependency conflicts

Create a clean virtual environment before installing dependencies.

---

## API not responding

Ensure that the FastAPI server is running and that the frontend configuration points to the correct backend URL.

---

# Reproducibility Checklist

- Correct Python version
- Correct package versions
- Required datasets downloaded
- Pretrained models available
- Random seed fixed
- Experimental parameters matched
- Hardware documented
- Evaluation metrics verified

---

# Citation

If this repository contributes to your research, please cite the accompanying ACCESS-XR publication using the citation provided in `CITATION.cff`.

---

# Contact

For questions regarding reproducibility or implementation, please open a GitHub Issue or contact the project maintainers.
