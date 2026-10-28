---
type: Module
title: src/pages
description: The three screens of the sign-up flow, one default-exported component per file.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/pages
tags: [frontend, pages, forms, auth]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:11:52Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 11cbd71eed22e7124383102d0584b2397653d88d
    title: Codebase knowledge graph
status: stable
---

# src/pages

Three screens, each a default export rendered by `App`. Every page depends on
[components](/modules/src-components.md), [router](/modules/src-router.md) and
(except `Welcome`'s form-less body) [store](/modules/src-store.md).

## Symbols

| Symbol | Kind | File | Line |
| --- | --- | --- | --- |
| `Signup` | Function | `src/pages/Signup.jsx` | 6 |
| `set` | Function | `src/pages/Signup.jsx` | 10 |
| `submit` | Function | `src/pages/Signup.jsx` | 12 |
| `Login` | Function | `src/pages/Login.jsx` | 6 |
| `submit` | Function | `src/pages/Login.jsx` | 11 |
| `Welcome` | Function | `src/pages/Welcome.jsx` | 6 |

## Signup -- `/signup`

* State: one `form` object (`name`, `email`, `password`, `confirm`) and an
  `error` string.
* `set(key)` is curried -- `onChange={set('name')}` -- and replaces the whole
  form object each keystroke.
* `submit` validation order: passwords must match
  (`'Passwords do not match.'`), then `findUser` must miss
  (`'An account with this email already exists.'`). On success it calls
  `saveUser({ name: trimmed, email: trimmed, password })` and
  `navigate('/login')`.
* Footer `Link` to `/login`.

## Login -- `/login`

* State: separate `email`, `password` and `error` strings.
* `submit` calls `findUser(email)` and compares `user.password !== password`.
  Both a missing account and a wrong password produce the same message,
  `'Email or password is incorrect.'` -- deliberate, it avoids disclosing
  which emails are registered.
* On success: `setCurrentUser(user.email)` then `navigate('/welcome')`.
* Footer `Link` to `/signup`.

## Welcome -- `/welcome`

* Reads `currentUser()` during render (no state).
* A `useEffect` keyed on `user` redirects to `/login` when there is no session;
  the component returns `null` in that frame, so nothing flashes.
* Title is `Welcome, {user.name || user.email}` -- falls back to the email when
  the name is blank.
* "Log out" is a `Link` to `/login`; it does **not** clear
  `sessionStorage`, so the session survives and navigating back to `/welcome`
  still shows the user.

## Gotchas

* Forms are `noValidate`, so the `required` and `type="email"` attributes are
  advisory -- an empty-field submit reaches `submit`.
* `Signup` does not check password strength or email shape.
* A new page needs both the file here and an entry in `routes` in
  `src/App.jsx` -- see [src](/modules/src.md).
