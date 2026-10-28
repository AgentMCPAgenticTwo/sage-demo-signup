---
type: Convention
title: Conventions
description: Naming, routing, styling and state conventions followed across the source.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [conventions, react, css]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T04:56:52Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 38fe79e86edef6544c50fc543f51f4f47b2379a8
    title: Codebase knowledge graph
status: stable
---

# Modules and imports

* ESM throughout (`"type": "module"`), with **explicit file extensions** on
  relative imports: `./router.jsx`, `../store.js`.
* Pages are **default** exports; shared primitives in
  `src/components/Card.jsx`, `src/router.jsx` and `src/store.js` are **named**
  exports.
* No path aliases; relative paths only.

# Routing

* One page component per file in `src/pages/`, routed by its kebab-cased file
  name in the `routes` map in `src/App.jsx` (`Signup` -> `/signup`).
* Navigation always goes through `navigate` or `Link` from
  [src/router](/modules/router.md) -- never `window.location` assignment.
* Unknown paths fall back to `Signup`.

# Components

* Props are destructured in the parameter list
  (`function Card({ title, children })`).
* `Field` forwards every remaining prop onto the `<input>` via rest spread, so
  inputs are configured from the call site, not by extending `Field`.
* `Message` renders nothing for empty children and picks its ARIA role from
  `kind`: `alert` for `error`, otherwise `status`.
* Markup is semantic: `<main className="card">`, `<label className="field">`,
  real `<form>` elements with `onSubmit`.

# Forms and state

* Controlled inputs backed by `useState`; `Signup` keeps one `form` object with
  a curried `set(key)` updater, `Login` keeps a `useState` per field.
* Forms carry `noValidate` -- validation is explicit in the `submit` handler,
  which calls `event.preventDefault()` first and returns early after
  `setError(...)`.
* `autoComplete` is always set (`name`, `email`, `new-password`,
  `current-password`).
* Errors are plain sentence-case strings rendered through `Message`.

# Storage

* Emails are the account key and are normalised with `.trim().toLowerCase()`
  before any read or write (see [src/store](/modules/store.md)).
* `localStorage` holds the account map under `acme-users`; `sessionStorage`
  holds the signed-in email under `acme-current`.
* Reads are defensive: `load()` returns `{}` on parse failure.

# Styling

* A single global stylesheet, `src/style.css`, imported once from
  `src/main.jsx`.
* Colours, radius and spacing come from CSS custom properties on `:root`
  (`--accent`, `--ink`, `--line`, `--radius`, `--gap`, ...) -- add a token
  rather than a literal.
* Class names are flat and semantic (`card`, `field`, `message`, `switch`); no
  CSS modules, no utility classes, no inline styles.
