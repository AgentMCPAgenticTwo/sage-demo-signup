---
type: Module
title: src/router
description: Minimal History-API router exposing navigate, usePath and Link.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/router.jsx
tags: [frontend, routing, core]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T17:18:25Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 78b91de716644ab7bfc26c34d71b2176b39a35ee
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | Kind | Location | Fan-in |
| --- | --- | --- | --- |
| `navigate` | Function | `src/router.jsx:4` | 4 |
| `usePath` | Function (hook) | `src/router.jsx:9` | 1 |
| `onChange` | Function (local listener) | `src/router.jsx:12` | -- |
| `Link` | Function (component) | `src/router.jsx:19` | 3 |

# Behaviour

| Symbol | What it does |
| --- | --- |
| `navigate(path)` | `window.history.pushState({}, '', path)` then dispatches a synthetic `PopStateEvent('popstate')` |
| `usePath()` | `useState(window.location.pathname)`; subscribes `onChange` to `popstate` and cleans up on unmount |
| `Link({ to, children })` | Renders a real `<a href={to}>` but `preventDefault()`s and calls `navigate(to)` |

The synthetic `popstate` dispatch is deliberate: `pushState` does not fire
`popstate`, so without it `usePath` would never see a programmatic navigation.
Any new navigation path must go through `navigate` for the same reason.

`Link` keeps the real `href` so the anchor is still focusable, middle-clickable
and visible to assistive tech.

# Boundary

This is a **core** module with high fan-in and no outbound calls into
application code -- it must not import from
[src/pages](/modules/src-pages.md) or [src/store](/modules/src-store.md).

# Used by

* [src/App](/modules/src-app.md) -- `usePath`.
* [src/pages](/modules/src-pages.md) -- `Link` and `navigate` in all three pages.
