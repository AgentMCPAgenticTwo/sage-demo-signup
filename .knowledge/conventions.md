---
type: Convention
title: Conventions
description: Coding and structural conventions followed across the `src/` tree.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [conventions, react, style]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T23:47:28Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ ca10a42e2a13be0442234c6be972f2a13f83ee63
    title: Codebase knowledge graph
status: stable
---

# File and module layout

| Convention | Detail |
| --- | --- |
| Page per route | One file in `src/pages/`, named in PascalCase, routed by its kebab-cased name (`ResetPassword.jsx` → `/reset-password`) |
| Default export | Every page default-exports its component; `src/App.jsx` default-exports `App` |
| Named exports | `src/router.jsx`, `src/store.js` and `src/components/Card.jsx` use named exports only |
| Explicit extensions | Imports always carry `.jsx` / `.js` (`'../components/Card.jsx'`) |
| Relative imports | Pages reach siblings with `../`; there are no path aliases |

# Component conventions

* Function components only; no classes anywhere in the graph.
* Hooks used: `useState` for form state and errors, `useEffect` for the
  `popstate` subscription in `usePath` and the auth guard in `Welcome`.
* Multi-field forms keep a single `form` object in state plus a curried
  `set(key)` change handler (`Signup`, `ResetPassword`); the two-field `Login`
  uses separate `useState` calls instead.
* Forms carry `noValidate` and `onSubmit={submit}`; every `submit` starts with
  `event.preventDefault()`.
* Validation is inline in `submit`, surfaced through a single `error` string
  rendered by `Message`. Error copy is a full sentence ending in a period.
* Screens are wrapped in `Card` with a `title` prop; secondary navigation sits
  in a `<p className="switch">` containing a `Link`.
* `Field` spreads its remaining props onto the `<input>`, so inputs are
  configured by passing `name`, `type`, `autoComplete`, `value`, `onChange`
  and `required` straight to `Field`.
* `autoComplete` is always set: `email`, `current-password` for login,
  `new-password` for signup and reset, `name` for full name.

# Accessibility

* `Message` renders `role="alert"` for `kind === 'error'` and `role="status"`
  otherwise, and renders nothing when `children` is empty.
* `Field` wraps the input in a `<label>` so the text and control are associated
  without an `htmlFor`/`id` pair.
* `Link` renders a real `<a href>` and only calls `preventDefault` in its
  click handler, so middle-click and keyboard activation still work.

# Styling

All CSS lives in `src/style.css`, imported once from `src/main.jsx`. Components
use plain `className` strings (`card`, `field`, `message`, `switch`); there are
no CSS modules, styled-components or utility frameworks.

# Comments

Each core file opens with a single orienting comment (for example the
"Demo-only account store in localStorage" note at the top of `src/store.js`).
Follow that density — one comment per file, no inline narration.

See [Common Tasks](/playbooks/common-tasks.md) for how to apply these when
making a change.
