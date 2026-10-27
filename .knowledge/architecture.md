---
type: Architecture
title: Architecture
description: Layers, package boundaries, render tree and hotspots of the React demo app.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [architecture, react, routing, layers]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T23:47:28Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ ca10a42e2a13be0442234c6be972f2a13f83ee63
    title: Codebase knowledge graph
status: stable
---

# Layers

| Layer | Packages | Why |
| --- | --- | --- |
| Entry | `App`, `pages` | Hold entry points, only outbound calls |
| Core | `components`, `router`, `store` | High fan-in, no outbound calls into app code |

There is no service or data-access layer — `src/store.js` talks to the browser
storage APIs directly, and nothing talks to the network.

# Package boundaries

| From | To | Calls |
| --- | --- | --- |
| [pages](/modules/pages.md) | [components](/modules/components.md) | 10 |
| [pages](/modules/pages.md) | [router](/modules/router.md) | 8 |
| [pages](/modules/pages.md) | [store](/modules/store.md) | 7 |
| [App](/modules/app.md) | [router](/modules/router.md) | 1 |

The boundaries are strictly one-directional: core packages never import pages,
and pages never import each other. `App.jsx` is the only file that knows the set
of routes.

# Render tree

```
index.html
└── src/main.jsx  → createRoot().render()
    └── App                         (src/App.jsx)
        └── usePath()               (src/router.jsx)
            └── routes[path] ?? Signup
                ├── Signup          (src/pages/Signup.jsx)      → Card, Field, Message, Link, findUser, saveUser, navigate
                ├── Login           (src/pages/Login.jsx)       → Card, Field, Message, Link, findUser, setCurrentUser, navigate
                ├── ResetPassword   (src/pages/ResetPassword.jsx) → Card, Field, Message, Link, findUser, saveUser, navigate
                └── Welcome         (src/pages/Welcome.jsx)     → Card, Link, currentUser, navigate
```

# Routes

| Path | Page component | File |
| --- | --- | --- |
| `/signup` | `Signup` | `src/pages/Signup.jsx` |
| `/login` | `Login` | `src/pages/Login.jsx` |
| `/welcome` | `Welcome` | `src/pages/Welcome.jsx` |
| `/reset-password` | `ResetPassword` | `src/pages/ResetPassword.jsx` |

Any unknown path falls back to `Signup`.

# Navigation flow

* `Signup.submit` → `saveUser` → `navigate('/login')`
* `Login.submit` → `findUser` + `setCurrentUser` → `navigate('/welcome')`
* `Login` links to `/reset-password` ("Forgot password?") and `/signup`
* `ResetPassword.submit` → `findUser` + `saveUser` → `navigate('/login')`
* `Welcome` redirects to `/login` in a `useEffect` when `currentUser()` is null

# Hotspots

| Symbol | File | Fan-in |
| --- | --- | --- |
| `navigate` | `src/router.jsx` | 5 |
| `Card` | `src/components/Card.jsx` | 4 |
| `findUser` | `src/store.js` | 4 |
| `Link` | `src/router.jsx` | 4 |
| `Message` | `src/components/Card.jsx` | 3 |
| `Field` | `src/components/Card.jsx` | 3 |
| `saveUser` | `src/store.js` | 2 |
| `load` | `src/store.js` | 2 |

`navigate`, `Card` and `findUser` are the three symbols most likely to break
several screens at once when changed.

# Clusters

The graph reports three cohesive clusters, all inside `src`:

| Cluster | Members | Cohesion |
| --- | --- | --- |
| Page + link surface | `Link`, `Welcome`, `ResetPassword`, `Signup`, `Login` | 0.83 |
| Submit + persistence | `navigate`, `findUser`, `saveUser`, the `submit` handlers | 0.79 |
| App shell | `usePath`, `App` | 1.00 |
