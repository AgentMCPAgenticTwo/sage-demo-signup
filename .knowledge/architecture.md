---
type: Architecture
title: Architecture
description: Four-package layout where entry-layer pages compose core router, store and card primitives.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [architecture, react, layering]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T23:34:47Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 9e0695a13b39e00939f996e6665b83350960de3e
    title: Codebase knowledge graph
status: stable
---

# Layers

| Package | Layer | Why |
| --- | --- | --- |
| `App` (`src/App.jsx`) | entry | has entry points, only outbound calls |
| `pages` (`src/pages/`) | entry | has entry points, only outbound calls |
| `components` (`src/components/`) | core | high fan-in (6 in, 0 out) |
| `router` (`src/router.jsx`) | core | high fan-in (7 in, 0 out) |
| `store` (`src/store.js`) | core | high fan-in (5 in, 0 out) |

The three core packages have **zero outbound calls** into the rest of the app.
That is the main invariant: `components`, `router` and `store` never import a
page, and never import each other. All composition happens in `pages` and `App`.

# Boundaries

| From | To | Calls |
| --- | --- | --- |
| `pages` | `router` | 6 |
| `pages` | `components` | 6 |
| `pages` | `store` | 5 |
| `App` | `router` | 1 |

# Render tree

```
index.html (#root)
└── src/main.jsx  -> createRoot().render(<App/>)
    └── App                      (src/App.jsx)       uses usePath()
        └── routes[path] ?? Signup
            ├── Signup           (src/pages/Signup.jsx)
            │   └── Card > form > Field×4, PASSWORD_RULES hint list, error list, Link
            ├── Login            (src/pages/Login.jsx)
            │   └── Card > form > Field×2, Message, Link
            └── Welcome          (src/pages/Welcome.jsx)
                └── Card > Link   (redirects via navigate() when no currentUser())
```

# Call tree (graph CALLS edges)

```
App            -> usePath
Signup.submit  -> passwordErrors -> PASSWORD_RULES[].test
               -> setError / setErrors
               -> findUser -> load
               -> saveUser -> load
               -> navigate
Login.submit   -> findUser -> load
               -> setCurrentUser
               -> navigate
Welcome        -> currentUser -> findUser -> load
               -> navigate
Link           -> navigate
```

# Hotspots

| Symbol | File | Fan-in |
| --- | --- | --- |
| `navigate` | `src/router.jsx` | 4 |
| `Card` | `src/components/Card.jsx` | 3 |
| `findUser` | `src/store.js` | 3 |
| `Link` | `src/router.jsx` | 3 |
| `Field` | `src/components/Card.jsx` | 2 |
| `load` | `src/store.js` | 2 |

`navigate`, `findUser` and `Card` are the three symbols a change is most likely
to ripple through — see [router](/modules/router.md),
[store](/modules/store.md) and [Card components](/modules/components-card.md).

# Clusters

| Cohesion | Top members | Reading |
| --- | --- | --- |
| 0.79 | `submit`, `findUser`, `submit`, `load`, `saveUser` | the account read/write path shared by both forms |
| 0.63 | `Login`, `Signup`, `Card`, `Field`, `Message` | the form-rendering cluster |
| 0.33 | `navigate`, `Link`, `Welcome` | navigation |
| 1.00 | `usePath`, `App` | the route resolver |

# Notable properties

* **No cycles.** The graph reports none; the layering above holds strictly.
* **Navigation is event-driven.** `navigate` pushes history state and dispatches
  a synthetic `popstate`; `usePath` subscribes to `popstate`. There is no
  context or provider — any module can call `navigate` directly.
* **Persistence is the only side-effecting boundary.** Everything that touches
  `localStorage`/`sessionStorage` is confined to `src/store.js`.
* **Auth is demo-grade.** Passwords are stored and compared in plaintext in
  browser storage; `src/store.js` says so in its first line. Do not model real
  credential handling on it.
