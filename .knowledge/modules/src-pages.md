---
type: Module
title: src/pages
description: "The three routed screens: sign up, log in and the signed-in welcome page."
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/pages
tags: [frontend, pages, forms, auth]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T03:58:25Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 33f196c6383d96b07ef0b9ef85db894b4859243c
    title: Codebase knowledge graph
status: stable
---

# src/pages

One default-exported component per file, registered in the `routes` map in
`src/App.jsx`. Every page composes [components](/modules/src-components.md),
navigates through [router](/modules/src-router.md) and reads or writes
accounts through [store](/modules/src-store.md).

## Symbols

| Symbol | Kind | File | Line |
| --- | --- | --- | --- |
| `Signup` | Component (default) | `src/pages/Signup.jsx` | 6 |
| `set` | Function | `src/pages/Signup.jsx` | 10 |
| `submit` | Function | `src/pages/Signup.jsx` | 12 |
| `Login` | Component (default) | `src/pages/Login.jsx` | 6 |
| `submit` | Function | `src/pages/Login.jsx` | 11 |
| `Welcome` | Component (default) | `src/pages/Welcome.jsx` | 6 |

## Signup -- `/signup`

State: one `form` object (`name`, `email`, `password`, `confirm`) plus an
`error` string. `set(key)` is a curried change handler that spreads the
previous form.

`submit` validates in order and stops at the first failure:

| Check | Message |
| --- | --- |
| `password !== confirm` | `Passwords do not match.` |
| `findUser(email)` returns a user | `An account with this email already exists.` |

On success it calls `saveUser({ name, email, password })` with `name` and
`email` trimmed, then `navigate('/login')` -- signing up does **not** sign
you in. Footer links to `/login`.

## Login -- `/login`

State: `email`, `password`, `error` as three separate `useState` calls.

`submit` calls `findUser(email)`; a missing user or a password mismatch both
produce the same message, `Email or password is incorrect.`, so the form
does not reveal which emails exist. On success it calls
`setCurrentUser(user.email)` -- the stored email, not the typed one -- then
`navigate('/welcome')`. Footer links to `/signup`.

## Welcome -- `/welcome`

Reads `currentUser()` on every render rather than holding it in state. A
`useEffect` keyed on `user` redirects to `/login` when there is no session,
and the component returns `null` in that render so nothing flashes. When
signed in, the title is `Welcome, ${user.name || user.email}` and the footer
offers a "Log out" link -- which only navigates to `/login`; it does not
clear `acme-current`. See [Store](/modules/src-store.md).

## Shared form shape

All three screens render inside `<Card title=...>`; the two forms use
`noValidate` with JS validation, a single `error` string surfaced through
`<Message>`, and a `<p className="switch">` footer link. Follow this shape
when adding a page -- see [Conventions](/conventions.md).
