# Pull Request

## Summary

Provide a concise summary of the proposed changes.

Examples:

- Fixed a bug
- Added a new feature
- Improved documentation
- Optimized performance
- Refactored code

---

## Related Issue

If applicable, reference the related GitHub Issue.

Examples:

```
Closes #25
Fixes #17
Related to #42
```

If no issue exists, write:

```
N/A
```

---

## Type of Change

Select all applicable options.

- [ ] Bug fix
- [ ] New feature
- [ ] Performance improvement
- [ ] Documentation update
- [ ] Refactoring
- [ ] Test improvement
- [ ] Build/CI update
- [ ] Security improvement
- [ ] Dependency update
- [ ] Other

---

## Description

Describe the implementation in detail.

Include:

- what changed,
- why the change was made,
- how it was implemented,
- any important design decisions.

---

## Testing

Describe the testing performed.

Examples:

- Unit tests
- Integration tests
- Manual testing
- API validation
- Frontend testing

Commands executed:

```bash
pytest
```

```bash
npm test
```

or

```
Manual verification
```

---

## Screenshots

If the change affects the user interface, attach screenshots or screen recordings.

---

## Performance Impact

Does this change affect performance?

- [ ] Improves performance
- [ ] No measurable impact
- [ ] May reduce performance
- [ ] Not evaluated

If applicable, summarize benchmark results.

---

## Documentation

Have the relevant documentation files been updated?

- [ ] README.md
- [ ] API documentation
- [ ] Architecture documentation
- [ ] Deployment guide
- [ ] Benchmark guide
- [ ] FAQ
- [ ] Roadmap
- [ ] No documentation changes required

---

## Backward Compatibility

Does this change maintain backward compatibility?

- [ ] Yes
- [ ] No

If no, describe the breaking changes and any required migration steps.

---

## Dependencies

Have new dependencies been introduced?

- [ ] No
- [ ] Yes

If yes:

- List the dependency.
- Explain why it is required.
- Update `backend/requirements.txt` or `package.json` as appropriate.

---

## Checklist

Please confirm the following before requesting review.

### Code Quality

- [ ] Code follows the project style guidelines.
- [ ] Code has been reviewed by the author.
- [ ] No unnecessary commented code remains.
- [ ] No hard-coded credentials or secrets are included.

### Testing

- [ ] Existing tests pass.
- [ ] New tests have been added where appropriate.
- [ ] Manual testing has been completed.

### Documentation

- [ ] Documentation has been updated where necessary.
- [ ] Public APIs are documented.
- [ ] Configuration changes are documented.

### Repository

- [ ] Repository structure remains consistent.
- [ ] No unnecessary generated files have been committed.
- [ ] `.gitignore` has been respected.

---

## Reviewer Notes

Provide any information that reviewers should pay particular attention to.

Examples:

- New API endpoint
- Updated model interface
- Database or configuration changes
- Performance-sensitive code
- Experimental implementation

---

## Additional Information

Include any additional context that may assist reviewers.

Examples:

- Future improvements
- Known limitations
- Follow-up work
- Related publications

---

Thank you for contributing to ACCESS-XR.

Please ensure that all CI checks pass before requesting review.
