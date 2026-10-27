---
type: Module
title: src/pages
description: The Signup, Login and Welcome screens, including the password-rule validation.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/pages
tags: [frontend, pages, forms, validation]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T17:18:25Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 78b91de716644ab7bfc26c34d71b2176b39a35ee
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | Kind | Location |
| --- | --- | --- |
| `passwordRules` | Variable (array) | `src/pages/Signup.jsx:6` |
| `test` | Function (rule predicate) | `src/pages/Signup.jsx:14` |
| `passwordErrors` | Function | `src/pages/Signup.jsx:18` |
| `Signup` | Function (default export) | `src/pages/Signup.jsx:22` |
| `set` | Function (curried change handler) | `src/pages/Signup.jsx:27` |
| `submit` | Function | `src/pages/Signup.jsx:29` |
| `Login` | Function (default export) | `src/pages/Login.jsx:6` |
| `submit` | Function | `src/pages/Login.jsx:11` |
| `Welcome` | Function (default export) | `src/pages/Welcome.jsx:6` |

# Signup

State: one `form` object (`name`, `email`, `password`, `confirm`), a single
`error` string, and an `errors` array for password-rule failures.

`passwordRules` is the declarative rule table -- each entry is
`{ label, error, test }`. `label` is shown up front in `<ul className="rules"
id="password-rules">`; `error` is shown only after a failed submit.

| Rule label | Predicate |
| --- | --- |
| At least 8 characters | `value.length >= 8` |
| One uppercase letter | `/[A-Z]/` |
| One lowercase letter | `/[a-z]/` |
| One number | `/[0-9]/` |
| One special character | `/[^A-Za-z0-9]/` |

`passwordErrors(value)` filters the failing rules and maps them to their `error`
strings. `submit` then applies checks in a fixed order, returning early at the
first failure:

1. `passwordErrors(form.password)` -- populates `errors`, clears `error`.
2. `form.password !== form.confirm` -> `'Passwords do not match.'`
3. `findUser(form.email)` -> `'An account with this email already exists.'`
4. `saveUser({ name: trimmed, email: trimmed, password })` then
   `navigate('/login')`.

Because step 1 returns before step 2, mismatch and rule errors are never shown
together. The password input is tied to the rule list via
`aria-describedby="password-rules"`.

# Login

Separate `useState` per field. `submit` rejects with the deliberately
non-enumerating `'Email or password is incorrect.'` when either `findUser`
returns nothing or the plaintext password does not match, then
`setCurrentUser(user.email)` and `navigate('/welcome')`.

# Welcome

Reads `currentUser()` on every render. A `useEffect` keyed on `user` redirects
to `/login` when there is no session, and the render body returns `null` in that
same case so nothing flashes. The title interpolates
`user.name || user.email`, covering accounts saved with a blank name. The
"Log out" link only navigates to `/login` -- it does **not** clear
`sessionStorage`.

# Depends on

* [src/components](/modules/src-components.md) -- `Card`, `Field`, `Message`.
* [src/router](/modules/src-router.md) -- `Link`, `navigate`.
* [src/store](/modules/src-store.md) -- `findUser`, `saveUser`,
  `setCurrentUser`, `currentUser`.

# Rendered by

[src/App](/modules/src-app.md), via the `routes` map.
