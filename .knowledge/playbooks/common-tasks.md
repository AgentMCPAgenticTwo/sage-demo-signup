---
type: Playbook
title: Common tasks
description: To change X, go to Y.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [playbook, howto]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:11:52Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 11cbd71eed22e7124383102d0584b2397653d88d
    title: Codebase knowledge graph
status: stable
---

# Common tasks

## Add a page

1. Create `src/pages/<Name>.jsx` with a default-exported component that renders
   a `Card`.
2. Register it in `routes` in `src/App.jsx` (line 7) under its kebab-cased
   path. This step is manual -- nothing auto-discovers the directory.
3. Link to it with `Link` from `src/router.jsx`, never a bare `<a href>`.

See [src](/modules/src.md) and [src/pages](/modules/src-pages.md).

## Add a field to the sign-up form

1. Add the key to the `useState` initialiser in `Signup` (`src/pages/Signup.jsx`
   line 7).
2. Render a `<Field …  value={form.key} onChange={set('key')} />` inside the
   `<form>`.
3. If it must be persisted, include it in the object passed to `saveUser`
   (line 22) -- the store writes whatever record it is given.

## Change validation or error copy

All of it is inline in the two `submit` functions:
`src/pages/Signup.jsx` line 12 and `src/pages/Login.jsx` line 11. Messages are
rendered by `Message` from `src/components/Card.jsx`. Keep the log-in failure
message ambiguous -- see [src/pages](/modules/src-pages.md).

## Change how accounts are stored

Everything is in `src/store.js` ([store](/modules/src-store.md)). Keep the four
exported function signatures (`findUser`, `saveUser`, `setCurrentUser`,
`currentUser`) and the pages need no edits. `KEY` (line 2) controls the
`localStorage` namespace; the session key `acme-current` is inline in
`setCurrentUser` / `currentUser`.

## Make "Log out" actually log out

`Welcome` currently renders a `Link to="/login"`
(`src/pages/Welcome.jsx`). Clearing the session needs a new store export that
removes `acme-current` from `sessionStorage`, called before `navigate('/login')`.

## Restyle

Edit the tokens on `:root` in `src/style.css` for global changes, or the
`.card` / `.field` / `.message` / `.switch` rules for component-level ones.
There is no component-scoped CSS. The webfont is declared in `index.html`.

## Change routing behaviour

`src/router.jsx` ([router](/modules/src-router.md)). To support query strings
or hashes, widen `usePath` beyond `window.location.pathname` and keep the
`popstate` dispatch in `navigate` -- it is what makes `pushState` observable.

## Run and inspect

```bash
npm install
npm run dev      # vite dev server
npm run build    # bundle into dist/
npm run preview  # serve the bundle
```

Clear state while testing with `localStorage.removeItem('acme-users')` and
`sessionStorage.removeItem('acme-current')` in the browser console.
