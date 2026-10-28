---
type: Module
title: src/components
description: Shared presentational primitives: Card, Field, Message and PasswordRules.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/components
tags: [frontend, components, forms, a11y]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:44:46Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ e05c9763bafd1094d0ab184ec6d101f963d09410
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | File:line | Props | Renders |
| --- | --- | --- | --- |
| `Card` | `src/components/Card.jsx:1` | `title`, `children` | `<main className="card">` with an `<h1>` |
| `Field` | `src/components/Card.jsx:10` | `label`, rest spread onto the input | `<label className="field">` wrapping `<span>` + `<input {...input} />` |
| `Message` | `src/components/Card.jsx:19` | `kind = 'error'`, `children` | A `<p>` with class `message <kind>`, or `null` when empty |
| `passwordRules` | `src/components/PasswordRules.jsx:2` | — | Array of `{ label, test }` |
| `unmetRules` | `src/components/PasswordRules.jsx:10` | `password` | Labels of the rules that fail |
| `PasswordRules` | `src/components/PasswordRules.jsx:15` | `password`, `failed = []` | `<ul className="rules">` of `<li className="rule">` |

# Password rules

| Label | Test |
| --- | --- |
| At least 8 characters | `value.length >= 8` |
| At least one uppercase letter | `/[A-Z]/` |
| At least one lowercase letter | `/[a-z]/` |
| At least one number | `/[0-9]/` |
| At least one special character | `/[^a-zA-Z0-9]/` |

`unmetRules` filters `passwordRules` by failing `test` and maps to `label`, so
labels are the identity used across the boundary — `PasswordRules` marks a rule
with `rule error` when `failed.includes(rule.label)`. Changing a label changes
that contract.

# Relationships

* Pure presentational layer: 12 inbound call edges from
  [Pages](/modules/src-pages.md), zero outbound calls.
* `Card`, `Field` and `Message` are consumed by every page; `PasswordRules` and
  `unmetRules` only by `ResetPassword`.
* All class names resolve in [Styles](/modules/src-styles.md).

# Notes

* `Message` returning `null` for empty children is why pages can hold `error`
  as `''` and render `<Message>` unconditionally.
* `role` is derived from `kind`: `alert` for errors, `status` otherwise.
* The whole rule list is always visible under the password field — the `failed`
  prop only colours it, it does not filter it.
