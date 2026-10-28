---
type: Module
title: src (app shell)
description: Bootstraps React and maps the current path to a page component.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [frontend, entry, routing]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T03:58:25Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 33f196c6383d96b07ef0b9ef85db894b4859243c
    title: Codebase knowledge graph
status: stable
---

# src (app shell)

Two files: the mount point and the route table.

## Symbols

| Symbol | Kind | File | Line |
| --- | --- | --- | --- |
| `routes` | Variable | `src/App.jsx` | 7 |
| `App` | Function (default export) | `src/App.jsx` | 13 |

`src/main.jsx` defines no symbols -- it is top-level side-effect code.

## `src/main.jsx`

Imports `React`, `createRoot` from `react-dom/client`, `App` and
`./style.css`, then renders `<App />` into `document.getElementById('root')`
inside `React.StrictMode`. The `#root` element comes from `index.html`.

Because of StrictMode, effects run twice in development -- relevant to
`usePath`'s listener in [Router](/modules/src-router.md) and the redirect
effect in `Welcome`.

## `src/App.jsx`

`routes` maps path to page component:

| Path | Component |
| --- | --- |
| `/signup` | `Signup` |
| `/login` | `Login` |
| `/welcome` | `Welcome` |

`App` calls `usePath()` from [Router](/modules/src-router.md), looks the path
up in `routes` and falls back to `Signup` for anything unknown (including
`/`). It renders the chosen component with no props.

## Relationships

* Depends on [Router](/modules/src-router.md) for `usePath`.
* Renders every screen in [Pages](/modules/src-pages.md).
* Adding a page means adding a file under `src/pages/` **and** an entry in
  `routes` -- see [Common Tasks](/playbooks/common-tasks.md).
