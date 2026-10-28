---
type: Module
title: src/App
description: Root component that maps `location.pathname` to a page component.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/App.jsx
tags: [frontend, routing, shell]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:04:36Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 360fd597ded4ea1f388e555fd8458ad76d46ff8b
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | Line | Notes |
| --- | --- | --- |
| `routes` | `src/App.jsx:7` | Pathname -> page component map |
| `App` | `src/App.jsx:13` | Default export; the only component `src/main.jsx` renders |

# Behaviour

`App` subscribes to the current pathname via `usePath` from
[src/router](/modules/src-router.md), looks it up in `routes`, and renders the
match. An unmatched pathname falls back to `Signup`.

| Path | Page |
| --- | --- |
| `/signup` | `Signup` |
| `/login` | `Login` |
| `/welcome` | `Welcome` |
| anything else | `Signup` (fallback) |

# Depends On

* [src/router](/modules/src-router.md) -- calls `usePath`.
* [src/pages](/modules/src-pages.md) -- imports all three page components.

# Rendered By

`src/main.jsx`, inside `React.StrictMode`.
