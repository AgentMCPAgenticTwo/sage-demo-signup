---
type: Reference
title: Graph queries
description: How to query the live codebase knowledge graph for this project.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/.codebase-memory
tags: [reference, graph, mcp]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:44:46Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ e05c9763bafd1094d0ab184ec6d101f963d09410
    title: Codebase knowledge graph
status: stable
---

# Project

The graph is served by the `codebase-memory-mcp` server as project
`sage-demo-signup`, backed by `.codebase-memory/graph.db.zst`. If the name does
not resolve, call `list_projects` and pick the project whose root is this
repository.

# Shape at this commit

| Node label | Count |
| --- | --- |
| Variable | 54 |
| Function | 24 |
| File | 18 |
| Module | 18 |
| Folder | 8 |
| Section | 2 |
| Branch | 1 |
| Project | 1 |

| Edge type | Count |
| --- | --- |
| DEFINES | 98 |
| IMPORTS | 35 |
| CALLS | 33 |
| CONTAINS_FILE | 18 |
| USAGE | 9 |
| CONTAINS_FOLDER | 6 |
| SEMANTICALLY_RELATED | 3 |
| CONFIGURES | 2 |
| HAS_BRANCH | 1 |

126 nodes and 205 edges in total. There are no `Class`, `Type` or `Route` nodes —
routes live as the `routes` Variable in `src/App.jsx`, and the password-rule
shape as object literals, so query for Variables when looking for either.

# Tool choices

| Need | Tool |
| --- | --- |
| Find a symbol by name or meaning | `search_graph` with `query` or `semantic_query` |
| List declarations in one file | `get_file_outline` with an exact repo-relative path |
| Read a symbol's source | `get_code_snippet` with the `qn` from `search_graph` |
| How A reaches B | `trace_path` |
| Layers, boundaries, hotspots, clusters, file tree | `get_architecture` |
| Multi-hop or aggregate questions | `query_graph` (read-only Cypher) |
| Literal strings (class names, messages) | `search_code` |

# Useful queries

Qualified names are dotted and project-prefixed, e.g.
`sage-demo-signup.src.store.findUser`.

```cypher
// every declaration with its location
MATCH (n) WHERE n.file_path IS NOT NULL AND (n:Function OR n:Variable)
RETURN n.file_path AS f, n.name AS name, n.start_line AS line ORDER BY f, line
```

```cypher
// who calls into the store
MATCH (a)-[:CALLS]->(b) WHERE b.file_path = 'src/store.js'
RETURN a.qualified_name, b.name
```

```cypher
// module import graph
MATCH (a)-[:IMPORTS]->(b) RETURN a.qualified_name, b.qualified_name
```

# Caveats

* `query_graph` rejects list indexing such as `labels(n)[0]`; select properties
  instead.
* Results are paged — honour `has_more` / `next_cursor` rather than assuming a
  single page is complete.
* `graph=missed` lists flagged coverage gaps; its absence is not proof of
  completeness, so confirm cited paths exist.
