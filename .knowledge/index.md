---
okf_version: "0.2"
---

# sage-demo-signup Knowledge Bundle

Agent-readable knowledge for the Acme Account demo (React + Vite, localStorage-backed sign-up/log-in).

# Start Here

* [Codebase Overview](/overview.md) - Purpose, stack, scripts and entry points of the Acme Account sign-up demo.
* [Architecture](/architecture.md) - Layers, package boundaries, render tree and hotspots of the React single-page demo.
* [Conventions](/conventions.md) - Coding, routing, naming and styling conventions observed across the demo app.

# Modules

* [Modules Index](/modules/index.md) - One concept per source directory of the application.
* [src (app shell)](/modules/src-app.md) - Vite entry point and the path-to-page routing table for the application.
* [src/router](/modules/src-router.md) - Minimal history-based router exposing navigate, usePath and Link.
* [src/store](/modules/src-store.md) - Demo-only account store backed by localStorage and sessionStorage.
* [src/components](/modules/src-components.md) - Presentational Card, Field and Message primitives shared by every page.
* [src/pages](/modules/src-pages.md) - The three routed screens: Signup, Login and Welcome.

# Playbooks & Reference

* [Common Tasks](/playbooks/common-tasks.md) - Where to go to change routes, fields, validation, styling or storage.
* [Graph Queries](/reference/graph-queries.md) - How to query the live codebase knowledge graph for this project.

# History

* [Knowledge Update Log](/log.md)
