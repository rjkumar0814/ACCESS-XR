# Frequently Asked Questions (FAQ)

## General

### 1. What is ACCESS-XR?

ACCESS-XR is an open-source multimodal communication framework designed to improve accessibility in Extended Reality (XR) environments. It integrates gesture recognition, automatic speech recognition, semantic understanding, and uncertainty-aware decision-level fusion to facilitate inclusive human-computer interaction.

---

### 2. Which paper accompanies this repository?

This repository accompanies the publication:

> **ACCESS-XR: A Unified Multimodal System for Inclusive and Accessible Communication in Extended Reality**

Please cite the paper if you use this repository in your research.

---

### 3. Is this repository intended for research or production?

The repository is primarily intended for research and educational purposes. While many components can be adapted for production, additional validation, security hardening, monitoring, and testing are recommended before deployment in operational environments.

---

# Installation

### 4. Which operating systems are supported?

The project has been tested on:

- Ubuntu 22.04 LTS
- Windows 11
- macOS

---

### 5. Which Python version should I use?

Python **3.10** is recommended.

Check your version:

```bash
python --version
```

---

### 6. How do I install dependencies?

Using pip:

```bash
pip install -r backend/requirements.txt
```

Using Conda:

```bash
conda env create -f environment.yml
```

---

### 7. Why am I getting dependency conflicts?

Create a clean virtual environment before installing packages.

Example:

```bash
python -m venv .venv
```

or

```bash
conda create -n access-xr python=3.10
```

---

# Dataset

### 8. Are datasets included?

No.

Datasets are not distributed with this repository due to licensing and copyright restrictions.

Please obtain them from their original providers and organize them as described in:

```
datasets/README.md
```

---

### 9. How should datasets be organized?

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

### 10. Can I use my own dataset?

Yes.

Ensure that your annotations and directory structure follow the documented format.

---

# Models

### 11. Are pretrained models included?

Depending on the repository release, pretrained models may either:

- be included,
- be available through GitHub Releases,
- be hosted on Zenodo,
- or be hosted on Hugging Face.

Refer to:

```
models/README.md
```

---

### 12. Why can't I find the model file?

Large model files are often stored outside the Git repository to comply with GitHub file size limits.

Follow the download instructions in:

```
models/README.md
```

---

# Running ACCESS-XR

### 13. How do I start the backend?

```bash
uvicorn backend.main:app --reload
```

---

### 14. How do I start the frontend?

```bash
npm install

npx expo start
```

---

### 15. Where is the API documentation?

FastAPI automatically provides:

Swagger

```
http://127.0.0.1:8000/docs
```

ReDoc

```
http://127.0.0.1:8000/redoc
```

---

# Troubleshooting

### 16. The backend does not start.

Check:

- Python version
- Installed dependencies
- Model paths
- Environment variables

---

### 17. The frontend cannot connect to the backend.

Verify:

- Backend is running
- Correct backend URL
- Firewall configuration
- Network connectivity

---

### 18. CUDA is not detected.

Check:

```bash
nvidia-smi
```

Ensure that:

- CUDA is installed
- GPU drivers are up to date
- PyTorch supports your CUDA version

---

### 19. Predictions are inaccurate.

Possible reasons include:

- incorrect preprocessing,
- unsupported input format,
- poor image quality,
- noisy audio,
- incorrect model checkpoint,
- domain shift between training and deployment data.

---

### 20. API requests fail with validation errors.

Verify:

- request format,
- uploaded file type,
- required fields,
- endpoint URL.

---

# Development

### 21. Can I contribute?

Yes.

Please read:

```
CONTRIBUTING.md
```

before submitting issues or pull requests.

---

### 22. How should I report bugs?

Create a GitHub Issue including:

- operating system,
- Python version,
- package versions,
- error logs,
- reproduction steps.

---

### 23. How can I request a new feature?

Open a GitHub Issue describing:

- the proposed feature,
- motivation,
- expected behavior,
- possible implementation.

---

# Reproducibility

### 24. How can I reproduce the published experiments?

Follow:

```
docs/reproducibility.md
```

Pay particular attention to:

- dataset versions,
- preprocessing,
- software versions,
- model checkpoints,
- random seeds.

---

### 25. Why do my results differ slightly from the paper?

Small differences may arise due to:

- GPU architecture,
- software versions,
- floating-point arithmetic,
- non-deterministic operations.

Substantial deviations should be investigated by verifying the experimental setup.

---

# Licensing

### 26. Can I use ACCESS-XR commercially?

The repository license governs the software.

However, third-party datasets and pretrained models may have different licensing terms. Review the applicable licenses before commercial use.

---

### 27. Can I redistribute pretrained models?

Only if permitted by the licenses associated with those models.

Consult:

```
models/README.md
```

---

# Citation

### 28. How should I cite ACCESS-XR?

Use the citation provided in:

```
CITATION.cff
```

or cite the accompanying journal publication.

---

# Support

### 29. Where can I ask questions?

Use GitHub Issues for:

- bug reports,
- installation problems,
- feature requests,
- documentation improvements.

For general implementation questions, consult:

- `README.md`
- `docs/api.md`
- `docs/architecture.md`
- `docs/deployment.md`
- `docs/reproducibility.md`

before opening a new issue.

---

# Future Development

### 30. What features are planned for future releases?

Potential future enhancements include:

- Additional gesture vocabularies
- Expanded multilingual speech support
- Improved semantic fusion strategies
- Native XR headset integration
- Optimized edge deployment
- Extended benchmarking and evaluation tools

Future plans will be documented in:

```
CHANGELOG.md
```

---

# Contact

If your question is not answered here, please:

1. Review the project documentation.
2. Search existing GitHub Issues.
3. Open a new GitHub Issue with relevant details.

Constructive feedback and contributions are welcome and help improve ACCESS-XR.
