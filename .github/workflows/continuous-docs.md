---
emoji: 📚
description: Detect documentation drift on PRs and push focused doc updates to the PR branch.
on:
  pull_request:
    types: [opened, synchronize]
    paths:
      - "**/*.js"
      - "**/*.ts"
      - "**/*.py"
      - "**/*.go"
      - "**/*.java"
      - "**/*.cs"
      - "**/*.rb"
      - "**/*.rs"
      - "**/*.php"
      - "**/*.swift"
      - "**/*.kt"
      - "**/*.sh"
      - "**/*.yml"
      - "**/*.yaml"
      - "**/*.json"
permissions:
  contents: read
  issues: read
  pull-requests: read
  copilot-requests: write
tools:
  github:
    mode: gh-proxy
    toolsets: [default]
safe-outputs:
  push-to-pull-request-branch:
  add-comment:
  noop:
---

# Continuous Documentation

## Task

Review PR `${{ github.event.pull_request.number }}` and keep docs aligned with the code changes.

1. Read the PR author from the GitHub API and compare it to `${{ github.repository_owner }}`. If different, call `noop` and stop.
2. Analyze changed files and identify documentation drift in:
   - README and localized readmes
   - docs/ files
   - public API docs/docstrings/comments
   - configuration examples
3. Apply only targeted documentation fixes related to this PR.
4. If you changed files, use `push-to-pull-request-branch` with commit message:
   - `📚 docs: update documentation to match code changes`
5. Add a short PR comment with `add-comment` summarizing updates.
6. If no drift was found, call `noop`.
