---
emoji: ✍️
description: Enhance newly opened issues with better structure, labels, and a friendly summary comment.
on:
  issues:
    types: [opened]
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
  update-issue:
  add-labels:
  add-comment:
  noop:
---

# Issue Quality Enhancer

## Task

You are improving issue quality for this repository.

1. Read the issue author from the GitHub API and compare it to `${{ github.repository_owner }}`. If different, call `noop` and stop.
2. Read:
   - `README.md` and `AGENTS.md` if present
   - this issue (`#${{ github.event.issue.number }}`)
   - available repository labels
   - a small sample of recent issues for naming/style consistency
3. Detect language in title/body. If not English, translate to clear technical English while preserving intent.
4. Rewrite title:
   - include one meaningful emoji prefix
   - concise and specific
   - imperative style
5. Rewrite body with clear sections adapted to issue type (bug/feature/docs/etc). Include actionable detail, and add a short "Relevant Code References" section when applicable.
6. Update the same issue using `update-issue` (never create a new one).
7. Add 1-3 fitting labels using `add-labels`.
8. Add one short friendly summary comment with `add-comment`.
9. If the issue is already high quality, do minimal edits and explain that in the summary comment.
