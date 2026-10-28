---
type: Convention
title: Conventions
description: Coding, routing, naming and styling conventions observed across the demo app.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [conventions, react, style]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:19:54Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 8b5e972c95c0d30e9afcad3fc02c3eb1ec018b87
    title: Codebase knowledge graph
status: stable
---

# Modules & Imports

* ES modules only (`"type": "module"`). Relative imports always carry the file
  extension: `'./router.jsx'`, `'../store.js'`.
* Page components are **default** exports (`Signup`, `Login`, `Welcome`);
  everything shared is a **named** export (`Card`, `Field`, `Message`,
  `navigate`, `usePath`, `Link`, `findUser`, `saveUser`, `setCurrentUser`,
  `currentUser`).
* No deep import chains — a page imports at most `components`, `router`,
  `store`, matching the boundaries in [Architecture](/architecture.md).

# Naming

| Thing | Convention | Example |
| --- | --- | --- |
| Component file | `PascalCase.jsx` | `src/pages/Signup.jsx` |
| Non-component module | `camelCase.js(x)` | `src/router.jsx`, `src/store.js` |
| Route path | kebab-cased page file name | `Signup.jsx` → `/signup` |
| Storage key | `acme-`-prefixed string | `acme-users`, `acme-current` |
| CSS class | lower-case single word | `card`, `field`, `switch`, `message` |

# Components

* Function components only, no classes; hooks for all state.
* Props are destructured in the signature; `Field` forwards the rest to the
  underlying `<input>` via `{...input}`.
* A component that has nothing to show returns `null` (`Message` with no
  children, `Welcome` with no user) rather than rendering an empty wrapper.
* Every screen is wrapped in `Card` with a `title`; the sign-in/sign-up
  cross-link sits in a trailing `<p className="switch">`.

# Forms

* `<form onSubmit={submit} noValidate>` — validation is done in JS, not by the
  browser, so the error copy is controlled by the app.
* `submit` always starts with `event.preventDefault()`, sets a single `error`
  string on failure and returns early; on success it calls `navigate(...)`.
* Inputs set `name`, `type` and `autoComplete` (`new-password` on sign-up,
  `current-password` on log-in) and are controlled via `value`/`onChange`.
* Errors surface through `Message`, which renders `role="alert"` for the
  `error` kind and `role="status"` otherwise.

# Storage

* All storage access goes through `src/store.js` — no page touches
  `localStorage` directly.
* Emails are the account key and are normalised with `.trim().toLowerCase()`
  on both read and write.
* `load()` wraps `JSON.parse` in `try/catch` and falls back to `{}` so corrupt
  storage cannot crash the app.

# Styling

* One global stylesheet, `src/style.css`, imported once from `src/main.jsx`.
  There are no CSS modules and no inline style objects.
* The Inter webfont is linked from `index.html`.
