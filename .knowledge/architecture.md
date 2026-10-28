---
type: Architecture
title: Architecture
description: Package clusters, layers, boundaries and the render/call tree of the signup app.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [architecture, react, routing, state]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:04:36Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 360fd597ded4ea1f388e555fd8458ad76d46ff8b
    title: Codebase knowledge graph
status: stable
---

# Shape

A single-page React app with one direction of dependency: pages depend on the
three shared packages, and nothing shared depends back on a page.

```
index.html -> src/main.jsx -> App (src/App.jsx)
                                |
                                +-- usePath            (src/router.jsx)
                                +-- routes[path]  -->  Signup | Login | Welcome
                                                         |
                                                         +-- Card / Field / Message  (src/components/Card.jsx)
                                                         +-- Link / navigate         (src/router.jsx)
                                                         +-- findUser / saveUser /
                                                             setCurrentUser / currentUser (src/store.js)
```

# Layers

| Package | Layer | Why |
| --- | --- | --- |
| `App` | entry | Entry point, only outbound calls |
| `pages` | entry | Routed screens, only outbound calls |
| `components` | core | High fan-in (7 in, 0 out) |
| `router` | core | High fan-in (7 in, 0 out) |
| `store` | core | High fan-in (5 in, 0 out) |

# Boundaries

| From | To | Calls |
| --- | --- | --- |
| `pages` | `components` | 7 |
| `pages` | `router` | 6 |
| `pages` | `store` | 5 |
| `App` | `router` | 1 |

There is no `components -> store` or `components -> router` edge: the shared
components in [src/components](/modules/src-components.md) are presentation-only
and receive everything through props.

# Hotspots

| Symbol | File | Fan-in |
| --- | --- | --- |
| `navigate` | `src/router.jsx` | 4 |
| `Card` | `src/components/Card.jsx` | 3 |
| `Link` | `src/router.jsx` | 3 |
| `findUser` | `src/store.js` | 3 |
| `Message` | `src/components/Card.jsx` | 2 |
| `Field` | `src/components/Card.jsx` | 2 |
| `load` | `src/store.js` | 2 |

`navigate` and `findUser` are the two symbols most likely to break a screen when
changed -- both are described in [src/router](/modules/src-router.md) and
[src/store](/modules/src-store.md).

# Clusters

| Cluster | Cohesion | Top members |
| --- | --- | --- |
| Auth flow | 0.79 | `findUser`, `navigate`, `Welcome`, `submit` (Login), `submit` (Signup) |
| Form surface | 0.73 | `Link`, `Login`, `Signup`, `Card`, `Field` |
| Shell | 1.00 | `App`, `usePath` |

# Navigation Model

Navigation is built on the History API rather than a router library.
`navigate` pushes state and dispatches a synthetic `popstate`; `usePath`
subscribes to `popstate` and re-renders `App`, which looks the new pathname up in
the `routes` table. Session membership is separate: `Welcome` reads
`currentUser()` and calls `navigate('/login')` from an effect when it is absent.
This is the only route guard in the app.

# Known Constraints

* Passwords are stored and compared in plain text in `localStorage`
  (`src/store.js`). The file documents itself as demo-only; do not reuse the
  module for real credentials.
* An unknown pathname falls back to `Signup` rather than rendering a 404.
* "Log out" on `Welcome` is a `Link` to `/login`; it does not clear
  `sessionStorage`.
