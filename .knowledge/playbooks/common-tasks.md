---
type: Playbook
title: Common Tasks
description: Where to go to change a page, a route, a form field or the account store.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [playbook, how-to]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:04:36Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 360fd597ded4ea1f388e555fd8458ad76d46ff8b
    title: Codebase knowledge graph
status: stable
---

# Add a page

1. Create `src/pages/<Name>.jsx` with a default-exported function component
   wrapping its content in `Card`.
2. Import it in `src/App.jsx` and add a `routes` entry keyed by the kebab-cased
   path.
3. Link to it with `Link` from `src/router.jsx`.

See [src/App](/modules/src-app.md) and [src/pages](/modules/src-pages.md).

# Add or change a form field

Edit the page in `src/pages/`. Add a `<Field>` with `label`, `name`,
`autoComplete` and any input attributes -- `Field` spreads rest props onto the
`<input>`, so [src/components](/modules/src-components.md) needs no change.
In `Signup`, wire `value={form.<key>}` and `onChange={set('<key>')}` and add the
key to the `useState` initialiser; in `Login`, add a `useState` pair.

# Change validation or an error message

All validation lives in the page's `submit`, before the navigation call. Set the
single `error` string; `Message` renders it with `role="alert"`. See the
ordering in [src/pages](/modules/src-pages.md).

# Change what a user record stores

Edit `saveUser` in `src/store.js` and the `saveUser({...})` call in
`src/pages/Signup.jsx` together, then any reader (`Welcome` uses `user.name`,
`Login` uses `user.password`). Keep the `.trim().toLowerCase()` email key --
see the invariants in [src/store](/modules/src-store.md).

# Change navigation behaviour

`navigate` and `Link` in `src/router.jsx` are the only navigation paths; they
have the highest fan-in in the project, so verify all three pages after a
change. The redirect-if-signed-out guard is the effect in
`src/pages/Welcome.jsx`.

# Add a real log out

There is deliberately no `logout` in `src/store.js`. Adding one means a new
export that removes `acme-current` from `sessionStorage`, plus turning the
`Welcome` "Log out" `Link` into a button that calls it and then `navigate`.

# Restyle

Edit `src/style.css`; target the existing `card`, `field`, `message` and
`switch` class names rather than introducing a styling system -- see
[Conventions](/conventions.md).

# Run it

`npm install`, then `npm run dev`. `npm run build` and `npm run preview` for the
production bundle.
