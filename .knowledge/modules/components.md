---
type: Module
title: src/components
description: Presentational `Card`, `Field` and `Message` primitives shared by every page.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/components
tags: [frontend, components, core]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T04:56:52Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 38fe79e86edef6544c50fc543f51f4f47b2379a8
    title: Codebase knowledge graph
status: stable
---

# Role

`src/components/Card.jsx` holds all three shared UI primitives. They are
purely presentational: no state, no imports, no calls into
[src/router](/modules/router.md) or [src/store](/modules/store.md).

# Symbols

| Symbol | Line | Signature | Renders |
| --- | --- | --- | --- |
| `Card` | 1 | `({ title, children })` | `<main className="card">` with an `<h1>{title}</h1>` then children |
| `Field` | 10 | `({ label, ...input })` | `<label className="field">` with a `<span>` caption and an `<input {...input} />` |
| `Message` | 19 | `({ kind = 'error', children })` | `<p className={"message " + kind}>`, or `null` when children are empty |

# Behaviour notes

* `Field` spreads every prop other than `label` onto the `<input>`, so
  `type`, `name`, `value`, `onChange`, `autoComplete` and `required` are all
  set by the caller. Wrapping the input in the `<label>` gives the association
  without an `id`/`htmlFor` pair.
* `Message` returns `null` for falsy children, so pages can render
  `<Message>{error}</Message>` unconditionally.
* `Message` sets `role="alert"` when `kind === 'error'` and `role="status"`
  otherwise -- the only accessibility branch in the codebase.

# Consumers

Every page in [src/pages](/modules/pages.md) renders `Card`; `Signup` and
`Login` also render `Field` and `Message`. Fan-in from the graph: `Card` 3,
`Field` 2, `Message` 2.

# Styling

Classes `card`, `field` and `message` (plus the `error` / `ok` modifiers) are
defined in `src/style.css` -- see [styling](/modules/styling.md).
