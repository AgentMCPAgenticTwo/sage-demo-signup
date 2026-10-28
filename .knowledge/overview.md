---
type: Codebase Overview
title: sage-demo-signup
description: Purpose, stack, scripts and entry points of the sage-demo-signup React demo.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/
tags: [overview, react, vite, demo]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:27:27Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ af863cd5d6567cf6b64d2fc625952a185971b018
    title: Codebase knowledge graph
status: stable
---

# Purpose

A deliberately small, dependency-light React demo of a three-screen account flow:
sign up, log in, welcome. It exists as a fixture for UI-correction and maintenance
automation, not as a production auth system. Credentials are kept in `localStorage`
and the "session" in `sessionStorage` — see [Store](/modules/src-store.md).

# Stack

| Concern | Choice |
| --- | --- |
| UI | `react` 18.3.1, `react-dom` 18.3.1 |
| Build / dev server | `vite` 5.4.10 with `@vitejs/plugin-react` 4.3.3 |
| Browser tests (dev dep) | `@playwright/test` 1.47.2 |
| Routing | hand-rolled, `src/router.jsx` — no router library |
| State | React `useState` only; no store library |
| Styling | one global stylesheet, `src/style.css` |

Module type is ESM (`"type": "module"` in `package.json`).

# Scripts

| Script | Command | Use |
| --- | --- | --- |
| `dev` | `vite` | local dev server |
| `build` | `vite build` | production bundle into `dist/` |
| `preview` | `vite preview` | serve the built bundle |

# Entry Points

| Entry | File | Role |
| --- | --- | --- |
| `index.html` | `index.html` | Vite HTML entry, mounts `#root` |
| `main.jsx` | `src/main.jsx` | calls `createRoot(...).render(<App />)` inside `React.StrictMode`, imports `src/style.css` |
| `App` | `src/App.jsx` | path-to-page switch, see [App Root](/modules/src-app.md) |

Build config lives in `vite.config.js`.

# Source Map

| Path | Concept |
| --- | --- |
| `src/App.jsx`, `src/main.jsx` | [App Root](/modules/src-app.md) |
| `src/components/Card.jsx` | [components/Card](/modules/src-components.md) |
| `src/pages/*.jsx` | [pages](/modules/src-pages.md) |
| `src/router.jsx` | [router](/modules/src-router.md) |
| `src/store.js` | [store](/modules/src-store.md) |
| `src/style.css` | [styles](/modules/src-styles.md) |

# Non-Source Directories

| Path | Contents |
| --- | --- |
| `.github/workflows/ui-correction.yml` | the UI-correction automation workflow |
| `.sage-maintenance/` | per-trace maintenance notes and prompts |
| `.ui-gen/corrections/` | per-trace correction result JSON |
| `.codebase-memory/graph.db.zst` | the knowledge graph this bundle is generated from |
