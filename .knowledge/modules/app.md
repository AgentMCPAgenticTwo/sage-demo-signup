---
type: Module
title: src/App
description: Root component that maps `location.pathname` to a page component.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/App.jsx
tags: [frontend, routing, entry]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T04:56:52Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 38fe79e86edef6544c50fc543f51f4f47b2379a8
    title: Codebase knowledge graph
status: stable
---

# Role

`src/App.jsx` is the single routing decision in the app. It is rendered by
`src/main.jsx` and renders exactly one page from
[src/pages](/modules/pages.md).

# Symbols

| Symbol | Line | Kind | Notes |
| --- | --- | --- | --- |
| `routes` | 7 | Variable | Object literal mapping path -> page component |
| `App` | 13 | Function (default export) | Reads `usePath()`, renders `routes[path] ?? Signup` |

# Route table

| Key | Component |
| --- | --- |
| `/signup` | `Signup` |
| `/login` | `Login` |
| `/welcome` | `Welcome` |

Unmatched paths fall through to `Signup`, so `/` renders the sign-up screen.

# Dependencies

* Depends on `usePath` from [src/router](/modules/router.md) to re-render when
  history changes.
* Depends on the three default exports of [src/pages](/modules/pages.md).
* Holds no state of its own and calls nothing in
  [src/store](/modules/store.md).

# Change notes

Adding a screen means adding a file under `src/pages/` and a single entry in
`routes` -- see [Common Tasks](/playbooks/common-tasks.md).
