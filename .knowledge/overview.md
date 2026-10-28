---
type: Codebase Overview
title: Acme Account
description: Purpose, stack, scripts and entry points of the Acme Account sign-up demo.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/
tags: [overview, react, vite, demo]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:11:52Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 11cbd71eed22e7124383102d0584b2397653d88d
    title: Codebase knowledge graph
status: stable
---

# Acme Account

A frontend-only sign-up / log-in demo. Accounts live in the browser's
`localStorage`, so there is no backend, no API client and no server code.

## Stack

| Concern | Choice |
| --- | --- |
| UI | React 18.3.1 (`react`, `react-dom`) |
| Build / dev server | Vite 5.4.10 with `@vitejs/plugin-react` |
| Routing | Hand-rolled, see [router](/modules/src-router.md) |
| Persistence | `localStorage` + `sessionStorage`, see [store](/modules/src-store.md) |
| Styling | One global stylesheet, `src/style.css` |
| Test tooling | `@playwright/test` is a devDependency; no test files are indexed |
| Module system | ESM (`"type": "module"`), JSX in `.jsx` files |

## Scripts

| Script | Command | Purpose |
| --- | --- | --- |
| `dev` | `vite` | Local dev server with HMR |
| `build` | `vite build` | Production bundle into `dist/` |
| `preview` | `vite preview` | Serve the built bundle |

## Entry points

| File | Role |
| --- | --- |
| `index.html` | HTML shell; mounts `#root` and loads `/src/main.jsx`; preloads the Inter webfont |
| `src/main.jsx` | Calls `createRoot(...).render(<App />)` inside `React.StrictMode`; imports `src/style.css` |
| `src/App.jsx` | `App` resolves `usePath()` against the `routes` map and renders the page |
| `vite.config.js` | Vite config -- only the React plugin |

## Routes

| Path | Page component | File |
| --- | --- | --- |
| `/signup` | `Signup` | `src/pages/Signup.jsx` |
| `/login` | `Login` | `src/pages/Login.jsx` |
| `/welcome` | `Welcome` | `src/pages/Welcome.jsx` |
| anything else | `Signup` (fallback) | `src/pages/Signup.jsx` |

## Where to look next

* [Architecture](/architecture.md) -- how the five packages depend on each other.
* [Modules](/modules/index.md) -- per-directory detail.
* [Common Tasks](/playbooks/common-tasks.md) -- editing recipes.
