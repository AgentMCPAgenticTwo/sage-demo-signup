---
type: Convention
title: Conventions
description: File, naming, routing and styling conventions used throughout the demo app.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [conventions, react, style]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:27:27Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ af863cd5d6567cf6b64d2fc625952a185971b018
    title: Codebase knowledge graph
status: stable
---

# Files and Exports

| Convention | Evidence |
| --- | --- |
| Components live in `.jsx`, plain logic in `.js` | `src/router.jsx` vs `src/store.js` |
| Pages default-export one PascalCase component named after the file | `Signup`, `Login`, `Welcome` |
| Shared modules use named exports only | `Card`, `Field`, `Message`; `navigate`, `usePath`, `Link`; `findUser`, `saveUser`, `setCurrentUser`, `currentUser` |
| Relative imports always carry the extension | `'../components/Card.jsx'`, `'../store.js'` |
| One page per file under `src/pages/` | `src/pages/Signup.jsx`, `Login.jsx`, `Welcome.jsx` |

# Routing

* A page's URL is its lower-cased file name: `Signup.jsx` → `/signup`.
* Routes are registered by hand in the `routes` object at `src/App.jsx:7`; adding a
  file is not enough.
* Unknown paths fall back to `Signup` (`src/App.jsx:15`).
* In-app links use `Link` from `src/router.jsx`; post-submit redirects use `navigate`.
  Raw `<a href>` is not used for internal navigation.

# Forms

* Every form is `noValidate` and submits through a local `submit(event)` that calls
  `event.preventDefault()` first.
* Inputs are controlled and rendered via `Field`, which spreads all props other than
  `label` onto the `<input>`.
* Each field sets `name` and an `autoComplete` value (`name`, `email`,
  `new-password` on signup, `current-password` on login).
* Validation is inline in `submit`, sets a single `error` string, and returns early.
  The string is rendered by `Message`, which returns `null` when empty.
* `Signup` keeps one `form` object plus a curried `set(key)` change handler
  (`src/pages/Signup.jsx:10`); `Login` keeps one `useState` per field. Follow the
  surrounding file rather than unifying the two.

# Accessibility

* `Field` wraps the input in a `<label>` so no `htmlFor`/`id` pairing is needed.
* `Message` sets `role="alert"` for `kind="error"` (the default) and `role="status"`
  otherwise.
* `Card` renders a `<main className="card">` with the title as the page `<h1>`.

# Styling

* All styling is global CSS in `src/style.css`, imported once from `src/main.jsx`.
* Markup uses a small fixed class vocabulary: `card`, `field`, `message`,
  `message error` / `message ok`, `switch`. `Message` composes the second class
  from its `kind` prop, so only `error` and `ok` have styling in `src/style.css`.
* No inline `style` props, CSS modules, or CSS-in-JS.

# Storage

* Only [store](/modules/src-store.md) reads or writes browser storage.
* Emails are normalised with `.trim().toLowerCase()` at every lookup and write;
  do the same for any new key.
* Storage reads are defensive — `load()` returns `{}` on parse failure.

# Comments

Comments are rare and explain intent at the top of a module (for example the
demo-only warning in `src/store.js:1` and the routing note in `src/App.jsx:6`).
Match that density; do not annotate obvious lines.
