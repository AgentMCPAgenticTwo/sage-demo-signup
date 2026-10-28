---
type: Module
title: src/store
description: Demo-only account store backed by `localStorage` and `sessionStorage`.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/store.js
tags: [frontend, persistence, core]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T04:56:52Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 38fe79e86edef6544c50fc543f51f4f47b2379a8
    title: Codebase knowledge graph
status: stable
---

# Role

`src/store.js` is the whole persistence layer -- there is no backend. Its
header comment states it is demo-only and not for real credentials.

# Symbols

| Symbol | Line | Signature | Purpose |
| --- | --- | --- | --- |
| `KEY` | 2 | `'acme-users'` | `localStorage` key for the account map |
| `load` | 4 | `()` | Module-private; parses the account map, returns `{}` on failure |
| `findUser` | 12 | `(email)` | Look up one account by normalised email, else `null` |
| `saveUser` | 16 | `(user)` | Insert/overwrite an account and persist the map |
| `setCurrentUser` | 22 | `(email)` | Write the signed-in email to `sessionStorage` under `acme-current` |
| `currentUser` | 26 | `()` | Read `acme-current` and resolve it through `findUser` |

`load` is not exported; `findUser`, `saveUser`, `setCurrentUser` and
`currentUser` are the module's public surface.

# Data shape

The account map is `{ [normalisedEmail]: User }`, where `User` is
`{ name, email, password }` as written by `Signup`. `name` and `email` are
trimmed at write time; `password` is stored verbatim and compared with `!==`
in `Login`.

# Storage keys

| Key | Storage | Contents | Lifetime |
| --- | --- | --- | --- |
| `acme-users` | `localStorage` | JSON map of all accounts | Persists across sessions |
| `acme-current` | `sessionStorage` | Email of the signed-in user | Cleared when the tab closes |

# Normalisation

Every read and write funnels the email through `.trim().toLowerCase()`, so
`Ada@Acme.com ` and `ada@acme.com` are the same account. The stored `user.email`
keeps the user's trimmed original casing; only the map key is lowercased.

# Consumers

| Caller | Uses |
| --- | --- |
| `Signup` | `findUser` (duplicate check), `saveUser` |
| `Login` | `findUser`, `setCurrentUser` |
| `Welcome` | `currentUser` |

See [src/pages](/modules/pages.md) for the call sites.

# Caveats

* Passwords are plain text in `localStorage`.
* There is no delete/sign-out call -- `Welcome`'s "Log out" link only
  navigates to `/login` and leaves `acme-current` set.
