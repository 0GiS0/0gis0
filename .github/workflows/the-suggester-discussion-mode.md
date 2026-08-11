---
emoji: 💡
description: Analyze the repository and publish high-value improvement ideas as discussions.
on:
  workflow_dispatch:
    inputs:
      suggestion_type:
        description: "Type of suggestions to look for"
        required: true
        default: all
        type: choice
        options:
          - all
          - security
          - performance
          - refactoring
          - testing
          - documentation
          - architecture
          - configuration
          - bugs
          - maintainability
          - ux-design
          - favicon
          - readme
permissions:
  contents: read
  discussions: read
  issues: read
  pull-requests: read
  copilot-requests: write
tools:
  github:
    mode: gh-proxy
    toolsets: [default]
safe-outputs:
  create-discussion:
  update-discussion:
  noop:
---

# Copilot Suggester (Discussion Mode)

## Task

Analyze the repository and propose high-value improvements in discussions.

Input category: `${{ github.event.inputs.suggestion_type || 'all' }}`.

1. Read available discussion categories and choose the best "Ideas"-style category.
2. Read recent discussions and open/closed issues to avoid duplicates.
3. Inspect codebase and README for meaningful improvement opportunities in the selected category.
4. Create discussions only for high-impact suggestions.
5. Use clear titles, structured body, and include rationale and expected impact.
6. If nothing valuable is found, call `noop`.
