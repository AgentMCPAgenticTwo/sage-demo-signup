---
type: Reference
title: Graph Queries
description: How to query the live codebase knowledge graph for this project.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/.codebase-memory
tags: [reference, tooling, graph]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:19:54Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 8b5e972c95c0d30e9afcad3fc02c3eb1ec018b87
    title: Codebase knowledge graph
status: stable
---

# The Graph

Stored at `.codebase-memory/graph.db.zst` and served by the
`codebase-memory-mcp` MCP server as project **`sage-demo-signup`**. Prefer it
over grepping or reading whole files.

At the indexed commit the graph holds 115 nodes and 166 edges.

| Node label | Count |
| --- | --- |
| Variable | 52 |
| Function | 19 |
| File | 16 |
| Module | 16 |
| Folder | 8 |
| Section | 2 |
| Branch | 1 |
| Project | 1 |

| Edge type | Count |
| --- | --- |
| DEFINES | 89 |
| IMPORTS | 25 |
| CALLS | 23 |
| CONTAINS_FILE | 16 |
| CONTAINS_FOLDER | 6 |
| USAGE | 5 |
| HAS_BRANCH | 1 |
| SEMANTICALLY_RELATED | 1 |

# Tools To Reach For

| Question | Tool |
| --- | --- |
| "What is in this file?" | `get_file_outline(project, file_path)` |
| "Where is this symbol?" | `search_graph` |
| "Show me the code" | `get_code_snippet(qualified_name, project)` |
| "How does A reach B?" | `trace_path` |
| "What is the shape of the repo?" | `get_architecture(aspects: ["all"])` |
| Multi-hop or aggregate | `query_graph` (read-only Cypher) |
| Literal strings, CSS classes | `search_code` |

# Qualified Names

Qualified names are dotted and rooted at the project:
`sage-demo-signup.src.store.findUser`,
`sage-demo-signup.src.components.Card.Card`,
`sage-demo-signup.src.pages.Signup.submit`.

# Useful Queries

Every symbol with its location:

```cypher
MATCH (n) WHERE n.file_path IS NOT NULL
RETURN n.name AS name, n.file_path AS file, n.start_line AS line, n.qualified_name AS qn
ORDER BY file, line
```

Callers of a hotspot:

```cypher
MATCH (a)-[:CALLS]->(b) WHERE b.name = 'navigate'
RETURN a.qualified_name AS caller, b.qualified_name AS callee
```

Cross-file imports:

```cypher
MATCH (a)-[:IMPORTS]->(b)
RETURN a.file_path AS from_file, b.qualified_name AS imported
```

Note: `query_graph` rejects list-index syntax such as `labels(n)[0]`.

# Caveats

* The graph indexes repository metadata too — `.github/workflows/`,
  `.sage-maintenance/` and `.ui-gen/` nodes appear alongside source symbols.
  Filter on `n.file_path STARTS WITH 'src/'` for application code.
* Index freshness is best-effort; `check_index_coverage` reports gaps, and a
  clean report is not proof of completeness.
