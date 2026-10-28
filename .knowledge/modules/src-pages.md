---
type: Module
title: src/pages
description: The four routed screens: sign up, log in, reset password and welcome.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/pages
tags: [frontend, pages, forms, auth]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:44:46Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ e05c9763bafd1094d0ab184ec6d101f963d09410
    title: Codebase knowledge graph
status: stable
---

# Screens

| File | Component | Route | Submit handler |
| --- | --- | --- | --- |
| `src/pages/Signup.jsx` | `Signup` (line 6) | `/signup` | `submit` (line 12) |
| `src/pages/Login.jsx` | `Login` (line 6) | `/login` | `submit` (line 11) |
| `src/pages/ResetPassword.jsx` | `ResetPassword` (line 7) | `/reset-password` | `submit` (line 13) |
| `src/pages/Welcome.jsx` | `Welcome` (line 6) | `/welcome` | — |

# Behaviour

## Signup

* State: one `form` object (`name`, `email`, `password`, `confirm`) plus
  `error`; `set` (line 10) is a curried change handler.
* Validation order: confirm mismatch → `'Passwords do not match.'`; existing
  account via `findUser` → `'An account with this email already exists.'`.
* On success calls `saveUser({ name, email, password })` with `name` and `email`
  trimmed, then `navigate('/login')`.

## Login

* Looks the account up with `findUser(email)` and compares `user.password`
  directly; either failure yields the same message,
  `'Email or password is incorrect.'`.
* On success `setCurrentUser(user.email)` then `navigate('/welcome')`.
* Links to both `/reset-password` and `/signup`.

## ResetPassword

* Extra state `failed` holds the rule labels returned by `unmetRules`, passed
  down to `PasswordRules` so unmet rules render in error colour.
* Rule failures block submission with `'Your new password does not meet the
  rules below.'`; an unknown email gives `'No account was found for this
  email.'`.
* On success `saveUser({ ...user, password })` preserves `name`, then
  `navigate('/login')`.

## Welcome

* Reads `currentUser()` during render, redirects to `/login` from a
  `useEffect` keyed on `user`, and returns `null` while unauthenticated.
* Title falls back to the email when `name` is empty:
  `` `Welcome, ${user.name || user.email}` ``.

# Relationships

* Renders `Card`, `Field`, `Message` and (ResetPassword only) `PasswordRules`
  from [Components](/modules/src-components.md) — 12 call edges.
* Depends on `navigate` and `Link` from [Router](/modules/src-router.md) — 8 edges.
* Depends on `findUser`, `saveUser`, `setCurrentUser`, `currentUser` from
  [Store](/modules/src-store.md) — 7 edges.
* Rendered by [App shell](/modules/src-app.md).

# Notes

* Only `ResetPassword` enforces `passwordRules`; `Signup` checks the confirm
  match alone. See the asymmetry note in [Architecture](/architecture.md).
* Passwords are compared and stored in plain text — intentional for this demo.
* The shared form shape is documented in [Conventions](/conventions.md).
