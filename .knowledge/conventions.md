---
type: Convention
title: Conventions
description: Conventions for adding pages, building forms, validating passwords and reporting errors in this codebase.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/src
tags: [conventions, react, forms]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:58:38Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 08e3660b8f72cf411a3d1758d0e4fe5026600899
    title: Codebase knowledge graph
status: stable
---

# Files and exports

| Rule | Detail |
| --- | --- |
| Page files | One page per file in `src/pages/`, `PascalCase.jsx`, **default** export. |
| Shared modules | `src/components/*.jsx`, `src/router.jsx`, `src/store.js` use **named** exports only. |
| Route naming | A page's path is its file name kebab-cased: `ChangePassword.jsx` -> `/change-password`. The comment at `src/App.jsx:7` states this rule. |
| Extensions | Imports always carry the explicit extension (`'../store.js'`, `'./router.jsx'`). |
| JSX | Function declarations for components, never classes, never `React.FC`. |

# Page shape

Every page follows the same skeleton -- match it when adding one:

```jsx
export default function Thing() {
  const [form, setForm] = useState({ ... });
  const [error, setError] = useState('');

  const set = (key) => (event) => setForm({ ...form, [key]: event.target.value });

  function submit(event) {
    event.preventDefault();
    // guard clauses: setError(...) then return
    // success: mutate the store, then navigate(...)
  }

  return (
    <Card title="...">
      <form onSubmit={submit} noValidate>
        <Field ... />
        <Message>{error}</Message>
        <button type="submit">...</button>
      </form>
      <p className="switch"><Link to="...">...</Link></p>
    </Card>
  );
}
```

Points that are consistent across all four pages:

* `noValidate` on every `<form>` -- validation is the submit handler's job, not
  the browser's, so error copy stays under app control.
* `<Message>` sits immediately above the submit button, never beside a field.
* Secondary navigation lives in a trailing `<p className="switch">`.
* `submit` starts with `event.preventDefault()` and uses early-return guard
  clauses, each setting one error string.
* `Signup` and `ChangePassword` hold one `form` state object plus the `set`
  curried helper; `Login` keeps two separate `useState` strings. The `form`
  object is the pattern for three or more fields.

# Form fields

Always render inputs through `Field` from
[src/components](/modules/src-components.md) rather than raw `<input>`. `Field`
spreads every extra prop onto the input, so `name`, `type`, `autoComplete`,
`value`, `onChange` and `required` pass through unchanged.

`autoComplete` is set on every password input and matters for correctness:
`new-password` when choosing a password (Signup, and both new-password fields
in ChangePassword), `current-password` when proving one (Login, and the
current-password field in ChangePassword).

# Errors and messages

* One error string per page in `useState('')`; set it, then `return`.
* `Message` renders nothing when `children` is empty, so `<Message>{error}</Message>`
  is safe to leave mounted.
* `kind` defaults to `'error'` and drives both the CSS class and the ARIA role:
  `error` -> `role="alert"`, anything else -> `role="status"`. Pass
  `kind="ok"` for success copy -- `.message.ok` exists in `src/style.css`.
* Error copy is a full sentence with a trailing period: "Passwords do not
  match.", "Email or password is incorrect."

# Password rules

`RULES` in `src/components/PasswordRules.jsx` is the single source of truth.
Never re-implement a check inline.

* Validate with `passwordIsValid(password)`.
* Display with `<PasswordRules password={...} showErrors={...} />`.
* `showErrors` stays `false` until a submit actually fails the rules -- the
  list reads as guidance before submission and as errors after. `ChangePassword`
  resets it to `false` on every other branch.
* Adding a rule means adding one `{ label, test }` entry; both the validator
  and the list pick it up automatically.

# Store access

Pages never touch `localStorage` or `sessionStorage` directly -- always go
through the named exports of [src/store](/modules/src-store.md). Email is
normalised (`trim().toLowerCase()`) inside the store, so callers pass raw user
input.

# Styling

A single global stylesheet, `src/style.css`, imported once from `src/main.jsx`.
There are no CSS modules and no inline style objects. The available class names
are `.card`, `.field`, `.message` (with `.message.error` / `.message.ok`),
`.rules`, `.rule-failed` and `.switch`. Prefer reusing one of these over adding
a new class.
