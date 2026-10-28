---
type: Module
title: src/router
description: Minimal history-based router exposing `navigate`, `usePath` and `Link`.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/router.jsx
tags: [frontend, routing, core]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T04:56:52Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 38fe79e86edef6544c50fc543f51f4f47b2379a8
    title: Codebase knowledge graph
status: stable
---

# Role

A hand-written replacement for a routing library: roughly thirty lines in
`src/router.jsx`. The shown page follows `location.pathname`. It is a `core`
layer module -- high fan-in, no outbound calls into other packages.

# Symbols

| Symbol | Line | Signature | Purpose |
| --- | --- | --- | --- |
| `navigate` | 4 | `(path)` | `history.pushState` then dispatch a synthetic `PopStateEvent` |
| `usePath` | 9 | `()` | `useState(location.pathname)` + `popstate` listener; returns the current path |
| `onChange` | 12 | `()` | Listener inside `usePath`'s effect; sets state from `location.pathname` |
| `Link` | 19 | `({ to, children })` | Anchor with `href={to}` that preventDefaults and calls `navigate` |

# How the loop closes

`pushState` alone does not notify listeners, so `navigate` dispatches
`PopStateEvent` itself. `usePath`'s effect -- registered once with an empty
dependency array and cleaned up on unmount -- picks it up and re-renders
[src/App](/modules/app.md), which resolves the new page.

# Consumers

| Caller | Uses |
| --- | --- |
| `App` (`src/App.jsx`) | `usePath` |
| `Signup`, `Login` (`src/pages/`) | `navigate`, `Link` |
| `Welcome` (`src/pages/Welcome.jsx`) | `navigate`, `Link` |

`navigate` has the highest fan-in in the codebase (4).

# Caveats

* Only `pathname` is observed -- query strings and hashes are ignored.
* `Link` keeps a real `href`, so middle-click and open-in-new-tab fall back to
  a full page load, which needs the dev server's history fallback.
