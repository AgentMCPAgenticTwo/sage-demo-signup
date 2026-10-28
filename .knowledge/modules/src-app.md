---
type: Module
title: src (app shell)
description: Vite entry point and the path-to-page routing table for the application.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [frontend, shell, routing]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:19:54Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 8b5e972c95c0d30e9afcad3fc02c3eb1ec018b87
    title: Codebase knowledge graph
status: stable
---

# Files

| File | Contents |
| --- | --- |
| `src/main.jsx` | Mounts `App` into `#root` with `createRoot`, inside `React.StrictMode`; imports `./style.css` |
| `src/App.jsx` | `routes` table (line 7) and the `App` component (line 13) |
| `src/style.css` | The app's only stylesheet |

# Symbols

| Symbol | File | Line | Notes |
| --- | --- | --- | --- |
| `routes` | `src/App.jsx` | 7 | `{ '/signup': Signup, '/login': Login, '/welcome': Welcome }` |
| `App` | `src/App.jsx` | 13 | Default export; `routes[path] ?? Signup` |

# Behaviour

`App` calls `usePath()` from [src/router](/modules/src-router.md) and renders
the matching page from [src/pages](/modules/src-pages.md). Unknown paths fall
back to `Signup`, so there is no 404 screen.

`src/main.jsx` is the only place `style.css` is imported, which is why
[Conventions](/conventions.md) treats styling as global.

# Relationships

* depends on [src/router](/modules/src-router.md) (`usePath`) — 1 call.
* renders [src/pages](/modules/src-pages.md) (`Signup`, `Login`, `Welcome`).
* nothing depends on this module; it is the top of the render tree described
  in [Architecture](/architecture.md).
