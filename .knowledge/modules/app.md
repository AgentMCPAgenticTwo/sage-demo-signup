---
type: Module
title: src/App
description: Root component that maps `location.pathname` to a page component.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/App.jsx
tags: [frontend, routing, entry-point]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T23:47:28Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ ca10a42e2a13be0442234c6be972f2a13f83ee63
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | Kind | Location |
| --- | --- | --- |
| `routes` | Variable | `src/App.jsx:8` |
| `App` | Function (default export) | `src/App.jsx:15` |

# Behaviour

`App` calls `usePath` from [router](/modules/router.md) and looks the result up
in the `routes` map. An unmatched path falls back to `Signup`, so `/` renders
the signup screen.

| Path | Component |
| --- | --- |
| `/signup` | `Signup` |
| `/login` | `Login` |
| `/welcome` | `Welcome` |
| `/reset-password` | `ResetPassword` |

# Relationships

* Rendered by `src/main.jsx`, the application entry point.
* Depends on [src/router](/modules/router.md) for `usePath`.
* Renders the components in [src/pages](/modules/pages.md); it is the single
  place where the route table lives.

To add a route, see [Common Tasks](/playbooks/common-tasks.md).
