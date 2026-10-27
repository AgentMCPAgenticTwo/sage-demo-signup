---
type: Playbook
title: Common tasks
description: To change X, go to Y.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [playbook, howto]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T17:18:25Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 78b91de716644ab7bfc26c34d71b2176b39a35ee
    title: Codebase knowledge graph
status: stable
---

# Add, change or remove a password rule

Edit the `passwordRules` array at `src/pages/Signup.jsx:6`. Give the entry a
`label` (shown in `ul.rules` before submit), an `error` (shown after a failed
submit) and a `test(value)` predicate. `passwordErrors` and the rendered rule
list both derive from the array, so nothing else needs touching.

# Change how password errors are displayed

The error list is rendered inline in `Signup` as
`<ul className="message error" role="alert">`, guarded by `errors.length > 0`.
Styling is `ul.message` / `.message.error` in `src/style.css`. Note that
`submit` clears `error` when rule errors exist, so the single-`Message` slot and
the list never appear at once.

# Add a new page

1. Create `src/pages/<Name>.jsx` with a default-exported function component that
   renders a `Card` from `src/components/Card.jsx`.
2. Register it in the `routes` object at `src/App.jsx:7` under its kebab-cased
   path.
3. Link to it with `<Link to="/...">` from `src/router.jsx`.

See [src/App](/modules/src-app.md) and [src/pages](/modules/src-pages.md).

# Add a field to the sign-up form

Add the key to the `useState` initialiser in `Signup`, render a `<Field>` with
`value={form.<key>} onChange={set('<key>')}`, validate it in `submit`, and
include it in the `saveUser({ ... })` call.

# Add a form control type

`Field` spreads unknown props onto its `<input>` (`src/components/Card.jsx:10`),
so most HTML input attributes work without changing it. A non-`input` control
(select, textarea, checkbox layout) needs a new primitive in
[src/components](/modules/src-components.md).

# Change what is stored about an account

All reads and writes go through `src/store.js`. Change the object passed to
`saveUser` and whatever consumes it (`Login.submit` reads `password`, `Welcome`
reads `name` and `email`). Keys stay normalised with `.trim().toLowerCase()`.

# Make log out actually end the session

Today the Welcome "Log out" link only calls `navigate('/login')`. A real log out
needs a `sessionStorage.removeItem('acme-current')` helper added to
[src/store](/modules/src-store.md) and called from
`src/pages/Welcome.jsx`.

# Guard a page behind a session

Copy the pattern in `src/pages/Welcome.jsx`: read `currentUser()`, redirect in a
`useEffect`, and `return null` in the render body while unauthenticated. There is
no shared guard component.

# Change navigation behaviour

Everything funnels through `navigate` in `src/router.jsx:4`, which must keep
dispatching the synthetic `popstate` or `usePath` will stop updating.

# Restyle

`src/style.css` only, imported once from `src/main.jsx`. Reuse the existing
class names listed in [src/main and styling](/modules/src-entry.md).

# Run it

`npm install` then `npm run dev` (Vite). `npm run build` / `npm run preview` for
a production check. `@playwright/test` is installed but no specs are indexed in
the graph.
