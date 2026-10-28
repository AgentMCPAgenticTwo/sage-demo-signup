---
type: Architecture
title: Architecture
description: Layers, package boundaries, render tree and hotspots of the React/Vite client.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [architecture, react, layers]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T04:56:52Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 38fe79e86edef6544c50fc543f51f4f47b2379a8
    title: Codebase knowledge graph
status: stable
---

# Layers

| Layer | Packages | Reason (from graph) |
| --- | --- | --- |
| entry | `App`, `pages` | Have entry points, only outbound calls |
| core | `components`, `router`, `store` | High fan-in, no outbound calls |

The dependency direction is strictly one-way: entry depends on core, never
the reverse. No cycles are recorded in the graph.

# Package boundaries

| From | To | Calls |
| --- | --- | --- |
| `pages` | `components` | 7 |
| `pages` | `router` | 6 |
| `pages` | `store` | 5 |
| `App` | `router` | 1 |

[src/pages](/modules/pages.md) is the only package that crosses boundaries; it
depends on [src/components](/modules/components.md) for markup,
[src/router](/modules/router.md) for navigation and
[src/store](/modules/store.md) for persistence.
[src/App](/modules/app.md) depends only on `router` plus the three page modules.

# Render tree

```
index.html  #root
  src/main.jsx  createRoot(...).render(<React.StrictMode><App /></React.StrictMode>)
    App                      (src/App.jsx)      -- usePath() -> routes[path] ?? Signup
      Signup                 (src/pages/Signup.jsx)
        Card / Field x4 / Message / Link
      Login                  (src/pages/Login.jsx)
        Card / Field x2 / Message / Link
      Welcome                (src/pages/Welcome.jsx)
        Card / Link
```

# Call flow

```
Signup.submit  -> findUser, saveUser (store) -> navigate('/login')   (router)
Login.submit   -> findUser, setCurrentUser (store) -> navigate('/welcome')
Welcome        -> currentUser (store); navigate('/login') when absent
Link onClick   -> navigate -> history.pushState + dispatch 'popstate'
usePath        -> listens for 'popstate' -> setPath(location.pathname)
```

Navigation is a closed loop: `navigate` mutates history and synthesises a
`popstate` event, which the `usePath` hook inside `App` observes to re-render
with a different page.

# Hotspots (fan-in)

| Symbol | File | Fan-in |
| --- | --- | --- |
| `navigate` | `src/router.jsx` | 4 |
| `Card` | `src/components/Card.jsx` | 3 |
| `findUser` | `src/store.js` | 3 |
| `Link` | `src/router.jsx` | 3 |
| `Message` | `src/components/Card.jsx` | 2 |
| `Field` | `src/components/Card.jsx` | 2 |
| `load` | `src/store.js` | 2 |

`navigate`, `Card` and `findUser` are the three symbols most likely to break
multiple screens when changed.

# Clusters

| Cluster | Cohesion | Representative members |
| --- | --- | --- |
| 0 | 0.79 | `navigate`, `findUser`, `Welcome`, the two `submit` handlers |
| 3 | 0.73 | `Link`, `Signup`, `Login`, `Card`, `Field` |
| 1 | 1.00 | `usePath`, `App` |

# Known constraints

* There is no server-side route handling; a hard reload on `/login` depends on
  the dev server's history fallback.
* Credentials are stored in plain text in `localStorage`
  ([src/store](/modules/store.md)); the module comments mark this as demo-only.
