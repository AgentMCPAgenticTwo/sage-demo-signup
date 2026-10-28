---
type: Module
title: src/components
description: Presentational `Card`, `Field` and `Message` primitives shared by every page.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/components
tags: [frontend, ui, core, a11y]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:04:36Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 360fd597ded4ea1f388e555fd8458ad76d46ff8b
    title: Codebase knowledge graph
status: stable
---

# Symbols

All three live in `src/components/Card.jsx` and are named exports.

| Symbol | Line | Props | Renders |
| --- | --- | --- | --- |
| `Card` | `src/components/Card.jsx:1` | `title`, `children` | `<main class="card">` with an `<h1>` |
| `Field` | `src/components/Card.jsx:10` | `label`, plus any input props | `<label class="field">` wrapping `<span>` and `<input>` |
| `Message` | `src/components/Card.jsx:19` | `kind = 'error'`, `children` | `<p class="message {kind}">`, or `null` |

# Behaviour

* `Field` spreads its rest props onto the `<input>`, so `type`,
  `autoComplete`, `value`, `onChange` and `required` pass through untouched --
  add native input attributes at the call site, not here.
* `Message` returns `null` for empty children, so pages can render
  `<Message>{error}</Message>` unconditionally.
* `Message` sets `role="alert"` for the default `error` kind and `role="status"`
  otherwise; keep that mapping when adding kinds.
* `Card` renders `<main>`, so exactly one `Card` should be on screen at a time.

# Boundary

These components import nothing from the project -- no `router`, no `store`.
Keeping them prop-driven is what holds the one-way `pages -> components` edge in
[Architecture](/architecture.md).

# Used By

[src/pages](/modules/src-pages.md) -- `Card` from all three pages (`Signup`,
`Login`, `Welcome`); `Field` and `Message` from `Signup` and `Login`.
