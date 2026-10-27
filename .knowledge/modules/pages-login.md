---
type: Module
title: src/pages/Login.jsx
description: Credential form that looks up a stored account and starts a session.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/pages/Login.jsx
tags: [frontend, pages, auth]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T23:34:47Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 9e0695a13b39e00939f996e6665b83350960de3e
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | Line | Notes |
| --- | --- | --- |
| `Login` | 6 | default export; three separate `useState` hooks (`email`, `password`, `error`) |
| `submit` | 11 | form handler |

# Submit flow

1. `findUser(email)`.
2. If the user is missing **or** `user.password !== password`, set the single
   message "Email or password is incorrect." and stop. The same message covers
   both cases deliberately — it does not reveal whether the account exists.
3. Otherwise `setCurrentUser(user.email)` (the stored, normalised email — not
   the raw input) then `navigate('/welcome')`.

# Rendering

`Card title="Log in"` wraps a `noValidate` form with two `Field`s (email with
`autoComplete="email"`, password with `autoComplete="current-password"`), a
`Message` for the error, and a submit button. A `switch` paragraph links to
`/signup`.

Unlike [Signup page](/modules/pages-signup.md), this page holds one string of
error state and renders it through `Message`, since it never reports more than
one problem.

# Depends on

* [Card components](/modules/components-card.md) — `Card`, `Field`, `Message`.
* [Router](/modules/router.md) — `navigate`, `Link`.
* [Store](/modules/store.md) — `findUser`, `setCurrentUser`.

Password comparison is plaintext; see the caveats in [Store](/modules/store.md).
