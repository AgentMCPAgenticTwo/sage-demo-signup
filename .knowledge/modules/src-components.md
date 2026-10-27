---
type: Module
title: src/components
description: Presentational primitives Card, Field and Message shared by every page.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/components
tags: [frontend, ui, core]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T17:18:25Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 78b91de716644ab7bfc26c34d71b2176b39a35ee
    title: Codebase knowledge graph
status: stable
---

# Symbols

All three live in `src/components/Card.jsx` and are named exports.

| Symbol | Location | Props | Fan-in |
| --- | --- | --- | --- |
| `Card` | `src/components/Card.jsx:1` | `{ title, children }` | 3 |
| `Field` | `src/components/Card.jsx:10` | `{ label, ...input }` | 2 |
| `Message` | `src/components/Card.jsx:19` | `{ kind = 'error', children }` | 2 |

# Behaviour

| Component | Renders |
| --- | --- |
| `Card` | `<main className="card">` with an `<h1>{title}</h1>` above `children` -- the page shell |
| `Field` | `<label className="field">` wrapping `<span>{label}</span>` and `<input {...input} />` |
| `Message` | `<p className={`message ${kind}`}>` with `role="alert"` when `kind === 'error'`, else `role="status"` |

Two details matter when editing:

* `Field` spreads **all** remaining props onto the `<input>`, which is how pages
  pass `type`, `name`, `value`, `onChange`, `required` and `aria-describedby`
  without `Field` knowing about them.
* `Message` returns `null` for falsy `children`, so pages can render
  `<Message>{error}</Message>` unconditionally with `error` initialised to `''`.

Styling for `.card`, `.field` and `.message` (plus `.message.error` /
`.message.ok`) is in `src/style.css` -- see
[src/main and styling](/modules/src-entry.md).

# Boundary

Core module, zero outbound calls -- these components hold no state and never
import the [router](/modules/src-router.md) or [store](/modules/src-store.md).

# Used by

[src/pages](/modules/src-pages.md) -- 7 calls, the heaviest boundary in the app.
