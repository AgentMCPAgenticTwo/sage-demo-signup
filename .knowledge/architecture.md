---
type: Architecture
title: Architecture
description: Three page components over a shared router, store and card-primitive layer, with no backend.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [architecture, layers, routing]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T17:18:25Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 78b91de716644ab7bfc26c34d71b2176b39a35ee
    title: Codebase knowledge graph
status: stable
---

# Layers

| Layer | Members | Reason (from graph) |
| --- | --- | --- |
| entry | `App`, `pages` | has entry points, only outbound calls |
| core | `components` | high fan-in (7 in, 0 out) |
| core | `router` | high fan-in (7 in, 0 out) |
| core | `store` | high fan-in (5 in, 0 out) |

The three core modules have **zero outbound calls** into application code. That
is the main structural invariant: [components](/modules/src-components.md),
[router](/modules/src-router.md) and [store](/modules/src-store.md) never depend
on [pages](/modules/src-pages.md).

# Boundaries

| From | To | Calls |
| --- | --- | --- |
| pages | components | 7 |
| pages | router | 6 |
| pages | store | 5 |
| App | router | 1 |

# Render tree

```
index.html #root
  src/main.jsx  -> createRoot(...).render(<App />)
    src/App.jsx App
      usePath()                 (src/router.jsx)
      routes[path] ?? Signup
        pages/Signup.jsx  -> Card, Field, Message, Link, navigate, findUser, saveUser
        pages/Login.jsx   -> Card, Field, Message, Link, navigate, findUser, setCurrentUser
        pages/Welcome.jsx -> Card, Link, navigate, currentUser
```

# Navigation flow

1. `Signup.submit` validates with `passwordErrors`, writes with `saveUser`, then
   `navigate('/login')`.
2. `Login.submit` checks `findUser`, records `setCurrentUser`, then
   `navigate('/welcome')`.
3. `Welcome` reads `currentUser()` and `navigate('/login')`s in a `useEffect`
   when there is no session.

`navigate` pushes to `window.history` and dispatches a synthetic `popstate`,
which is what `usePath`'s listener picks up. That synthetic event is the only
coupling between the two halves of the router.

# Hotspots (fan-in)

| Symbol | Fan-in |
| --- | --- |
| `navigate` (`src/router.jsx`) | 4 |
| `Card` (`src/components/Card.jsx`) | 3 |
| `Link` (`src/router.jsx`) | 3 |
| `findUser` (`src/store.js`) | 3 |
| `Field`, `Message` (`src/components/Card.jsx`) | 2 each |
| `load` (`src/store.js`) | 2 |

# Clusters

| Members | Cohesion |
| --- | --- |
| `findUser`, `submit`, `submit`, `load`, `saveUser` | 0.75 |
| `Login`, `Signup`, `Card`, `Field`, `Message` | 0.67 |
| `navigate`, `Link`, `Welcome` | 0.33 |
| `App`, `usePath` | 1.00 |

# Notable absences

* No server, API client or fetch call anywhere.
* No global state container -- every page owns its own `useState`.
* No route guard layer; the only guard is the `useEffect` inside `Welcome`.
