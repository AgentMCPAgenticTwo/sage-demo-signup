---
type: Reference
title: Graph Queries
description: How to query the live codebase knowledge graph for this project.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/.codebase-memory
tags: [reference, tooling, graph]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:04:36Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 360fd597ded4ea1f388e555fd8458ad76d46ff8b
    title: Codebase knowledge graph
status: stable
---

# Where the graph lives

`.codebase-memory/graph.db.zst`, served by the codebase-memory-mcp MCP server as
project `sage-demo-signup`. Prefer it over grepping or reading whole files. If
the project name does not resolve, call `list_projects` and pick the one whose
root is this repository.

# Tools

| Tool | Use for |
| --- | --- |
| `search_graph` | Find a symbol by name and get its qualified name |
| `get_file_outline` | Declarations in one exact repo-relative path |
| `get_code_snippet` | Source for a symbol from `search_graph` |
| `trace_path` | Relationship between two symbols |
| `query_graph` | Multi-hop and aggregate questions (read-only Cypher) |
| `get_architecture` | Clusters, layers, boundaries, hotspots, routes |

# Graph shape at this commit

115 nodes, 166 edges.

| Node label | Count |
| --- | --- |
| `Variable` | 52 |
| `Function` | 19 |
| `File` | 16 |
| `Module` | 16 |
| `Folder` | 8 |

| Edge type | Count |
| --- | --- |
| `DEFINES` | 89 |
| `IMPORTS` | 25 |
| `CALLS` | 23 |
| `CONTAINS_FILE` | 16 |
| `USAGE` | 5 |

There are no `Class`, `Type` or `Route` nodes -- the app has no classes, is
plain JavaScript, and its routes are a plain object literal (`routes` in
`src/App.jsx`), not a framework route table.

# Useful queries

Every declaration with its location:

```cypher
MATCH (n) WHERE n.file_path IS NOT NULL AND (n:Function OR n:Variable)
RETURN n.file_path AS f, n.name AS name, n.start_line AS line
ORDER BY f, line
```

Callers of a hotspot:

```cypher
MATCH (c)-[:CALLS]->(t) WHERE t.name = 'navigate'
RETURN c.file_path AS f, c.name AS caller
```

Cross-package edges (confirms the one-way `pages -> core` boundary):

```cypher
MATCH (a)-[:IMPORTS]->(b) RETURN a.file_path AS from, b.file_path AS to
```

# Caveats

* `label(n)[0]` and other indexed-list expressions are rejected by the Cypher
  parser; select properties directly instead.
* The graph indexes non-source files too -- `.github/workflows/ui-correction.yml`,
  `.sage-maintenance/*` and `.ui-gen/corrections/*` contribute most of the
  `Variable` nodes. Filter on `src/` when you want application symbols.
* Coverage is best-effort; a clean `check_index_coverage` is not proof of
  completeness.
