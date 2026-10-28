---
type: Convention
title: Project conventions
description: Naming, routing, styling and state conventions the code follows.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [conventions, style, react]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:11:52Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 11cbd71eed22e7124383102d0584b2397653d88d
    title: Codebase knowledge graph
status: stable
---

# Conventions

## Files and exports

| Rule | Evidence |
| --- | --- |
| Components live in `.jsx`; plain logic in `.js` | `src/store.js` is the only `.js` module in `src/` |
| Page components are **default** exports, one per file in `src/pages/` | `Signup`, `Login`, `Welcome` |
| Shared helpers are **named** exports | `Card`, `Field`, `Message`, `navigate`, `usePath`, `Link`, `findUser`, `saveUser`, `setCurrentUser`, `currentUser` |
| Imports always carry the file extension | `./router.jsx`, `../store.js` |
| A page's route is its kebab-cased file name, registered in `routes` | `src/App.jsx` lines 7-11; also stated in `README.md` |

## Routing

* Never use `<a href>` for internal links -- use `Link` from `src/router.jsx`,
  which calls `preventDefault()` and then `navigate`.
* Programmatic moves use `navigate(path)`; it is the only writer of history.
* `App` falls back to `Signup` for unknown paths rather than rendering a 404.

## Forms

* Every form is `<form onSubmit={submit} noValidate>` -- validation is manual
  inside `submit`, not delegated to the browser.
* Inputs are always wrapped by `Field`, which renders `<label class="field">`
  with a `<span>` caption; it spreads all remaining props onto the `<input>`.
* `autoComplete` is set deliberately: `new-password` on sign-up,
  `current-password` on log-in.
* Errors are surfaced through `Message`, which renders nothing when empty and
  picks `role="alert"` for `kind="error"`, `role="status"` otherwise.

## State

* Component state is local `useState`. `Signup` holds one `form` object and
  updates it through the curried `set(key)` helper; `Login` holds separate
  `email` / `password` fields.
* Cross-page state is not lifted -- it is re-read from Web Storage.
* Emails are normalised with `.trim().toLowerCase()` as the storage key, while
  the display copy keeps the user's original casing.

## Styling

* A single global stylesheet, `src/style.css` (142 lines), imported once from
  `src/main.jsx`.
* Design tokens are CSS custom properties on `:root`: `--bg`, `--card`,
  `--ink`, `--muted`, `--line`, `--accent`, `--accent-strong`, `--accent-soft`,
  `--error`, `--ok`, `--radius`, `--shadow`, `--shadow-lift`. Use these rather
  than literal colours.
* Class names are flat and semantic -- `.card`, `.field`, `.message`,
  `.switch`. No CSS modules, no utility framework, no inline styles.
* The typeface is Inter, preconnected and loaded in `index.html`, with a
  system-font fallback stack.
