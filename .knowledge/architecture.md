---
type: Architecture
title: Application architecture
description: Layers, clusters, boundaries and the render/call tree of the React + Vite single-page app.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [architecture, react, routing, state]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:11:52Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 11cbd71eed22e7124383102d0584b2397653d88d
    title: Codebase knowledge graph
status: stable
---

# Architecture

The whole application is 112 graph nodes and 163 edges across nine JavaScript
files. There is exactly one direction of dependency: pages depend on the three
shared leaves (`components`, `router`, `store`); nothing depends on pages.

## Layers

| Package | Layer | Why |
| --- | --- | --- |
| `App` (`src/App.jsx`) | entry | Only outbound calls; owns the route table |
| `pages` (`src/pages/`) | entry | Each page is a default-exported screen; only outbound calls |
| `components` (`src/components/`) | core | High fan-in (7 in, 0 out) |
| `router` (`src/router.jsx`) | core | High fan-in (7 in, 0 out) |
| `store` (`src/store.js`) | core | High fan-in (5 in, 0 out) |

## Boundaries

| From | To | Calls |
| --- | --- | --- |
| `pages` | `components` | 7 |
| `pages` | `router` | 6 |
| `pages` | `store` | 5 |
| `App` | `router` | 1 |

The core layer never calls back into `pages` or `App`, so the dependency graph
is acyclic and each core module can be read standalone.

## Clusters

| Cluster | Cohesion | Representative members |
| --- | --- | --- |
| 0 | 0.79 | `navigate`, `findUser`, `Welcome`, `submit` (Login), `submit` (Signup) -- the auth flow |
| 3 | 0.73 | `Link`, `Signup`, `Login`, `Card`, `Field` -- the form-rendering surface |
| 1 | 1.00 | `usePath`, `App` -- routing shell |

## Hotspots

| Symbol | File | Fan-in |
| --- | --- | --- |
| `navigate` | `src/router.jsx` | 4 |
| `Card` | `src/components/Card.jsx` | 3 |
| `findUser` | `src/store.js` | 3 |
| `Link` | `src/router.jsx` | 3 |
| `Message` | `src/components/Card.jsx` | 2 |
| `Field` | `src/components/Card.jsx` | 2 |
| `load` | `src/store.js` | 2 |

Changing `navigate`, `Card` or `findUser` touches most of the app; everything
else is local.

## Render tree

```
index.html  #root
  src/main.jsx          createRoot().render()
    App                 src/App.jsx
      usePath()         src/router.jsx  -- subscribes to popstate
      routes[path]      -- Signup | Login | Welcome (default Signup)
        Signup          src/pages/Signup.jsx
          Card / Field x4 / Message      src/components/Card.jsx
          Link -> /login                 src/router.jsx
        Login           src/pages/Login.jsx
          Card / Field x2 / Message
          Link -> /signup
        Welcome         src/pages/Welcome.jsx
          Card
          Link -> /login
```

## Control flow -- the auth path

1. `Signup.submit` validates `password === confirm`, rejects a duplicate via
   `findUser`, then `saveUser` and `navigate('/login')`.
2. `Login.submit` looks the account up with `findUser`, compares the stored
   plaintext `password`, then `setCurrentUser(user.email)` and
   `navigate('/welcome')`.
3. `Welcome` reads `currentUser()` on render and, in a `useEffect`, redirects to
   `/login` when there is no session.
4. `navigate` pushes history state and dispatches a synthetic `popstate`, which
   wakes the `usePath` listener in `App` and swaps the page.

Detail per module: [router](/modules/src-router.md), [store](/modules/src-store.md),
[pages](/modules/src-pages.md), [components](/modules/src-components.md).

## Notable properties

* **No router library.** History handling is 30 lines in `src/router.jsx`; a
  real server must rewrite unknown paths to `index.html` for deep links to work.
* **No shared state container.** Page state is local `useState`; cross-page
  state is read from Web Storage on each render.
* **Credentials are plaintext** in `localStorage` -- the store file says so
  explicitly. This is demo-only and must not be copied into real code.
