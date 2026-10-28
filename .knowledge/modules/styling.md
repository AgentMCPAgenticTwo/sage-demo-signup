---
type: Module
title: styling
description: Global CSS custom properties and card/form styling plus the HTML shell.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src/style.css
tags: [frontend, css, design-tokens]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T04:56:52Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 38fe79e86edef6544c50fc543f51f4f47b2379a8
    title: Codebase knowledge graph
status: stable
---

# Role

`src/style.css` is the only stylesheet. It is imported once, from
`src/main.jsx`, and styles every screen globally -- there are no CSS modules
and no inline styles. `index.html` supplies the shell and loads the Inter
webfont from Google Fonts.

# Design tokens (`:root`)

| Token | Value | Used for |
| --- | --- | --- |
| `--bg` | `#f3f4f6` | Page background |
| `--card` | `#ffffff` | Card surface, focused input background |
| `--ink` | `#17212b` | Primary text |
| `--muted` | `#5b6875` | Field captions, `.switch` text |
| `--line` | `#e2e6eb` | Card and input borders |
| `--accent` | `#4f46e5` | Buttons, links, focus border |
| `--accent-strong` | `#4338ca` | Hover states |
| `--accent-soft` | `rgba(79, 70, 229, 0.16)` | Focus rings |
| `--error` | `#b42318` | `.message.error` |
| `--ok` | `#067647` | `.message.ok` |
| `--radius` | `14px` | Card corner radius |
| `--gap` | `16px` | Form row gap |

The base font stack is `'Inter', system-ui, -apple-system, 'Segoe UI',
sans-serif`, declared on `:root`.

# Layout

* `body` is a centring grid (`place-items: center`) with `32px 16px` padding
  and `min-height: 100vh` -- every screen is a single centred card.
* `.card` is `max-width: 400px`, `border-box`, with a soft drop shadow.
* `form` is a grid with `gap: var(--gap)`; `.field` is a nested grid with a
  `6px` gap between caption and input.

# Component classes

| Selector | Set by | Notes |
| --- | --- | --- |
| `.card` | `Card` | Surface, border, radius, shadow |
| `.field` | `Field` | Caption + input stack |
| `input` | `Field` | Bare element selector: border, hover, 4px focus ring |
| `button` | Page forms | Accent fill, hover shadow, `:active` nudge, `:focus-visible` ring |
| `.message`, `.message.error`, `.message.ok` | `Message` | Colour by `kind` |
| `.switch` | Page footers | Muted sentence holding a `Link` |
| `a` | `Link` | Accent colour, underline on hover |

See [src/components](/modules/components.md) for the components that emit
these classes.

# Conventions

Interactive states are styled on bare element selectors (`input`, `button`,
`a`) rather than per-component classes, and all transitions use `0.18s ease`.
Focus is never removed outright -- `outline: none` is always paired with a
`box-shadow` ring.
