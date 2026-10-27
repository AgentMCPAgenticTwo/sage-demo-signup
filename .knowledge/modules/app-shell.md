---
type: Module
title: App shell
description: Mounts React and maps `location.pathname` to one of the three page components.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/App.jsx
tags: [frontend, routing, entry]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T23:34:47Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 9e0695a13b39e00939f996e6665b83350960de3e
    title: Codebase knowledge graph
status: stable
---

# Files

| File | Contents |
| --- | --- |
| `index.html` | document shell, `#root` mount node |
| `src/main.jsx` | `createRoot(...).render(<React.StrictMode><App /></React.StrictMode>)`, imports `./style.css` |
| `src/App.jsx` | `routes` table and the `App` component |
| `vite.config.js` | Vite + React plugin config |

# Symbols

| Symbol | File:line | Notes |
| --- | --- | --- |
| `routes` | `src/App.jsx:7` | object literal: `/signup`, `/login`, `/welcome` -> page component |
| `App` | `src/App.jsx:13` | default export; `routes[path] ?? Signup` |

# Behaviour

`App` calls `usePath()` from [router](/modules/router.md) — its only outbound
dependency — and renders the matching page. Any unknown path falls back to
`Signup`, so there is no 404 view.

# Depends on

* [Router](/modules/router.md) for `usePath`.
* [Signup page](/modules/pages-signup.md),
  [Login page](/modules/pages-login.md),
  [Welcome page](/modules/pages-welcome.md) — imported statically, no lazy loading.

# Change notes

Adding a page means creating the file in `src/pages/` and adding one line to
`routes`; see [Common Tasks](/playbooks/common-tasks.md).
