---
type: Architecture
title: Architecture
description: Three core modules (router, store, components) consumed by four page entry points under a single App shell.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [architecture, layers, react]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:44:46Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ e05c9763bafd1094d0ab184ec6d101f963d09410
    title: Codebase knowledge graph
status: stable
---

# Layers

| Layer | Packages | Reason (from graph) |
| --- | --- | --- |
| entry | `App` (`src/App.jsx`, `src/main.jsx`) | has entry points, only outbound calls |
| entry | `pages` (`src/pages/`) | has entry points, only outbound calls |
| core | `components` (`src/components/`) | high fan-in (12 in, 0 out) |
| core | `router` (`src/router.jsx`) | high fan-in (9 in, 0 out) |
| core | `store` (`src/store.js`) | high fan-in (7 in, 0 out) |

The core modules make no calls back into `pages`, so the dependency direction is
strictly entry → core. See [Pages](/modules/src-pages.md),
[Components](/modules/src-components.md), [Router](/modules/src-router.md) and
[Store](/modules/src-store.md).

# Boundaries

| From | To | Calls |
| --- | --- | --- |
| pages | components | 12 |
| pages | router | 8 |
| pages | store | 7 |
| App | router | 1 |

# Render tree

```
index.html (#root)
└── src/main.jsx — createRoot(...).render
    └── App (src/App.jsx)          uses usePath()
        └── routes[path] ?? Signup
            ├── Signup  (src/pages/Signup.jsx)
            ├── Login   (src/pages/Login.jsx)
            ├── Welcome (src/pages/Welcome.jsx)
            └── ResetPassword (src/pages/ResetPassword.jsx)
                each renders → Card / Field / Message (src/components/Card.jsx)
                                Link (src/router.jsx)
                ResetPassword also renders → PasswordRules (src/components/PasswordRules.jsx)
```

# Flow of control

* Navigation is imperative: `navigate(path)` pushes history then dispatches a
  `popstate` event; `usePath` listens for `popstate` and re-renders `App`.
  `Link` calls `navigate` on click after `preventDefault()`.
* Each page submit handler validates locally, then either sets an error message
  or calls `navigate` to the next path.
* `Signup` → `saveUser` → `navigate('/login')`.
* `Login` → `findUser` + password compare → `setCurrentUser` → `navigate('/welcome')`.
* `ResetPassword` → `unmetRules(password)` → `findUser` → `saveUser` → `navigate('/login')`.
* `Welcome` → `currentUser()`; redirects to `/login` in an effect when absent.

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

# Clusters

The graph reports three `src` clusters: a submit/persistence cluster
(`navigate`, `findUser`, `saveUser`, page `submit` handlers, cohesion 0.82), a
page/link cluster (`Link`, `Signup`, `Login`, `Welcome`, `ResetPassword`,
cohesion 0.83), and the shell pair (`App`, `usePath`, cohesion 1.0).

# Notable asymmetry

`passwordRules` / `unmetRules` are only reached from `ResetPassword`.
`Signup` validates that password and confirm match but does not apply the rule
set, so the two password entry points enforce different requirements.
