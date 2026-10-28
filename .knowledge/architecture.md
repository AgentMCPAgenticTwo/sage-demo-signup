---
type: Architecture
title: Architecture
description: Layers, package boundaries, render tree and hotspots of the React single-page demo.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [architecture, react, routing, state]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:19:54Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 8b5e972c95c0d30e9afcad3fc02c3eb1ec018b87
    title: Codebase knowledge graph
status: stable
---

# Shape

A single-page React app with no backend. Three leaf packages (`router`,
`store`, `components`) have fan-in only; the `App` shell and the `pages`
package sit on top and do all the calling.

| Package | Layer | Reason (from graph) |
| --- | --- | --- |
| `App` | entry | has entry points, only outbound calls |
| `pages` | entry | has entry points, only outbound calls |
| `components` | core | high fan-in (7 in, 0 out) |
| `router` | core | high fan-in (7 in, 0 out) |
| `store` | core | high fan-in (5 in, 0 out) |

# Boundaries

| From | To | Calls |
| --- | --- | --- |
| `pages` | `components` | 7 |
| `pages` | `router` | 6 |
| `pages` | `store` | 5 |
| `App` | `router` | 1 |

The dependency graph is acyclic and one-directional: nothing in
[src/router](/modules/src-router.md), [src/store](/modules/src-store.md) or
[src/components](/modules/src-components.md) imports a page or the shell.

# Render Tree

```
index.html  #root
  src/main.jsx            createRoot(...).render
    App                   src/App.jsx:13      -- calls usePath()
      routes[path]        src/App.jsx:7       -- /signup | /login | /welcome, default Signup
        Signup            src/pages/Signup.jsx:6
        Login             src/pages/Login.jsx:6
        Welcome           src/pages/Welcome.jsx:6
          Card            src/components/Card.jsx:1
            Field         src/components/Card.jsx:10
            Message       src/components/Card.jsx:19
          Link            src/router.jsx:19
```

# Control Flow

| Flow | Path through the code |
| --- | --- |
| Sign up | `Signup.submit` (`src/pages/Signup.jsx:12`) → `findUser` → `saveUser` → `navigate('/login')` |
| Log in | `Login.submit` (`src/pages/Login.jsx:11`) → `findUser` → `setCurrentUser` → `navigate('/welcome')` |
| Guarded page | `Welcome` reads `currentUser()`; when absent, a `useEffect` calls `navigate('/login')` and the component renders `null` |
| Navigation | `navigate` pushes history state and dispatches `popstate`; `usePath` (`src/router.jsx:9`) listens and re-renders `App` |

# Hotspots (fan-in)

| Symbol | File | Fan-in |
| --- | --- | --- |
| `navigate` | `src/router.jsx:4` | 4 |
| `Card` | `src/components/Card.jsx:1` | 3 |
| `Link` | `src/router.jsx:19` | 3 |
| `findUser` | `src/store.js:12` | 3 |
| `Message` | `src/components/Card.jsx:19` | 2 |
| `Field` | `src/components/Card.jsx:10` | 2 |
| `load` | `src/store.js:4` | 2 |

Changes to `navigate`, `Card` or `findUser` touch every page; changes inside a
page touch nothing else.

# Known Characteristics

* Authentication is simulated. `saveUser` writes the password in clear text
  under the `acme-users` key — the module comment marks it demo-only.
* There is no server-side rendering and no 404 route: an unknown path renders
  `Signup` while the URL stays unchanged.
* Session identity lives in `sessionStorage` (`acme-current`), so it is lost
  per tab, while accounts persist in `localStorage`.
