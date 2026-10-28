---
type: Convention
title: Codebase conventions
description: Coding, routing, styling and storage conventions this codebase follows.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [conventions, react, style]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T03:58:25Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 33f196c6383d96b07ef0b9ef85db894b4859243c
    title: Codebase knowledge graph
status: stable
---

# Conventions

## Modules and imports

* ES modules only; every relative import carries its extension
  (`'../components/Card.jsx'`, `'../store.js'`).
* Pages use a **default** export named after the file (`Signup`, `Login`,
  `Welcome`). Shared modules use **named** exports (`Card`, `Field`,
  `Message`, `navigate`, `usePath`, `Link`, `findUser`, `saveUser`,
  `setCurrentUser`, `currentUser`).
* No path aliases, no barrel `index.js` files.

## Components

* Function components only; hooks for all state (`useState`, `useEffect`).
* One page per file in `src/pages/`, registered in the `routes` map in
  `src/App.jsx` under its kebab-cased path.
* Presentational primitives live in `src/components/Card.jsx` and take no
  dependencies on router or store.
* `Field` spreads its remaining props straight onto `<input>`, so any native
  input attribute works without widening its signature.

## Forms

* `<form onSubmit={submit} noValidate>` -- validation is done in JS, not by
  the browser, so the messages stay consistent.
* The handler is a local function called `submit` that starts with
  `event.preventDefault()`.
* Errors go into a single `error` string in state and render through
  `<Message>`; `Message` returns `null` when empty, and sets
  `role="alert"` for `kind="error"`, `role="status"` otherwise.
* Signup keeps one `form` object plus a curried `set(key)` change handler;
  Login keeps one `useState` per field. Follow whichever the file already uses.

## Routing

* Never use `<a href>` for in-app links -- use `Link` from
  `src/router.jsx`, which calls `preventDefault()` then `navigate`.
* Programmatic navigation after a successful action uses `navigate('/path')`.

## Storage

* All Web Storage access is funnelled through `src/store.js`; no other file
  touches `localStorage` or `sessionStorage`.
* Emails are the account key and are normalised with
  `.trim().toLowerCase()` on both read and write.
* `load()` is defensive: a parse failure returns `{}` rather than throwing.

## Styling

* A single global stylesheet, `src/style.css`, imported once from
  `src/main.jsx`.
* Plain semantic class names -- `card`, `field`, `message`,
  `message error`, `message ok`, `switch` -- plus bare element selectors.
  No CSS modules, no utility framework, no inline styles.

## Formatting

* Two-space indentation, single quotes, semicolons, trailing commas in
  multi-line literals.
* Comments are rare and explain intent at the top of a module
  (`src/router.jsx`, `src/store.js`, the `routes` map in `src/App.jsx`).
