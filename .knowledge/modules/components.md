---
type: Module
title: src/components
description: Presentational primitives `Card`, `Field` and `Message`.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/components
tags: [frontend, ui, core]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T23:47:28Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ ca10a42e2a13be0442234c6be972f2a13f83ee63
    title: Codebase knowledge graph
status: stable
---

# Symbols

All three live in the single file `src/components/Card.jsx`.

| Symbol | Location | Props | Renders |
| --- | --- | --- | --- |
| `Card` | `src/components/Card.jsx:1` | `title`, `children` | `<main className="card">` with an `<h1>` title |
| `Field` | `src/components/Card.jsx:10` | `label`, plus any `<input>` props | `<label className="field">` wrapping `<span>` and `<input>` |
| `Message` | `src/components/Card.jsx:19` | `kind = 'error'`, `children` | `<p className="message {kind}">`, or `null` when empty |

# Behaviour notes

* `Field` spreads its rest props onto the `<input>`, so callers configure the
  control entirely through `Field`'s props.
* `Message` returns `null` for empty children, which is why pages can render
  `<Message>{error}</Message>` unconditionally.
* `Message` sets `role="alert"` for errors and `role="status"` otherwise.

# Relationships

* Pure presentation: imports nothing from [router](/modules/router.md) or
  [store](/modules/store.md), and holds no state.
* Consumed by every screen in [src/pages](/modules/pages.md) — `Card` has 4
  callers, `Field` and `Message` 3 each.
* Class names are styled in `src/style.css`; see
  [Conventions](/conventions.md).
