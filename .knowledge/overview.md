---
type: Codebase Overview
title: Acme Account
description: Purpose, stack, scripts and entry points of the Acme Account sign-up demo.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/
tags: [overview, react, vite, frontend]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T04:56:52Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 38fe79e86edef6544c50fc543f51f4f47b2379a8
    title: Codebase knowledge graph
status: stable
---

# Purpose

A small, backend-free sign-up and log-in demo. Accounts are created on
`/signup`, authenticated on `/login`, and the signed-in user is shown on
`/welcome`. All account data lives in the browser, so the app runs from a
static dev server with no API.

# Stack

| Concern | Choice |
| --- | --- |
| UI | React 18.3.1 (`react`, `react-dom`) |
| Build / dev server | Vite 5.4.10 with `@vitejs/plugin-react` |
| Routing | Hand-written, see [src/router](/modules/router.md) -- no router dependency |
| Persistence | `localStorage` / `sessionStorage`, see [src/store](/modules/store.md) |
| Styling | One global stylesheet, `src/style.css` -- see [styling](/modules/styling.md) |
| E2E tooling | `@playwright/test` is a devDependency; no test files are present in the graph |

Source languages in the graph: JavaScript (9 files), HTML, CSS, YAML.

# Scripts

| Script | Command | Use |
| --- | --- | --- |
| `dev` | `vite` | Local development server |
| `build` | `vite build` | Production bundle |
| `preview` | `vite preview` | Serve the built bundle |

# Entry points

| Path | Role |
| --- | --- |
| `index.html` | HTML shell; loads the Inter webfont and `/src/main.jsx` |
| `src/main.jsx` | Mounts `App` into `#root` with `createRoot`, inside `React.StrictMode`; imports `./style.css` |
| `src/App.jsx` | `App` -- resolves the current path to a page component |
| `vite.config.js` | Vite config, React plugin only |

# Routes

| Path | Page component | File |
| --- | --- | --- |
| `/signup` | `Signup` | `src/pages/Signup.jsx` |
| `/login` | `Login` | `src/pages/Login.jsx` |
| `/welcome` | `Welcome` | `src/pages/Welcome.jsx` |
| anything else | `Signup` (fallback in `App`) | `src/App.jsx` |

# Where to start

Read [Architecture](/architecture.md) for the layering, then
[Common Tasks](/playbooks/common-tasks.md) for change recipes.
