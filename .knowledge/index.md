---
okf_version: "0.2"
---

# Acme Account -- Codebase Knowledge

Knowledge bundle for `sage-demo-signup`, generated from the codebase knowledge graph.

# Start Here

* [Codebase Overview](/overview.md) - Purpose, stack, scripts and entry points of the Acme Account React + Vite demo.
* [Architecture](/architecture.md) - Package clusters, layers, boundaries and the render/call tree of the signup app.
* [Conventions](/conventions.md) - File, routing, component and state conventions observed across the source tree.

# Modules

* [Modules Index](/modules/index.md) - One concept per source package in `src/`.
* [src/App](/modules/src-app.md) - Root component that maps `location.pathname` to a page component.
* [src/router](/modules/src-router.md) - Minimal history-based router exposing `navigate`, `usePath` and `Link`.
* [src/store](/modules/src-store.md) - Demo-only account store backed by `localStorage` and `sessionStorage`.
* [src/components](/modules/src-components.md) - Presentational `Card`, `Field` and `Message` primitives shared by every page.
* [src/pages](/modules/src-pages.md) - The three routed screens: `Signup`, `Login` and `Welcome`.

# Playbooks & Reference

* [Common Tasks](/playbooks/common-tasks.md) - Where to go to change a page, a route, a form field or the account store.
* [Graph Queries](/reference/graph-queries.md) - How to query the live codebase knowledge graph for this project.

# History

* [Knowledge Update Log](/log.md)
