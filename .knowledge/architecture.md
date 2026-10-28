---
type: Architecture
title: Architecture
description: Three core modules (router, store, components) consumed by four page entry points under a single App switch.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [architecture, layers, react]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:58:38Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 08e3660b8f72cf411a3d1758d0e4fe5026600899
    title: Codebase knowledge graph
status: stable
---

# Layers

The graph classifies five packages into two layers. Dependencies run strictly
downward -- no core module imports a page.

| Layer | Package | Why |
| --- | --- | --- |
| entry | `App` | has entry points, only outbound calls |
| entry | `pages` | has entry points, only outbound calls |
| core | `components` | high fan-in (12 in, 0 out) |
| core | `router` | high fan-in (10 in, 0 out) |
| core | `store` | high fan-in (7 in, 0 out) |

The three core modules are mutually independent: `components`, `router` and
`store` never import one another. All composition happens in the page layer.
This is the single most important structural fact about the codebase -- it is
why a page can be added or deleted without touching anything shared.

# Boundaries

Cross-package call counts from the graph:

| From | To | Calls |
| --- | --- | --- |
| `pages` | `components` | 12 |
| `pages` | `router` | 9 |
| `pages` | `store` | 7 |
| `App` | `router` | 1 |

# Render tree

```
index.html  #root
  main.jsx            createRoot(...).render
    App               usePath() -> routes[path] ?? Signup
      Signup          Card > form > Field x4 > Message
      Login           Card > form > Field x2 > Message
      Welcome         Card > Link x2                 (guarded)
      ChangePassword  Card > form > Field x3 > PasswordRules > Message  (guarded)
```

`Card`, `Field`, `Message` and `Link` are leaves -- they render markup and call
nothing. The only component that holds logic is `PasswordRules`, which is
described in [src/components](/modules/src-components.md).

# Navigation flow

Navigation is a loop through the browser history API rather than React state:

```
Link onClick / page submit
  -> navigate(path)              src/router.jsx
       history.pushState
       dispatchEvent(PopStateEvent('popstate'))
  -> usePath popstate listener   src/router.jsx
       setPath(location.pathname)
  -> App re-renders routes[path]
```

`navigate` dispatches a synthetic `popstate` because `pushState` alone fires no
event. Any future navigation helper must preserve that dispatch or `usePath`
will not observe the change. See [src/router](/modules/src-router.md).

# Session flow

```
Signup   saveUser(user)                 -> localStorage 'acme-users'
         navigate('/login')
Login    findUser(email) + password check
         setCurrentUser(user.email)     -> sessionStorage 'acme-current'
         navigate('/welcome')
Welcome  currentUser() -> findUser(sessionStorage email)
ChangePassword
         currentUser(); verify form.current against user.password
         passwordIsValid(form.password)
         saveUser({ ...user, password })
         navigate('/welcome')
```

Signing up does not sign the user in -- `Signup` routes to `/login` and the
session is only established by `Login`. See [src/store](/modules/src-store.md).

# Hotspots

Highest fan-in symbols, i.e. the ones whose behaviour is hardest to change
safely:

| Symbol | Fan-in | File |
| --- | --- | --- |
| `navigate` | 6 | `src/router.jsx` |
| `Card` | 4 | `src/components/Card.jsx` |
| `Link` | 4 | `src/router.jsx` |
| `Message` | 3 | `src/components/Card.jsx` |
| `Field` | 3 | `src/components/Card.jsx` |
| `findUser` | 3 | `src/store.js` |

# Clusters

The graph groups symbols into five call clusters:

| Cluster | Cohesion | Representative members |
| --- | --- | --- |
| data + navigation | 0.57 | `navigate`, `findUser`, `saveUser`, page `submit` handlers |
| page composition | 0.67 | `ChangePassword`, `Login`, `Signup`, `Card`, `Link` |
| password validation | 0.50 | `passwordIsValid`, `PasswordRules`, rule `test` |
| app shell | 1.00 | `App`, `usePath` |
| welcome / session | 0.17 | `Welcome`, `currentUser` |

# Known structural gaps

* Password rules are enforced only in `ChangePassword`. `Signup` imports
  neither `PasswordRules` nor `passwordIsValid`, so a new account can be
  created with any password. Noted here as a fact about the current structure.
* `Welcome` and `ChangePassword` each re-implement the same guard
  (`currentUser()` + `useEffect` redirect + `if (!user) return null`); there is
  no shared guard component.
* `README.md` lists only `/signup`, `/login`, `/welcome` and omits
  `/change-password`.
