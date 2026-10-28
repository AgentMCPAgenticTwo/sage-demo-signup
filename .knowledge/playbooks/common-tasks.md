---
type: Playbook
title: Common Tasks
description: Where to go to change routes, fields, validation, styling or storage.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [playbook, howto]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:19:54Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 8b5e972c95c0d30e9afcad3fc02c3eb1ec018b87
    title: Codebase knowledge graph
status: stable
---

# Quick Map

| To change... | Go to |
| --- | --- |
| Which page a URL shows | `routes` in `src/App.jsx:7` |
| Navigation behaviour or the Back button | `src/router.jsx` |
| Form fields and their copy | the relevant file in `src/pages/` |
| Validation rules and error text | the page's `submit` function |
| Shared markup for cards, inputs, messages | `src/components/Card.jsx` |
| How accounts are read or written | `src/store.js` |
| Any visual styling | `src/style.css` |
| Page `<title>`, fonts, meta tags | `index.html` |

# Add a new page

1. Create `src/pages/<Name>.jsx` with a default-exported function component
   wrapped in `Card` (see [src/pages](/modules/src-pages.md)).
2. Import it in `src/App.jsx` and add a kebab-cased entry to `routes`.
3. Link to it from an existing page with `<Link to="/<name>">`.

# Add a field to sign-up

1. Add the key to the `useState` object in `src/pages/Signup.jsx:7`.
2. Render a `<Field ... value={form.x} onChange={set('x')} />` inside the form.
3. If it must be persisted, include it in the `saveUser({...})` call — and
   update the user shape documented in [src/store](/modules/src-store.md).

# Change a validation rule

Edit the early-return block in the page's `submit`. Keep the pattern: set one
`error` string and `return`; `Message` does the rendering and the ARIA role.

# Make "Log out" actually sign out

`Welcome` currently renders a `Link` to `/login` without clearing the session.
Add a `clearCurrentUser`-style export next to `setCurrentUser` in
`src/store.js` that removes `acme-current`, and call it from a button handler
in `src/pages/Welcome.jsx`.

# Replace localStorage with a real backend

`src/store.js` is the only module that touches browser storage, and
`KEY`/`load` are private to it. Keep the four exported function signatures
(`findUser`, `saveUser`, `setCurrentUser`, `currentUser`) and the pages need no
change — though async versions would require the callers in
[src/pages](/modules/src-pages.md) to await.

# Run it

`npm install`, then `npm run dev`. `npm run build` / `npm run preview` for the
production bundle. See [Codebase Overview](/overview.md).
