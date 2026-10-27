---
type: Reference
title: Graph Queries
description: How to query the live codebase knowledge graph for this project.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/.codebase-memory
tags: [reference, graph, tooling]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T23:47:28Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ ca10a42e2a13be0442234c6be972f2a13f83ee63
    title: Codebase knowledge graph
status: stable
---

# Project

The graph lives in `.codebase-memory/graph.db.zst` and is served by the
`codebase-memory-mcp` server under project name `sage-demo-signup`. If the name
is not found, call `list_projects` and pick the project whose root is this
repository.

# Shape at this commit

| Measure | Value |
| --- | --- |
| Nodes | 121 |
| Edges | 191 |
| Node labels | `Variable` 53, `Function` 22, `File` 17, `Module` 17, `Folder` 8, `Section` 2, `Branch` 1, `Project` 1 |
| Edge types | `DEFINES` 94, `IMPORTS` 33, `CALLS` 30, `CONTAINS_FILE` 17, `CONTAINS_FOLDER` 6, `USAGE` 6, `SEMANTICALLY_RELATED` 4, `HAS_BRANCH` 1 |

Qualified names are dotted paths from the project root, for example
`sage-demo-signup.src.store.findUser`.

# Useful calls

| Goal | Call |
| --- | --- |
| Orient | `get_architecture(project, aspects: ["overview"])` |
| Routes and layers | `get_architecture(project, aspects: ["routes", "layers", "boundaries"])` |
| Find a symbol | `search_graph(project, query: "findUser")` |
| Declarations in one file | `get_file_outline(project, file_path: "src/pages/Login.jsx")` |
| Read source | `get_code_snippet` on the symbol's qualified name |
| Who calls what | `trace_path` between two qualified names |

# Cypher examples

All functions with their locations:

```cypher
MATCH (n) WHERE n.file_path IS NOT NULL AND n:Function
RETURN n.name AS name, n.file_path AS file, n.start_line AS line
ORDER BY file, line
```

Note: `labels(n)[0]` is not supported by this query engine — filter with
`n:Label` predicates instead of indexing into `labels(n)`.

Callers of a hotspot:

```cypher
MATCH (a)-[:CALLS]->(b) WHERE b.name = 'navigate'
RETURN a.qn AS caller, b.qn AS callee
```

# Caveats

* The graph also indexes non-source files — `.github/workflows/ui-correction.yml`,
  `.ui-gen/corrections/*.json` and `.sage-maintenance/*.json` contribute many of
  the `Variable` nodes (YAML and JSON keys). Filter by `file_path` starting with
  `src/` when you want application code.
* `search_code`/grep remains the right tool for string literals and for files the
  indexer flagged as gaps (`query_graph(graph: "missed")`).
