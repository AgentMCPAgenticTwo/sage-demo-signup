---
okf_version: "0.2"
---

# Acme Account -- Codebase Knowledge

# Start here

* [Codebase Overview](/overview.md) - Browser-only React + Vite sign-up / log-in demo that keeps accounts in localStorage.
* [Architecture](/architecture.md) - Three page components over a shared router, store and card-primitive layer, with no backend.
* [Conventions](/conventions.md) - Naming, routing, state and styling rules this codebase follows.

# Modules

* [Modules index](/modules/index.md) - One concept per source directory or shared module.
* [src/App](/modules/src-app.md) - Root component that maps the current pathname to a page component.
* [src/router](/modules/src-router.md) - Minimal History-API router exposing navigate, usePath and Link.
* [src/store](/modules/src-store.md) - Demo-only account persistence over localStorage and sessionStorage.
* [src/components](/modules/src-components.md) - Presentational primitives Card, Field and Message shared by every page.
* [src/pages](/modules/src-pages.md) - The Signup, Login and Welcome screens, including the password-rule validation.
* [src/main and styling](/modules/src-entry.md) - React entry point, index.html host page and the single global stylesheet.

# Playbooks

* [Common tasks](/playbooks/common-tasks.md) - To change X, go to Y.

# Reference

* [Graph queries](/reference/graph-queries.md) - How to query the live codebase knowledge graph for this project.
