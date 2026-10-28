---
type: Architecture
title: Architecture
description: Three entry pages over a shared card/router/store core, with no backend tier.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [architecture, layers, react]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:35:21Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ af0eb7e28c6d901616970ef2450db466024c0fd3
    title: Codebase knowledge graph
status: stable
---

# Layers

The graph classifies five packages into two layers. Calls only ever run
downward: entry -> core. No core module imports a page.

| Package | Layer | Why |
| --- | --- | --- |
| `App` | entry | has an entry point, only outbound calls |
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

The three core packages are mutually independent -- `src/router.jsx`,
`src/store.js` and `src/components/Card.jsx` import nothing from each other,
only from `react`. That keeps each replaceable in isolation.

# Render tree

```
index.html (#root)
└── src/main.jsx  -> createRoot().render()
    └── App                 (src/App.jsx)
        └── usePath()       (src/router.jsx)
        └── routes[path] ?? Signup
            ├── Signup      (src/pages/Signup.jsx)
            ├── Login       (src/pages/Login.jsx)
            └── Welcome     (src/pages/Welcome.jsx)
                 each renders Card / Field / Message (src/components/Card.jsx)
                 and Link (src/router.jsx)
```

# Navigation flow

`navigate` is the single hinge of the app (fan-in 4, the top hotspot). It
pushes history state and dispatches a synthetic `popstate`; `usePath` listens
for that event and re-renders `App` with the new pathname.

```
Signup.submit  -> saveUser        -> navigate('/login')
Login.submit   -> findUser, setCurrentUser -> navigate('/welcome')
Welcome        -> currentUser; if absent -> navigate('/login')
Link onClick   -> navigate(to)
```

# Hotspots

| Symbol | File | Fan-in |
| --- | --- | --- |
| `navigate` | `src/router.jsx` | 4 |
| `Card` | `src/components/Card.jsx` | 3 |
| `Link` | `src/router.jsx` | 3 |
| `findUser` | `src/store.js` | 3 |
| `Field` | `src/components/Card.jsx` | 2 |
| `Message` | `src/components/Card.jsx` | 2 |
| `load` | `src/store.js` | 2 |

`load` is the private reader inside `src/store.js` that every exported store
function funnels through.

# Boundaries worth respecting

* **No network tier.** Persistence is browser-local; adding a server means
  replacing [src/store](/modules/src-store.md) wholesale rather than editing
  pages.
* **No shared app state.** Each page owns its own `useState`; the only
  cross-page state is what [src/store](/modules/src-store.md) writes to
  storage.
* **Styling is global.** All classNames used by components resolve to
  selectors in `src/style.css`; there are no CSS modules.
