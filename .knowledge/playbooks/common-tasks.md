---
type: Playbook
title: Common tasks
description: To change X, go to Y.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [playbook, howto]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T03:58:25Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 33f196c6383d96b07ef0b9ef85db894b4859243c
    title: Codebase knowledge graph
status: stable
---

# Common tasks

## Add a page

1. Create `src/pages/<Name>.jsx` with a default-exported component wrapping
   its content in `<Card title=...>`.
2. Import it in `src/App.jsx` and add `'/<kebab-name>': <Name>` to `routes`.
3. Link to it with `<Link to="/<kebab-name>">` from
   [router](/modules/src-router.md) -- never a bare `<a href>`.

Unlisted paths fall through to `Signup`, so a missing `routes` entry looks
like "the signup page keeps showing".

## Add a field to a form

Edit the page in `src/pages/`. In `Signup`, add the key to the `useState`
initialiser and render `<Field ... value={form.key} onChange={set('key')} />`;
in `Login`, add a matching `useState` pair. `Field` forwards any native
input prop, so no change to `src/components/Card.jsx` is needed.

## Change a validation rule or error message

The messages are literals inside the `submit` handlers:
`src/pages/Signup.jsx:12` and `src/pages/Login.jsx:11`. Keep the login
failure message generic so it does not disclose which emails exist.

## Change what is stored per account

`saveUser` in `src/store.js:16` writes the row; add the field there and in
`Signup.submit`. Existing rows in `localStorage` will lack it -- read
defensively or clear the `acme-users` key while developing.

## Add a real sign-out

`Welcome`'s "Log out" link only navigates. Add a `clearCurrentUser` export
to `src/store.js` that removes `acme-current` from `sessionStorage`, call it
from a button handler in `src/pages/Welcome.jsx`, then `navigate('/login')`.

## Protect a page behind a session

Copy the pattern at `src/pages/Welcome.jsx:9` -- read `currentUser()`,
redirect from a `useEffect` when it is `null`, and return `null` for that
render.

## Restyle

All styling is in `src/style.css`, keyed off `card`, `field`, `message`,
`message error`, `message ok` and `switch`. Change the class there rather
than adding inline styles.

## Run it

`npm install`, then `npm run dev`. `npm run build` emits `dist/`;
`npm run preview` serves it. `@playwright/test` is installed but no test
files are indexed in the graph.
