---
type: Codebase Overview
title: sage-demo-signup
description: Vite + React demo app with a three-page signup, login and welcome flow backed by browser storage.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/
tags: [frontend, react, vite, demo]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T23:34:47Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 9e0695a13b39e00939f996e6665b83350960de3e
    title: Codebase knowledge graph
status: stable
---

# Purpose

A deliberately small "Acme Account" demo: a user signs up, logs in, and lands on
a welcome page. There is no backend — accounts live in `localStorage` and the
session pointer lives in `sessionStorage`. It exists as a fixture for UI
correction and maintenance automation, not as a production auth system.

# Stack

| Concern | Choice |
| --- | --- |
| UI | React 18.3.1 (`react`, `react-dom`) |
| Build / dev server | Vite 5.4.10 with `@vitejs/plugin-react` |
| Routing | hand-rolled, `src/router.jsx` (no react-router) |
| State | React `useState` only; no store library |
| Persistence | `localStorage` + `sessionStorage` via `src/store.js` |
| Styling | one plain stylesheet, `src/style.css` |
| Test tooling | `@playwright/test` (dev dependency) |

# Scripts

| Script | Command | Use |
| --- | --- | --- |
| `dev` | `vite` | local dev server |
| `build` | `vite build` | production bundle |
| `preview` | `vite preview` | serve the built bundle |

# Entry points

| File | Role |
| --- | --- |
| `index.html` | document shell with the `#root` mount node |
| `src/main.jsx` | creates the React root and renders `App` in `StrictMode` |
| `src/App.jsx` | the `routes` table and the `App` component that picks a page |
| `vite.config.js` | Vite configuration |

# Routes

| Path | Page component | Concept |
| --- | --- | --- |
| `/signup` (also the fallback) | `Signup` | [Signup page](/modules/pages-signup.md) |
| `/login` | `Login` | [Login page](/modules/pages-login.md) |
| `/welcome` | `Welcome` | [Welcome page](/modules/pages-welcome.md) |

# Where to go next

* [Architecture](/architecture.md) for the layering and call tree.
* [Common Tasks](/playbooks/common-tasks.md) for "to change X, go to Y".
* [Conventions](/conventions.md) before writing new code.
