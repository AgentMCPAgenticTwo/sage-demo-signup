---
type: Module
title: Build configuration
description: Vite configuration, package scripts and declared dependencies.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/vite.config.js
tags: [build, vite, tooling]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:44:46Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ e05c9763bafd1094d0ab184ec6d101f963d09410
    title: Codebase knowledge graph
status: stable
---

# Files

| File | Contents |
| --- | --- |
| `vite.config.js` | `defineConfig({ plugins: [react()] })` — no aliases, no server overrides |
| `package.json` | `sage-demo-signup` 0.2.0, `"type": "module"`, `"private": true`, scripts and dependencies |
| `index.html` | Vite's HTML entry, consumed as the build input |

# Dependencies

| Scope | Package | Version |
| --- | --- | --- |
| dependencies | `react` | 18.3.1 |
| dependencies | `react-dom` | 18.3.1 |
| devDependencies | `vite` | 5.4.10 |
| devDependencies | `@vitejs/plugin-react` | 4.3.3 |
| devDependencies | `@playwright/test` | 1.47.2 |

# Scripts

`npm run dev` (vite dev server) · `npm run build` (production build to `dist/`)
· `npm run preview` (serve the build).

# Relationships

* Builds the entry chain described in [App shell](/modules/src-app.md).
* The `react` plugin is what lets `.jsx` files in
  [Pages](/modules/src-pages.md) and [Components](/modules/src-components.md)
  compile without extra configuration.

# Notes

* `@playwright/test` is installed but the repository contains no spec files —
  there is no test script.
* Because the config sets no `base` or history fallback beyond Vite's default,
  deep links such as `/reset-password` rely on the dev/preview server's
  index fallback.
* Dependencies are intentionally minimal; see the dependency note in
  [Conventions](/conventions.md).
