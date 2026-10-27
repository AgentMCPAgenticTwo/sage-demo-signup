---
type: Playbook
title: Common Tasks
description: Where to go to change a page, a route, a password rule or the stored account shape.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [playbook, howto]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T23:34:47Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 9e0695a13b39e00939f996e6665b83350960de3e
    title: Codebase knowledge graph
status: stable
---

# Quick map

| To change... | Go to |
| --- | --- |
| a password requirement | `PASSWORD_RULES`, `src/pages/Signup.jsx:6` |
| which page a URL shows | `routes`, `src/App.jsx:7` |
| how navigation works | `src/router.jsx` |
| what an account record holds | `saveUser`, `src/store.js:16` |
| the look of a card, input or message | `src/components/Card.jsx` + `src/style.css` |
| the login failure message | `submit`, `src/pages/Login.jsx:11` |

# Add or change a password rule

1. Append (or edit) one entry in `PASSWORD_RULES` — `{ hint, error, test }`.
2. Nothing else. `passwordErrors` filters the same array, and the hint `<ul>`
   maps over it, so the displayed hints and the enforced errors stay in sync.
3. Keep `hint` strings unique — they are the React `key` for the hint list, as
   `error` strings are for the error list.

See [Signup page](/modules/pages-signup.md).

# Add a page

1. Create `src/pages/<Name>.jsx` with a default export named `<Name>`.
2. Wrap the body in `<Card title="...">` from
   [Card components](/modules/components-card.md).
3. Add `'/<path>': <Name>` to `routes` in `src/App.jsx` and import it there.
4. Link to it with `<Link to="/<path>">` or `navigate('/<path>')`.

Remember that unmatched paths fall back to `Signup`, so there is no 404 to update.

# Guard a page behind a session

Copy the pattern in [Welcome page](/modules/pages-welcome.md): read
`currentUser()`, `useEffect(() => { if (!user) navigate('/login') }, [user])`,
and `return null` while unauthenticated.

# Change the stored account shape

1. Edit the object literal passed to `saveUser` in `src/pages/Signup.jsx:40`.
2. Update any reader — `Login.submit` reads `user.password`, `Welcome` reads
   `user.name` and `user.email`.
3. There is no migration: existing `localStorage['acme-users']` records keep the
   old shape. Clear the key when testing a shape change.

See [Store](/modules/store.md).

# Implement a real log out

`Welcome`'s "Log out" link only navigates. Add a `clearCurrentUser()` to
`src/store.js` that removes `sessionStorage['acme-current']`, then call it from
an `onClick` before navigating.

# Run it

```
npm install
npm run dev      # vite dev server
npm run build    # production bundle
npm run preview  # serve the built bundle
```

Playwright is present as a dev dependency; there is no test script in
`package.json`.
