---
type: Reference
title: Graph Queries
description: How to query the live codebase-memory graph for this project.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/.codebase-memory
tags: [reference, tooling, graph]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T23:34:47Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 9e0695a13b39e00939f996e6665b83350960de3e
    title: Codebase knowledge graph
status: stable
---

# The graph

Stored at `.codebase-memory/graph.db.zst` and served by the
**codebase-memory-mcp** server as project `sage-demo-signup`. Prefer it over
grepping or reading whole files.

At the indexed commit: 121 nodes, 177 edges.

| Node label | Count |
| --- | --- |
| Variable | 55 |
| Function | 22 |
| File | 16 |
| Module | 16 |
| Folder | 8 |
| Section | 2 |
| Branch | 1 |
| Project | 1 |

| Edge type | Count |
| --- | --- |
| DEFINES | 95 |
| CALLS | 26 |
| IMPORTS | 24 |
| CONTAINS_FILE | 16 |
| USAGE | 8 |
| CONTAINS_FOLDER | 6 |
| CONFIGURES | 1 |
| HAS_BRANCH | 1 |

# Tool cheatsheet

| Tool | Use it for |
| --- | --- |
| `get_architecture` | packages, layers, boundaries, hotspots, clusters, file tree |
| `search_graph` | find a symbol by name/regex/semantics, with in/out edges |
| `get_file_outline` | declarations of one exact repo-relative path, in source order |
| `get_code_snippet` | source for one symbol by qualified name |
| `trace_path` | relationship paths between two symbols |
| `query_graph` | read-only Cypher for multi-hop and aggregation |
| `search_code` | literals and anything the graph missed |

# Qualified names

Symbols are namespaced by path: `sage-demo-signup.src.pages.Signup.passwordErrors`,
`sage-demo-signup.src.router.navigate`, `sage-demo-signup.src.store.findUser`.

# Useful queries

Every declared symbol with its location — note `query_graph` Cypher here does
not accept `labels(n)[0]`; use the `n.label` property instead:

```cypher
MATCH (n) WHERE n.file_path IS NOT NULL AND NOT n:File AND NOT n:Folder
RETURN n.label AS label, n.name AS name, n.file_path AS file, n.start_line AS line
ORDER BY file, line
```

Everything that calls into the store:

```cypher
MATCH (caller)-[:CALLS]->(callee)
WHERE callee.file_path = 'src/store.js'
RETURN caller.name, caller.file_path, callee.name
```

Entry points and hotspots are easier via
`get_architecture(aspects: ["entry_points", "hotspots"])` than via Cypher.

# Coverage

`query_graph(graph: "missed")` returns a file tree of flagged indexing gaps.
Absence from that tree is not proof of completeness — fall back to `search_code`
for string literals, CSS class names and config values, which the symbol graph
does not model.
