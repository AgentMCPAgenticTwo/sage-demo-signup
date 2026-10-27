---
type: Convention
title: Conventions
description: Naming, routing, state and styling rules this codebase follows.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [conventions, react, style]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T17:18:25Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 78b91de716644ab7bfc26c34d71b2176b39a35ee
    title: Codebase knowledge graph
status: stable
---

# Files and naming

| Rule | Evidence |
| --- | --- |
| One page component per file in `src/pages/`, `PascalCase.jsx`, `export default` | `Signup.jsx`, `Login.jsx`, `Welcome.jsx` |
| A page's route is its kebab-cased file name, registered in the `routes` map | `src/App.jsx`, README |
| Shared primitives are **named** exports | `Card`, `Field`, `Message` |
| Imports always carry the extension (`./router.jsx`, `../store.js`) | every import in `src/` |
| Modules are ESM (`"type": "module"`) | `package.json` |

# React

* Function components only; hooks are `useState` / `useEffect` only.
* State is local to the page -- no context, reducer or store library.
* Multi-field forms hold one object in state and use a curried change handler:
  `const set = (key) => (event) => setForm({ ...form, [key]: event.target.value })`
  in `src/pages/Signup.jsx`. Single-field-per-`useState` is used in `Login.jsx`.
* Every `<form>` is `noValidate`; validation is explicit in `submit`.
* Side-effectful redirects go in a `useEffect`, never in the render body
  (`src/pages/Welcome.jsx`).

# Validation and messaging

* Validation rules are declared as data, not inlined branches: `passwordRules`
  in `src/pages/Signup.jsx` is an array of `{ label, error, test }`, and
  `passwordErrors(value)` maps the failing rules to their messages.
* `label` is what the user is told up front (rendered as `ul.rules`); `error` is
  what they are told after a failed submit.
* Single messages go through `Message`, which picks `role="alert"` for errors
  and `role="status"` otherwise. Lists of errors use
  `<ul className="message error" role="alert">`.

# Styling

* One global stylesheet, `src/style.css`, imported once from `src/main.jsx`.
* Plain semantic class names, no CSS modules or utility framework. Existing
  classes: `.card`, `.field`, `.message`, `.message.error`, `.message.ok`,
  `.rules`, `.switch`.

# Accessibility

* Inputs are wrapped by their `<label className="field">` (see `Field`).
* `autoComplete` is always set: `new-password` on sign-up, `current-password` on
  log in.
* The password input is tied to the rule list with
  `aria-describedby="password-rules"`.

# Data

* All persistence goes through `src/store.js`; pages never touch
  `localStorage` directly.
* Emails are normalised with `.trim().toLowerCase()` as the store key.

See [Common tasks](/playbooks/common-tasks.md) for where to apply these.
