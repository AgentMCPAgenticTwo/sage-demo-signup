---
type: Module
title: src/router.jsx
description: Minimal history-based router exposing navigate, usePath and Link.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/router.jsx
tags: [frontend, routing, history]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:44:46Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ e05c9763bafd1094d0ab184ec6d101f963d09410
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | Line | Role |
| --- | --- | --- |
| `navigate` | 4 | `history.pushState` then `dispatchEvent(new PopStateEvent('popstate'))` |
| `usePath` | 9 | `useState(window.location.pathname)` + `popstate` listener |
| `onChange` | 12 | The listener inside `usePath`'s effect |
| `Link` | 19 | `<a href={to}>` that calls `preventDefault()` then `navigate(to)` |

# How it works

`pushState` does not fire `popstate`, so `navigate` dispatches the event itself.
That single event is what both back/forward navigation and in-app navigation
funnel through, and `usePath` is the only subscriber — it stores
`window.location.pathname` in state and cleans the listener up on unmount.

# Relationships

* Highest fan-in module in the graph: `navigate` 5, `Link` 4 (9 inbound edges
  total) from [Pages](/modules/src-pages.md) and [App shell](/modules/src-app.md).
* Makes no outbound calls into application code; depends only on `react` and
  browser APIs.

# Notes

* There is no search/hash handling and no route params — only `pathname`.
* `Link` renders a real `href`, so middle-click and copy-link still work, but a
  full page load needs the dev/preview server to serve `index.html` for the
  path.
* The path → page mapping itself lives in [App shell](/modules/src-app.md), not
  here.
