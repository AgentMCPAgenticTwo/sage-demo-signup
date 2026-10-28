---
type: Reference
title: Graph Queries
description: How to query the live codebase knowledge graph for this project.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/.codebase-memory
tags: [reference, tooling, graph]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:58:38Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 08e3660b8f72cf411a3d1758d0e4fe5026600899
    title: Codebase knowledge graph
status: stable
---

# The graph

Stored at `.codebase-memory/graph.db.zst` and served by the
**codebase-memory-mcp** server as project `sage-demo-signup`. If the project
name is not found, call `list_projects` and pick the one whose root is this
repository.

Prefer the graph tools over grepping or reading whole files.

# Contents at the indexed commit

| Measure | Value |
| --- | --- |
| Nodes | 128 |
| Edges | 205 |
| Node labels | `Variable` 55, `Function` 25, `File` 18, `Module` 18, `Folder` 8, `Section` 2, `Branch` 1, `Project` 1 |
| Edge types | `DEFINES` 100, `CALLS` 35, `IMPORTS` 35, `CONTAINS_FILE` 18, `USAGE` 9, `CONTAINS_FOLDER` 6, `HAS_BRANCH` 1, `SEMANTICALLY_RELATED` 1 |
| Languages | JavaScript 11 files, HTML 1, CSS 1, YAML 1 |
| Packages | `pages` 9, `components` 6, `store` 5, `router` 4, `App` 1 |

There are no `Class`, `Type` or `Route` nodes -- the codebase is plain
functions and JSX, and routing is a `Variable` (`routes` in `src/App.jsx`)
rather than a route node. Index coverage extends past `src/`: the YAML
workflow and the JSON files under `.ui-gen/` and `.sage-maintenance/` also
contribute `Variable` nodes, so filter by `file_path` starting `src/` when you
want application code only.

# Tools, by what you are asking

| Question | Tool |
| --- | --- |
| Where is symbol X? | `search_graph` with `query` or `name_pattern` |
| What is in file F? | `get_file_outline` with the exact repo-relative path |
| Show me the source of X | `get_code_snippet` with the qualified name |
| How does A reach B? | `trace_path` |
| Shape of the system | `get_architecture` with `aspects` |
| Multi-hop or aggregation | `query_graph` (read-only Cypher) |
| A literal string or a coverage gap | `search_code` |
| Available properties | `get_graph_schema` with `diagnostics: full` |

# Qualified names

Names are dotted from the project root with the directory path included:

```
sage-demo-signup.src.App.App
sage-demo-signup.src.router.navigate
sage-demo-signup.src.store.findUser
sage-demo-signup.src.pages.Login.submit
sage-demo-signup.src.components.Card.Field
sage-demo-signup.src.components.PasswordRules.passwordIsValid
```

Note that page-local helpers are namespaced by page, so `submit` and `set`
exist several times over -- always qualify them (`...pages.Signup.submit`, not
`submit`) or you will match the wrong one.

# Useful queries

Every application symbol with its location:

```cypher
MATCH (n) WHERE n:Function OR n:Variable
RETURN n.qualified_name AS qn, n.file_path AS file, n.start_line AS line
ORDER BY file, line
```

Callers of a hotspot:

```cypher
MATCH (caller)-[:CALLS]->(callee)
WHERE callee.name = 'navigate'
RETURN caller.qualified_name AS caller, caller.file_path AS file
```

What a page imports:

```cypher
MATCH (f)-[:IMPORTS]->(m)
WHERE f.file_path = 'src/pages/ChangePassword.jsx'
RETURN m.qualified_name AS imported
```

# Gotchas

* `query_graph` rejects `labels(n)[0]` -- bracket indexing fails to parse. Test
  labels with `n:Function OR n:Variable` instead.
* Results page at 200 rows by default; continue with `next_cursor`.
* `graph=missed` lists flagged coverage gaps, but its absence is not proof of
  completeness -- fall back to `search_code` when a symbol seems missing.
* The graph reflects commit `08e3660b8f72cf411a3d1758d0e4fe5026600899`;
  indexes auto-refresh, so re-run `get_architecture` rather than trusting the
  counts above after the code moves on.
