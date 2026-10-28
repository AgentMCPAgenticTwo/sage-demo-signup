---
type: Module
title: Maintenance metadata
description: Generated correction, prompt and workflow artefacts kept alongside the source.
resource: https://github.com/AgentMCPAgenticTwo/sage-demo-signup/tree/main/.ui-gen
tags: [tooling, ci, generated]
generated: { by: sage-maintenance/claude-code, at: 2026-10-28T00:44:46Z }
sources:
  - id: cbm-graph
    resource: codebase-memory-mcp project sage-demo-signup @ e05c9763bafd1094d0ab184ec6d101f963d09410
    title: Codebase knowledge graph
status: stable
---

# Files

| File | Contents |
| --- | --- |
| `.github/workflows/ui-correction.yml` | The UI-correction workflow: `on`, `run-name`, `permissions`, `concurrency`, `jobs` |
| `.ui-gen/corrections/fa562b21e997.json` | Correction record: `trace_id`, `maintenance_branch`, `status`, `summary`, `files_changed`, `lines_changed`, `blockers`, `conventions`, `visual_check`, `context_sharing`, `types` (`User`, `PasswordRule`), `usage` |
| `.sage-maintenance/fa562b21e997.prompts.json` | The prompt set for that trace: `version`, `sources`, `prompts` (`correction`, `feature`, `knowledge`, `visual`, contract and dependency notes) |
| `.sage-maintenance/fa562b21e997.md` | Human-readable maintenance notes for trace `fa562b21e997` |
| `.codebase-memory/graph.db.zst` | The compressed knowledge graph this bundle is generated from |

# Relationships

* Describes, rather than participates in, the application modules — no code in
  `src/` imports any of it.
* The `types` block in the correction record mirrors the runtime shapes
  documented in [Store](/modules/src-store.md) (`User`) and
  [Components](/modules/src-components.md) (`PasswordRule`).
* `.codebase-memory/graph.db.zst` is the source behind
  [Graph Queries](/reference/graph-queries.md).

# Notes

* All of these files are generated. Treat them as read-only history; edit the
  workflow only when changing the automation itself.
* Each artefact is named by its trace id, so a new maintenance run adds files
  rather than rewriting existing ones.
