---
type: Module
title: src/router
description: Minimal History-API router exposing `navigate`, `usePath` and `Link`.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/router.jsx
tags: [frontend, routing, core]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T23:47:28Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ ca10a42e2a13be0442234c6be972f2a13f83ee63
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | Kind | Location | Notes |
| --- | --- | --- | --- |
| `navigate` | Function | `src/router.jsx:4` | `history.pushState` then dispatches a synthetic `popstate` |
| `usePath` | Function (hook) | `src/router.jsx:9` | State seeded from `window.location.pathname`, resubscribed via `useEffect` |
| `onChange` | Function | `src/router.jsx:12` | `popstate` listener inside `usePath` |
| `Link` | Function (component) | `src/router.jsx:19` | Renders `<a href={to}>`, intercepts click and calls `navigate` |

# Design notes

There is no routing library. `navigate` fires a `PopStateEvent` by hand because
`pushState` does not emit one, which is what lets `usePath` re-render on
programmatic navigation. `usePath` cleans up its listener on unmount.

The router knows nothing about the route table — that lives in
[src/App](/modules/app.md).

# Relationships

* Highest fan-in package alongside [store](/modules/store.md): `navigate` has 5
  callers and `Link` has 4.
* Used by every page in [src/pages](/modules/pages.md) and by
  [src/App](/modules/app.md).
* Changing the event mechanism in `navigate` affects every post-submit redirect
  described in [Architecture](/architecture.md).
