---
type: Module
title: src/router
description: Minimal history-based router exposing `navigate`, `usePath` and `Link`.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/router.jsx
tags: [frontend, routing, core]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:04:36Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 360fd597ded4ea1f388e555fd8458ad76d46ff8b
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | Line | Export | Notes |
| --- | --- | --- | --- |
| `navigate(path)` | `src/router.jsx:4` | named | Pushes history state, then dispatches a synthetic `popstate` |
| `usePath()` | `src/router.jsx:9` | named | Hook returning `location.pathname`, re-rendering on `popstate` |
| `onChange` | `src/router.jsx:12` | private | `popstate` listener inside `usePath`'s effect |
| `Link({ to, children })` | `src/router.jsx:19` | named | `<a>` that prevents default and calls `navigate` |

# Behaviour

The synthetic `PopStateEvent` dispatched by `navigate` is what makes
`pushState` observable -- browsers do not fire `popstate` for programmatic
pushes. `usePath` is the only subscriber, and it cleans its listener up on
unmount. Because `Link` renders a real `href`, middle-click and
open-in-new-tab still work.

# Fan-in

`navigate` has the highest fan-in in the codebase (4), followed by `Link` (3).
Changing either signature touches all three pages.

# Used By

* [src/App](/modules/src-app.md) -- `usePath` drives the route table.
* [src/pages](/modules/src-pages.md) -- `Link` for user navigation, `navigate`
  for post-submit redirects and the `Welcome` guard.

# Depends On

React (`useEffect`, `useState`) and the browser History API only. No project
imports, which is why it sits in the core layer of
[Architecture](/architecture.md).
