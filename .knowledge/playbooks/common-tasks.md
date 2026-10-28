---
type: Playbook
title: Common Tasks
description: Where to go to change a page, a route, a validation rule or a style.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [playbook, howto]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:35:21Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ af0eb7e28c6d901616970ef2450db466024c0fd3
    title: Codebase knowledge graph
status: stable
---

# To change X, go to Y

| Goal | Where | Notes |
| --- | --- | --- |
| Change the password policy | `PASSWORD_RULES` in `src/pages/Signup.jsx:6` | Add/edit one `{ label, test }` entry; the checklist UI and `submit` both read it, so no second edit is needed. |
| Change a sign-up error message | `submit` in `src/pages/Signup.jsx:21` | Mismatch and duplicate-email strings live inline. |
| Change the log-in failure message | `submit` in `src/pages/Login.jsx:11` | Keep it identical for "no such user" and "wrong password" -- see [src/pages](/modules/src-pages.md). |
| Add a form field | `src/pages/Signup.jsx` | Add the key to the `useState` object, then a `<Field>` with `value={form.x}` and `onChange={set('x')}`. |
| Add a new page | `src/pages/<Name>.jsx` + `routes` in `src/App.jsx:7` | Default-export the component; register the kebab-cased path. |
| Change where a flow lands | the `navigate(...)` call in that page's `submit` | See [src/router](/modules/src-router.md). |
| Add an in-app link | `Link` from `src/router.jsx` | Never a bare `<a>` -- it would full-page reload. |
| Change how accounts are stored | `src/store.js` | Keep `findUser`/`saveUser` signatures; pages never touch storage directly. |
| Make log-out actually sign out | `Welcome` in `src/pages/Welcome.jsx` | Today it only links to `/login`; clearing `acme-current` needs a new export in [src/store](/modules/src-store.md). |
| Restyle anything | `src/style.css` | Single global sheet; match the existing class names. |
| Change page chrome or titles | `Card` in `src/components/Card.jsx:1` | Every page renders exactly one `Card`. |
| Change the browser tab title | `<title>` in `index.html` | Currently "Acme Account". |

# Running it

```bash
npm install
npm run dev      # vite dev server
npm run build    # bundle to dist/
npm run preview  # serve the build
```

`@playwright/test` is installed as a dev dependency, but the repo currently
has no test script and no spec files.

# Gotchas

* `navigate` must dispatch the synthetic `popstate` -- dropping it breaks
  every transition silently, since `pushState` fires no event.
* Forms carry `noValidate`; the browser will not catch a missing `required`
  field for you.
* `Message` renders nothing for an empty string, so an unset error is safe
  to pass.
