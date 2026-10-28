---
type: Module
title: src/pages
description: The three routed screens: sign-up, log-in and welcome.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/pages
tags: [frontend, pages, forms, entry]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:35:21Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ af0eb7e28c6d901616970ef2450db466024c0fd3
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | File | Line | Role |
| --- | --- | --- | --- |
| `PASSWORD_RULES` | `src/pages/Signup.jsx` | 6 | list of `{ label, test }` password checks |
| `test` | `src/pages/Signup.jsx` | 11 | the predicate of the last rule |
| `Signup` | `src/pages/Signup.jsx` | 14 | default export, sign-up screen |
| `set` | `src/pages/Signup.jsx` | 19 | curried `onChange` setter per form key |
| `submit` | `src/pages/Signup.jsx` | 21 | validate, persist, go to `/login` |
| `Login` | `src/pages/Login.jsx` | 6 | default export, log-in screen |
| `submit` | `src/pages/Login.jsx` | 11 | check credentials, go to `/welcome` |
| `Welcome` | `src/pages/Welcome.jsx` | 6 | default export, signed-in screen |

# Signup

State: one `form` object (`name`, `email`, `password`, `confirm`), an
`error` string, and `passwordErrors` -- the labels of the rules that failed.

`PASSWORD_RULES` is the single source of truth for password policy. It is
used twice: once to compute failures in `submit`, and once to render the
`<ul className="rules" id="password-rules" aria-live="polite">` checklist, so
the displayed rules can never drift from the enforced ones. A failed rule's
`<li>` gets `className="rule failed"`.

`submit` runs its checks in order and returns early on the first failure:

1. every rule in `PASSWORD_RULES` -- failures populate `passwordErrors` and
   clear `error` (the checklist is the message).
2. `password !== confirm` -> "Passwords do not match."
3. `findUser(email)` -> "An account with this email already exists."
4. otherwise `saveUser` with trimmed `name`/`email`, then
   `navigate('/login')`.

The password input is tied to the checklist via
`aria-describedby="password-rules"`.

# Login

Three separate `useState` fields. `submit` loads the account with
`findUser(email)` and compares `user.password !== password`; either a missing
account or a wrong password yields the same message, "Email or password is
incorrect.", so the form does not reveal which emails are registered. On
success it calls `setCurrentUser(user.email)` -- the stored, normalised
address, not the raw input -- then `navigate('/welcome')`.

# Welcome

Reads `currentUser()` during render. An effect redirects to `/login` when
there is no session, and the component returns `null` in that same render so
nothing flashes before the redirect. The heading is
`Welcome, ${user.name || user.email}`, falling back to the email when the
account has no name. The "Log out" link is a plain `Link` to `/login` -- it
does not clear `sessionStorage`, so the session survives it.

# Relationships

* Rendered by [src/App](/modules/src-app.md).
* Depend on [src/components](/modules/src-components.md) for `Card`,
  `Field` and `Message`; on [src/router](/modules/src-router.md) for `Link`
  and `navigate`; on [src/store](/modules/src-store.md) for account reads and
  writes.
* Shared shape and naming rules are in [Conventions](/conventions.md).
