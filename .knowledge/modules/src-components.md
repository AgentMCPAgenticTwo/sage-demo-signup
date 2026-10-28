---
type: Module
title: src/components
description: Presentational Card, Field and Message primitives shared by every page.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/components
tags: [frontend, ui, a11y]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:19:54Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 8b5e972c95c0d30e9afcad3fc02c3eb1ec018b87
    title: Codebase knowledge graph
status: stable
---

# Symbols

All three live in `src/components/Card.jsx` and are named exports.

| Symbol | Line | Props | Renders |
| --- | --- | --- | --- |
| `Card` | 1 | `title`, `children` | `<main className="card">` with an `<h1>{title}</h1>` |
| `Field` | 10 | `label`, plus any input props | `<label className="field">` with a `<span>` and an `<input {...input} />` |
| `Message` | 19 | `kind = 'error'`, `children` | `<p className={"message " + kind}>`, or `null` when empty |

# Accessibility Notes

* `Field` wraps the `<input>` in its `<label>`, so no `htmlFor`/`id` pairing is
  needed; callers pass `name`, `type` and `autoComplete` straight through.
* `Message` sets `role="alert"` when `kind === 'error'` and `role="status"`
  otherwise, so validation failures are announced.
* `Card` emits the page's single `<main>` landmark and its only `<h1>`.

# Relationships

* used by [src/pages](/modules/src-pages.md) — 7 inbound calls; `Card` is used
  by all three pages, `Field` and `Message` by `Signup` and `Login`.
* depends on nothing: there are no imports in this file, and no state.
* styling comes from the global `src/style.css` classes `card`, `field` and
  `message` — see [Conventions](/conventions.md).
