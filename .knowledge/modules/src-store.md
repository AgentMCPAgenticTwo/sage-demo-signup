---
type: Module
title: src/store
description: Demo-only account store backed by `localStorage` and `sessionStorage`.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/store.js
tags: [frontend, persistence, core, auth]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:04:36Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 360fd597ded4ea1f388e555fd8458ad76d46ff8b
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | Line | Export | Notes |
| --- | --- | --- | --- |
| `KEY` | `src/store.js:2` | private | `'acme-users'`, the `localStorage` key |
| `load()` | `src/store.js:4` | private | Parses the user map; returns `{}` on any parse failure |
| `findUser(email)` | `src/store.js:12` | named | Lookup by trimmed, lower-cased email; `null` if absent |
| `saveUser(user)` | `src/store.js:16` | named | Upserts by normalised email key |
| `setCurrentUser(email)` | `src/store.js:22` | named | Writes `acme-current` to `sessionStorage` |
| `currentUser()` | `src/store.js:26` | named | Resolves the session email back to a user record |

# Data Shape

A user record is `{ name, email, password }` -- `Signup` trims `name` and
`email` before saving and keeps `password` verbatim.

Storage split:

| Store | Key | Holds | Lifetime |
| --- | --- | --- | --- |
| `localStorage` | `acme-users` | `{ [normalisedEmail]: user }` | Across sessions |
| `sessionStorage` | `acme-current` | Signed-in email | Per tab |

# Invariants

* Email is the primary key, always normalised with `.trim().toLowerCase()`
  before read or write. Any new accessor must normalise the same way or it will
  miss existing records.
* `load` swallows malformed JSON rather than throwing, so callers never need a
  try/catch.
* Nothing in this module clears storage -- there is no `logout` function, which
  is why "Log out" on `Welcome` only navigates.

# Security Note

The file's own header says it is demo-only. Passwords are stored and compared in
plain text and are readable by any script on the origin. Do not extend this
module into a real credential path; see
[Architecture](/architecture.md) -> Known Constraints.

# Used By

[src/pages](/modules/src-pages.md): `Signup` (`findUser`, `saveUser`), `Login`
(`findUser`, `setCurrentUser`), `Welcome` (`currentUser`).

# Depends On

Browser storage APIs only; no project imports.
