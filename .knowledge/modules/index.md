# Modules

# Entry

* [App shell](/modules/app-shell.md) - Mounts React and maps `location.pathname` to one of the three page components.

# Pages

* [Signup page](/modules/pages-signup.md) - Account creation form with data-driven password rules shown as hints and enforced on submit.
* [Login page](/modules/pages-login.md) - Credential form that looks up a stored account and starts a session.
* [Welcome page](/modules/pages-welcome.md) - Signed-in landing page that redirects to login when there is no current user.

# Core

* [Card components](/modules/components-card.md) - Presentational `Card`, `Field` and `Message` primitives shared by every page.
* [Router](/modules/router.md) - Minimal history-based router exposing `navigate`, `usePath` and `Link`.
* [Store](/modules/store.md) - Demo-only account and session persistence over `localStorage` and `sessionStorage`.
