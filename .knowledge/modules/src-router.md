---
type: Module
title: src/router
description: Minimal history-based router exposing navigate, usePath and Link.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/router.jsx
tags: [frontend, routing, hooks]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:19:54Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 8b5e972c95c0d30e9afcad3fc02c3eb1ec018b87
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | Line | Kind | Purpose |
| --- | --- | --- | --- |
| `navigate` | 4 | function | `history.pushState` then dispatch a synthetic `PopStateEvent` |
| `usePath` | 9 | hook | State seeded from `window.location.pathname`, updated on `popstate` |
| `onChange` | 12 | listener | Inner handler registered/removed by `usePath`'s effect |
| `Link` | 19 | component | `<a href={to}>` that calls `preventDefault()` then `navigate(to)` |

# How It Works

`navigate` dispatches `popstate` itself because `pushState` does not fire that
event. `usePath` subscribes to `popstate`, so both programmatic navigation and
the browser Back button re-render `App`. The effect has an empty dependency
array and removes its listener on unmount.

`Link` keeps a real `href` so the link is still a focusable, middle-clickable
anchor, but intercepts plain clicks to avoid a full page load.

# Relationships

* used by [src (app shell)](/modules/src-app.md) (`usePath`) and by every page
  in [src/pages](/modules/src-pages.md) (`navigate`, `Link`) — 7 inbound calls
  in total.
* depends on nothing in this repository; only `react` and browser APIs.
* `navigate` is the highest fan-in symbol in the codebase — see the hotspot
  table in [Architecture](/architecture.md).
