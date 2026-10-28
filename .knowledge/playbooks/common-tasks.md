---
type: Playbook
title: Common Tasks
description: Where to go to add a page, a field, a validation rule or a style token.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [playbook, howto]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T04:56:52Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 38fe79e86edef6544c50fc543f51f4f47b2379a8
    title: Codebase knowledge graph
status: stable
---

# Run it

```bash
npm install
npm run dev        # vite dev server
npm run build      # production bundle
npm run preview    # serve the build
```

# Add a page

1. Create `src/pages/<Name>.jsx` with a default-exported component that
   renders `<Card title="...">` from [src/components](/modules/components.md).
2. Add `'/<kebab-name>': <Name>` to the `routes` object in `src/App.jsx`
   (line 7) and import it -- see [src/App](/modules/app.md).
3. Link to it with `<Link to="/<kebab-name>">` from
   [src/router](/modules/router.md); never set `window.location`.

# Add a field to a form

* `src/pages/Signup.jsx`: add the key to the `useState` initialiser (line 7),
  then render `<Field label="..." name="..." value={form.key}
  onChange={set('key')} ... />`. `set` is the curried updater at line 10.
* `src/pages/Login.jsx` uses one `useState` per field -- add another.
* `Field` spreads unknown props onto the `<input>`, so `type`,
  `autoComplete` and `required` go on the call site, not into `Field`.

# Add or change a validation rule

Edit the `submit` handler of the page
([src/pages](/modules/pages.md)): `Signup.submit` at `src/pages/Signup.jsx:12`,
`Login.submit` at `src/pages/Login.jsx:11`. Follow the existing shape -- check,
`setError('Sentence case message.')`, `return`. The message renders through
`Message`, which is already in the tree.

# Change what is stored about a user

Edit `src/store.js` ([src/store](/modules/store.md)) and the `saveUser({...})`
call in `Signup.submit`. Keep the email normalisation
(`.trim().toLowerCase()`) -- `findUser`, `saveUser` and `currentUser` all rely
on it to agree on the map key.

# Make "Log out" actually sign out

Today `Welcome`'s log-out `Link` only navigates. A real sign-out needs a new
exported function in `src/store.js` that removes `acme-current` from
`sessionStorage`, called from `src/pages/Welcome.jsx` before navigating.

# Restyle

Change the custom properties in `:root` at the top of `src/style.css`
([styling](/modules/styling.md)) rather than individual rules -- `--accent`,
`--ink`, `--radius` and `--gap` propagate to every screen. The font is loaded
in `index.html`.

# Before changing a hot symbol

`navigate`, `Card` and `findUser` have the highest fan-in
([Architecture](/architecture.md)). Check their callers with the graph first:

```
trace_path(project="sage-demo-signup", ...)   # see /reference/graph-queries.md
```
