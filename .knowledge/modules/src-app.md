---
type: Module
title: src/App
description: Root component that maps location.pathname to a page component.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/App.jsx
tags: [frontend, routing, entry]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:58:38Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 08e3660b8f72cf411a3d1758d0e4fe5026600899
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | Line | Kind | Notes |
| --- | --- | --- | --- |
| `routes` | `src/App.jsx:8` | Variable | pathname -> page component map |
| `App` | `src/App.jsx:15` | Function | default export; the only consumer of `usePath` |

# Behaviour

`App` is nineteen lines and does exactly one thing: read the current pathname
from `usePath` and render `routes[path]`. An unmatched path falls back to
`Signup`, so there is no 404 page -- an unknown URL silently shows the sign-up
screen.

```jsx
const routes = {
  '/signup': Signup,
  '/login': Login,
  '/welcome': Welcome,
  '/change-password': ChangePassword,
};
const Page = routes[path] ?? Signup;
```

`App` renders `<Page />` with no props, so pages receive nothing from the
router -- there are no route params. Each page pulls what it needs from
[src/store](/modules/src-store.md) itself.

# Relationships

* Depends on [src/router](/modules/src-router.md) for `usePath` -- the single
  `App -> router` call in the graph's boundary table.
* Imports all four components of [src/pages](/modules/src-pages.md) statically;
  there is no lazy loading, so every page is in the initial bundle.
* Rendered by `src/main.jsx` inside `React.StrictMode`. Note that StrictMode
  double-invokes effects in development, which is visible in the guarded pages'
  redirect effects.
* Authentication guards are **not** here -- they live inside `Welcome` and
  `ChangePassword`. Adding a protected route means adding the guard to the page
  itself, as described in [Common Tasks](/playbooks/common-tasks.md).
