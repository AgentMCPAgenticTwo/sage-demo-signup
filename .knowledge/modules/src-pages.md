---
type: Module
title: src/pages
description: The three routed screens: Signup, Login and Welcome.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/pages
tags: [frontend, pages, forms]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:19:54Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 8b5e972c95c0d30e9afcad3fc02c3eb1ec018b87
    title: Codebase knowledge graph
status: stable
---

# Files & Symbols

| Symbol | File | Line | Role |
| --- | --- | --- | --- |
| `Signup` | `src/pages/Signup.jsx` | 6 | Default export; account creation form |
| `set` | `src/pages/Signup.jsx` | 10 | Curried `key => event =>` change handler over one `form` object |
| `submit` | `src/pages/Signup.jsx` | 12 | Validates, saves, navigates to `/login` |
| `Login` | `src/pages/Login.jsx` | 6 | Default export; credential form |
| `submit` | `src/pages/Login.jsx` | 11 | Verifies credentials, navigates to `/welcome` |
| `Welcome` | `src/pages/Welcome.jsx` | 6 | Default export; guarded confirmation screen |

# Signup

State: one `form` object (`name`, `email`, `password`, `confirm`) plus an
`error` string. `submit` rejects in order:

1. `form.password !== form.confirm` → "Passwords do not match."
2. `findUser(form.email)` truthy → "An account with this email already exists."

On success it calls `saveUser({ name: trimmed, email: trimmed, password })`
and `navigate('/login')`. The card links to `/login` via `Link`.

# Login

State: separate `email`, `password` and `error` strings. A missing user or a
password mismatch both produce the same message, "Email or password is
incorrect.", so the form does not reveal which accounts exist. On success it
calls `setCurrentUser(user.email)` then `navigate('/welcome')`.

# Welcome

Reads `currentUser()` during render. A `useEffect` keyed on `user` calls
`navigate('/login')` when there is no session, and the component returns `null`
in that case so nothing flashes. The title is `Welcome, ${user.name ||
user.email}`, and the "Log out" link is a `Link` to `/login` — note it
navigates only; it does not clear `acme-current`.

# Relationships

* rendered by [src (app shell)](/modules/src-app.md) through its `routes` table.
* depends on [src/components](/modules/src-components.md) (`Card`, `Field`,
  `Message`), [src/router](/modules/src-router.md) (`Link`, `navigate`) and
  [src/store](/modules/src-store.md) (`findUser`, `saveUser`,
  `setCurrentUser`, `currentUser`).
* nothing depends on these pages — they are leaves of the import graph in
  [Architecture](/architecture.md).
