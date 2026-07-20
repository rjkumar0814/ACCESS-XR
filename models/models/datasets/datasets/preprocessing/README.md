# Dataset Preprocessing Guide

## Overview

This document describes the preprocessing pipeline used to prepare gesture images and speech audio for the ACCESS-XR framework.

The objective of preprocessing is to improve data quality, reduce noise, standardize inputs, and ensure reproducible model training and evaluation.

The preprocessing steps should be applied consistently to the training, validation, and test datasets.

---

# Workflow

```
Raw Dataset
      │
      ▼
Data Validation
      │
      ▼
Cleaning
      │
      ▼
Preprocessing
      │
      ▼
Data Augmentation (Training Only)
      │
      ▼
Dataset Split Verification
      │
      ▼
Model Training
```

---

# Gesture Image Preprocessing

## Input

- RGB images
- JPEG or PNG format

Recommended resolution:

```
640 × 640 pixels
```

---

## Image Validation

Before preprocessing, verify that:

- image files are readable,
- labels exist,
- bounding boxes are valid,
- images are not duplicated,
- corrupted files are removed.

---

## Image Normalization

Typical preprocessing includes:

- resizing,
- normalization to floating-point values,
- channel ordering (RGB),
- optional padding while preserving aspect ratio.

Example using OpenCV:

```python
image = cv2.resize(image, (640, 640))
image = image.astype("float32") / 255.0
```

---

## Data Augmentation

Apply augmentation **only to the training set**.

Recommended augmentations include:

- horizontal flipping,
- random rotation,
- scaling,
- translation,
- brightness adjustment,
- contrast adjustment,
- hue and saturation variation,
- Gaussian blur (optional),
- random cropping.

Avoid applying augmentation to validation or test datasets.

---

## Annotation Validation

Verify that:

- every image has an annotation,
- class identifiers are valid,
- bounding boxes remain within image boundaries,
- duplicate annotations are removed.

---

# Speech Audio Preprocessing

## Supported Formats

- WAV
- FLAC
- MP3

Recommended sampling rate:

```
16 kHz
```

Mono audio is recommended.

---

## Audio Validation

Before preprocessing:

- remove corrupted files,
- verify sample rate,
- confirm annotation availability,
- detect silent or empty recordings.

---

## Audio Cleaning

Recommended preprocessing:

- resampling,
- silence trimming,
- normalization,
- optional noise reduction.

Example workflow:

```
Raw Audio
      │
Resampling
      │
Noise Reduction
      │
Silence Removal
      │
Normalization
      │
Model Input
```

---

# Label Verification

Before training, verify:

- gesture labels match class definitions,
- speech transcripts correspond to audio,
- no missing annotations,
- consistent file naming,
- no duplicated entries.

---

# Dataset Integrity Checks

Perform the following checks before training:

| Check | Description |
|--------|-------------|
| Missing Files | Detect absent images or audio |
| Corrupted Files | Remove unreadable files |
| Duplicate Samples | Eliminate repeated data |
| Invalid Labels | Verify class assignments |
| Empty Transcripts | Remove or correct incomplete annotations |

---

# Dataset Statistics

Generate summary statistics after preprocessing.

Recommended statistics include:

- number of gesture images,
- number of gesture classes,
- number of audio files,
- average audio duration,
- class distribution,
- image resolution,
- annotation completeness.

---

# Directory Verification

Expected structure:

```
datasets/

├── gestures/
│   ├── train/
│   ├── validation/
│   └── test/
│
├── speech/
│   ├── train/
│   ├── validation/
│   └── test/
│
└── metadata/
```

---

# Reproducibility

For reproducible preprocessing:

- use a fixed random seed,
- preserve dataset splits,
- document preprocessing parameters,
- record software versions,
- avoid modifying the test set.

Example:

```python
import random
import numpy as np

random.seed(42)
np.random.seed(42)
```

---

# Recommended Scripts

Store preprocessing utilities in:

```
scripts/

├── prepare_dataset.py
├── preprocess_images.py
├── preprocess_audio.py
├── validate_dataset.py
└── generate_statistics.py
```

---

# Output

The preprocessing pipeline should produce:

- cleaned image datasets,
- standardized audio files,
- validated annotations,
- dataset statistics,
- quality assurance reports.

---

# Common Issues

## Incorrect Image Resolution

Resize images while preserving aspect ratio where appropriate.

---

## Inconsistent Sampling Rate

Convert all audio files to the same sampling frequency before training.

---

## Missing Labels

Training should not begin until all samples have valid annotations.

---

## Data Leakage

Ensure that the same participant or recording session does not appear across both training and test sets unless explicitly intended by the experimental protocol.

---

# Best Practices

- Preserve the original raw datasets.
- Apply preprocessing through automated scripts rather than manual editing.
- Version-control preprocessing scripts.
- Document any deviations from the published methodology.
- Validate outputs before model training.

---

# Related Documentation

- `datasets/README.md`
- `docs/reproducibility.md`
- `models/model_card.md`

---

# Citation

If you use the preprocessing workflow or scripts in academic work, please cite the accompanying ACCESS-XR publication.
