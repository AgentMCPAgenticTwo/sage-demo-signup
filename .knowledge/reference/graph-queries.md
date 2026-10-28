---
type: Reference
title: Graph queries
description: How to query the live codebase knowledge graph for this project.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/.codebase-memory
tags: [reference, tooling, graph]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:11:52Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 11cbd71eed22e7124383102d0584b2397653d88d
    title: Codebase knowledge graph
status: stable
---

# Graph queries

The graph lives at `.codebase-memory/graph.db.zst` and is served by the
`codebase-memory-mcp` server as project **`sage-demo-signup`**. Prefer it over
grepping; it is small enough to query exhaustively.

## Shape

| Node label | Count | Edge type | Count |
| --- | --- | --- | --- |
| Variable | 49 | DEFINES | 86 |
| Function | 19 | IMPORTS | 25 |
| File | 16 | CALLS | 23 |
| Module | 16 | CONTAINS_FILE | 16 |
| Folder | 8 | CONTAINS_FOLDER | 6 |
| Section | 2 | USAGE | 5 |
| Branch | 1 | HAS_BRANCH | 1 |
| Project | 1 | SEMANTICALLY_RELATED | 1 |

Totals: 112 nodes, 163 edges. Note that many `Variable` nodes are top-level
keys in the YAML/JSON files under `.github/` and `.ui-gen/`, not application
code -- filter on `file_path STARTS WITH 'src/'` when you mean the app.

## Useful calls

| Goal | Tool call |
| --- | --- |
| Project map | `get_architecture(project, aspects: ["all"])` |
| Declarations in one file | `get_file_outline(project, file_path: "src/store.js")` |
| Find a symbol | `search_graph(project, query: "navigate")` |
| Source of a symbol | `get_code_snippet` on the node |
| Who calls what | `trace_path` between two symbols |

## Cypher examples

Every application symbol with its location:

```cypher
MATCH (n) WHERE n.file_path STARTS WITH 'src/'
RETURN labels(n) AS l, n.name, n.file_path, n.start_line
ORDER BY n.file_path, n.start_line
```

Call edges out of the pages:

```cypher
MATCH (a)-[:CALLS]->(b)
WHERE a.file_path STARTS WITH 'src/pages/'
RETURN a.name, a.file_path, b.name, b.file_path
```

Fan-in ranking (reproduces the hotspot table in
[Architecture](/architecture.md)):

```cypher
MATCH (a)-[:CALLS]->(b)
RETURN b.qn AS symbol, count(*) AS fan_in
ORDER BY fan_in DESC
```

## Caveats

* The graph reflects commit `11cbd71eed22e7124383102d0584b2397653d88d` on
  branch `ui-correction/39692e55f7fe`. Re-index after changing code.
* `graph: "missed"` lists flagged coverage gaps; an empty result is not proof
  of complete coverage.
* `dist/` and `node_modules/` are not indexed.
