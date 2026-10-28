---
type: Module
title: src/pages
description: The three routed screens: `Signup`, `Login` and `Welcome`.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/pages
tags: [frontend, pages, forms, auth]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:04:36Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 360fd597ded4ea1f388e555fd8458ad76d46ff8b
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | Line | Export |
| --- | --- | --- |
| `Signup` | `src/pages/Signup.jsx:6` | default |
| `set` | `src/pages/Signup.jsx:10` | private -- curried `onChange` factory |
| `submit` | `src/pages/Signup.jsx:12` | private |
| `Login` | `src/pages/Login.jsx:6` | default |
| `submit` | `src/pages/Login.jsx:11` | private |
| `Welcome` | `src/pages/Welcome.jsx:6` | default |

# Signup -- `/signup`

Fields: full name, email, password, confirm password. `submit` rejects in
order:

1. `form.password !== form.confirm` -> "Passwords do not match."
2. `findUser(form.email)` truthy -> "An account with this email already exists."

On success it calls `saveUser` with trimmed `name` and `email`, then
`navigate('/login')`. State is a single `form` object; `set(key)` returns the
per-field `onChange`.

# Login -- `/login`

`submit` loads the user with `findUser(email)` and compares `user.password`
directly. A missing user and a wrong password share one message, "Email or
password is incorrect.", so the form does not leak account existence. On success:
`setCurrentUser(user.email)` then `navigate('/welcome')`.

State here is one `useState` per field, unlike `Signup`'s single object.

# Welcome -- `/welcome`

Reads `currentUser()` on every render. An effect redirects to `/login` when
there is no user, and the component returns `null` in the meantime -- this is
the app's only route guard. The title falls back from `user.name` to
`user.email`. "Log out" is a `Link` to `/login` and does not clear the session;
see [src/store](/modules/src-store.md).

# Depends On

* [src/components](/modules/src-components.md) -- `Card`, `Field`, `Message`.
* [src/router](/modules/src-router.md) -- `Link`, `navigate`.
* [src/store](/modules/src-store.md) -- `findUser`, `saveUser`,
  `setCurrentUser`, `currentUser`.

# Rendered By

[src/App](/modules/src-app.md) via the `routes` table.
