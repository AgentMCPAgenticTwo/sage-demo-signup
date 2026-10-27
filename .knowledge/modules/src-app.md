---
type: Module
title: src/App
description: Root component that maps the current pathname to a page component.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/App.jsx
tags: [frontend, routing, entry]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T17:18:25Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 78b91de716644ab7bfc26c34d71b2176b39a35ee
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | Kind | Location |
| --- | --- | --- |
| `routes` | Variable | `src/App.jsx:7` |
| `App` | Function (default export) | `src/App.jsx:13` |

# Behaviour

`routes` is a plain object literal mapping pathname to page component:

| Path | Component |
| --- | --- |
| `/signup` | `Signup` |
| `/login` | `Login` |
| `/welcome` | `Welcome` |

`App` calls `usePath()` from [src/router](/modules/src-router.md) and renders
`routes[path] ?? Signup`, so every unknown path -- including `/` -- falls back to
the sign-up screen. There is no 404 page and no nested routing.

# Depends on

* [src/router](/modules/src-router.md) -- for `usePath`.
* [src/pages](/modules/src-pages.md) -- imports all three page components eagerly
  (no lazy loading).

# Rendered by

[src/main.jsx](/modules/src-entry.md).

To add a page, see [Common tasks](/playbooks/common-tasks.md).
