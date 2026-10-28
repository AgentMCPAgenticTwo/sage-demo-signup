---
type: Convention
title: Conventions
description: File, routing, component and state conventions observed across the source tree.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [conventions, react, style]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:04:36Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 360fd597ded4ea1f388e555fd8458ad76d46ff8b
    title: Codebase knowledge graph
status: stable
---

# Files and Modules

* ESM everywhere (`"type": "module"`); import specifiers carry their extension
  (`'./router.jsx'`, `'../store.js'`).
* `.jsx` for anything that returns markup, `.js` for plain logic (`src/store.js`).
* One routed screen per file in `src/pages/`, named in PascalCase after the
  route (`Signup.jsx` -> `/signup`).

# Exports

| Kind | Convention | Example |
| --- | --- | --- |
| Page | default export | `export default function Login()` |
| Shared helper / primitive | named export | `export function Field(...)`, `export function findUser(...)` |
| Module-private helper | not exported | `load` in `src/store.js`, `onChange` in `src/router.jsx` |

# Components

* Function components only; no classes, no `memo`, no context.
* Shared primitives in `src/components/Card.jsx` are presentation-only -- they
  take props and never import `router` or `store`.
* `Field` spreads its rest props straight onto `<input>`, so any native input
  attribute works without changing the component.
* `Message` renders nothing for empty children and switches `role` between
  `alert` and `status` by `kind`.

# State and Forms

* Local `useState` only; there is no global state container.
* `Signup` keeps one `form` object and derives per-key handlers via
  `set(key)`; `Login` keeps a `useState` per field. Follow whichever file you
  are editing rather than unifying them.
* Forms carry `noValidate` and handle validation in `submit`, reporting through
  a single `error` string rendered by `Message`.
* Every `Field` sets `name`, `autoComplete` and `required`.

# Routing

* Add a route by adding an entry to `routes` in `src/App.jsx`; see
  [Common Tasks](/playbooks/common-tasks.md).
* In-app navigation uses `Link` for user-clickable links and `navigate` for
  programmatic redirects after a successful `submit`.

# Styling

* A single global stylesheet, `src/style.css`, imported once by `src/main.jsx`.
* Plain `className` strings matching the element's role (`card`, `field`,
  `message`, `switch`); no CSS modules, utility classes or inline styles.

# Comments

Sparse. Comments appear only where behaviour is non-obvious or risky -- the
demo-only warning at the top of `src/store.js`, the router's one-line summary,
and the routing note in `src/App.jsx`. Match that density.
