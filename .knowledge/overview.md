---
type: Codebase Overview
title: sage-demo-signup
description: Purpose, stack, scripts and entry points of the Acme Account sign-up demo.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/
tags: [overview, react, vite, demo]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:19:54Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 8b5e972c95c0d30e9afcad3fc02c3eb1ec018b87
    title: Codebase knowledge graph
status: stable
---

# Purpose

"Acme Account" is a small sign-up and log-in demo. Accounts live in the
browser's `localStorage`, so the app has no backend and no network calls.

# Stack

| Concern | Choice |
| --- | --- |
| UI | React 18.3.1 (`react`, `react-dom`) |
| Build / dev server | Vite 5.4.10 with `@vitejs/plugin-react` (`vite.config.js`) |
| Routing | Hand-written router in `src/router.jsx` — no router dependency |
| Persistence | `localStorage` + `sessionStorage` via `src/store.js` |
| Styling | One global stylesheet, `src/style.css`; Inter loaded in `index.html` |
| Tests | `@playwright/test` is a devDependency; no test files are in the graph |

Languages in the graph: JavaScript (9 files), HTML (1), CSS (1), YAML (1).

# Scripts

| Script | Command |
| --- | --- |
| `npm run dev` | `vite` |
| `npm run build` | `vite build` |
| `npm run preview` | `vite preview` |

# Entry Points

| Entry | File | Role |
| --- | --- | --- |
| `index.html` | `index.html` | Mounts `#root`, loads `/src/main.jsx` |
| `main.jsx` | `src/main.jsx` | `createRoot(...).render(<App />)` in `React.StrictMode` |
| `App` | `src/App.jsx:13` | Picks the page component for the current path |

Exported symbols that other modules call: `navigate`, `usePath`, `Link`
(`src/router.jsx`); `findUser`, `saveUser`, `setCurrentUser`, `currentUser`
(`src/store.js`); `Card`, `Field`, `Message` (`src/components/Card.jsx`).

# Routes

| Path | Page component |
| --- | --- |
| `/signup` | `Signup` (`src/pages/Signup.jsx`) |
| `/login` | `Login` (`src/pages/Login.jsx`) |
| `/welcome` | `Welcome` (`src/pages/Welcome.jsx`) |
| anything else | falls back to `Signup` |

# Where To Read Next

Structure and dependencies are described in [Architecture](/architecture.md);
the house style in [Conventions](/conventions.md); per-directory detail in the
[Modules Index](/modules/index.md).
