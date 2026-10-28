---
type: Module
title: src/store
description: Demo-only account store backed by localStorage and sessionStorage.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/store.js
tags: [frontend, persistence, core]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:11:52Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 11cbd71eed22e7124383102d0584b2397653d88d
    title: Codebase knowledge graph
status: stable
---

# src/store

The app's entire persistence layer. Core layer: 5 inbound calls, 0 outbound.
The file opens with the comment *"Demo-only account store in localStorage. Not
for real credentials."*

## Symbols

| Symbol | Kind | Line | Exported | Purpose |
| --- | --- | --- | --- | --- |
| `KEY` | Variable | 2 | no | `'acme-users'`, the `localStorage` key |
| `load` | Function | 4 | no | Parse the stored map, returning `{}` on any parse failure |
| `findUser` | Function | 12 | yes | Look up by normalised email, `null` when absent |
| `saveUser` | Function | 16 | yes | Upsert a user record and write the whole map back |
| `setCurrentUser` | Function | 22 | yes | Write the session email to `sessionStorage` under `acme-current` |
| `currentUser` | Function | 26 | yes | Resolve the session email back to a user record, or `null` |

## Storage shape

| Store | Key | Value |
| --- | --- | --- |
| `localStorage` | `acme-users` | `{ [normalisedEmail]: { name, email, password } }` |
| `sessionStorage` | `acme-current` | the signed-in email string |

Keys are normalised with `.trim().toLowerCase()`; the `email` kept inside the
record is only `.trim()`-ed, so it preserves the casing the user typed.

## Callers

* `findUser` -- `Signup.submit` (duplicate check), `Login.submit` (lookup),
  `currentUser`.
* `saveUser` -- `Signup.submit`.
* `setCurrentUser` -- `Login.submit`.
* `currentUser` -- `Welcome`.

See [src/pages](/modules/src-pages.md) for those call sites.

## Gotchas

* **Passwords are stored and compared in plaintext.** Demo-only; do not lift
  this pattern into anything real.
* `load` swallows every exception, so corrupt storage silently reads as "no
  accounts" rather than erroring.
* Writes are not reactive -- nothing re-renders when storage changes. Pages
  re-read on their next render, and `currentUser()` is called during render in
  `Welcome` rather than in state.
* Accounts live in `localStorage` (survives restarts) while the session lives
  in `sessionStorage` (cleared with the tab), so closing a tab logs you out but
  keeps the account.
