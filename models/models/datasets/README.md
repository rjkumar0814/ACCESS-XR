# ACCESS-XR Datasets

## Overview

This directory contains documentation and metadata describing the datasets used by the ACCESS-XR framework.

To comply with dataset licensing agreements and copyright restrictions, the datasets themselves are **not distributed** with this repository.

Users should obtain the datasets directly from their respective providers and organize them according to the structure described below.

---

# Directory Structure

```
datasets/

├── README.md
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
├── metadata/
│   ├── labels.csv
│   ├── classes.txt
│   └── dataset_statistics.csv
│
└── preprocessing/
    └── README.md
```

---

# Dataset Components

ACCESS-XR integrates multiple modalities.

| Modality | Purpose |
|----------|---------|
| Gesture Images | Hand gesture recognition |
| Speech Audio | Automatic speech recognition |
| Metadata | Labels and annotations |
| Semantic Labels | Multimodal fusion |

---

# Gesture Dataset

## Input

RGB images containing hand gestures.

Recommended image format:

- PNG
- JPEG

Recommended resolution:

```
640 × 640
```

Typical directory:

```
gestures/

    train/

    validation/

    test/
```

---

# Speech Dataset

Supported formats:

- WAV
- FLAC
- MP3

Recommended sampling rate:

```
16 kHz
```

Directory:

```
speech/

    train/

    validation/

    test/
```

---

# Annotation Format

Gesture annotations should contain:

- image filename
- gesture label
- bounding box
- class identifier

Example

```csv
filename,class,xmin,ymin,xmax,ymax
0001.jpg,Hello,102,54,281,375
```

---

Speech annotations should contain:

```csv
audio_file,transcript
0001.wav,Hello everyone
```

---

# Dataset Splits

A typical split is:

| Split | Percentage |
|--------|-----------:|
| Training | 70% |
| Validation | 15% |
| Testing | 15% |

If the accompanying paper uses a different split, follow the experimental protocol reported in the publication.

---

# Data Preprocessing

Typical preprocessing includes:

## Gesture Images

- Resize
- Normalization
- Data augmentation
- Bounding-box verification

Common augmentations:

- Horizontal flip
- Rotation
- Scaling
- Brightness adjustment
- Contrast adjustment

---

## Speech

Typical preprocessing includes:

- Resampling
- Noise reduction
- Silence trimming
- Normalization

---

# Dataset Statistics

The following information should be documented for each dataset:

- Number of samples
- Number of gesture classes
- Number of speakers (if applicable)
- Average recording duration
- Image resolution
- Class distribution

Example:

| Statistic | Value |
|-----------|------:|
| Gesture Images | Replace with actual value |
| Audio Files | Replace with actual value |
| Gesture Classes | Replace with actual value |

---

# Download Instructions

Download the datasets directly from their original providers.

After downloading, organize them as follows:

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

---

# Licensing

Each dataset is governed by its own license.

Users are responsible for ensuring compliance with the applicable terms of use before downloading, modifying, or redistributing any dataset.

---

# Ethical Considerations

When working with multimodal data:

- obtain appropriate permissions where required,
- protect participant privacy,
- avoid unauthorized redistribution,
- comply with institutional review and legal requirements,
- anonymize personal information where applicable.

---

# Reproducibility

To reproduce the experiments reported in the ACCESS-XR paper:

1. Download the required datasets.
2. Organize them according to the directory structure above.
3. Apply the preprocessing pipeline.
4. Use the training and evaluation configuration described in the paper.
5. Fix the random seed for deterministic experiments where possible.

Refer to:

```
docs/reproducibility.md
```

for complete experimental details.

---

# Dataset Verification

Before training, verify:

- Directory structure is correct.
- Labels are complete.
- Annotation files are valid.
- Audio sampling rates are consistent.
- Images are readable.
- Corrupted files have been removed.

---

# Citation

Please cite the original dataset publications in addition to the ACCESS-XR paper whenever the datasets contribute to your research.

---

# Contact

Questions regarding dataset organization or preprocessing may be submitted through GitHub Issues.
