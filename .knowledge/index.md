---
okf_version: "0.2"
---

# Acme Account -- Codebase Knowledge

* [Codebase Overview](/overview.md) - Purpose, stack, scripts and entry points of the Acme Account sign-up demo.
* [Architecture](/architecture.md) - Layers, package boundaries, render tree and hotspots of the React/Vite client.
* [Conventions](/conventions.md) - Naming, routing, styling and state conventions followed across the source.

# Modules

* [Modules Index](/modules/index.md) - One concept per source package in `src/`.
* [src/App](/modules/app.md) - Root component that maps `location.pathname` to a page component.
* [src/router](/modules/router.md) - Minimal history-based router exposing `navigate`, `usePath` and `Link`.
* [src/store](/modules/store.md) - Demo-only account store backed by `localStorage` and `sessionStorage`.
* [src/components](/modules/components.md) - Presentational `Card`, `Field` and `Message` primitives shared by every page.
* [src/pages](/modules/pages.md) - The three routed screens: Signup, Login and Welcome.
* [styling](/modules/styling.md) - Global CSS custom properties and card/form styling plus the HTML shell.

# Playbooks

* [Common Tasks](/playbooks/common-tasks.md) - Where to go to add a page, a field, a validation rule or a style token.

# Reference

* [Graph Queries](/reference/graph-queries.md) - How to query the live codebase knowledge graph for this project.

# Log

* [Knowledge Update Log](/log.md) - History of bundle generations and updates.
