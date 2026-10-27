---
okf_version: "0.2"
---

# sage-demo-signup Knowledge Bundle

* [Codebase Overview](/overview.md) - Purpose, stack, scripts and entry points of the Acme Account demo signup app.
* [Architecture](/architecture.md) - Layers, package boundaries, render tree and hotspots of the React demo app.
* [Conventions](/conventions.md) - Coding and structural conventions followed across the `src/` tree.

# Modules

* [Modules Index](/modules/index.md) - One concept per source directory under `src/`.
* [src/App](/modules/app.md) - Root component that maps `location.pathname` to a page component.
* [src/router](/modules/router.md) - Minimal History-API router exposing `navigate`, `usePath` and `Link`.
* [src/store](/modules/store.md) - Demo-only account store backed by `localStorage` and `sessionStorage`.
* [src/components](/modules/components.md) - Presentational primitives `Card`, `Field` and `Message`.
* [src/pages](/modules/pages.md) - The four routed screens: Signup, Login, ResetPassword and Welcome.

# Playbooks

* [Common Tasks](/playbooks/common-tasks.md) - Where to go to add a route, a field, a validation rule or a style.

# Reference

* [Graph Queries](/reference/graph-queries.md) - How to query the live codebase knowledge graph for this project.

# Log

* [Knowledge Update Log](/log.md) - History of bundle generations and updates.
