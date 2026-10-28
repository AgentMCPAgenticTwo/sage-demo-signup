---
type: Playbook
title: Common Tasks
description: Where to go to change pages, fields, routes, validation or storage.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [playbook, how-to]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:27:27Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ af863cd5d6567cf6b64d2fc625952a185971b018
    title: Codebase knowledge graph
status: stable
---

# Quick Map

| To change… | Go to |
| --- | --- |
| Which page a URL shows | `routes` at `src/App.jsx:7` |
| Signup fields or validation | `src/pages/Signup.jsx` |
| Login validation or error copy | `src/pages/Login.jsx` |
| The signed-in screen | `src/pages/Welcome.jsx` |
| Input/label/error markup | `src/components/Card.jsx` |
| Colours, spacing, focus rings | `src/style.css` |
| How accounts or sessions persist | `src/store.js` |
| Link clicks or back/forward behaviour | `src/router.jsx` |

# Add a Page

1. Create `src/pages/<Name>.jsx` with a default-exported `<Name>` component wrapped in
   `Card`.
2. Import it in `src/App.jsx` and add `'/<name>': <Name>` to `routes` (`src/App.jsx:7`)
   — the route table is manual.
3. Link to it with `Link` from `src/router.jsx`, never a bare `<a href>`.

See [App Root](/modules/src-app.md) and [pages](/modules/src-pages.md).

# Add a Field to Signup

1. Add the key to the `useState` initialiser at `src/pages/Signup.jsx:7`.
2. Render a `<Field …>` with `name`, `autoComplete` and `onChange={set('<key>')}`.
3. If it must be persisted, include it in the `saveUser({...})` call at
   `src/pages/Signup.jsx:22`; the stored record shape is described in
   [store](/modules/src-store.md).

`Login` uses one `useState` per field instead — follow whichever file you are editing.

# Add a Validation Rule

Put it in that page's `submit` (`src/pages/Signup.jsx:12` or `src/pages/Login.jsx:11`),
before the success path. Set a single `error` string and `return` early; `Message`
renders it and hides itself when empty. Keep login failures generic — the existing code
deliberately does not distinguish "no such user" from "wrong password".

# Change Error or Success Styling

`Message` builds its class as `message ${kind}` (`src/components/Card.jsx:19`) and its
ARIA role from the same prop. A new `kind` needs a matching `.message.<kind>` rule in
`src/style.css`, which currently covers `error` and `ok` only.

# Implement Real Logout

Today the "Log out" link in `src/pages/Welcome.jsx:18` only navigates to `/login`;
`sessionStorage['acme-current']` survives. A real logout means adding a clearing
function to `src/store.js` next to `setCurrentUser` (`src/store.js:22`) and calling it
from the link handler.

# Redirect After an Action

Call `navigate('/path')` from `src/router.jsx` — as `Signup.submit` and `Login.submit`
already do. Do not assign to `window.location`; that bypasses `usePath` and reloads the
app.

# Run It

`npm run dev` for the Vite dev server, `npm run build` then `npm run preview` for the
production bundle. See [Overview](/overview.md).
