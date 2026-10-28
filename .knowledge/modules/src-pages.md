---
type: Module
title: src/pages
description: The four routed screens -- Signup, Login, Welcome and ChangePassword.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/pages
tags: [frontend, pages, entry]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:58:38Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 08e3660b8f72cf411a3d1758d0e4fe5026600899
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | Line | Signature |
| --- | --- | --- |
| `Signup` | `src/pages/Signup.jsx:6` | `()` default export |
| `Signup.set` | `src/pages/Signup.jsx:10` | `(key)` |
| `Signup.submit` | `src/pages/Signup.jsx:12` | `(event)` |
| `Login` | `src/pages/Login.jsx:6` | `()` default export |
| `Login.submit` | `src/pages/Login.jsx:11` | `(event)` |
| `Welcome` | `src/pages/Welcome.jsx:6` | `()` default export |
| `ChangePassword` | `src/pages/ChangePassword.jsx:7` | `()` default export |
| `ChangePassword.set` | `src/pages/ChangePassword.jsx:17` | `(key)` |
| `ChangePassword.submit` | `src/pages/ChangePassword.jsx:19` | `(event)` |

Every page is a default export, routed by kebab-cased file name from
[src/App](/modules/src-app.md). The shared skeleton is documented in
[Conventions](/conventions.md).

# Signup -- `/signup`

Fields: full name, email, password, confirm. State is one `form` object plus
`error`.

`submit` guards in order:

1. `form.password !== form.confirm` -> "Passwords do not match."
2. `findUser(form.email)` truthy -> "An account with this email already exists."
3. otherwise `saveUser({ name: trim, email: trim, password })` then
   `navigate('/login')`.

Signing up does **not** create a session -- the user is sent to `/login` to
authenticate. Note that no password-strength check runs here: `passwordIsValid`
is not imported, so any password is accepted at sign-up while
`ChangePassword` enforces the full ruleset.

# Login -- `/login`

Fields: email, password. Unlike the other form pages it keeps two separate
`useState` strings rather than a `form` object.

`submit` looks up `findUser(email)` and rejects with a single deliberately
ambiguous message -- "Email or password is incorrect." -- for both an unknown
email and a wrong password, so the form does not reveal which accounts exist.
Keep that wording merged if you touch this branch.

On success: `setCurrentUser(user.email)` then `navigate('/welcome')`. It passes
`user.email` (the stored value), not the typed input.

# Welcome -- `/welcome`

Read-only. Calls `currentUser()`, redirects to `/login` from a `useEffect` when
there is no session, and returns `null` in the meantime so no flash of content
appears. Title is `` `Welcome, ${user.name || user.email}` `` -- falling back to
the email when the name is blank.

Offers two `Link`s: `/change-password` and `/login` labelled "Log out". The
log-out link only navigates; it does not clear `sessionStorage`, so the session
survives and returning to `/welcome` still shows the user.

# ChangePassword -- `/change-password`

Fields: current password, new password, confirm. Same guard as `Welcome`.
Carries a third state flag, `showRuleErrors`, which drives `PasswordRules`.

`submit` guards in order:

1. `form.current !== user.password` -> "Your current password is incorrect.";
   resets `showRuleErrors` to false.
2. `!passwordIsValid(form.password)` -> "Your new password does not meet the
   rules below."; sets `showRuleErrors` **true**.
3. `form.password !== form.confirm` -> "Passwords do not match."; reaches this
   branch with `showRuleErrors` already reset to false.
4. otherwise `saveUser({ ...user, password: form.password })` then
   `navigate('/welcome')`.

The spread in step 4 preserves `name` and `email` -- only the password changes.
`showRuleErrors` is explicitly reset on every non-rules branch so the checklist
never keeps stale red marks from a previous attempt.

# Relationships

* Depend on [src/components](/modules/src-components.md) (12 calls),
  [src/router](/modules/src-router.md) (9) and
  [src/store](/modules/src-store.md) (7).
* Nothing imports a page except `src/App.jsx`. Pages never import one another,
  so each is editable in isolation.
* `Welcome` and `ChangePassword` duplicate the same three-line auth guard;
  see [Architecture](/architecture.md).
