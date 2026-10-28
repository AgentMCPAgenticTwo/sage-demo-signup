---
type: Codebase Overview
title: Acme Account
description: Client-only React + Vite sign-up and log-in demo whose accounts live in browser storage.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/
tags: [react, vite, frontend, demo, auth]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:35:21Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ af0eb7e28c6d901616970ef2450db466024c0fd3
    title: Codebase knowledge graph
status: stable
---

# Purpose

A small account demo: a visitor signs up, logs in, and lands on a welcome
screen. There is no backend -- accounts are persisted in the browser, so the
whole app is static assets. The code is explicitly demo-only; `src/store.js`
warns it is "not for real credentials".

# Stack

| Concern | Choice |
| --- | --- |
| UI | `react` / `react-dom` 18.3.1 |
| Build / dev server | `vite` 5.4.10 with `@vitejs/plugin-react` |
| Routing | hand-rolled, `src/router.jsx` (no router dependency) |
| Styling | one global stylesheet, `src/style.css` |
| Persistence | `localStorage` + `sessionStorage` |
| Tests (dev dep) | `@playwright/test` 1.47.2 |

Module system is ESM (`"type": "module"` in `package.json`).

# Scripts

| Script | Command | Use |
| --- | --- | --- |
| `dev` | `vite` | local dev server |
| `build` | `vite build` | production bundle into `dist/` |
| `preview` | `vite preview` | serve the built bundle |

# Entry points

| File | Role |
| --- | --- |
| `index.html` | HTML shell with `#root`, loads `/src/main.jsx` |
| `src/main.jsx` | mounts `App` into `#root` inside `React.StrictMode` |
| `src/App.jsx` | picks the page component for the current path |
| `vite.config.js` | Vite config -- React plugin only, no custom options |

# Routes

| Path | Page | Concept |
| --- | --- | --- |
| `/signup` | `Signup` | [src/pages](/modules/src-pages.md) |
| `/login` | `Login` | [src/pages](/modules/src-pages.md) |
| `/welcome` | `Welcome` | [src/pages](/modules/src-pages.md) |
| anything else | `Signup` (fallback in `App`) | [src/App](/modules/src-app.md) |

See [Architecture](/architecture.md) for how the layers fit together and
[Conventions](/conventions.md) for the rules new code should follow.
