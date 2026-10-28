---
type: Module
title: src/router
description: Minimal history-based router exposing navigate, usePath and Link.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/router.jsx
tags: [frontend, routing, core]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:58:38Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 08e3660b8f72cf411a3d1758d0e4fe5026600899
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | Line | Signature | Fan-in |
| --- | --- | --- | --- |
| `navigate` | `src/router.jsx:4` | `(path)` | 6 |
| `usePath` | `src/router.jsx:9` | `()` | 1 |
| `onChange` | `src/router.jsx:12` | `()` | internal listener |
| `Link` | `src/router.jsx:19` | `({ to, children })` | 4 |

`navigate` is the highest fan-in symbol in the codebase. This is a hand-written
replacement for a routing library -- there is no `react-router` dependency.

# How it works

| Export | Role |
| --- | --- |
| `navigate(path)` | `history.pushState`, then **dispatches a synthetic `PopStateEvent('popstate')`**. |
| `usePath()` | `useState(window.location.pathname)` plus a `popstate` listener registered in `useEffect` with `[]` deps; returns the current pathname. |
| `Link({ to, children })` | A real `<a href={to}>` whose `onClick` calls `preventDefault()` then `navigate(to)`. |

The synthetic dispatch in `navigate` is the load-bearing detail: `pushState`
does not itself fire `popstate`, so without that line `usePath` would never see
a programmatic navigation and the view would freeze while the URL changed. Any
new navigation helper must either call `navigate` or repeat the dispatch.

`Link` renders a genuine anchor, so the href is real for middle-click, copy-link
and crawlers, while the click handler keeps same-tab navigation client-side.

# Constraints

* State is derived from `window.location.pathname` only -- the router ignores
  the query string and hash entirely, and supports no route params.
* `usePath` reads `window` during render, so the module assumes a browser. It
  would need guarding for any server-side rendering.
* Deep-linking to a path other than `/` requires the dev/preview server to fall
  back to `index.html`; Vite's dev server does this for the SPA by default.

# Relationships

* Consumed by [src/App](/modules/src-app.md) (`usePath`) and by every page in
  [src/pages](/modules/src-pages.md) (`navigate`, `Link`) -- 9 calls from
  `pages` to `router` in the graph.
* Imports nothing from this codebase; only `useEffect` and `useState` from
  React. It is independent of [src/store](/modules/src-store.md) and
  [src/components](/modules/src-components.md).
