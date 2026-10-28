---
type: Module
title: src/router.jsx
description: Minimal pushState router providing navigate, usePath and Link.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/blob/main/src/router.jsx
tags: [frontend, routing, core]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T03:58:25Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 33f196c6383d96b07ef0b9ef85db894b4859243c
    title: Codebase knowledge graph
status: stable
---

# src/router.jsx

A ~30-line router over the History API. There is no routing library in
`package.json`. The page shown always follows `location.pathname`.

## Symbols

| Symbol | Kind | Line | Purpose |
| --- | --- | --- | --- |
| `navigate` | Function | 4 | `history.pushState` then dispatch a synthetic `popstate` |
| `usePath` | Function (hook) | 9 | State holding `location.pathname`, kept in sync via a `popstate` listener |
| `onChange` | Function | 12 | The listener inside `usePath`'s effect |
| `Link` | Function (component) | 19 | `<a href={to}>` that calls `preventDefault()` then `navigate(to)` |

## Why the synthetic `popstate`

`history.pushState` does not fire `popstate`, so `navigate` dispatches one
itself. That single event is what both back/forward navigation and in-app
navigation funnel through, so `usePath` needs only one listener.

## Contract

* `navigate(path)` -- absolute path string, e.g. `'/login'`.
* `usePath()` -- returns the current pathname; subscribes on mount and
  unsubscribes on unmount.
* `Link({ to, children })` -- `to` is the same absolute path. It keeps a real
  `href` so the link is middle-clickable and screen-reader friendly, but
  swallows the default left-click.

## Limits

No route params, query handling, nested routes, scroll restoration or
`replaceState`. Adding any of these means extending this file, which is a
fan-in-4 hotspot.

## Relationships

* Consumed by [App shell](/modules/src-app-shell.md) (`usePath`) and every
  screen in [Pages](/modules/src-pages.md) (`Link`, `navigate`).
* Imports nothing from this codebase -- only `react`.
