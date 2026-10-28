---
okf_version: "0.2"
---

# Acme Account Knowledge Bundle

* [Codebase Overview](/overview.md) - Client-only React + Vite sign-up and log-in demo whose accounts live in browser storage.
* [Architecture](/architecture.md) - Three entry pages over a shared card/router/store core, with no backend tier.
* [Conventions](/conventions.md) - File, routing, form and storage conventions every page in this app follows.

# Modules

* [Modules Index](/modules/index.md) - One concept per source directory in `src/`.
* [src/App](/modules/src-app.md) - Root component that maps `location.pathname` to a page component.
* [src/router](/modules/src-router.md) - Minimal history-based router exposing `navigate`, `usePath` and `Link`.
* [src/store](/modules/src-store.md) - Demo-only account store backed by `localStorage` and `sessionStorage`.
* [src/components](/modules/src-components.md) - Presentational `Card`, `Field` and `Message` primitives shared by every page.
* [src/pages](/modules/src-pages.md) - The three routed screens: sign-up, log-in and welcome.

# Playbooks

* [Common Tasks](/playbooks/common-tasks.md) - Where to go to change a page, a route, a validation rule or a style.

# Reference

* [Graph Queries](/reference/graph-queries.md) - How to query the live codebase knowledge graph for this project.
