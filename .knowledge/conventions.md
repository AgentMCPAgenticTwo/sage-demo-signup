---
type: Convention
title: Conventions
description: File, routing, form and storage conventions every page in this app follows.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [conventions, react, forms]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:35:21Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ af0eb7e28c6d901616970ef2450db466024c0fd3
    title: Codebase knowledge graph
status: stable
---

# Files and exports

* Components live in `.jsx`; plain logic lives in `.js` (`src/store.js`).
* A page is a **default** export named after its file (`Signup`, `Login`,
  `Welcome`). Shared helpers are **named** exports (`Card`, `Field`,
  `Message`, `navigate`, `usePath`, `Link`, `findUser`, `saveUser`,
  `setCurrentUser`, `currentUser`).
* Imports inside `src/` always carry the file extension
  (`'../components/Card.jsx'`), because Vite is given no resolve aliases.

# Routing

* One page per file in `src/pages/`, registered in the `routes` object in
  `src/App.jsx`. The path is the kebab-cased file name.
* Never use a bare `<a>` for in-app links -- use `Link` from
  `src/router.jsx` so the click is intercepted and `navigate` runs.
* Unknown paths fall back to `Signup`.

# Forms

* Forms are controlled and carry `noValidate`, so validation is the
  component's own job rather than the browser's.
* The submit handler is a function named `submit` that calls
  `event.preventDefault()` first.
* `Signup` keeps all four inputs in a single `form` state object with a
  curried `set(key)` setter; `Login` keeps one `useState` per field.
* Validation returns early after setting an error -- it never throws.

# Messaging and accessibility

* User-visible errors render through `Message`, which returns `null` for
  empty children and sets `role="alert"` for `kind="error"` (the default) or
  `role="status"` for other kinds.
* Live regions get `aria-live="polite"` -- see the password rules list in
  `Signup`, which is tied to its input via `aria-describedby="password-rules"`.
* Every input is wrapped by `Field`, which renders a real `<label>` around
  the text and the control, and forwards all other props to `<input>`.
* `autoComplete` is always set: `name`, `email`, `new-password` on sign-up,
  `current-password` on log-in.

# Storage

* All reads and writes go through [src/store](/modules/src-store.md) -- pages
  never touch `localStorage` or `sessionStorage` directly.
* Emails are the primary key and are normalised with `.trim().toLowerCase()`
  on both lookup and save.

# Styling

* One global stylesheet, `src/style.css`, imported once from `src/main.jsx`.
* Class names are plain and semantic: `card`, `field`, `rules`, `rule`,
  `failed`, `message`, `error`, `ok`, `switch`.
