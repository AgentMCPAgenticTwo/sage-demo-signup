---
type: Reference
title: Graph Queries
description: How to query the live codebase knowledge graph for this project.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/.codebase-memory
tags: [reference, graph, tooling]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T04:56:52Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 38fe79e86edef6544c50fc543f51f4f47b2379a8
    title: Codebase knowledge graph
status: stable
---

# The graph

`.codebase-memory/graph.db.zst`, served by the **codebase-memory-mcp** server
as project **`sage-demo-signup`**. Prefer it over grepping or reading whole
files. If the project name is not found, call `list_projects` and pick the one
rooted at this repository.

# Size at this commit

| Metric | Value |
| --- | --- |
| Nodes | 115 |
| Edges | 166 |
| Node labels | `Variable` 52, `Function` 19, `File` 16, `Module` 16, `Folder` 8, `Section` 2, `Branch` 1, `Project` 1 |
| Edge types | `DEFINES` 89, `IMPORTS` 25, `CALLS` 23, `CONTAINS_FILE` 16, `CONTAINS_FOLDER` 6, `USAGE` 5, `HAS_BRANCH` 1, `SEMANTICALLY_RELATED` 1 |

# Recipes

| Goal | Call |
| --- | --- |
| Big picture | `get_architecture(project="sage-demo-signup", aspects=["all"])` |
| Declarations in one file | `get_file_outline(project="sage-demo-signup", file_path="src/pages/Signup.jsx")` |
| Find a symbol | `search_graph(project="sage-demo-signup", query="navigate")` |
| Read source for a symbol | `get_code_snippet(project="sage-demo-signup", qualified_name="sage-demo-signup.src.store.findUser")` |
| Who calls what | `trace_path(project="sage-demo-signup", ...)` between two qualified names |
| Literal string search | `search_code(project="sage-demo-signup", pattern="acme-current")` |

# Qualified names

They follow `sage-demo-signup.<path-with-dots>.<symbol>`:

| Symbol | Qualified name |
| --- | --- |
| `App` | `sage-demo-signup.src.App.App` |
| `navigate` | `sage-demo-signup.src.router.navigate` |
| `usePath` | `sage-demo-signup.src.router.usePath` |
| `Link` | `sage-demo-signup.src.router.Link` |
| `Card` | `sage-demo-signup.src.components.Card.Card` |
| `Field` | `sage-demo-signup.src.components.Card.Field` |
| `Message` | `sage-demo-signup.src.components.Card.Message` |
| `Signup` | `sage-demo-signup.src.pages.Signup.Signup` |
| `Login` | `sage-demo-signup.src.pages.Login.Login` |
| `Welcome` | `sage-demo-signup.src.pages.Welcome.Welcome` |
| `findUser` | `sage-demo-signup.src.store.findUser` |
| `saveUser` | `sage-demo-signup.src.store.saveUser` |
| `setCurrentUser` | `sage-demo-signup.src.store.setCurrentUser` |
| `currentUser` | `sage-demo-signup.src.store.currentUser` |

Note that both page submit handlers are named `submit`, so disambiguate by
qualified name (`...pages.Login.submit` vs `...pages.Signup.submit`).

# Cypher notes

`query_graph` accepts read-only Cypher but rejects list indexing such as
`labels(n)[0]`. Project node properties include `file_path`, `name`,
`start_line` and `signature`:

```cypher
MATCH (n) WHERE n.file_path STARTS WITH 'src/'
RETURN n.file_path AS f, n.name AS name, n.start_line AS line
ORDER BY f, line
```
