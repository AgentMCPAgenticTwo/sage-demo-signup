---
type: Module
title: src/components
description: Shared presentational primitives -- Card, Field, Message and PasswordRules.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/components
tags: [frontend, ui, core]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:58:38Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 08e3660b8f72cf411a3d1758d0e4fe5026600899
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | Line | Signature | Fan-in |
| --- | --- | --- | --- |
| `Card` | `src/components/Card.jsx:1` | `({ title, children })` | 4 |
| `Field` | `src/components/Card.jsx:10` | `({ label, ...input })` | 3 |
| `Message` | `src/components/Card.jsx:19` | `({ kind = 'error', children })` | 3 |
| `RULES` | `src/components/PasswordRules.jsx:2` | array of `{ label, test }` | - |
| `test` | `src/components/PasswordRules.jsx:7` | `(value)` | 2 |
| `passwordIsValid` | `src/components/PasswordRules.jsx:10` | `(password)` | 1 |
| `PasswordRules` | `src/components/PasswordRules.jsx:14` | `({ password, showErrors = false })` | 1 |

All exports are named. The highest-traffic target in the codebase after
`navigate` -- 12 calls arrive here from [src/pages](/modules/src-pages.md).

# Card.jsx

Three stateless primitives, each a handful of lines.

| Component | Renders | Detail |
| --- | --- | --- |
| `Card` | `<main className="card">` with an `<h1>{title}</h1>` | the page frame; every page's root. Note it renders `<main>`, so a page must not nest two Cards. |
| `Field` | `<label className="field">` wrapping `<span>{label}</span>` and `<input {...input} />` | the label wraps the input, so no `htmlFor`/`id` pair is needed. Every prop other than `label` is spread onto the input. |
| `Message` | `<p className={`message ${kind}`}>` | **returns `null` when `children` is empty**, so it is safe to leave permanently mounted. `kind` drives the ARIA role: `'error'` -> `role="alert"` (assertive), anything else -> `role="status"` (polite). |

`Message`'s default `kind='error'` means `<Message>{error}</Message>` -- the
form the pages use -- announces assertively. Pass `kind="ok"` for success copy;
`.message.ok` is already styled in `src/style.css`.

# PasswordRules.jsx

The product's password policy, in one place. `RULES` is the single source of
truth:

| Label | Test |
| --- | --- |
| At least 8 characters | `value.length >= 8` |
| One uppercase letter | `/[A-Z]/` |
| One lowercase letter | `/[a-z]/` |
| One number | `/[0-9]/` |
| One special character | `/[^A-Za-z0-9]/` |

* `passwordIsValid(password)` is `RULES.every(rule => rule.test(password))`.
* `PasswordRules` maps the same array to a `<ul className="rules">`, keyed by
  `rule.label`, marking each failing item `className="rule-failed"` **only when
  `showErrors` is true**.

That `showErrors` gate is deliberate: before the user submits, the list reads
as guidance with nothing marked wrong; after a failed submit the offenders turn
red. `ChangePassword` sets it true only on the rules-failed branch and resets
it to false on every other path.

Adding or editing a rule means one entry in `RULES` -- the validator and the
checklist both follow automatically. Keep `label` unique; it is the React key.

Because the labels are user-facing copy and the tests are the enforcement, the
two must stay in agreement -- changing a regex without its label (or vice
versa) silently lies to the user.

# Relationships

* Consumed only by [src/pages](/modules/src-pages.md). `Card` is used by all
  four pages; `Field` and `Message` by the three form pages; `PasswordRules`
  and `passwordIsValid` only by `ChangePassword`.
* Imports nothing -- no React hooks, no store, no router. Every component here
  is a pure function of its props.
* `Signup` does not currently use `passwordIsValid`; see the structural gaps in
  [Architecture](/architecture.md).
