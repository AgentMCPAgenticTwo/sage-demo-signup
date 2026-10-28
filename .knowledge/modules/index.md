# Modules

One concept per source directory under `src/`.

# Entry

* [App Root](/modules/src-app.md) - Mounts React and maps the current path to one of the three page components.

# Pages

* [pages](/modules/src-pages.md) - The three screens of the demo flow: Signup, Login and Welcome.

# Core

* [components/Card](/modules/src-components.md) - Presentational primitives Card, Field and Message shared by every page.
* [router](/modules/src-router.md) - Minimal history-based router exposing navigate, usePath and Link.
* [store](/modules/src-store.md) - Demo-only account and session persistence over localStorage and sessionStorage.
* [styles](/modules/src-styles.md) - The single global stylesheet and its design tokens.
