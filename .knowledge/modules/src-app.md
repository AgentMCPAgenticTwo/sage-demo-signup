---
type: Module
title: src/App
description: Root component that maps `location.pathname` to a page component.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/App.jsx
tags: [frontend, routing, entry]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:35:21Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ af0eb7e28c6d901616970ef2450db466024c0fd3
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | File | Line | Role |
| --- | --- | --- | --- |
| `routes` | `src/App.jsx` | 7 | path -> page-component map |
| `App` | `src/App.jsx` | 13 | default export, renders the matched page |

# Behaviour

`App` calls `usePath` from [src/router](/modules/src-router.md) to subscribe
to the current pathname, looks it up in `routes`, and renders the result.
An unmatched path falls back to `Signup`, so the sign-up screen doubles as
the app's index and 404 page.

`routes` is the whole route table:

| Key | Component | Imported from |
| --- | --- | --- |
| `/signup` | `Signup` | `src/pages/Signup.jsx` |
| `/login` | `Login` | `src/pages/Login.jsx` |
| `/welcome` | `Welcome` | `src/pages/Welcome.jsx` |

# Relationships

* Mounted by `src/main.jsx` inside `React.StrictMode`.
* Depends on [src/router](/modules/src-router.md) for `usePath`.
* Renders the components in [src/pages](/modules/src-pages.md).
