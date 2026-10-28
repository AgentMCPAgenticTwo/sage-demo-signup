---
type: Module
title: src/store
description: Demo-only account persistence over localStorage and sessionStorage.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/store.js
tags: [frontend, persistence, core]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:58:38Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 08e3660b8f72cf411a3d1758d0e4fe5026600899
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | Line | Signature | Exported | Fan-in |
| --- | --- | --- | --- | --- |
| `KEY` | `src/store.js:2` | `'acme-users'` | no | - |
| `load` | `src/store.js:4` | `()` | no | 2 |
| `findUser` | `src/store.js:12` | `(email)` | yes | 3 |
| `saveUser` | `src/store.js:16` | `(user)` | yes | 2 |
| `setCurrentUser` | `src/store.js:22` | `(email)` | yes | 1 |
| `currentUser` | `src/store.js:26` | `()` | yes | 2 |

# Storage model

| Store | Key | Shape | Lifetime |
| --- | --- | --- | --- |
| `localStorage` | `acme-users` | `{ [normalisedEmail]: user }` | persists across sessions |
| `sessionStorage` | `acme-current` | the signed-in email | cleared when the tab closes |

A user record is `{ name, email, password }`, written by `Signup` and updated
in place by `ChangePassword` via `saveUser({ ...user, password })`.

Accounts outlive the browser session but the login does not -- reopening the
app in a new tab lands on `/signup` with the account still present.

# Behaviour notes

* **Email normalisation.** `findUser` and `saveUser` both key by
  `email.trim().toLowerCase()`, so lookups are case- and whitespace-insensitive.
  Callers pass raw input. The stored `user.email` keeps the user's own casing
  (`Signup` saves `form.email.trim()`), so the key and the displayed value can
  differ in case -- `currentUser()` still resolves because `findUser`
  re-normalises.
* **`load` never throws.** It wraps `JSON.parse` in `try/catch` and falls back
  to `{}`, so corrupt or absent storage degrades to "no accounts" instead of
  crashing the app. Preserve this if you change the parsing.
* **`load` re-reads on every call.** There is no in-memory cache, so a write in
  one place is immediately visible everywhere -- at the cost of a parse per
  lookup. Fine at this scale.
* **`currentUser` returns null** when no session email is set, which is what
  both guarded pages branch on.
* **Demo only.** The file's first line says so: passwords are stored in plain
  text and compared with `!==` in `Login` and `ChangePassword`. Never present
  this as a credential store.

# Relationships

* Consumed only by [src/pages](/modules/src-pages.md) -- 7 calls. `Signup` uses
  `findUser` + `saveUser`, `Login` uses `findUser` + `setCurrentUser`,
  `Welcome` uses `currentUser`, `ChangePassword` uses `currentUser` + `saveUser`.
* Imports nothing. Independent of [src/router](/modules/src-router.md) and
  [src/components](/modules/src-components.md).
* The only module in the codebase that touches browser storage; see
  [Conventions](/conventions.md) on never reaching past it.
