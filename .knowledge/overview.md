---
type: Codebase Overview
title: Acme Account
description: Purpose, stack, scripts and entry points of the Acme Account React + Vite demo.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/
tags: [overview, react, vite, frontend]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:04:36Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 360fd597ded4ea1f388e555fd8458ad76d46ff8b
    title: Codebase knowledge graph
status: stable
---

# Purpose

A small sign-up and log-in demo. Accounts live in the browser's `localStorage`,
so there is no backend, no API client and no server-side code. The whole app is
three screens behind a hand-rolled path router.

# Stack

| Concern | Choice |
| --- | --- |
| UI | React 18.3.1 (`react`, `react-dom`) |
| Build / dev server | Vite 5.4.10 with `@vitejs/plugin-react` (`vite.config.js`) |
| Routing | Hand-written, see [src/router](/modules/src-router.md) |
| Persistence | `localStorage` / `sessionStorage`, see [src/store](/modules/src-store.md) |
| Styling | One global stylesheet, `src/style.css` |
| Browser testing | `@playwright/test` (dev dependency; no committed specs) |

Languages in the graph: JavaScript (9 files), HTML (1), CSS (1), YAML (1).

# Scripts

| Script | Command | Use |
| --- | --- | --- |
| `dev` | `vite` | Local dev server |
| `build` | `vite build` | Production bundle |
| `preview` | `vite preview` | Serve the built bundle |

# Entry Points

| Path | Role |
| --- | --- |
| `index.html` | Vite HTML entry; hosts the `#root` element |
| `src/main.jsx` | Mounts `App` into `#root` inside `React.StrictMode`, imports `src/style.css` |
| `src/App.jsx` | `App` resolves `routes` by pathname -- see [src/App](/modules/src-app.md) |

# Source Layout

```
src/
  main.jsx          mount
  App.jsx           route table
  router.jsx        navigate / usePath / Link
  store.js          findUser / saveUser / setCurrentUser / currentUser
  style.css         global styles
  components/Card.jsx   Card, Field, Message
  pages/Signup.jsx      Signup
  pages/Login.jsx       Login
  pages/Welcome.jsx     Welcome
```

Non-source directories (`.github/workflows/`, `.sage-maintenance/`,
`.ui-gen/corrections/`) hold the UI-correction automation and its trace records,
not application code.

# Related

* Structure and dependency direction: [Architecture](/architecture.md)
* Rules the code follows: [Conventions](/conventions.md)
