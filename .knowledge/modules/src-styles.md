---
type: Module
title: styles
description: The single global stylesheet and its design tokens.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/style.css
tags: [frontend, css, design-tokens]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:27:27Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ af863cd5d6567cf6b64d2fc625952a185971b018
    title: Codebase knowledge graph
status: stable
---

`src/style.css` is the only stylesheet, imported once from `src/main.jsx`. It is plain
CSS with custom properties — no preprocessor, no CSS modules.

# Tokens

Declared on `:root`:

| Group | Properties |
| --- | --- |
| Colour | `--bg`, `--card`, `--ink`, `--muted`, `--line`, `--accent`, `--accent-dark`, `--accent-soft`, `--error`, `--ok` |
| Shape / motion | `--radius`, `--gap`, `--ease` |

`:root` also sets the base font stack (`Inter`, then system fonts), `color` and
`background`.

# Selectors

| Selector | Applies to |
| --- | --- |
| `body` | full-height grid that centres the card |
| `.card` | `Card` — max-width 420px panel with border, radius and shadow |
| `h1` | the `Card` title |
| `form` | grid with `--gap` row spacing |
| `.field` | `Field` — label/input grid |
| `input` | shared input chrome plus `:hover` and `:focus` states |
| `button` | accent submit button plus `:hover`, `:active`, `:focus-visible` |
| `.message`, `.message.error`, `.message.ok` | `Message` |
| `.switch` | the footer paragraph linking to the other page |
| `a`, `a:hover` | `Link` output |

# Notes

* Focus rings are implemented as `box-shadow: 0 0 0 4px var(--accent-soft)` with
  `outline: none`; keep that pairing when restyling.
* Only `error` and `ok` have `Message` colours, so a new `kind` needs a matching rule.
* Element selectors (`input`, `button`, `a`, `h1`) are global — restyling them affects
  every page. Styled markup lives in [components/Card](/modules/src-components.md) and
  [pages](/modules/src-pages.md).
