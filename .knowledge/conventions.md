---
type: Convention
title: Conventions
description: File, routing, form and styling conventions every page and component in this app follows.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [conventions, react, forms]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:44:46Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ e05c9763bafd1094d0ab184ec6d101f963d09410
    title: Codebase knowledge graph
status: stable
---

# Files and modules

| Convention | Detail |
| --- | --- |
| Extensions | `.jsx` for anything containing JSX, `.js` for plain modules (`src/store.js`) |
| Import specifiers | Always explicit and extensioned: `'./router.jsx'`, `'../store.js'` |
| Page naming | PascalCase file in `src/pages/`, routed by its kebab-cased name (`ResetPassword.jsx` → `/reset-password`) |
| Exports | Pages and `PasswordRules` are default exports; shared helpers are named exports |

# Routing

* Routes are declared in one place: the `routes` object in `src/App.jsx`.
* Unknown paths fall back to `Signup` (`routes[path] ?? Signup`).
* Never set `window.location` directly — use `navigate(path)` or `<Link to>`
  from [Router](/modules/src-router.md) so `usePath` observes the change.

# Forms

Every page follows the same shape:

1. Local `useState` per field (`Signup` uses one `form` object plus a curried
   `set(key)` change handler; the other pages use one state per field).
2. `<form onSubmit={submit} noValidate>` — native validation is disabled and
   `submit` starts with `event.preventDefault()`.
3. Inputs are rendered through `Field`, never a bare `<input>`, and always carry
   `name`, `autoComplete` and `required`.
4. Validation failures call `setError(...)` and `return` early; success ends in
   `navigate(...)`.
5. Errors render through `<Message>` placed directly above the submit button.
   `Message` returns `null` for empty children, so the error state starts `''`.
6. A `<p className="switch">` with a `Link` sits after the form for cross-links.

# Account data

* Emails are the store key and are normalised with `.trim().toLowerCase()`
  inside [Store](/modules/src-store.md) — callers pass raw input.
* A stored user is `{ name, email, password }`; update it by spreading the
  existing record (`saveUser({ ...user, password })`).
* `autoComplete` reflects intent: `new-password` when choosing,
  `current-password` when logging in.

# Styling

* One global stylesheet, `src/style.css`, imported once from `src/main.jsx`.
* Styling is by semantic class name only — `card`, `field`, `message`,
  `message error`, `message ok`, `rules`, `rule`, `rule error`, `switch`. No
  inline styles, CSS modules or utility classes.
* `Message` picks `role="alert"` for `kind === 'error'` and `role="status"`
  otherwise; keep that accessibility pairing when adding feedback.

# Dependencies

React and Vite only. There is no router, form or state library — prefer
extending `src/router.jsx` or `src/store.js` over adding one.
