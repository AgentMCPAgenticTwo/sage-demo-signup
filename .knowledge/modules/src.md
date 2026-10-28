---
type: Module
title: src
description: Application shell -- HTML entry, React root and the route table.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [frontend, entry, routing]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:11:52Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 11cbd71eed22e7124383102d0584b2397653d88d
    title: Codebase knowledge graph
status: stable
---

# src

The shell that boots React and decides which page is on screen.

## Symbols

| Symbol | Kind | File | Line |
| --- | --- | --- | --- |
| `routes` | Variable | `src/App.jsx` | 7 |
| `App` | Function | `src/App.jsx` | 13 |

`src/main.jsx` and `index.html` declare no named symbols; they are top-level
module bodies.

## Files

| File | Role |
| --- | --- |
| `index.html` | Document shell: `#root`, `<script type="module" src="/src/main.jsx">`, Inter font preconnect and stylesheet link |
| `src/main.jsx` | `createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)`; also the single import site for `src/style.css` |
| `src/App.jsx` | Route table and `App` |
| `src/style.css` | Global stylesheet and design tokens -- see [Conventions](/conventions.md) |

## App

```js
const routes = { '/signup': Signup, '/login': Login, '/welcome': Welcome };
const Page = routes[path] ?? Signup;
```

`App` calls `usePath()` from [router](/modules/src-router.md) and renders the
matched page. Unknown paths fall through to `Signup`; there is no 404 screen.
The page components come from [src/pages](/modules/src-pages.md).

## Gotchas

* `React.StrictMode` double-invokes effects in development -- relevant to the
  redirect effect in `Welcome`.
* Adding a route means editing `routes` in `src/App.jsx`; nothing discovers
  files in `src/pages/` automatically, despite the "routed by its file name"
  phrasing in the comment and `README.md`.
