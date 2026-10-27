---
type: Module
title: src/components/Card.jsx
description: Presentational `Card`, `Field` and `Message` primitives shared by every page.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/components/Card.jsx
tags: [frontend, components, core]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T23:34:47Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 9e0695a13b39e00939f996e6665b83350960de3e
    title: Codebase knowledge graph
status: stable
---

# Symbols

| Symbol | Line | Props | Renders |
| --- | --- | --- | --- |
| `Card` | 1 | `{ title, children }` | `<main className="card"><h1>{title}</h1>{children}</main>` |
| `Field` | 10 | `{ label, ...input }` | `<label className="field"><span>{label}</span><input {...input}/></label>` |
| `Message` | 19 | `{ kind = 'error', children }` | `<p className={"message " + kind}>`; returns `null` when `children` is falsy |

# Notes

* **Pure presentation.** Zero imports, zero outbound calls — the whole module is
  JSX over props. Keep it free of store and router dependencies.
* `Field` spreads the remaining props straight onto the `<input>`, which is why
  pages pass `type`, `name`, `autoComplete` and `required` as plain attributes.
  There is no `id`/`htmlFor` pair; the `<label>` wraps the input instead.
* `Message` picks its ARIA role from `kind`: `role="alert"` for errors,
  `role="status"` otherwise. Its early `null` return lets callers render
  `<Message>{error}</Message>` unconditionally.
* Only [Login page](/modules/pages-login.md) uses `Message` today;
  [Signup page](/modules/pages-signup.md) renders its own `<ul className="message error">`
  because it reports several errors at once.

# Used by

| Page | Uses |
| --- | --- |
| [Signup page](/modules/pages-signup.md) | `Card`, `Field` |
| [Login page](/modules/pages-login.md) | `Card`, `Field`, `Message` |
| [Welcome page](/modules/pages-welcome.md) | `Card` |

`Card` has fan-in 3 and `Field` fan-in 2 — changing either prop signature
touches every page.
