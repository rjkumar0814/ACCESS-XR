# Security Policy

## Supported Versions

The following table indicates which versions of ACCESS-XR currently receive security updates.

| Version | Supported |
|----------|-----------|
| 1.x.x    | ✅ Yes |
| < 1.0    | ❌ No |

---

## Reporting a Vulnerability

If you discover a security vulnerability in ACCESS-XR, please do **not** disclose it publicly through GitHub Issues.

Instead, report it privately to the project maintainer.

**Security Contact**

Rajkumar S. C.

Department of Computer Science and Engineering

Anna University Regional Campus Madurai

Email: rajkumar@autmdu.in

Please include the following information:

- Description of the vulnerability
- Steps to reproduce
- Affected version
- Operating system
- Logs or screenshots (if applicable)
- Suggested mitigation (optional)

We will acknowledge receipt of your report as soon as possible and investigate the issue.

---

## Security Scope

ACCESS-XR consists of:

- React Native frontend
- FastAPI backend
- Machine learning inference services
- YOLOv8 gesture recognition
- Whisper-based speech recognition
- Semantic translation modules
- Configuration files
- API endpoints

Potential security concerns include:

- API authentication
- Unauthorized access
- Malicious file uploads
- Model poisoning
- Prompt or input injection
- Dependency vulnerabilities
- Data leakage
- Configuration exposure

---

## Responsible Disclosure

We request that security researchers:

- Allow reasonable time to investigate reported issues.
- Avoid public disclosure until a fix is available.
- Provide sufficient technical details for reproduction.
- Refrain from exploiting vulnerabilities beyond what is necessary to demonstrate the issue.

---

## Data Privacy

ACCESS-XR is designed with privacy considerations in mind.

The framework:

- supports local inference where feasible,
- minimizes retention of raw user data,
- encourages secure handling of multimodal inputs, and
- should be deployed in compliance with applicable privacy regulations and institutional policies.

Users deploying ACCESS-XR are responsible for ensuring that data collection and processing comply with relevant legal and ethical requirements.

---

## Third-Party Dependencies

ACCESS-XR relies on several open-source libraries, including but not limited to:

- PyTorch
- Ultralytics YOLOv8
- OpenAI Whisper
- FastAPI
- React Native
- Expo

Please monitor these projects for security updates and apply dependency upgrades as appropriate.

---

## Best Practices

For production deployments, we recommend:

- Using HTTPS for all API communication.
- Restricting API access through authentication and authorization.
- Keeping dependencies up to date.
- Avoiding hard-coded credentials.
- Storing secrets using environment variables or a secure secret manager.
- Regularly backing up configuration files and models.
- Running vulnerability scans on deployed systems.

---

## Security Updates

Security-related fixes will be documented in the project's `CHANGELOG.md`.

---

Thank you for helping improve the security and reliability of ACCESS-XR.
