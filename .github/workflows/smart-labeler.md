---
emoji: 🏷️
description: Analyze new or edited issues/PRs and keep labels accurate with minimal noise.
on:
  issues:
    types: [opened, edited]
  pull_request:
    types: [opened, edited]
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
  add-labels:
  remove-labels:
  noop:
---

# Smart Issue & PR Labeler

## Task

Label the current item (`issue` or `pull request`) with high precision.

1. Determine target item from event context.
2. Read current labels on the item.
3. Read all repository labels.
4. Infer best 1-3 labels from title/body and item type.
5. Add missing labels and remove clearly incorrect ones.
6. Be conservative: when uncertain, keep existing labels and avoid churn.
7. If labels are already correct, call `noop`.

