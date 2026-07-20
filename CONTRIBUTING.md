# Contributing to ACCESS-XR

Thank you for your interest in contributing to ACCESS-XR.

ACCESS-XR is an open-source research project that supports inclusive and accessible communication in Extended Reality (XR) through multimodal artificial intelligence. We welcome contributions that improve the software, documentation, reproducibility, and experimental capabilities of the project.

---

## Ways to Contribute

You can contribute by:

- Reporting bugs
- Suggesting new features
- Improving documentation
- Optimizing algorithms
- Improving model performance
- Adding new datasets
- Extending accessibility features
- Supporting additional sign languages
- Improving deployment and reproducibility
- Writing unit tests

---

## Before You Start

Before making major changes:

1. Check existing Issues.
2. Search for existing Pull Requests.
3. Open a new Issue to discuss significant changes.
4. Wait for project maintainer feedback before implementing major features.

---

## Development Environment

Recommended environment:

- Python 3.10 or newer
- Node.js 18+
- React Native / Expo
- FastAPI
- PyTorch
- CUDA (optional but recommended)
- Git

Install backend dependencies

```bash
cd backend
pip install -r requirements.txt
```

Install frontend dependencies

```bash
cd frontend
npm install
```

---

## Coding Standards

### Python

- Follow PEP 8.
- Use descriptive variable names.
- Write meaningful comments where necessary.
- Keep functions modular and reusable.
- Add docstrings to all public functions.

Example:

```python
def recognize_gesture(image):
    """
    Detects gestures from an input image.

    Parameters
    ----------
    image : ndarray
        Input RGB image.

    Returns
    -------
    dict
        Gesture prediction and confidence score.
    """
```

---

### JavaScript / React Native

- Use ES6+ syntax.
- Prefer functional components.
- Use descriptive component names.
- Keep components modular.
- Avoid duplicated code.

---

## Commit Message Guidelines

Use clear commit messages.

Examples:

```
Add uncertainty-aware fusion module

Fix gesture recognition preprocessing

Improve API documentation

Update README with installation guide
```

Avoid messages like:

```
update

fix

changes

test
```

---

## Pull Request Guidelines

Each Pull Request should:

- Clearly describe the purpose.
- Reference related Issues.
- Include screenshots when UI changes are involved.
- Update documentation if required.
- Pass all tests before submission.

---

## Reporting Bugs

When reporting bugs, please include:

- Operating system
- Python version
- Node.js version
- GPU (if applicable)
- Error logs
- Steps to reproduce
- Expected behaviour
- Actual behaviour

---

## Feature Requests

Feature requests should include:

- Motivation
- Proposed solution
- Expected benefits
- Possible implementation approach

---

## Documentation Contributions

Documentation improvements are highly encouraged.

Examples include:

- Installation instructions
- API documentation
- Tutorials
- Example workflows
- Architecture explanations
- Reproducibility guides

---

## Code Review Process

Every contribution will be reviewed for:

- Code quality
- Documentation quality
- Correctness
- Performance
- Compatibility
- Reproducibility

Maintainers may request revisions before merging.

---

## Contributor Recognition

All accepted contributors will be acknowledged in the project's Contributors section and GitHub contributor history.

---

## Questions

For questions regarding the project, please open a GitHub Discussion or contact the corresponding author.

**Corresponding Author**

Rajkumar S. C.

Department of Computer Science and Engineering

Anna University Regional Campus Madurai

Email: rajkumar@autmdu.in

---

Thank you for helping improve ACCESS-XR and supporting open, reproducible research.
