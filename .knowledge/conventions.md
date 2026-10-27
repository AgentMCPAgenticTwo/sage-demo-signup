---
type: Convention
title: Conventions
description: Naming, routing, styling and validation conventions followed across the demo app.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [conventions, react, style]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T23:34:47Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 9e0695a13b39e00939f996e6665b83350960de3e
    title: Codebase knowledge graph
status: stable
---

# Files and modules

* ESM only (`"type": "module"`). Imports of local files **include the extension**
  (`'../components/Card.jsx'`, `'../store.js'`) — keep doing this.
* Components live in `.jsx`, plain logic in `.js` (`src/store.js`).
* One page per file in `src/pages/`, `PascalCase` filename, **default export**
  named after the file (`Signup`, `Login`, `Welcome`).
* Shared primitives use **named exports** (`Card`, `Field`, `Message`,
  `navigate`, `usePath`, `Link`, `findUser`, `saveUser`).

# Routing

* Routes are a literal object in `src/App.jsx`: path string -> page component.
* `/signup` is the implicit fallback (`routes[path] ?? Signup`).
* Navigate with `navigate('/path')` or render `<Link to="/path">`; never touch
  `window.history` from a page. See [router](/modules/router.md).

# Components

* Pages render exactly one `<Card title="...">` wrapper from
  [Card components](/modules/components-card.md).
* Inputs go through `Field`, which spreads every remaining prop onto the raw
  `<input>` — pass `type`, `name`, `autoComplete`, `required` directly.
* Forms carry `noValidate` and handle validation in JS, so the messaging is
  consistent rather than browser-native.

# State

* Local `useState` only. `Signup` keeps one `form` object and updates it through
  the curried `set(key)` helper; `Login` keeps one `useState` per field.
* No context, no reducer, no external state library.

# Validation and messaging

* Rules are **data, not branches**: `PASSWORD_RULES` in
  [Signup page](/modules/pages-signup.md) is an array of
  `{ hint, error, test }`, and the same array drives both the live hint list and
  the submit-time errors. Add a rule by appending an entry, not by writing an
  `if`.
* Single errors render through `Message`; multiple errors render as a
  `<ul className="message error" role="alert">`. Either way the container
  carries `role="alert"`.
* Error strings are full sentences ending in a period
  ("Passwords do not match.").

# Storage

* Only `src/store.js` may call `localStorage` / `sessionStorage`.
* Emails are the account key and are always normalised with
  `.trim().toLowerCase()` before lookup or write.
* `load()` swallows parse failures and returns `{}` — storage reads never throw.

# Styling

* One global stylesheet, `src/style.css`, imported once in `src/main.jsx`.
* Plain semantic class names (`card`, `field`, `switch`, `hints`,
  `message error`). No CSS modules, no utility framework, no inline styles.
