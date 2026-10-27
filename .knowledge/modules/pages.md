---
type: Module
title: src/pages
description: The four routed screens: Signup, Login, ResetPassword and Welcome.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/pages
tags: [frontend, pages, forms]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T23:47:28Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ ca10a42e2a13be0442234c6be972f2a13f83ee63
    title: Codebase knowledge graph
status: stable
---

# Screens

| Component | File | Route | Title |
| --- | --- | --- | --- |
| `Signup` | `src/pages/Signup.jsx:6` | `/signup` (and the fallback) | "Create your account" |
| `Login` | `src/pages/Login.jsx:6` | `/login` | "Log in" |
| `ResetPassword` | `src/pages/ResetPassword.jsx:6` | `/reset-password` | "Reset your password" |
| `Welcome` | `src/pages/Welcome.jsx:6` | `/welcome` | ``Welcome, ${user.name || user.email}`` |

# Signup

Fields: full name, email, password, confirm. `submit` (`src/pages/Signup.jsx:12`)
rejects mismatched passwords ("Passwords do not match."), then rejects an
existing account via `findUser` ("An account with this email already exists."),
then calls `saveUser` with the trimmed name and email and navigates to
`/login`. Links to `/login`.

# Login

Fields: email, password, each with its own `useState`. `submit`
(`src/pages/Login.jsx:11`) looks the user up with `findUser` and compares
`user.password`; a miss or wrong password yields the deliberately
non-enumerating "Email or password is incorrect." On success it calls
`setCurrentUser` and navigates to `/welcome`. Links to `/reset-password`
("Forgot password?") and `/signup`.

# ResetPassword

Fields: email, new password, confirm new password. `submit`
(`src/pages/ResetPassword.jsx:12`) requires an existing account ("No account
with this email exists."), then matching passwords, then calls `saveUser` with
the spread existing user and the new password, and navigates to `/login`.
Links back to `/login`. Unlike `Login`, this form does reveal whether an email
is registered.

# Welcome

Reads `currentUser()` and, in a `useEffect`, navigates to `/login` when there is
no session; it renders `null` in that case. Otherwise it greets the user and
shows a `Log out` link to `/login` — note that this link does not clear the
session, see [store](/modules/store.md).

# Shared shape

Every page follows the same skeleton — see [Conventions](/conventions.md):

```
Card title=...
  form onSubmit={submit} noValidate
    Field ...
    Message>{error}</Message>
    button type="submit"
  p.switch > Link
```

# Relationships

* Depends on [components](/modules/components.md) (10 calls),
  [router](/modules/router.md) (8 calls) and [store](/modules/store.md)
  (7 calls).
* Pages never import each other; they are wired together only through
  `navigate`/`Link` targets and the route table in [src/App](/modules/app.md).
