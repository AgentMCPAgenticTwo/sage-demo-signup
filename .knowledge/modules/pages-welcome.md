---
type: Module
title: src/pages/Welcome.jsx
description: Signed-in landing page that redirects to login when there is no current user.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/pages/Welcome.jsx
tags: [frontend, pages, auth]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T23:34:47Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 9e0695a13b39e00939f996e6665b83350960de3e
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | Line | Notes |
| --- | --- | --- |
| `Welcome` | 6 | default export; no local state |

# Behaviour

* Reads `currentUser()` during render.
* An effect keyed on `user` calls `navigate('/login')` when there is none — this
  is the app's only route guard.
* Returns `null` on that render so nothing flashes before the redirect lands.
* Otherwise renders `Card` with the title `` `Welcome, ${user.name || user.email}` ``
  — falling back to the email when the stored `name` is empty.

# Log out

The "Log out" control is just a `Link` to `/login`. It does **not** clear
`sessionStorage['acme-current']`, so the session pointer survives; returning to
`/welcome` still shows the user. Clearing it would need a new function in
[Store](/modules/store.md).

# Depends on

* [Card components](/modules/components-card.md) — `Card`.
* [Router](/modules/router.md) — `navigate`, `Link`.
* [Store](/modules/store.md) — `currentUser`.
