---
type: Module
title: src/router
description: Minimal history-based router exposing `navigate`, `usePath` and `Link`.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/router.jsx
tags: [frontend, routing, core]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:35:21Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ af0eb7e28c6d901616970ef2450db466024c0fd3
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | File | Line | Role |
| --- | --- | --- | --- |
| `navigate` | `src/router.jsx` | 4 | push a path and announce the change |
| `usePath` | `src/router.jsx` | 9 | hook returning the live pathname |
| `onChange` | `src/router.jsx` | 12 | `popstate` listener inside `usePath` |
| `Link` | `src/router.jsx` | 19 | anchor that navigates without a reload |

# Behaviour

`navigate(path)` calls `window.history.pushState` and then dispatches a
synthetic `PopStateEvent('popstate')`. The browser does not fire `popstate`
for `pushState`, so this manual dispatch is what makes subscribers re-render.

`usePath()` seeds state from `window.location.pathname` and adds a
`popstate` listener on mount, removing it on unmount. It is the only consumer
of the event that `navigate` dispatches.

`Link({ to, children })` renders a real `<a href={to}>` -- so middle-click and
"open in new tab" still work -- but prevents the default click and calls
`navigate(to)` instead.

# Notes

* No query-string, hash or route-parameter support; only exact pathnames.
* `navigate` is the app's top hotspot (fan-in 4): used by both page submit
  handlers, by `Welcome`'s redirect guard, and by `Link`.
* This module imports nothing but `react` -- it does not know about
  [src/store](/modules/src-store.md) or [src/App](/modules/src-app.md).

# Relationships

* `usePath` is consumed by [src/App](/modules/src-app.md).
* `navigate` and `Link` are consumed by every page in
  [src/pages](/modules/src-pages.md).
