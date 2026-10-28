---
type: Module
title: src/store.js
description: Demo-only account persistence over localStorage and sessionStorage.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/store.js
tags: [frontend, persistence, localstorage, auth]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:44:46Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ e05c9763bafd1094d0ab184ec6d101f963d09410
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | Line | Role |
| --- | --- | --- |
| `KEY` | 2 | `'acme-users'`, the `localStorage` key |
| `load` | 4 | Parses the stored map, returning `{}` on missing or malformed JSON |
| `findUser` | 12 | `load()[normalisedEmail] ?? null` |
| `saveUser` | 16 | Upserts a user under its normalised email and writes the map back |
| `setCurrentUser` | 22 | Writes the email to `sessionStorage` under `'acme-current'` |
| `currentUser` | 26 | Reads that email and resolves it through `findUser`, else `null` |

# Storage shape

| Storage | Key | Value |
| --- | --- | --- |
| `localStorage` | `acme-users` | `{ "<email>": { name, email, password } }` |
| `sessionStorage` | `acme-current` | signed-in email |

* The map key is `email.trim().toLowerCase()`, applied inside both `findUser`
  and `saveUser` — callers pass raw input.
* `saveUser` stores the record as given, so `user.email` keeps the caller's
  casing even though the key is normalised.
* `load` is private (not exported) and swallows parse errors.

# Relationships

* 7 inbound call edges from [Pages](/modules/src-pages.md); `findUser` has the
  highest fan-in (4), `saveUser` 2, and `load` is called by `findUser` and
  `saveUser`.
* No outbound calls into application code.

# Notes

* Passwords are stored and compared in plain text. The file's first line states
  this is demo-only and not for real credentials — keep that comment if the
  module is edited.
* Session scope differs from account scope: closing the tab clears the signed-in
  email but not the accounts.
* There is no delete/logout function; `Welcome`'s "Log out" link just navigates
  to `/login` without clearing `acme-current`.
