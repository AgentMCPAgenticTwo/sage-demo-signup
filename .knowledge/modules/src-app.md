---
type: Module
title: App shell
description: Document shell, React root and the route table that maps a path to a page component.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/App.jsx
tags: [frontend, entry-point, routing]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:44:46Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ e05c9763bafd1094d0ab184ec6d101f963d09410
    title: Codebase knowledge graph
status: stable
---

# Files

| File | Contents |
| --- | --- |
| `index.html` | `<div id="root">` and a module script tag for `/src/main.jsx` |
| `src/main.jsx` | `createRoot(document.getElementById('root')).render(<App />)` in `React.StrictMode`; imports `./style.css` |
| `src/App.jsx` | `routes` (line 8) and `App` (line 15) |

# Symbols

| Symbol | Line | Role |
| --- | --- | --- |
| `routes` | `src/App.jsx:8` | Path → page component map |
| `App` | `src/App.jsx:15` | Default export; `const Page = routes[path] ?? Signup` |

# Relationships

* Calls `usePath` from [Router](/modules/src-router.md) — its only outbound
  call, and the one `App → router` boundary edge in the graph.
* Imports and renders all four screens in [Pages](/modules/src-pages.md).
* Depends on [Styles](/modules/src-styles.md) through `src/main.jsx`.

# Notes

* `App` holds no state of its own; re-rendering is driven entirely by
  `usePath`'s `popstate` subscription.
* Unknown paths render `Signup` rather than a 404 screen.
