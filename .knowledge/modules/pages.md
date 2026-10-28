---
type: Module
title: src/pages
description: The three routed screens: Signup, Login and Welcome.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/pages
tags: [frontend, pages, forms, entry]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T04:56:52Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 38fe79e86edef6544c50fc543f51f4f47b2379a8
    title: Codebase knowledge graph
status: stable
---

# Role

One default-exported component per file, selected by the `routes` map in
[src/App](/modules/app.md). This is the only package that crosses boundaries:
it calls [src/components](/modules/components.md) (7 calls),
[src/router](/modules/router.md) (6) and [src/store](/modules/store.md) (5).

# Symbols

| File | Symbol | Line | Signature |
| --- | --- | --- | --- |
| `src/pages/Signup.jsx` | `Signup` | 6 | `()` |
| `src/pages/Signup.jsx` | `set` | 10 | `(key)` -- curried change handler factory |
| `src/pages/Signup.jsx` | `submit` | 12 | `(event)` |
| `src/pages/Login.jsx` | `Login` | 6 | `()` |
| `src/pages/Login.jsx` | `submit` | 11 | `(event)` |
| `src/pages/Welcome.jsx` | `Welcome` | 6 | `()` |

# Signup -- `/signup`

* State: a single `form` object (`name`, `email`, `password`, `confirm`) plus
  an `error` string. `set(key)` returns the `onChange` handler for one field.
* `submit` validates in order: passwords match, then `findUser(form.email)`
  must be empty. Each failure calls `setError` and returns early.
* On success calls `saveUser({ name, email, password })` with `name` and
  `email` trimmed, then `navigate('/login')` -- the new account is **not**
  signed in automatically.
* Footer `Link` to `/login`.

# Login -- `/login`

* State: `email`, `password`, `error` as three separate `useState` values.
* `submit` calls `findUser(email)` and rejects when the user is missing *or*
  `user.password !== password`, with the single message
  "Email or password is incorrect." -- it does not reveal which was wrong.
* On success calls `setCurrentUser(user.email)` then `navigate('/welcome')`.
* Footer `Link` to `/signup`.

# Welcome -- `/welcome`

* Reads `currentUser()` during render (not in state), so it reflects
  `sessionStorage` at render time.
* A `useEffect` keyed on `user` redirects to `/login` when there is no
  session; the component returns `null` in that render pass.
* Title is `Welcome, {user.name || user.email}`, falling back to the email
  when the account has no name.
* The "Log out" `Link` navigates to `/login` but does not clear
  `acme-current` -- see the caveat in [src/store](/modules/store.md).

# Shared form shape

All three screens render inside `Card`. Both forms use `noValidate`, call
`event.preventDefault()` first, surface failures through `Message`, and set
`autoComplete` on every input.
