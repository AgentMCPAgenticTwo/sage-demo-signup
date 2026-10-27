---
type: Module
title: src/main and styling
description: React entry point, index.html host page and the single global stylesheet.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/main.jsx
tags: [frontend, entry, styling, build]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T17:18:25Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 78b91de716644ab7bfc26c34d71b2176b39a35ee
    title: Codebase knowledge graph
status: stable
---

# Files

| File | Role |
| --- | --- |
| `index.html` | Vite's HTML entry; `<title>Acme Account</title>`, `<div id="root">`, module script `/src/main.jsx` |
| `src/main.jsx` | `createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)` and the sole `import './style.css'` |
| `src/style.css` | The one global stylesheet |
| `vite.config.js` | `defineConfig({ plugins: [react()] })` -- no aliases, proxy or custom build config |

# Boot path

`index.html` -> `src/main.jsx` -> [src/App](/modules/src-app.md). `StrictMode`
is on, so effects such as the `popstate` subscription in
[usePath](/modules/src-router.md) and the redirect in `Welcome` run twice in
development -- both are written to tolerate it.

# Stylesheet

`src/style.css` is plain CSS with semantic selectors and no preprocessor:

| Selector | Styles |
| --- | --- |
| `body` | page background and centering |
| `.card` | the shell rendered by `Card` |
| `form`, `.field`, `input`, `button` | form layout and controls |
| `.message`, `ul.message`, `.message.error`, `.message.ok` | `Message` and the Signup error list |
| `.rules` | the Signup password-rule list |
| `.switch`, `a` | the cross-page link footer |

New UI should reuse these classes rather than add inline styles -- see
[Conventions](/conventions.md).
