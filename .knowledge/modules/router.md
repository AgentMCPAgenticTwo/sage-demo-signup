---
type: Module
title: src/router.jsx
description: Minimal history-based router exposing `navigate`, `usePath` and `Link`.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/router.jsx
tags: [frontend, routing, core]
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
| `navigate` | 4 | `(path) => void` | `history.pushState` then dispatches a synthetic `PopStateEvent('popstate')` |
| `usePath` | 9 | `() => string` | state seeded from `window.location.pathname`, resubscribes nothing (`[]` deps) |
| `onChange` | 12 | `() => void` | inner listener installed by `usePath`'s effect |
| `Link` | 19 | `({ to, children })` | real `<a href>` whose `onClick` preventDefaults and calls `navigate` |

# How it works

`pushState` does **not** fire `popstate`, so `navigate` dispatches one by hand.
That synthetic event is what every mounted `usePath` listens for — this is the
single mechanism tying navigation to re-render. Removing the dispatch silently
breaks all in-app navigation while leaving the URL correct.

# Fan-in

The highest-fan-in package in the graph (7 inbound, 0 outbound). `navigate` has
fan-in 4 and `Link` fan-in 3.

| Caller | Uses |
| --- | --- |
| [App shell](/modules/app-shell.md) | `usePath` |
| [Signup page](/modules/pages-signup.md) | `navigate`, `Link` |
| [Login page](/modules/pages-login.md) | `navigate`, `Link` |
| [Welcome page](/modules/pages-welcome.md) | `navigate`, `Link` |

# Constraints

* Imports nothing but `react`. Keep it that way — it must stay free of page and
  store dependencies (see [Architecture](/architecture.md)).
* `Link` keeps a genuine `href` so middle-click and hover-preview still work.
* No route params, query handling, or nested routes; the route table lives in
  `src/App.jsx`.
