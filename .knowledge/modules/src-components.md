---
type: Module
title: components/Card
description: Presentational primitives Card, Field and Message shared by every page.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/components/Card.jsx
tags: [frontend, components, core, a11y]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:27:27Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ af863cd5d6567cf6b64d2fc625952a185971b018
    title: Codebase knowledge graph
status: stable
---

The whole component layer is one file, `src/components/Card.jsx`. All three exports are
stateless and purely presentational.

# Symbols

| Symbol | Location | Props | Renders |
| --- | --- | --- | --- |
| `Card` | `src/components/Card.jsx:1` | `title`, `children` | `<main className="card">` with `<h1>{title}</h1>` above the children |
| `Field` | `src/components/Card.jsx:10` | `label`, plus any input props | `<label className="field">` wrapping `<span>{label}</span>` and `<input {...input} />` |
| `Message` | `src/components/Card.jsx:19` | `kind = 'error'`, `children` | `<p className={\`message ${kind}\`}>`, or `null` when `children` is falsy |

# Notable Behaviour

* `Field` spreads every prop except `label` onto the `<input>`, so `type`, `name`,
  `value`, `onChange`, `autoComplete` and `required` all pass through unchanged. There
  is no `id`/`htmlFor` pairing — the wrapping `<label>` provides the association.
* `Message` returns `null` for empty content, which is why pages can render
  `<Message>{error}</Message>` unconditionally.
* `Message` maps `kind` to an ARIA role: `error` → `role="alert"`, anything else →
  `role="status"`. The `kind` value also becomes a CSS class; `src/style.css` styles
  `.message.error` and `.message.ok` only.

# Used By

Every page in [pages](/modules/src-pages.md). `Card` and `Field` are among the project's
highest fan-in symbols — see [Architecture](/architecture.md).

# Styling

Class names only; all rules live in [styles](/modules/src-styles.md).
