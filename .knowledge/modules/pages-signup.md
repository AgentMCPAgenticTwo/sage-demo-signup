---
type: Module
title: src/pages/Signup.jsx
description: Account creation form with data-driven password rules shown as hints and enforced on submit.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/pages/Signup.jsx
tags: [frontend, pages, validation]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T23:34:47Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 9e0695a13b39e00939f996e6665b83350960de3e
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | Line | Notes |
| --- | --- | --- |
| `PASSWORD_RULES` | 6 | exported array of `{ hint, error, test }` |
| `test` | 11 | the per-rule predicate `(value) => boolean` |
| `passwordErrors` | 14 | exported; returns the `error` strings of every failing rule |
| `Signup` | 18 | default export |
| `set` | 22 | `(key) => (event) => ...` curried field updater over the `form` object |
| `setError` | 23 | collapses a single message into the `errors` array |
| `submit` | 25 | form handler |

# Password rules

The rule table is the contract — the same array drives the on-screen hint list
and the submit-time errors, so the two can never drift.

| Hint | Predicate |
| --- | --- |
| At least 8 characters | `value.length >= 8` |
| At least one uppercase letter | `/[A-Z]/` |
| At least one lowercase letter | `/[a-z]/` |
| At least one number | `/[0-9]/` |
| At least one special character | `/[^A-Za-z0-9]/` |

To add or change a rule, edit one entry in `PASSWORD_RULES`. Do not add an `if`
inside `submit` — see [Conventions](/conventions.md).

# Submit order

1. `passwordErrors(form.password)` — if non-empty, set **all** failures and stop.
2. `form.password !== form.confirm` -> "Passwords do not match."
3. `findUser(form.email)` -> "An account with this email already exists."
4. `saveUser({ name: trimmed, email: trimmed, password })` then `navigate('/login')`.

Note the asymmetry: `name` and `email` are trimmed on save, the password is not.

# Rendering

`Card title="Create your account"` wraps a `noValidate` form with four `Field`s
(name, email, password, confirm). Between the password and confirm fields sits
`<ul className="hints">`, one `<li>` per rule hint, keyed by `rule.hint`. Errors
render below as `<ul className="message error" role="alert">`, keyed by message
string — so duplicate error strings would collide, which the current rule set
avoids.

# Depends on

* [Card components](/modules/components-card.md) — `Card`, `Field`.
* [Router](/modules/router.md) — `navigate`, `Link` (to `/login`).
* [Store](/modules/store.md) — `findUser`, `saveUser`.
