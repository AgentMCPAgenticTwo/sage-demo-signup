---
type: Reference
title: Graph queries
description: How to query the live codebase knowledge graph for this project.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/.codebase-memory
tags: [reference, graph, tooling]
generated: { by: sage-maintenance/claude-code, at: 2026-10-27T17:18:25Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 78b91de716644ab7bfc26c34d71b2176b39a35ee
    title: Codebase knowledge graph
status: stable
---

# Project

The graph lives in `.codebase-memory/graph.db.zst` and is served by the
`codebase-memory-mcp` server as project **`sage-demo-signup`**. If that name is
not found, call `list_projects` and pick the project whose root is this
repository.

# Tools, in order of preference

| Tool | Use for |
| --- | --- |
| `get_architecture` | layers, boundaries, clusters, hotspots, entry points, file tree |
| `search_graph` | finding a symbol by name, qualified name or semantic query |
| `get_file_outline` | the declarations in one exact repository-relative file |
| `trace_path` | how two symbols are connected |
| `get_code_snippet` | source for a symbol, instead of reading the whole file |
| `query_graph` | multi-hop Cypher and aggregation |
| `search_code` | literal strings the symbol graph does not model (CSS classes, text copy) |

# Shape of this graph

120 nodes, 177 edges. Node labels: `Variable` (55), `Function` (21), `File`
(16), `Module` (16), `Folder` (8), `Section` (2), `Branch` (1), `Project` (1).
Edge types: `DEFINES` (94), `CALLS` (25), `IMPORTS` (25), `CONTAINS_FILE` (16),
`USAGE` (8), `CONTAINS_FOLDER` (6), `CONFIGURES`, `HAS_BRANCH`,
`SEMANTICALLY_RELATED`.

React components are indexed as `Function`, not a `Class` or `Component` label,
and there are no `Route` nodes -- the routes are the keys of the `routes`
object literal in `src/App.jsx` (a `Variable`).

# Useful queries

Every symbol with its location, in file order:

```cypher
MATCH (n) WHERE n.label IN ['Function','Variable']
RETURN n.file_path AS f, n.start_line AS l, n.label AS t, n.name AS name
ORDER BY f, l
```

What a page depends on:

```cypher
MATCH (a)-[r:CALLS|IMPORTS]->(b)
WHERE a.file_path STARTS WITH 'src/pages/'
RETURN a.name, type(r), b.name, b.file_path
```

The YAML, JSON and markdown under `.github/`, `.sage-maintenance/` and
`.ui-gen/` are indexed too -- filter on `file_path STARTS WITH 'src/'` when you
only want application code.

Coverage gaps are available via `query_graph` with `graph=missed`; absence there
is not proof of completeness.
