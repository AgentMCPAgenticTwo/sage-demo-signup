---
type: Reference
title: Graph Queries
description: How to query the live codebase knowledge graph for this project.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/.codebase-memory
tags: [reference, tooling, graph]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:35:21Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ af0eb7e28c6d901616970ef2450db466024c0fd3
    title: Codebase knowledge graph
status: stable
---

# The graph

Served by the `codebase-memory-mcp` server as project **`sage-demo-signup`**,
from `.codebase-memory/graph.db.zst`. If the project name is not found, call
`list_projects` and pick the one whose root is this repository.

At commit `af0eb7e`: 118 nodes, 173 edges.

| Node label | Count |
| --- | --- |
| Variable | 54 |
| Function | 20 |
| File | 16 |
| Module | 16 |
| Folder | 8 |
| Section | 2 |
| Branch | 1 |
| Project | 1 |

| Edge type | Count |
| --- | --- |
| DEFINES | 92 |
| IMPORTS | 25 |
| CALLS | 24 |
| CONTAINS_FILE | 16 |
| USAGE | 8 |
| CONTAINS_FOLDER | 6 |
| HAS_BRANCH | 1 |
| SEMANTICALLY_RELATED | 1 |

# Which tool to reach for

| Need | Tool |
| --- | --- |
| Find a symbol by name or meaning | `search_graph` (`query`, `name_pattern`, or `semantic_query`) |
| See everything declared in one file | `get_file_outline` with the exact repo-relative path |
| Read a symbol's source | `get_code_snippet` with its qualified name |
| Layers, clusters, hotspots, routes | `get_architecture` (`aspects: ["all"]` for everything) |
| How A reaches B | `trace_path` |
| Multi-hop or aggregate questions | `query_graph` (read-only Cypher) |
| A string literal the graph does not model | `search_code` |

# Naming

Qualified names are dotted and project-rooted, mirroring the path:

```
sage-demo-signup.src.pages.Signup.PASSWORD_RULES
sage-demo-signup.src.router.navigate
sage-demo-signup.src.store.findUser
```

# Worked examples

Everything declared under `src/`, in file order:

```cypher
MATCH (n) WHERE n.file_path STARTS WITH 'src'
RETURN n.name AS name, n.qualified_name AS qn,
       n.file_path AS file, n.start_line AS line
ORDER BY file, line
```

> `query_graph`'s Cypher subset rejects `labels(n)[0]` -- index into a list
> and the query fails to parse. Project plain properties instead.

Who calls `navigate`:

```cypher
MATCH (a)-[:CALLS]->(b) WHERE b.name = 'navigate'
RETURN a.qualified_name AS caller, a.file_path AS file
```

Outline one file:

```
get_file_outline(project: "sage-demo-signup", file_path: "src/pages/Signup.jsx")
```

# Caveats

* `graph=missed` on `query_graph` lists flagged coverage gaps; its absence is
  not proof of completeness.
* Results page -- carry `next_cursor` rather than re-running with a bigger
  limit.
* The graph models JS/JSX structure. CSS selectors in `src/style.css` and the
  markup in `index.html` are indexed as files, not as symbols; use
  `search_code` for those.
