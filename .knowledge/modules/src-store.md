---
type: Module
title: store
description: Demo-only account and session persistence over localStorage and sessionStorage.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/store.js
tags: [frontend, persistence, core]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:27:27Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ af863cd5d6567cf6b64d2fc625952a185971b018
    title: Codebase knowledge graph
status: stable
---

> `src/store.js:1` states it plainly: demo-only account store in localStorage, not for
> real credentials. Passwords are persisted and compared as plain text.

# Symbols

| Symbol | Location | Signature | Notes |
| --- | --- | --- | --- |
| `KEY` | `src/store.js:2` | `'acme-users'` | localStorage key holding the whole account map |
| `load` | `src/store.js:4` | `() => object` | module-private; `JSON.parse` of `KEY` defaulting to `{}`, returns `{}` on any parse error |
| `findUser` | `src/store.js:12` | `(email) => user \| null` | looks up `email.trim().toLowerCase()` |
| `saveUser` | `src/store.js:16` | `(user) => void` | read-modify-write of the whole map, keyed by the normalised email |
| `setCurrentUser` | `src/store.js:22` | `(email) => void` | writes `sessionStorage['acme-current']` |
| `currentUser` | `src/store.js:26` | `() => user \| null` | reads the session email, resolves it through `findUser` |

# Shape

Accounts are stored as `{ [normalisedEmail]: { name, email, password } }`, built by
`Signup` at `src/pages/Signup.jsx:22`. `name` and `email` are trimmed on write but
`email` keeps its original casing in the record while the *key* is lower-cased.

# Storage Split

| Store | Key | Lifetime |
| --- | --- | --- |
| `localStorage` | `acme-users` | persists across browser sessions |
| `sessionStorage` | `acme-current` | cleared when the tab closes — this is the "log out on close" behaviour |

# Callers

* [pages](/modules/src-pages.md) — `Signup` uses `findUser` + `saveUser`, `Login` uses
  `findUser` + `setCurrentUser`, `Welcome` uses `currentUser`.
* No other module touches browser storage.

# Gotchas

* There is no explicit logout function; the "Log out" link in `Welcome` merely navigates
  to `/login` and leaves `acme-current` set.
* `currentUser()` returns `null` if the referenced account disappeared, which
  `Welcome` treats as signed-out.
* Always normalise with `.trim().toLowerCase()` when adding lookups — see
  [Conventions](/conventions.md).
