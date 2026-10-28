---
type: Module
title: build
description: Vite build configuration and the generated dist bundle.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/vite.config.js
tags: [build, vite, tooling]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:11:52Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 11cbd71eed22e7124383102d0584b2397653d88d
    title: Codebase knowledge graph
status: stable
---

# build

## Files

| File | Role |
| --- | --- |
| `vite.config.js` | `defineConfig({ plugins: [react()] })` -- nothing else is configured |
| `index.html` | Vite's entry document; it is the build input, not a static asset |
| `package.json` | Scripts and the dependency set |

Everything else is default Vite behaviour: `index.html` at the root is the
entry, `dist/` is the output, and `src/style.css` is bundled because
`src/main.jsx` imports it.

## Dependencies

| Package | Version | Kind |
| --- | --- | --- |
| `react` | 18.3.1 | runtime |
| `react-dom` | 18.3.1 | runtime |
| `vite` | 5.4.10 | dev |
| `@vitejs/plugin-react` | 4.3.3 | dev |
| `@playwright/test` | 1.47.2 | dev |

`@playwright/test` is installed but no spec files are present in the graph --
visual checks are driven by the correction workflow in
`.github/workflows/ui-correction.yml`.

## Gotchas

* There is no `base` setting, so the build assumes it is served from the
  domain root.
* No SPA fallback is configured for `vite preview` beyond its default; a
  third-party static host must rewrite unknown paths to `index.html` for the
  deep links described in [router](/modules/src-router.md).
