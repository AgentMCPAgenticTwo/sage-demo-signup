---
type: Module
title: src/store
description: Demo-only account persistence over localStorage and sessionStorage.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/store.js
tags: [frontend, persistence, core]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T17:18:25Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 78b91de716644ab7bfc26c34d71b2176b39a35ee
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | Kind | Location | Exported | Fan-in |
| --- | --- | --- | --- | --- |
| `KEY` | Variable (`'acme-users'`) | `src/store.js:2` | no | -- |
| `load` | Function | `src/store.js:4` | no | 2 |
| `findUser` | Function | `src/store.js:12` | yes | 3 |
| `saveUser` | Function | `src/store.js:16` | yes | 1 |
| `setCurrentUser` | Function | `src/store.js:22` | yes | 1 |
| `currentUser` | Function | `src/store.js:26` | yes | 1 |

# Storage shape

| Store | Key | Value |
| --- | --- | --- |
| `localStorage` | `acme-users` | JSON object keyed by normalised email -> `{ name, email, password }` |
| `sessionStorage` | `acme-current` | the signed-in email as a bare string |

Keys are normalised with `email.trim().toLowerCase()` in both `findUser` and
`saveUser`. The `email` field stored on the user object is only `.trim()`ed, so
the stored value can differ in case from its own key.

# Behaviour notes

* `load()` is private and defensive: a `try`/`catch` returns `{}` on malformed
  JSON, and `?? '{}'` covers a missing key. Every read goes through it.
* `saveUser` is a read-modify-write of the whole map -- it overwrites an existing
  entry for the same email without complaint, so the duplicate-account check
  lives in the caller (`Signup.submit`).
* `currentUser()` resolves the session email through `findUser`, returning `null`
  when there is no session or the account has disappeared.
* Passwords are stored in plaintext. The file opens with
  `// Demo-only account store in localStorage. Not for real credentials.` --
  treat that as a hard constraint on how this module may be reused.

# Boundary

Core module, no outbound calls. All persistence in the app funnels through here;
see [Conventions](/conventions.md).

# Used by

[src/pages](/modules/src-pages.md): `Signup` (`findUser`, `saveUser`), `Login`
(`findUser`, `setCurrentUser`), `Welcome` (`currentUser`).
