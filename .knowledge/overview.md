---
type: Codebase Overview
title: sage-demo-signup
description: Acme Account, a React + Vite demo sign-up app whose accounts live in browser storage.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/
tags: [frontend, react, vite, demo, auth]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:44:46Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ e05c9763bafd1094d0ab184ec6d101f963d09410
    title: Codebase knowledge graph
status: stable
---

# Purpose

A small account flow — sign up, log in, reset password, welcome — with no
backend. Accounts are persisted in `localStorage` and the signed-in email in
`sessionStorage` by `src/store.js`. Credentials are demo-only and stored in
plain text; the file says so in its leading comment.

# Stack

| Concern | Choice |
| --- | --- |
| UI | React 18.3.1 (`react`, `react-dom`) |
| Build / dev server | Vite 5.4.10 with `@vitejs/plugin-react` |
| Routing | Hand-rolled, `src/router.jsx` (no router dependency) |
| State | React `useState` per page; no store library |
| Persistence | `localStorage` / `sessionStorage` |
| Styling | One global stylesheet, `src/style.css` |
| Browser tests | `@playwright/test` (devDependency; no spec files in the repo) |

# Scripts

| Script | Command |
| --- | --- |
| `npm run dev` | `vite` |
| `npm run build` | `vite build` |
| `npm run preview` | `vite preview` |

# Entry points

| File | Role |
| --- | --- |
| `index.html` | Document shell; mounts `#root`, loads `/src/main.jsx` |
| `src/main.jsx` | `createRoot(...).render(<App />)` inside `React.StrictMode`; imports `./style.css` |
| `src/App.jsx` | `App` reads `usePath()` and renders the matching page from the `routes` map |

# Routes

| Path | Page |
| --- | --- |
| `/signup` | `src/pages/Signup.jsx` (also the fallback for unknown paths) |
| `/login` | `src/pages/Login.jsx` |
| `/welcome` | `src/pages/Welcome.jsx` |
| `/reset-password` | `src/pages/ResetPassword.jsx` |

# Where to look next

* Layering and call flow: [Architecture](/architecture.md)
* Per-directory detail: [Modules](/modules/index.md)
* Repeated patterns to follow: [Conventions](/conventions.md)
