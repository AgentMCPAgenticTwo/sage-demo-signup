---
type: Module
title: src/store
description: Demo-only account store backed by localStorage and sessionStorage.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/store.js
tags: [frontend, storage, state]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:19:54Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 8b5e972c95c0d30e9afcad3fc02c3eb1ec018b87
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | Line | Kind | Purpose |
| --- | --- | --- | --- |
| `KEY` | 2 | const | `'acme-users'`, the `localStorage` key |
| `load` | 4 | function | Parses the stored map; returns `{}` on missing or corrupt JSON |
| `findUser` | 12 | function | Looks up by normalised email; returns `null` when absent |
| `saveUser` | 16 | function | Writes the user under its normalised email |
| `setCurrentUser` | 22 | function | Stores the session email under `acme-current` in `sessionStorage` |
| `currentUser` | 26 | function | Resolves `acme-current` back to a user, or `null` |

# Data Shape

A stored user is `{ name, email, password }`, written by `saveUser` from
`Signup.submit`. The map is keyed by `email.trim().toLowerCase()`; the same
normalisation is applied in `findUser`, so lookups are case-insensitive while
the stored `email` keeps the user's original casing.

# Caveats

* Passwords are stored in clear text. The file's own comment says
  "Demo-only account store in localStorage. Not for real credentials."
* `load` is the only reader of `localStorage`; `KEY` is module-private, so
  changing the storage format is contained to this file.
* Accounts persist across tabs (`localStorage`) but the signed-in identity does
  not (`sessionStorage`).

# Relationships

* used by [src/pages](/modules/src-pages.md): `Signup` (`findUser`,
  `saveUser`), `Login` (`findUser`, `setCurrentUser`), `Welcome`
  (`currentUser`) — 5 inbound calls.
* depends on nothing in this repository; browser storage APIs only.
* the normalisation rule is also recorded in [Conventions](/conventions.md).
