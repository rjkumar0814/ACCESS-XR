# ACCESS-XR Pretrained Models

## Overview

This directory contains the pretrained models used by ACCESS-XR for multimodal communication in Extended Reality (XR) environments.

The framework integrates multiple machine learning models that operate together to perform gesture recognition, speech transcription, semantic understanding, and uncertainty-aware decision-level fusion.

---

# Directory Structure

```
models/

├── README.md
├── model_card.md
├── access_xr_yolov8.pt          # (optional)
├── whisper/
│   └── README.md
└── fusion/
    └── README.md
```

If pretrained weights are not distributed in this repository, download instructions are provided below.

---

# Model Summary

| Module | Architecture | Purpose |
|---------|--------------|---------|
| Gesture Recognition | YOLOv8 | Detects and classifies hand gestures |
| Speech Recognition | Whisper | Converts speech into text |
| Semantic Fusion | Custom Decision Fusion | Combines multimodal predictions |
| Accessibility Engine | Rule-Based / Semantic Mapping | Produces accessible communication output |

---

# Gesture Recognition Model

## Description

The gesture recognition module is based on **YOLOv8**, trained to detect and classify hand gestures from RGB images captured in XR environments.

### Input

- RGB image
- Recommended resolution: 640 × 640 pixels

### Output

- Gesture label
- Confidence score
- Bounding box coordinates

Example output:

```json
{
  "gesture": "Hello",
  "confidence": 0.98,
  "bounding_box": [102, 45, 289, 376]
}
```

---

# Speech Recognition Model

## Description

Speech recognition uses **OpenAI Whisper** to transcribe spoken language into text.

### Input

- WAV
- MP3
- FLAC

Recommended sampling rate:

```
16 kHz
```

### Output

```
Recognized sentence
```

Example:

```
Hello everyone.
```

---

# Semantic Fusion Module

The fusion module combines outputs from multiple modalities.

Inputs include:

- gesture prediction
- speech transcript
- confidence scores
- uncertainty estimates

Outputs include:

- semantic intent
- fusion confidence
- final communication message

---

# Accessibility Engine

The accessibility engine transforms semantic outputs into user-facing communication.

Possible outputs:

- subtitles
- translated text
- synthesized speech
- visual prompts
- contextual guidance

---

# Downloading Models

If model weights are not included in the repository, download them from the project release page.

Example:

```
models/

    access_xr_yolov8.pt
```

or

```
GitHub Releases
```

or

```
Zenodo DOI
```

or

```
Hugging Face
```

Update this section with the actual download location before publication.

---

# Loading the Gesture Model

Example:

```python
from ultralytics import YOLO

model = YOLO("models/access_xr_yolov8.pt")
```

---

# Loading Whisper

Example:

```python
import whisper

model = whisper.load_model("base")
```

Replace `"base"` with the checkpoint used in the paper if different.

---

# Expected Performance

Performance should correspond to the values reported in the ACCESS-XR publication.

Example evaluation metrics include:

Gesture recognition

- Accuracy
- Precision
- Recall
- F1-score
- mAP

Speech recognition

- Word Error Rate (WER)
- Character Error Rate (CER)

Fusion

- Overall Accuracy
- F1-score
- Latency

Replace any placeholder values with the published experimental results.

---

# Hardware Recommendations

Recommended GPU

- NVIDIA RTX 3080 or newer

Minimum RAM

- 16 GB

Recommended RAM

- 32 GB

---

# Model Compatibility

The pretrained models have been tested with:

| Component | Version |
|----------|---------|
| Python | 3.10 |
| PyTorch | 2.4 |
| Ultralytics | 8.x |
| Whisper | Latest stable release |

---

# License

Unless otherwise stated, the pretrained models are distributed under the same license as the ACCESS-XR repository.

Please verify the licenses of any third-party pretrained models before redistribution.

---

# Citation

If you use these pretrained models in your research, please cite the accompanying ACCESS-XR publication.

See:

```
CITATION.cff
```

---

# Contact

For questions regarding pretrained models or inference, please open a GitHub Issue or contact the project maintainers.
