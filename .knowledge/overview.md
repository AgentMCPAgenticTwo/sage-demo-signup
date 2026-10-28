---
type: Codebase Overview
title: Acme Account
description: Client-only React + Vite demo for account sign-up, log-in and password change, with accounts kept in browser storage.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/
tags: [react, vite, frontend, auth-demo]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:58:38Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 08e3660b8f72cf411a3d1758d0e4fe5026600899
    title: Codebase knowledge graph
status: stable
---

# Purpose

A small single-page app demonstrating an account flow: create an account, log
in, land on a welcome screen, and change the password. There is no backend --
`src/store.js` persists accounts in `localStorage` and the active session in
`sessionStorage`, so the whole app runs in the browser.

The store comment marks it explicitly as demo-only: passwords are held in plain
text and must not be treated as a real credential store.

# Stack

| Concern | Choice | Where |
| --- | --- | --- |
| UI library | React 18.3.1 | `package.json` |
| Build / dev server | Vite 5.4.10 with `@vitejs/plugin-react` | `vite.config.js` |
| Routing | hand-rolled, 32 lines | `src/router.jsx` |
| Persistence | `localStorage` / `sessionStorage` | `src/store.js` |
| Styling | one global stylesheet | `src/style.css` |
| Test tooling | `@playwright/test` 1.47.2 (devDependency; no specs in repo) | `package.json` |

There is no state-management library, no CSS framework and no router package --
every abstraction the app uses is defined inside `src/`.

# Scripts

| Script | Command | Use |
| --- | --- | --- |
| `npm run dev` | `vite` | local dev server with HMR |
| `npm run build` | `vite build` | production bundle into `dist/` |
| `npm run preview` | `vite preview` | serve the built bundle |

# Entry points

| Step | File | Symbol |
| --- | --- | --- |
| 1. HTML shell | `index.html` | `<div id="root">`, loads `/src/main.jsx` |
| 2. React mount | `src/main.jsx` | `createRoot(...).render(<App />)` inside `React.StrictMode` |
| 3. Route switch | `src/App.jsx` | `App`, `routes` |
| 4. Screens | `src/pages/*.jsx` | `Signup`, `Login`, `Welcome`, `ChangePassword` |

# Routes

`routes` in `src/App.jsx` is a plain object keyed by pathname. An unknown path
falls back to `Signup`.

| Path | Page | Guard |
| --- | --- | --- |
| `/signup` | `Signup` | none |
| `/login` | `Login` | none |
| `/welcome` | `Welcome` | redirects to `/login` when `currentUser()` is null |
| `/change-password` | `ChangePassword` | redirects to `/login` when `currentUser()` is null |

# Where to go next

* [Architecture](/architecture.md) -- how the modules layer and depend on each other.
* [Conventions](/conventions.md) -- the patterns to follow when editing.
* [Common Tasks](/playbooks/common-tasks.md) -- recipes for frequent changes.
