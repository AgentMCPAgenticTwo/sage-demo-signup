---
type: Module
title: src/router
description: Hand-rolled History-API router -- navigate, usePath and Link.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/router.jsx
tags: [frontend, routing, core]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:11:52Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 11cbd71eed22e7124383102d0584b2397653d88d
    title: Codebase knowledge graph
status: stable
---

# src/router

A 30-line replacement for a routing library. Core layer: 7 inbound calls, 0
outbound. No dependency other than React's `useEffect` / `useState`.

## Symbols

| Symbol | Kind | Line | Purpose |
| --- | --- | --- | --- |
| `navigate` | Function | 4 | `history.pushState` then dispatch a synthetic `PopStateEvent` so subscribers re-render |
| `usePath` | Function | 9 | Hook returning `window.location.pathname`, kept in state |
| `onChange` | Function | 12 | The `popstate` listener registered inside `usePath` |
| `Link` | Function | 19 | `<a href={to}>` that calls `preventDefault()` then `navigate(to)` |

## How it fits

* `App` (see [src](/modules/src.md)) is the only consumer of `usePath` -- that
  single subscription drives every page swap.
* `navigate` is the app's highest-fan-in symbol (4 callers): `Link`, plus the
  redirects in `Signup.submit`, `Login.submit` and `Welcome`.
* Every page in [src/pages](/modules/src-pages.md) renders at least one `Link`.

## Gotchas

* `navigate` fires a `PopStateEvent` manually because `pushState` does not emit
  one. Any new subscriber must listen for `popstate`, not patch `pushState`.
* `Link` ignores modifier keys and the middle mouse button, so
  ctrl/cmd-click will not open a new tab.
* There is no scroll restoration, no query-string or hash handling, and no
  route params -- `usePath` compares `pathname` by exact string.
* Deep links require the server to rewrite unknown paths to `index.html`;
  `vite dev` does this, a plain static host may not.
