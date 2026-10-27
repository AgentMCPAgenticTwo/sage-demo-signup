---
type: Playbook
title: Common Tasks
description: Where to go to add a route, a field, a validation rule or a style.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [playbook, how-to]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T23:47:28Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ ca10a42e2a13be0442234c6be972f2a13f83ee63
    title: Codebase knowledge graph
status: stable
---

# Add a new screen

1. Create `src/pages/<Name>.jsx` with a default-exported function component.
2. Copy the skeleton from an existing page (see [pages](/modules/pages.md)):
   `Card` → `form onSubmit={submit} noValidate` → `Field`s → `Message` →
   submit `button` → `p.switch` with a `Link`.
3. Register the kebab-cased path in the `routes` map at `src/App.jsx:8`.
4. Link to it from wherever the user should reach it, using `Link` from
   [router](/modules/router.md).

# Add a field to an existing form

* `Signup` / `ResetPassword`: add the key to the `useState` object literal and
  render `<Field ... value={form.<key>} onChange={set('<key>')} />`.
* `Login`: add another `useState` pair, matching the existing style.
* Always pass `name`, `type` and `autoComplete`; `Field` forwards them to the
  `<input>`.

# Change validation or error copy

All validation is inline at the top of each page's `submit`:
`src/pages/Signup.jsx:12`, `src/pages/Login.jsx:11`,
`src/pages/ResetPassword.jsx:12`. Set the single `error` string and `return`
early; `Message` renders it with `role="alert"`. Keep `Login`'s combined
"Email or password is incorrect." wording if you want to avoid account
enumeration.

# Change how accounts are stored

Everything touching browser storage is in `src/store.js`
([store](/modules/store.md)). Keep email normalisation (`trim().toLowerCase()`)
inside the store so pages can pass raw input. The persisted record shape is
`{ name, email, password }`.

# Change navigation behaviour

`navigate`, `usePath` and `Link` in `src/router.jsx`
([router](/modules/router.md)). `navigate` must keep dispatching a `popstate`
event or no page will re-render after a redirect.

# Restyle

Edit `src/style.css` and target the existing class names `card`, `field`,
`message`, `message error`, `message status`, `switch`. Add new class names
rather than inline styles — see [Conventions](/conventions.md).

# Run it

```
npm install
npm run dev      # vite dev server
npm run build    # production build
npm run preview  # serve the build
```
