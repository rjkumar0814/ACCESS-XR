# ACCESS-XR System Architecture

## Overview

ACCESS-XR is a unified multimodal communication framework designed to improve accessibility within Extended Reality (XR) environments. The system integrates gesture recognition, automatic speech recognition, semantic understanding, and uncertainty-aware multimodal fusion to facilitate inclusive communication for users with diverse communication abilities.

The architecture is modular, allowing individual components to be developed, evaluated, and deployed independently while maintaining a unified inference pipeline.

---

# System Architecture

```
                    ┌──────────────────────────┐
                    │      XR User Interface   │
                    │ (React Native / Expo)    │
                    └─────────────┬────────────┘
                                  │
                  Camera Frames    │    Audio Stream
                                  │
          ┌───────────────────────┴──────────────────────┐
          │                                              │
          ▼                                              ▼
┌──────────────────┐                        ┌────────────────────┐
│ Gesture Pipeline │                        │  Speech Pipeline   │
└────────┬─────────┘                        └─────────┬──────────┘
         │                                            │
         ▼                                            ▼
 YOLOv8 Gesture Detection                    Whisper Speech Recognition
         │                                            │
         ▼                                            ▼
 Gesture Features                          Speech Transcript
          └──────────────┬────────────────────────────┘
                         ▼
             Semantic Representation Module
                         │
                         ▼
     Uncertainty-Aware Decision-Level Fusion
                         │
                         ▼
          Accessible Communication Output
                         │
                         ▼
                XR Visualization Layer
```

---

# System Components

## 1. User Interface

The frontend is implemented using **React Native** with **Expo** to provide a platform-independent XR interaction layer.

Responsibilities include:

- Camera acquisition
- Microphone input
- Displaying translated outputs
- Visual accessibility support
- Real-time interaction

---

## 2. Gesture Recognition Module

The gesture recognition module processes live camera frames.

Pipeline:

```
Video Stream
      │
Frame Extraction
      │
Image Preprocessing
      │
YOLOv8 Detection
      │
Gesture Classification
      │
Confidence Estimation
```

Output:

- gesture label
- confidence score
- bounding box coordinates

---

## 3. Speech Recognition Module

Speech input is processed using Whisper.

Pipeline:

```
Audio
   │
Noise Reduction
   │
Feature Extraction
   │
Whisper Encoder
   │
Token Prediction
   │
Text Transcript
```

Output:

- recognized sentence
- transcription confidence

---

## 4. Semantic Mapping Module

Gesture labels and speech transcripts are projected into a shared semantic representation.

Responsibilities include:

- contextual interpretation
- ambiguity reduction
- semantic alignment
- intent preservation

This module enables consistent communication across modalities.

---

## 5. Uncertainty-Aware Decision-Level Fusion

ACCESS-XR performs fusion at the decision level rather than concatenating raw features.

Each modality provides:

- predicted label
- confidence estimate
- uncertainty estimate

Fusion combines these signals to determine the most reliable output.

Conceptually,

```
Gesture Decision
          │
Speech Decision
          │
Confidence Scores
          │
Uncertainty Estimates
          │
Decision Fusion
          │
Final Output
```

Advantages include:

- robustness to noisy inputs
- graceful degradation when one modality is unreliable
- modular extensibility

---

## 6. Accessibility Engine

The accessibility engine converts the fused output into user-facing communication.

Possible outputs include:

- subtitles
- synthesized speech
- gesture visualization
- contextual prompts
- multilingual text

The presentation format can be adapted based on user preferences or deployment requirements.

---

## 7. Backend Services

The backend is implemented using FastAPI.

Primary responsibilities include:

- inference orchestration
- model loading
- API management
- preprocessing
- post-processing
- response generation

Example API endpoints:

| Endpoint | Purpose |
|-----------|---------|
| `/predict/gesture` | Gesture recognition |
| `/predict/speech` | Speech transcription |
| `/predict/fusion` | Multimodal fusion |
| `/health` | Service health check |

---

# Deployment Architecture

```
React Native Client
          │
 REST API
          │
FastAPI Backend
          │
 ├── Gesture Model
 ├── Whisper Model
 ├── Fusion Engine
 └── Semantic Mapper
```

The modular design enables deployment on:

- desktop systems
- cloud servers
- edge devices
- XR headsets
- accessibility kiosks

---

# Data Flow

```
User Input
     │
Camera + Microphone
     │
Preprocessing
     │
Gesture Recognition
Speech Recognition
     │
Semantic Mapping
     │
Decision-Level Fusion
     │
Accessibility Engine
     │
XR Output
```

---

# Repository Mapping

| Directory | Purpose |
|------------|---------|
| `frontend/` | React Native application |
| `backend/` | FastAPI inference services |
| `models/` | Trained model weights |
| `datasets/` | Dataset documentation |
| `configs/` | Configuration files |
| `scripts/` | Utility scripts |
| `tests/` | Unit and integration tests |
| `docs/` | Technical documentation |

---

# Design Principles

ACCESS-XR follows several key design principles:

- Modular architecture
- Platform independence
- Extensibility
- Accessibility by design
- Privacy-aware deployment
- Real-time inference
- Reproducibility
- Maintainability

---

# Relation to the Paper

This document describes the software implementation corresponding to the architecture presented in the ACCESS-XR manuscript. It complements the methodological description in the paper by documenting the practical organization of the software components and their interactions.
