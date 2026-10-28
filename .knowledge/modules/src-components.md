---
type: Module
title: src/components
description: Presentational `Card`, `Field` and `Message` primitives shared by every page.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/components
tags: [frontend, ui, core, accessibility]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:35:21Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ af0eb7e28c6d901616970ef2450db466024c0fd3
    title: Codebase knowledge graph
status: stable
---

# Symbols

All three live in `src/components/Card.jsx` and are named exports.

| Symbol | Line | Renders | Props |
| --- | --- | --- | --- |
| `Card` | 1 | `<main className="card">` with an `<h1>` | `title`, `children` |
| `Field` | 10 | `<label className="field">` wrapping `<span>` + `<input>` | `label`, plus any input props |
| `Message` | 19 | `<p className="message {kind}">` | `kind` (default `'error'`), `children` |

# Behaviour

* `Card` is the page frame -- each of the three pages renders exactly one,
  and the `<h1>` is the page title.
* `Field` spreads every prop other than `label` onto the `<input>`, so
  `type`, `name`, `value`, `onChange`, `required`, `autoComplete` and
  `aria-describedby` all pass through untouched. The label text and the
  control share one `<label>` element, so no `htmlFor`/`id` pairing is
  needed.
* `Message` returns `null` when `children` is empty -- callers can render
  `<Message>{error}</Message>` unconditionally. Its `role` is `alert` for the
  default `error` kind and `status` otherwise, so errors interrupt a screen
  reader while confirmations do not.

# Styling

Class names map to selectors in `src/style.css`: `.card`, `.field`,
`.message`, `.message.error`, `.message.ok`.

# Relationships

* Consumed by all three screens in [src/pages](/modules/src-pages.md)
  (7 calls, the busiest boundary in the graph).
* Pure presentation -- imports nothing, including `react` itself.
