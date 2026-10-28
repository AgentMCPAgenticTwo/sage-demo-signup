---
type: Module
title: App Root
description: Mounts React and maps the current path to one of the three page components.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/App.jsx
tags: [frontend, entry, routing]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:27:27Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ af863cd5d6567cf6b64d2fc625952a185971b018
    title: Codebase knowledge graph
status: stable
---

# Files

| File | Role |
| --- | --- |
| `src/main.jsx` | `createRoot(document.getElementById('root')).render(<App />)` inside `React.StrictMode`; imports `./style.css` |
| `src/App.jsx` | the path-to-page switch |

# Symbols

| Symbol | Location | Notes |
| --- | --- | --- |
| `routes` | `src/App.jsx:7` | object literal: `/signup` → `Signup`, `/login` → `Login`, `/welcome` → `Welcome` |
| `App` | `src/App.jsx:13` | default export; `const Page = routes[path] ?? Signup` then renders `<Page />` |

# Behaviour

`App` calls `usePath()` from [router](/modules/src-router.md) and re-renders whenever the
history path changes. Any unrecognised path — including `/` — renders `Signup`, so
there is no 404 screen.

# Depends On

* [router](/modules/src-router.md) — `usePath`.
* [pages](/modules/src-pages.md) — the three page components.
* [styles](/modules/src-styles.md) — imported by `src/main.jsx`.

# Changing It

Adding a screen means adding the page file *and* an entry in `routes`; the mapping is
manual. See [Common Tasks](/playbooks/common-tasks.md).
