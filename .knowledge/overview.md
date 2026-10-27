---
type: Codebase Overview
title: sage-demo-signup
description: Purpose, stack, scripts and entry points of the Acme Account demo signup app.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/
tags: [frontend, react, vite, overview]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T23:47:28Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ ca10a42e2a13be0442234c6be972f2a13f83ee63
    title: Codebase knowledge graph
status: stable
---

# Purpose

A deliberately small React demo of an account flow for a fictional "Acme Account"
product: create an account, log in, reset a forgotten password, and land on a
welcome screen. There is no backend — accounts live in `localStorage` via
[src/store](/modules/store.md), which is explicitly demo-only and not for real
credentials.

The repository also hosts a UI-correction automation workflow
(`.github/workflows/ui-correction.yml`) that drives changes to the app.

# Stack

| Concern | Choice |
| --- | --- |
| UI | React 18.3.1 (`react`, `react-dom`) |
| Build / dev server | Vite 5.4.10 with `@vitejs/plugin-react` (`vite.config.js`) |
| Routing | Hand-rolled History-API router, see [src/router](/modules/router.md) |
| Persistence | `localStorage` / `sessionStorage`, see [src/store](/modules/store.md) |
| Styling | A single stylesheet, `src/style.css` |
| Tests | `@playwright/test` is a devDependency; no test files are in the graph |

# Scripts

| Script | Command |
| --- | --- |
| `dev` | `vite` |
| `build` | `vite build` |
| `preview` | `vite preview` |

# Entry points

| Path | Role |
| --- | --- |
| `index.html` | Document shell; mounts `#root` and loads `/src/main.jsx` |
| `src/main.jsx` | Calls `createRoot(...).render(<App />)` inside `React.StrictMode` and imports `src/style.css` |
| `src/App.jsx` | `App` — picks the page component for the current path, see [src/App](/modules/app.md) |

# Shape of the code

17 files, 22 functions, no classes. Everything of substance is under `src/`:
[App](/modules/app.md) depends on [router](/modules/router.md) and
[pages](/modules/pages.md); every page depends on
[components](/modules/components.md), [router](/modules/router.md) and
[store](/modules/store.md). See [Architecture](/architecture.md) for the full
dependency picture.
