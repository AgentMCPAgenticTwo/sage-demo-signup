---
type: Reference
title: Graph queries
description: How to query the live codebase knowledge graph for this project.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/.codebase-memory
tags: [reference, graph, tooling]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T03:58:25Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ 33f196c6383d96b07ef0b9ef85db894b4859243c
    title: Codebase knowledge graph
status: stable
---

# Graph queries

The graph lives at `.codebase-memory/graph.db.zst` and is served by the
codebase-memory-mcp server as project **`sage-demo-signup`**. Prefer it over
grepping or reading whole files.

## Shape at the indexed commit

| Node label | Count | | Edge type | Count |
| --- | --- | --- | --- | --- |
| Variable | 49 | | DEFINES | 86 |
| Function | 19 | | IMPORTS | 25 |
| File | 16 | | CALLS | 23 |
| Module | 16 | | CONTAINS_FILE | 16 |
| Folder | 8 | | CONTAINS_FOLDER | 6 |
| Section | 2 | | USAGE | 5 |
| Branch / Project | 1 each | | HAS_BRANCH / SEMANTICALLY_RELATED | 1 each |

Totals: 112 nodes, 163 edges. Note the graph also indexes non-source files
-- `.github/workflows/ui-correction.yml`, `.sage-maintenance/*` and
`.ui-gen/corrections/*` contribute most of the `Variable` nodes, so filter
by `file_path` starting with `src/` when you want application code.

## Tools, in order of preference

| Tool | Use it for |
| --- | --- |
| `get_architecture` | Layers, clusters, boundaries, hotspots, entry points, file tree |
| `search_graph` | Find a symbol by name, regex or meaning; returns file and lines |
| `get_file_outline` | Every declaration in one exact repo-relative file |
| `trace_path` | How two symbols connect |
| `get_code_snippet` | The source of one symbol, instead of reading the file |
| `query_graph` | Cypher for multi-hop or aggregate questions |
| `search_code` | Literals (class names, strings) the symbol graph does not carry |

## Useful queries

Every application symbol with its location:

```cypher
MATCH (n) WHERE n.file_path STARTS WITH 'src/'
RETURN labels(n) AS kind, n.name AS name, n.file_path AS file, n.start_line AS line
ORDER BY file, line
```

Who calls a hotspot:

```cypher
MATCH (caller)-[:CALLS]->(callee {name: 'navigate'})
RETURN caller.qn, caller.file_path, caller.start_line
```

Cross-module imports:

```cypher
MATCH (a)-[:IMPORTS]->(b)
WHERE a.file_path STARTS WITH 'src/' AND b.file_path STARTS WITH 'src/'
RETURN a.file_path, b.file_path
```

Routes are not a separate node label here -- the route table is the
`routes` Variable at `src/App.jsx:7`. Read it with `get_code_snippet`.

## Caveats

* `graph=missed` lists flagged coverage gaps; its absence is not proof of
  completeness.
* Results are paginated -- follow `next_cursor` rather than assuming the
  first page is the whole answer.
* The graph is refreshed by the sage-maintenance workflow; it reflects the
  commit named in each concept's `sources`, not necessarily your worktree.
