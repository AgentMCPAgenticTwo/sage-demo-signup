---
type: Module
title: src/store.js
description: Demo-only account store over localStorage and sessionStorage.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/blob/main/src/store.js
tags: [frontend, persistence, core]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T03:58:25Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 33f196c6383d96b07ef0b9ef85db894b4859243c
    title: Codebase knowledge graph
status: stable
---

# src/store.js

The app's only persistence layer. Its own header comment marks it
demo-only -- passwords are stored in plaintext.

## Symbols

| Symbol | Kind | Line | Purpose |
| --- | --- | --- | --- |
| `KEY` | Variable | 2 | `'acme-users'`, the localStorage key |
| `load` | Function (private) | 4 | Parse the users object; returns `{}` on missing or malformed JSON |
| `findUser` | Function | 12 | Look a user up by normalised email; `null` if absent |
| `saveUser` | Function | 16 | Insert or overwrite a user, keyed by normalised email |
| `setCurrentUser` | Function | 22 | Write the signed-in email to `sessionStorage` under `acme-current` |
| `currentUser` | Function | 26 | Resolve `acme-current` back to a user object, or `null` |

## Storage shape

| Store | Key | Value |
| --- | --- | --- |
| `localStorage` | `acme-users` | `{ "<email>": { name, email, password } }` |
| `sessionStorage` | `acme-current` | the signed-in email string |

Account rows keep the email as typed, but the map key is always
`email.trim().toLowerCase()` -- `findUser` and `saveUser` both normalise, so
lookups are case-insensitive.

## Session semantics

Accounts persist across browser sessions (`localStorage`); the sign-in
persists only for the tab (`sessionStorage`). There is no explicit
sign-out -- `Welcome`'s "Log out" link just navigates to `/login` and leaves
`acme-current` in place.

## Relationships

* `findUser` is a fan-in-3 hotspot: called by `Signup.submit`,
  `Login.submit` and `currentUser`.
* Consumed only by [Pages](/modules/src-pages.md); it imports nothing.
