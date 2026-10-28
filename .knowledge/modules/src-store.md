---
type: Module
title: src/store
description: Demo-only account store backed by `localStorage` and `sessionStorage`.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/store.js
tags: [frontend, persistence, core]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:35:21Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ af0eb7e28c6d901616970ef2450db466024c0fd3
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | File | Line | Exported | Role |
| --- | --- | --- | --- | --- |
| `KEY` | `src/store.js` | 2 | no | `localStorage` key, `'acme-users'` |
| `load` | `src/store.js` | 4 | no | parse the account map, `{}` on failure |
| `findUser` | `src/store.js` | 12 | yes | look up one account by email |
| `saveUser` | `src/store.js` | 16 | yes | insert or overwrite an account |
| `setCurrentUser` | `src/store.js` | 22 | yes | record the signed-in email |
| `currentUser` | `src/store.js` | 26 | yes | resolve the signed-in account |

# Storage model

| Store | Key | Shape |
| --- | --- | --- |
| `localStorage` | `acme-users` | `{ [lowercasedEmail]: { name, email, password } }` |
| `sessionStorage` | `acme-current` | the signed-in email string |

Accounts outlive the tab; the session does not. Closing the tab signs the
user out while their account remains.

# Behaviour

* `load` wraps `JSON.parse` in `try/catch` and falls back to `{}`, so
  corrupt or absent storage degrades to "no accounts" rather than throwing.
  It is private -- every exported function reads through it.
* `findUser` and `saveUser` both normalise the email with
  `.trim().toLowerCase()`, so lookup and insertion agree on the key.
* `findUser` returns `null`, not `undefined`, when there is no match.
* `currentUser` returns `null` when no session email is set, otherwise
  re-reads the account through `findUser`.

# Caveats

The file's own header says it is demo-only and "not for real credentials":
passwords are stored in plaintext and compared directly by `Login`. Any move
to real authentication replaces this module rather than extending it -- see
[Architecture](/architecture.md).

# Relationships

* `findUser` + `saveUser` are used by `Signup`; `findUser` +
  `setCurrentUser` by `Login`; `currentUser` by `Welcome` -- all in
  [src/pages](/modules/src-pages.md).
* Imports nothing; depends on no other module in this repo.
