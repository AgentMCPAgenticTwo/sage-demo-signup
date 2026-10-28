---
type: Reference
title: Graph Queries
description: How to query the live codebase knowledge graph for this project.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/.codebase-memory
tags: [reference, graph, tooling]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T05:27:27Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ af863cd5d6567cf6b64d2fc625952a185971b018
    title: Codebase knowledge graph
status: stable
---

The graph lives at `.codebase-memory/graph.db.zst` and is served by the
codebase-memory-mcp server as project **`sage-demo-signup`**. Prefer it over grepping
or reading whole files.

# Graph Shape

| Node label | Count |
| --- | --- |
| `Variable` | 52 |
| `Function` | 19 |
| `File` | 16 |
| `Module` | 16 |
| `Folder` | 8 |
| `Section` | 2 |
| `Branch` | 1 |
| `Project` | 1 |

| Edge type | Count |
| --- | --- |
| `DEFINES` | 89 |
| `IMPORTS` | 25 |
| `CALLS` | 23 |
| `CONTAINS_FILE` | 16 |
| `CONTAINS_FOLDER` | 6 |
| `USAGE` | 5 |
| `HAS_BRANCH` | 1 |
| `SEMANTICALLY_RELATED` | 1 |

There are no `Class`, `Type` or `Route` nodes — the app is function-components only and
routing is a plain object literal, so routes are not modelled as graph nodes.

Qualified names are dotted paths rooted at the project, e.g.
`sage-demo-signup.src.store.findUser`.

# Useful Calls

| Goal | Call |
| --- | --- |
| Project shape at a glance | `get_architecture(project, aspects: ["overview"])` |
| Layers, boundaries, hotspots | `get_architecture(project, aspects: ["layers","boundaries","hotspots"])` |
| Find a symbol | `search_graph(project, query: "findUser")` |
| Declarations in one file | `get_file_outline(project, file_path: "src/pages/Signup.jsx")` |
| Read a symbol's source | `get_code_snippet(project, qualified_name: "sage-demo-signup.src.router.navigate")` |
| How A reaches B | `trace_path(project, from: …, to: …)` |
| Literal strings (error copy, class names) | `search_code(project, pattern: "message ")` |

# Cypher Examples

All symbols with their file and line:

```cypher
MATCH (n) WHERE n:Function OR n:Variable
RETURN n.name AS name, n.qualified_name AS qn,
       n.file_path AS file, n.start_line AS line
ORDER BY file, line
```

Note the dialect is restricted: `labels(n)[0]` and other indexing expressions fail to
parse. Filter with `n:Label` predicates instead.

Everything that calls into the store:

```cypher
MATCH (a)-[:CALLS]->(b)
WHERE b.file_path = 'src/store.js'
RETURN a.qualified_name AS caller, b.name AS callee
```

# Caveats

* `Variable` nodes include YAML and JSON keys from `.github/workflows/ui-correction.yml`,
  `.sage-maintenance/` and `.ui-gen/corrections/` — filter by `file_path` starting with
  `src/` when you want application code only.
* `query_graph(graph: "missed")` lists flagged coverage gaps; absence there is not proof
  of completeness.
* The graph reflects commit `af863cd`; re-check against the working tree before relying
  on a line number.
