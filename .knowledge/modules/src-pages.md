---
type: Module
title: pages
description: The three screens of the demo flow: Signup, Login and Welcome.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/pages
tags: [frontend, pages, forms]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:27:27Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ af863cd5d6567cf6b64d2fc625952a185971b018
    title: Codebase knowledge graph
status: stable
---

Each file default-exports one page component, registered by path in
[App Root](/modules/src-app.md).

| Page | File | Path |
| --- | --- | --- |
| `Signup` | `src/pages/Signup.jsx:6` | `/signup` (also the fallback) |
| `Login` | `src/pages/Login.jsx:6` | `/login` |
| `Welcome` | `src/pages/Welcome.jsx:6` | `/welcome` |

# Signup

| Symbol | Location | Notes |
| --- | --- | --- |
| `Signup` | `src/pages/Signup.jsx:6` | one `form` state object: `name`, `email`, `password`, `confirm` |
| `set` | `src/pages/Signup.jsx:10` | curried `(key) => (event) => setForm({ ...form, [key]: event.target.value })` |
| `submit` | `src/pages/Signup.jsx:12` | validation then `saveUser` then `navigate('/login')` |

Validation order in `submit`, each returning early after setting `error`:

1. `form.password !== form.confirm` → "Passwords do not match."
2. `findUser(form.email)` truthy → "An account with this email already exists."

On success it writes `{ name, email, password }` with `name`/`email` trimmed and
redirects to `/login`. Footer offers a `Link` to `/login`.

# Login

| Symbol | Location | Notes |
| --- | --- | --- |
| `Login` | `src/pages/Login.jsx:6` | separate `useState` per field: `email`, `password`, `error` |
| `submit` | `src/pages/Login.jsx:11` | `findUser(email)`, compares `user.password !== password` |

A missing user and a wrong password share one message — "Email or password is
incorrect." On success it calls `setCurrentUser(user.email)` and
`navigate('/welcome')`. Footer offers a `Link` to `/signup`.

# Welcome

| Symbol | Location | Notes |
| --- | --- | --- |
| `Welcome` | `src/pages/Welcome.jsx:6` | reads `currentUser()` during render |

Guards in two steps: a `useEffect` keyed on `user` calls `navigate('/login')` when
there is no user, and the render returns `null` in the same case so nothing flashes.
The heading is `` `Welcome, ${user.name || user.email}` ``. The "Log out" link is a
`Link` to `/login` and does **not** clear the session — see
[store](/modules/src-store.md).

# Depends On

* [components/Card](/modules/src-components.md) — `Card`, `Field`, `Message` (7 calls).
* [router](/modules/src-router.md) — `Link`, `navigate` (6 calls).
* [store](/modules/src-store.md) — `findUser`, `saveUser`, `setCurrentUser`,
  `currentUser` (5 calls).
