---
type: Module
title: src/components
description: Presentational primitives shared by every page -- Card, Field and Message.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/components
tags: [frontend, ui, core]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:11:52Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 11cbd71eed22e7124383102d0584b2397653d88d
    title: Codebase knowledge graph
status: stable
---

# src/components

One file, `src/components/Card.jsx`, exporting three stateless primitives.
Core layer: 7 inbound calls, 0 outbound. They import nothing -- not even React.

## Symbols

| Symbol | Line | Props | Renders |
| --- | --- | --- | --- |
| `Card` | 1 | `title`, `children` | `<main class="card">` with an `<h1>{title}</h1>` above the children |
| `Field` | 10 | `label`, plus any input props (spread) | `<label class="field">` wrapping a `<span>` caption and an `<input>` |
| `Message` | 19 | `kind` (default `'error'`), `children` | `<p class="message {kind}">`, or `null` when `children` is falsy |

## Behaviour notes

* `Field` spreads every prop other than `label` straight onto the `<input>`,
  which is how pages pass `type`, `name`, `autoComplete`, `value`, `onChange`
  and `required`. The `<input>` is nested inside the `<label>`, so no `htmlFor`
  or `id` is needed.
* `Message` chooses `role="alert"` for `kind === 'error'` and `role="status"`
  otherwise, so form errors are announced by screen readers.
* `Card` renders `<main>`, so exactly one `Card` should be on screen at a time
  -- which the single-page-at-a-time router guarantees.

## Used by

All three screens in [src/pages](/modules/src-pages.md): `Card` has 3 callers,
`Field` and `Message` 2 each (`Signup` and `Login`; `Welcome` uses only `Card`).
Styling for `.card`, `.field` and `.message` lives in `src/style.css` -- see
[Conventions](/conventions.md).
