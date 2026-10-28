# Knowledge Update Log

## 2026-10-28

* **Creation**: Full bundle generated from the codebase knowledge graph
  (project `sage-demo-signup` @ `e05c976`), trace `fa562b21e997`. Added
  `index.md`, `overview.md`, `architecture.md`, `conventions.md`,
  `playbooks/common-tasks.md`, `reference/graph-queries.md` and eight module
  concepts: App shell, Pages, Components, Router, Store, Styles, Build
  configuration and Maintenance metadata.
* **Note**: Recorded that `passwordRules` / `unmetRules` are reached only from
  `ResetPassword` — `Signup` checks the confirm match but not the rule set.
