---
okf_version: "0.2"
---

# Acme Account -- Knowledge Bundle

* [Codebase Overview](/overview.md) - Client-only React + Vite demo for account sign-up, log-in and password change, with accounts kept in browser storage.
* [Architecture](/architecture.md) - Three core modules (router, store, components) consumed by four page entry points under a single App switch.
* [Conventions](/conventions.md) - Conventions for adding pages, building forms, validating passwords and reporting errors in this codebase.

# Modules

* [Modules Index](/modules/index.md) - One concept per source directory and shared module.
* [src/App](/modules/src-app.md) - Root component that maps location.pathname to a page component.
* [src/router](/modules/src-router.md) - Minimal history-based router exposing navigate, usePath and Link.
* [src/store](/modules/src-store.md) - Demo-only account persistence over localStorage and sessionStorage.
* [src/components](/modules/src-components.md) - Shared presentational primitives -- Card, Field, Message and PasswordRules.
* [src/pages](/modules/src-pages.md) - The four routed screens -- Signup, Login, Welcome and ChangePassword.

# Playbooks

* [Common Tasks](/playbooks/common-tasks.md) - To change X, go to Y -- routed recipes for the most frequent edits.

# Reference

* [Graph Queries](/reference/graph-queries.md) - How to query the live codebase knowledge graph for this project.

# History

* [Update Log](/log.md) - Dated history of bundle creations and updates.
