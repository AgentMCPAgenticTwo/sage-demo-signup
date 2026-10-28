---
type: Playbook
title: Common tasks
description: Where to go to add a page, change password rules, or alter stored account data.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [playbook, how-to]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:44:46Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ e05c9763bafd1094d0ab184ec6d101f963d09410
    title: Codebase knowledge graph
status: stable
---

# To change X, go to Y

| Goal | Where |
| --- | --- |
| Add a screen | New PascalCase file in `src/pages/`, then add its kebab-cased path to `routes` in `src/App.jsx:8` |
| Change where a form goes on success | The `navigate(...)` call at the end of that page's `submit` |
| Change a validation message | The `setError(...)` call in the page's `submit`; see the table in [Pages](/modules/src-pages.md) |
| Add or edit a password rule | `passwordRules` in `src/components/PasswordRules.jsx:2` |
| Enforce password rules on sign-up | Call `unmetRules` in `Signup`'s `submit` (`src/pages/Signup.jsx:12`) and add `failed` state + `<PasswordRules>`, mirroring `ResetPassword` |
| Change what a stored account holds | `saveUser` in `src/store.js:16` plus every caller (`Signup`, `ResetPassword`) |
| Change the storage key or email normalisation | `KEY` (`src/store.js:2`) and the `.trim().toLowerCase()` in `findUser` / `saveUser` |
| Add a real log-out | Add a clear-session export to `src/store.js` and call it from `Welcome` instead of only linking to `/login` |
| Add a new input | Render it through `Field` (`src/components/Card.jsx:10`) with `name`, `autoComplete`, `required` |
| Add a success (non-error) banner | `<Message kind="ok">`; `.message.ok` already exists in `src/style.css` |
| Restyle anything | `src/style.css` — see the selector table in [Styles](/modules/src-styles.md) |
| Change routing mechanics (params, query, hash) | `src/router.jsx`; keep `navigate`'s `popstate` dispatch so `usePath` still updates |

# Recipe: add a page

1. Create `src/pages/MyPage.jsx` with a default-exported component.
2. Wrap the body in `Card` and use `Field` / `Message` for any form.
3. Register `'/my-page': MyPage` in `routes` (`src/App.jsx:8`).
4. Link to it with `<Link to="/my-page">` inside a `<p className="switch">`.
5. Run `npm run dev` and visit the path.

# Pitfalls

* Don't assign `window.location` — `usePath` only reacts to `popstate`, which
  `navigate` dispatches. See [Router](/modules/src-router.md).
* Don't trim or lowercase emails at the call site; the store already does it.
* Rule labels are the identity shared between `unmetRules` and
  `PasswordRules`' `failed` prop — renaming a label changes that contract.
* An unrecognised path silently renders `Signup`, so a typo'd route looks like
  the sign-up page rather than an error.
