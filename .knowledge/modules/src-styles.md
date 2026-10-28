---
type: Module
title: src/style.css
description: Single global stylesheet defining the semantic class names the components use.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/style.css
tags: [frontend, css, styling]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:44:46Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ e05c9763bafd1094d0ab184ec6d101f963d09410
    title: Codebase knowledge graph
status: stable
---

# Selectors

| Selector | Styles |
| --- | --- |
| `body` | Page background and centring |
| `.card` | The `Card` container |
| `h1` | Card title |
| `form`, `.field`, `input`, `input:focus`, `button` | Form layout and controls |
| `.message`, `.message.error`, `.message.ok` | `Message` variants, keyed to its `kind` prop |
| `.rules`, `.rule.error` | `PasswordRules` list and failing-rule colour |
| `.switch`, `a` | The cross-link paragraph under each form |

# Relationships

* Imported once, from `src/main.jsx` — see [App shell](/modules/src-app.md).
* Every class name here is produced by [Components](/modules/src-components.md);
  `.message.error` / `.message.ok` correspond to `Message`'s `kind` values and
  `.rule.error` to a label present in `PasswordRules`' `failed` prop.

# Notes

* There are no CSS modules, no preprocessor and no scoped styles — element
  selectors like `input` and `button` apply app-wide.
* Adding a visual state means adding a class here and emitting it from a
  component, per [Conventions](/conventions.md).
