---
type: Codebase Overview
title: Acme Account
description: Browser-only React + Vite sign-up / log-in demo that keeps accounts in localStorage.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/
tags: [overview, react, vite, frontend]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T17:18:25Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 78b91de716644ab7bfc26c34d71b2176b39a35ee
    title: Codebase knowledge graph
status: stable
---

# Purpose

A small demo account flow: create an account, log in, see a welcome screen.
There is no backend -- accounts live in the browser's `localStorage` and the
signed-in email lives in `sessionStorage`. `src/store.js` states plainly that it
is not for real credentials.

# Stack

| Concern | Choice |
| --- | --- |
| UI | React 18.3.1 (`react`, `react-dom`) |
| Build / dev server | Vite 5.4.10 with `@vitejs/plugin-react` (`vite.config.js`) |
| Routing | Hand-written, `src/router.jsx` (no react-router) |
| Persistence | `localStorage` / `sessionStorage` via `src/store.js` |
| Styling | One global stylesheet, `src/style.css` |
| Browser tests | `@playwright/test` is a devDependency; no spec files are indexed |

Languages in the graph: JavaScript (9 files), HTML (1), CSS (1), YAML (1).

# Scripts

| Script | Command |
| --- | --- |
| `dev` | `vite` |
| `build` | `vite build` |
| `preview` | `vite preview` |

# Entry points

| File | Role |
| --- | --- |
| `index.html` | Host page; mounts `#root` and loads `/src/main.jsx` |
| `src/main.jsx` | Creates the React root in `StrictMode` and imports `./style.css` |
| `src/App.jsx` | `App` resolves `usePath()` against the `routes` map |

See [Architecture](/architecture.md) for how the layers relate, and
[src/main and styling](/modules/src-entry.md) for the boot path.

# Routes

Client-side only, declared in the `routes` object in `src/App.jsx`:
`/signup`, `/login`, `/welcome`. Anything else falls back to
[Signup](/modules/src-pages.md).

# Repository extras

`.github/workflows/ui-correction.yml`, `.sage-maintenance/` and
`.ui-gen/corrections/` belong to the automated UI-correction and maintenance
workflow, not to the application itself.
