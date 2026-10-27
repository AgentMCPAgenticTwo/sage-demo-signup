---
type: Module
title: src/store.js
description: Demo-only account and session persistence over `localStorage` and `sessionStorage`.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/store.js
tags: [frontend, persistence, core]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T23:34:47Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 9e0695a13b39e00939f996e6665b83350960de3e
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | Line | Signature | Notes |
| --- | --- | --- | --- |
| `KEY` | 2 | `'acme-users'` | `localStorage` key holding the account map |
| `load` | 4 | `() => object` | module-private; `JSON.parse` wrapped in try/catch, returns `{}` on failure |
| `findUser` | 12 | `(email) => user \| null` | normalises `email.trim().toLowerCase()` |
| `saveUser` | 16 | `(user) => void` | writes under the normalised `user.email`; overwrites silently |
| `setCurrentUser` | 22 | `(email) => void` | `sessionStorage['acme-current']` |
| `currentUser` | 26 | `() => user \| null` | reads the session email, then `findUser` |

# Storage shape

```
localStorage['acme-users']   = { "<normalised email>": { name, email, password } }
sessionStorage['acme-current'] = "<email>"
```

Accounts outlive the tab; the session pointer does not.

# Fan-in

`findUser` has fan-in 3 and `load` fan-in 2 — the busiest part of the module.

| Caller | Uses |
| --- | --- |
| [Signup page](/modules/pages-signup.md) | `findUser` (duplicate check), `saveUser` |
| [Login page](/modules/pages-login.md) | `findUser`, `setCurrentUser` |
| [Welcome page](/modules/pages-welcome.md) | `currentUser` |

# Caveats

* The first line of the file states it plainly: **demo-only, not for real
  credentials.** Passwords are stored in cleartext and compared with `!==` in
  [Login page](/modules/pages-login.md).
* `saveUser` does not merge — it replaces the whole record for that email.
* `currentUser()` is read during render in `Welcome`, so a storage change is
  only reflected on the next render.
* This is the only module permitted to touch Web Storage; see
  [Conventions](/conventions.md).
