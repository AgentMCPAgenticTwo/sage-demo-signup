---
type: Module
title: src/store
description: Demo-only account store backed by `localStorage` and `sessionStorage`.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/store.js
tags: [frontend, persistence, core]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T23:47:28Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ ca10a42e2a13be0442234c6be972f2a13f83ee63
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | Kind | Location | Notes |
| --- | --- | --- | --- |
| `KEY` | Variable | `src/store.js:2` | `'acme-users'` — the `localStorage` key |
| `load` | Function (private) | `src/store.js:4` | Parses the users map, returns `{}` on any parse failure |
| `findUser` | Function | `src/store.js:12` | Lookup by trimmed, lower-cased email; returns `null` when absent |
| `saveUser` | Function | `src/store.js:16` | Upsert keyed by the same normalised email |
| `setCurrentUser` | Function | `src/store.js:22` | Writes the email to `sessionStorage` under `acme-current` |
| `currentUser` | Function | `src/store.js:26` | Reads `acme-current` and resolves it through `findUser` |

# Data model

A user record is `{ name, email, password }`, written by `Signup.submit` and
updated in place by `ResetPassword.submit`. Passwords are stored in plain text;
the file's opening comment states the store is demo-only and not for real
credentials.

# Storage keys

| Key | Store | Contents |
| --- | --- | --- |
| `acme-users` | `localStorage` | JSON object of email → user record |
| `acme-current` | `sessionStorage` | Email of the signed-in user |

Accounts therefore persist across tabs and restarts, while the session does not.

# Relationships

* Called only from [src/pages](/modules/pages.md) — `findUser` from `Signup`,
  `Login` and `ResetPassword`; `saveUser` from `Signup` and `ResetPassword`;
  `setCurrentUser` from `Login`; `currentUser` from `Welcome`.
* Email normalisation lives here, not in the pages, so lookups stay
  case-insensitive. Keep any new accessor on the same `trim().toLowerCase()`
  rule.
* There is no "sign out" helper: the `Log out` link in `Welcome` is a
  [Link](/modules/router.md) to `/login` and does not clear `acme-current`.
