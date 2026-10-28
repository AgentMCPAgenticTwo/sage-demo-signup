---
type: Module
title: src/components
description: Presentational primitives shared by every page: Card, Field and Message.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/components
tags: [frontend, ui, core]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T03:58:25Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 33f196c6383d96b07ef0b9ef85db894b4859243c
    title: Codebase knowledge graph
status: stable
---

# src/components

One file, `src/components/Card.jsx`, holding three dependency-free
presentational components. It imports nothing -- not even React -- which is
why it sits at the bottom of the dependency graph.

## Symbols

| Symbol | Line | Props | Renders |
| --- | --- | --- | --- |
| `Card` | 1 | `title`, `children` | `<main class="card">` with an `<h1>{title}</h1>` |
| `Field` | 10 | `label`, plus any native input props | `<label class="field">` wrapping `<span>{label}</span>` and `<input {...input} />` |
| `Message` | 19 | `kind = 'error'`, `children` | `<p class="message {kind}">`, or `null` when empty |

## Behaviour worth knowing

* `Field` spreads every prop other than `label` onto the `<input>`, so
  `type`, `name`, `value`, `onChange`, `autoComplete` and `required` pass
  through untouched.
* `Message` returns `null` for falsy children, so pages can render
  `<Message>{error}</Message>` unconditionally.
* `Message` sets `role="alert"` when `kind === 'error'` and `role="status"`
  otherwise -- the accessibility contract for form feedback. The `ok` kind
  has a matching `.message.ok` rule in `src/style.css`.

## Relationships

* `Card` (fan-in 3) is used by all three screens in
  [Pages](/modules/src-pages.md); `Field` and `Message` (fan-in 2) by
  `Signup` and `Login`.
* Class names are styled in `src/style.css` -- see
  [Conventions](/conventions.md).
