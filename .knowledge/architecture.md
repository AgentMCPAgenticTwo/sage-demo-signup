---
type: Architecture
title: Architecture
description: Layering, package boundaries, render tree and hotspots of the demo signup app.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [architecture, layers, routing, react]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:27:27Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ af863cd5d6567cf6b64d2fc625952a185971b018
    title: Codebase knowledge graph
status: stable
---

# Layers

The graph resolves five packages into three layers. Dependencies point strictly
downward; there are no cycles.

| Layer | Packages | Reason |
| --- | --- | --- |
| Entry | `App` (`src/App.jsx`, `src/main.jsx`) | has entry points, only outbound calls |
| Entry | `pages` (`src/pages/`) | has entry points, only outbound calls |
| Core | `components`, `router`, `store` | high fan-in, no outbound calls into app code |

```
main.jsx -> App -> pages/{Signup,Login,Welcome}
                        |-> components/Card.jsx   (Card, Field, Message)
                        |-> router.jsx            (Link, navigate)
                        '-> store.js              (findUser, saveUser,
                                                   setCurrentUser, currentUser)
App ----------------------> router.jsx            (usePath)
```

# Boundaries

Call counts across package boundaries, from the graph:

| From | To | Calls |
| --- | --- | --- |
| `pages` | `components` | 7 |
| `pages` | `router` | 6 |
| `pages` | `store` | 5 |
| `App` | `router` | 1 |

The three core packages never call back into `pages` or `App`. `store.js` is the
only module that touches `localStorage`/`sessionStorage`; `router.jsx` is the only
module that touches `window.history` and `popstate`.

# Render Tree

| Node | Defined in | Notes |
| --- | --- | --- |
| `App` | `src/App.jsx:13` | reads `usePath()`, looks the path up in `routes` |
| `routes` | `src/App.jsx:7` | `/signup`, `/login`, `/welcome`; unknown paths fall back to `Signup` |
| `Signup` | `src/pages/Signup.jsx:6` | form state via `useState`, writes with `saveUser` |
| `Login` | `src/pages/Login.jsx:6` | verifies with `findUser`, marks session via `setCurrentUser` |
| `Welcome` | `src/pages/Welcome.jsx:6` | reads `currentUser()`, redirects to `/login` when absent |
| `Card` / `Field` / `Message` | `src/components/Card.jsx:1,10,19` | the only presentational primitives |

# Hotspots

Highest fan-in symbols — changing these ripples widest.

| Symbol | File | Fan-in |
| --- | --- | --- |
| `navigate` | `src/router.jsx:4` | 4 |
| `Card` | `src/components/Card.jsx:1` | 3 |
| `Link` | `src/router.jsx:19` | 3 |
| `findUser` | `src/store.js:12` | 3 |
| `Field` | `src/components/Card.jsx:10` | 2 |
| `Message` | `src/components/Card.jsx:19` | 2 |
| `load` | `src/store.js:4` | 2 |

# Navigation Model

There is no router library. `navigate` pushes onto `window.history` and dispatches a
synthetic `popstate`; `usePath` subscribes to `popstate` and returns
`window.location.pathname`. `App` maps that path to a page component. This means
every navigation path — `Link` clicks, programmatic `navigate` calls after submit,
and browser back/forward — funnels through the same single listener. Details in
[router](/modules/src-router.md).

# Known Constraints

* Passwords are stored and compared in plain text by [store](/modules/src-store.md); the
  module is explicitly demo-only.
* The session key (`acme-current`) holds an email, so `currentUser()` depends on
  `findUser` and silently yields `null` if the account was removed.
* Only `src/style.css` styles the app; there are no CSS modules or scoped styles.
  See [styles](/modules/src-styles.md).
