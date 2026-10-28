---
type: Architecture
title: Application architecture
description: Layers, clusters, boundaries and the render/call tree of the React single-page app.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [architecture, react, routing, state]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T03:58:25Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 33f196c6383d96b07ef0b9ef85db894b4859243c
    title: Codebase knowledge graph
status: stable
---

# Architecture

The whole app is 9 JavaScript/JSX files under `src/`. The graph records 112
nodes and 163 edges, dominated by `DEFINES` (86), `IMPORTS` (25) and
`CALLS` (23).

## Layers

| Layer | Packages | Why |
| --- | --- | --- |
| entry | `App` (`src/App.jsx`), `pages` (`src/pages/`) | Hold entry points, only outbound calls |
| core | `components` (`src/components/`), `router` (`src/router.jsx`), `store` (`src/store.js`) | High fan-in, no outbound calls into app code |

There is no service, data-access or server layer -- `src/store.js` is the
persistence boundary and it talks directly to Web Storage.

## Boundaries

| From | To | Calls |
| --- | --- | --- |
| `pages` | `components` | 7 |
| `pages` | `router` | 6 |
| `pages` | `store` | 5 |
| `App` | `router` | 1 |

Dependencies flow strictly one way: pages depend on the three core modules;
no core module imports a page. `src/components/Card.jsx` imports nothing at
all, which keeps it reusable.

## Clusters

| Cluster | Cohesion | Representative members |
| --- | --- | --- |
| Flow (auth actions) | 0.79 | `findUser`, `navigate`, `Welcome`, the two `submit` handlers |
| Presentation | 0.73 | `Link`, `Login`, `Signup`, `Card`, `Field` |
| Shell | 1.00 | `App`, `usePath` |

## Hotspots (fan-in)

| Symbol | File | Fan-in |
| --- | --- | --- |
| `navigate` | `src/router.jsx` | 4 |
| `Card` | `src/components/Card.jsx` | 3 |
| `Link` | `src/router.jsx` | 3 |
| `findUser` | `src/store.js` | 3 |
| `Field`, `Message` | `src/components/Card.jsx` | 2 each |
| `load` | `src/store.js` | 2 |

`navigate`, `Card` and `findUser` are the three symbols a change is most
likely to ripple from.

## Render tree

```
index.html (#root)
└── src/main.jsx -> createRoot().render
    └── App                       src/App.jsx
        ├── usePath()             src/router.jsx   (popstate subscription)
        └── routes[path] ?? Signup
            ├── Signup            src/pages/Signup.jsx
            │   └── Card > form > Field x4, Message, button, Link("/login")
            ├── Login             src/pages/Login.jsx
            │   └── Card > form > Field x2, Message, button, Link("/signup")
            └── Welcome           src/pages/Welcome.jsx
                └── Card > p, Link("/login")
```

## Navigation / state flow

1. `Link` (or a page's `submit`) calls `navigate(path)` in `src/router.jsx`.
2. `navigate` does `history.pushState` and dispatches a synthetic `popstate`.
3. `usePath`'s `onChange` listener updates state, re-rendering `App`.
4. `App` looks the new path up in `routes` and renders the page.

Auth state is read on every render rather than held in React state:
`Welcome` calls `currentUser()` directly, and redirects to `/login` from a
`useEffect` when it is `null`. See [Store](/modules/src-store.md) and
[Router](/modules/src-router.md).

## Known constraints

* Passwords are stored in plaintext in `localStorage`; `src/store.js` labels
  itself demo-only. Do not reuse it for real credentials.
* The router has no route params, no nested routes and no 404 page -- an
  unknown path silently renders `Signup`.
* A hard page load on `/login` or `/welcome` requires the dev/preview server
  to fall back to `index.html`; Vite does this for SPAs by default.
