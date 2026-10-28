---
type: Module
title: router
description: Minimal history-based router exposing navigate, usePath and Link.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/router.jsx
tags: [frontend, routing, core]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:27:27Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ af863cd5d6567cf6b64d2fc625952a185971b018
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | Location | Signature | Notes |
| --- | --- | --- | --- |
| `navigate` | `src/router.jsx:4` | `(path) => void` | `history.pushState({}, '', path)` then dispatches a synthetic `PopStateEvent('popstate')` |
| `usePath` | `src/router.jsx:9` | `() => string` | `useState(window.location.pathname)`, subscribes to `popstate` in `useEffect`, cleans the listener up |
| `onChange` | `src/router.jsx:12` | `() => void` | the listener inside `usePath`; sets state to the current pathname |
| `Link` | `src/router.jsx:19` | `({ to, children })` | renders `<a href={to}>` and intercepts the click with `preventDefault()` + `navigate(to)` |

# Why The Synthetic Event

`pushState` does not fire `popstate`. Dispatching one manually makes programmatic
navigation and real browser back/forward share a single subscription path, so
`usePath` needs only one listener.

# Fan-in

`navigate` has the highest fan-in in the project (4) and `Link` has 3 — both are called
from all three pages. `usePath` is called only by [App Root](/modules/src-app.md).

# Constraints

* No route params, query handling, or nested routes — the path is compared as a
  whole string by `routes` in `src/App.jsx:7`.
* `Link` passes no extra props through; it accepts `to` and `children` only.
* Reads `window` at module scope of the hook, so it assumes a browser environment.
