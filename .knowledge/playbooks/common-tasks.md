---
type: Playbook
title: Common Tasks
description: To change X, go to Y -- routed recipes for the most frequent edits.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [playbook, howto]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:58:38Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 08e3660b8f72cf411a3d1758d0e4fe5026600899
    title: Codebase knowledge graph
status: stable
---

# Quick map

| To change... | Go to |
| --- | --- |
| a password rule | `src/components/PasswordRules.jsx` -> `RULES` |
| an error message | the `submit` handler of the page in `src/pages/` |
| the look of a card, field or message | `src/style.css` (`.card`, `.field`, `.message`) |
| what a page's form contains | that page file; add a `Field` |
| where a flow goes next | the `navigate(...)` call in that page's `submit` |
| how accounts are stored | `src/store.js` |
| the set of URLs | `routes` in `src/App.jsx` |
| link text between screens | the trailing `<p className="switch">` in the page |

# Add a page

1. Create `src/pages/Thing.jsx` with a **default**-exported function component,
   following the skeleton in [Conventions](/conventions.md).
2. Register it in `routes` in `src/App.jsx:8` under its kebab-cased path
   (`Thing.jsx` -> `/thing`).
3. Link to it with `<Link to="/thing">` from wherever it should be reachable --
   do not use a bare `<a>`, which would trigger a full page load.
4. If it needs a session, copy the guard from `src/pages/Welcome.jsx:9-13`:
   `currentUser()`, a `useEffect` redirect to `/login`, and `if (!user) return null`.
5. Update `README.md`'s page list if you want it documented there.

# Add or change a password rule

Edit `RULES` in `src/components/PasswordRules.jsx:2`. One entry is
`{ label, test }`; `passwordIsValid` and the rendered checklist both derive
from the array, so nothing else needs touching. Keep `label` unique (it is the
React key) and keep the copy honest about what `test` actually enforces.

# Enforce password rules at sign-up

Currently only `ChangePassword` validates strength. To extend it to `Signup`:

1. Import `{ PasswordRules, passwordIsValid }` into `src/pages/Signup.jsx`.
2. Add a `showRuleErrors` state flag, mirroring
   `src/pages/ChangePassword.jsx:11`.
3. In `submit`, check `!passwordIsValid(form.password)` **before** the
   confirm-match guard and set the flag true on failure, false on every other
   branch.
4. Render `<PasswordRules password={form.password} showErrors={showRuleErrors} />`
   under the password field.

# Add a field to a form

Add a `Field` inside the page's `<form>`, above `<Message>`. Give it `name`,
`value={form.x}`, `onChange={set('x')}` and seed `x` in the `useState` initial
object. For a password field set `autoComplete` to `new-password` or
`current-password` as appropriate. Validate it in `submit` as another early-
return guard, not with browser validation -- every form carries `noValidate`.

# Show a success message

`Message` already supports it: `<Message kind="ok">Saved.</Message>` renders
`role="status"` and picks up the `.message.ok` style. You need a second state
string if a page must show both success and error.

# Make log out actually end the session

`src/pages/Welcome.jsx:21` links to `/login` without clearing anything. A real
log out needs a store export that removes `acme-current` from `sessionStorage`
(alongside `setCurrentUser` in `src/store.js:22`), called before `navigate('/login')`.
This would be a new export, not a change to an existing one.

# Change where storage lives

Everything is behind the named exports in `src/store.js`; pages never touch
`localStorage` or `sessionStorage` themselves. Swapping the backing store means
reimplementing `load`, `findUser`, `saveUser`, `setCurrentUser` and
`currentUser` while keeping their signatures -- callers need no change. Keep
`load`'s `try/catch` fallback and the `trim().toLowerCase()` email
normalisation, both of which callers rely on implicitly.

# Inspect the current state while developing

In the browser console: `localStorage.getItem('acme-users')` for accounts and
`sessionStorage.getItem('acme-current')` for the session. Clearing the first
resets all accounts.

# Related

* [Conventions](/conventions.md) -- the patterns these recipes assume.
* [src/pages](/modules/src-pages.md) -- per-page detail.
* [Architecture](/architecture.md) -- why the core modules stay independent.
