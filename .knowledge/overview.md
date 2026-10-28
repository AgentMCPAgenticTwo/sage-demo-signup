---
type: Codebase Overview
title: Acme Account
description: Purpose, stack, scripts and entry points of the Acme Account sign-up demo.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/
tags: [overview, react, vite, frontend]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T03:58:25Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 33f196c6383d96b07ef0b9ef85db894b4859243c
    title: Codebase knowledge graph
status: stable
---

# Acme Account

A small sign-up / log-in single-page app. Accounts live in the browser's
`localStorage`, so there is no backend, no API layer and no server-side code.

## Stack

| Concern | Choice |
| --- | --- |
| UI | React 18.3.1 (`react`, `react-dom`) |
| Build / dev server | Vite 5.4.10 with `@vitejs/plugin-react` (`vite.config.js`) |
| Routing | Hand-rolled `history.pushState` router in `src/router.jsx` |
| Persistence | `localStorage` + `sessionStorage` via `src/store.js` |
| Styling | One plain stylesheet, `src/style.css` |
| Tests | `@playwright/test` is a devDependency; no test files are indexed |
| Language | JavaScript + JSX, ES modules (`"type": "module"`) |

## Scripts

| Script | Command | Purpose |
| --- | --- | --- |
| `dev` | `vite` | Local dev server with HMR |
| `build` | `vite build` | Production bundle into `dist/` |
| `preview` | `vite preview` | Serve the built bundle |

## Entry points

| Order | File | Role |
| --- | --- | --- |
| 1 | `index.html` | Vite HTML shell with the `#root` element |
| 2 | `src/main.jsx` | Mounts `App` into `#root` with `createRoot`, inside `React.StrictMode`; imports `src/style.css` |
| 3 | `src/App.jsx` | `App` reads `usePath()` and picks the page from the `routes` map |

## Pages

| Path | Component | File |
| --- | --- | --- |
| `/signup` (also the fallback) | `Signup` | `src/pages/Signup.jsx` |
| `/login` | `Login` | `src/pages/Login.jsx` |
| `/welcome` | `Welcome` | `src/pages/Welcome.jsx` |

## Where to read next

* [Architecture](/architecture.md) -- how the five modules depend on each other.
* [Modules Index](/modules/index.md) -- one concept per directory.
* [Common Tasks](/playbooks/common-tasks.md) -- which file to edit for a given change.
