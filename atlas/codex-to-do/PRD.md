# Atlas Master Engineering PRD

Status: ACTIVE
Canonical repository: `DaCoderMan/workitu-tech-website` (temporary Atlas monorepo)
Canonical engineering queue: `atlas/codex-to-do/`
Last updated: 2026-08-19

## Objective
Make Atlas progressively more powerful, reliable, useful, automatable and recoverable while consolidating Atlas engineering into one canonical repository where practical. Use Git branches + local `git worktree` checkouts to let Codex/Antigravity work on independent fronts in parallel without duplicating repositories.

## Repository strategy — MONOREPO FIRST
Until a dedicated Atlas repository is available, `DaCoderMan/workitu-tech-website` is the temporary canonical monorepo for Atlas engineering. Existing unrelated/legacy repositories are not destructively merged. Instead, Atlas builds a Repository Registry and migrates/imports only components that belong in the canonical Atlas product.

Target structure:
- `atlas/codex-to-do/` — master PRD, status, decisions, registries and Codex queue.
- `atlas/runtime/` — orchestrator, ingestion, memory/state, workers and core runtime.
- `atlas/skills/` — versioned Atlas skills and skill registry.
- `atlas/api/` — REST API and MCP surfaces.
- `atlas/integrations/` — Drive, GitHub, Neon, Gmail/Calendar and other adapters.
- `atlas/backup/` — backup manifests, source registry, verification and restore tooling.
- `atlas/observability/` — logs, traces, metrics, audit and health.
- `atlas/config/` — non-secret config templates, routing and environment contracts.
- `factory/` — Workitu Factory modules/products.
- `agents/` — R2/Mage Agent Factory and reusable agent definitions.
- `modules/voice/` — Voice Module.
- `modules/games/` — Game Mode and reusable game infrastructure.
- `docs/architecture/` — ADRs, diagrams, module contracts and recovery docs.

## Git worktree execution model
Git worktrees are LOCAL checkouts backed by branches in this single repository; GitHub itself stores branches, not worktree directories. Codex/Antigravity must create worktrees on the execution machine as needed.

Branches created as initial parallel lanes:
- `atlas/runtime`
- `atlas/backup`
- `atlas/integrations`
- `atlas/factory`

Recommended local layout:
- primary checkout -> `main`
- `../atlas-wt-runtime` -> branch `atlas/runtime`
- `../atlas-wt-backup` -> branch `atlas/backup`
- `../atlas-wt-integrations` -> branch `atlas/integrations`
- `../atlas-wt-factory` -> branch `atlas/factory`

Rules:
1. One worktree = one branch = one bounded engineering lane.
2. Never have two agents mutate the same files concurrently.
3. Shared contracts/schema changes land first or are coordinated through dependency order.
4. Each lane must run tests/evals before merge.
5. Merge through reviewed PRs or deterministic integration workflow.
6. Rebase/update from `main` before final verification where appropriate.
7. Delete/prune local worktrees only after branch work is safely merged/preserved.
8. Worktrees are an execution mechanism, not a backup mechanism.

## Current verified state
- Google Drive canonical master-backup folder exists: `Atlas — Master Backup`.
- Populated/read-back-verified manifest exists: `Atlas — Complete Backup Manifest — 2026-08-19 14-45`.
- Temporary canonical engineering queue exists at `atlas/codex-to-do/`.
- Atlas repository governance and core skill specification are committed.
- Parallel branches `atlas/runtime`, `atlas/backup`, `atlas/integrations`, `atlas/factory` exist.
- Full verified exports remain incomplete for Neon/Postgres, all important GitHub repos, ChatGPT history/memory, external connector datasets and local Atlas Runtime filesystem/configuration.

## P0 — Monorepo consolidation
- Create the target directory structure above without breaking the Workitu website.
- Build `REPOSITORY_REGISTRY.json` covering existing DaCoderMan repositories.
- Classify repos: CANONICAL, ACTIVE, SUPPORTING, EXPERIMENTAL, ARCHIVED, MIGRATION_CANDIDATE, DISPOSABLE_REVIEW.
- For migration candidates, inventory useful code/assets/history before moving anything.
- Prefer `git subtree`, history-preserving import, package extraction or documented archive pointer according to value/complexity; do not blindly copy entire repos.
- Do not delete old repos after migration until verification + backup + explicit archive decision.
- Add ownership boundaries (CODEOWNERS or equivalent) for major monorepo modules where useful.
- Add workspace/package tooling only if it matches actual languages/stacks; avoid forcing a JavaScript monorepo tool onto Python-only components.

## P0 — Complete backup system
### Source inventory and registry
Build machine-readable Backup Source Registry for Neon/Postgres, GitHub, Google Drive, Atlas Runtime/local filesystem, ChatGPT-derived ingested state and approved connectors. Track source ID, owner, sensitivity, canonicality, export method, cadence, retention, last success, checksum/version, verification, restore method and health.

### Neon/Postgres
Implement schema + data export, migration metadata, critical-table row counts/checksums and isolated restore verification. Acceptance: reconstruct clean database with expected integrity.

### GitHub
Inventory every important repository, default branch/latest SHA and classification. Maintain verified backup pointers. Repository consolidation does not replace repository backup.

### Runtime/config
Back up schemas, migrations, skills, module/plugin manifests, LiteLLM routing templates, MCP/API config templates, dependency locks and deployment definitions. Never commit raw secrets.

### Conversation/ingestion state
Persist durable extracted state with conversation/turn IDs, timestamps, provenance and hashes. Implement export/import of canonical events/entities. Raw ChatGPT export is supplementary when available.

### Drive master backup
Keep `Atlas — Master Backup` as human-readable master backup. Maintain versioned manifests, snapshots, DB exports, repo inventories, config inventories, restore reports and audits.

### Verification and restore
States: PENDING, EXPORTED, COPIED, VERIFIED, RESTORE_TESTED, FAILED, STALE. No backup becomes VERIFIED without source export + destination read-back. Automate restore drills and reports.

## P0 — Core reliability
- Harden mandatory post-turn ingestion.
- Guarantee idempotency, provenance, deduplication and deterministic routing.
- Transactional outbox/route receipts.
- Safe checkpoints/cursors.
- Retry/backoff/DLQ/replay.
- Connector capability health checks.
- Read-back verification for important writes.

## P0 — Canonical data architecture
- Neon/Postgres = canonical structured operational state.
- Google Drive = canonical human-readable docs, exports, archives and master backup.
- GitHub monorepo/runtime = executable source/config/migrations/tests/evals/skills.
- ChatGPT Memory = compact durable preferences/rules when supported.
- Explicit routing matrix for every durable category.

## P0 — Atlas skill system
Implement/register: post-turn-ingestion, canonical-router, dedup-reconciliation, entity-crm, task-project, artifact-registry, drive-master-backup, backup-verifier, restore-recovery, github-sync, checkpoint-cursor, retry-dlq, provenance-audit, sensitivity-retention, capability-health, planner-executor-verifier, skill-registry, snapshot-export, repository-manager, repository-registry, prd-maintainer, codex-handoff, dependency-governance, ci-eval-gate, deploy-release-manager, monorepo-migrator, worktree-manager.

Each skill declares purpose, inputs, outputs, side effects, permissions, dependencies, idempotency, failure states, tests/evals and version.

## P1 — API / MCP / Codex
Maintain stable authenticated REST + MCP surfaces. Codex handoff bundle must include target worktree/branch, scope, file ownership, dependencies, acceptance criteria, tests, rollback and verification commands. Expose backup/health/latest checkpoint through API/MCP. LiteLLM routing where useful.

## P1 — Workitu Factory / modular architecture
Preserve explicit module contracts and Plugin Registry. Integrate Voice, R2/Mage, Game Mode, ingestion, memory, knowledge/RAG and observability as modules/packages inside the monorepo when technically appropriate. A component may remain a separate repo only when there is a concrete deployment/security/ownership/history reason.

## P1 — Observability/security
Structured logs/traces/metrics/audit; permission scopes; external secret management; sensitivity/retention; backup permission/encryption review; alerts for stale/failed backups and restore drills.

## Required artifacts
- `atlas/codex-to-do/backup/source-registry.json`
- `atlas/codex-to-do/backup/latest-manifest.json`
- `atlas/codex-to-do/backup/restore-plan.md`
- `atlas/codex-to-do/backup/restore-report-latest.md`
- `atlas/codex-to-do/REPOSITORY_REGISTRY.json`
- `atlas/codex-to-do/SKILL_REGISTRY.json`
- `atlas/codex-to-do/WORKTREE_REGISTRY.json`
- `atlas/codex-to-do/MIGRATION_PLAN.md`
- `atlas/codex-to-do/DECISIONS.md`

## Acceptance criteria
- One canonical monorepo contains Atlas engineering components where technically appropriate.
- Every retained external repo has a documented reason and registry entry.
- Worktree lanes can execute independently without overlapping file ownership.
- Atlas persists durable outputs without duplicate side effects.
- External writes/backups are verifiable/recoverable.
- Neon restore is tested.
- Important repos have verified backup pointers/SHA.
- Runtime/config can be reconstructed without embedded secrets.
- At least one successful restore drill exists.
- Codex can select the next task/worktree without ambiguity.
- CI/evals gate merges.

## Execution order
1. Create Repository Registry + Migration Plan + Worktree Registry.
2. Scaffold monorepo target directories/contracts.
3. Inventory existing repos and map components to monorepo destinations.
4. Create local worktrees for runtime, backup, integrations and factory lanes.
5. Build Backup Source Registry.
6. Neon export + restore test.
7. GitHub inventory/verified SHA manifest.
8. Runtime/config rebuild inventory.
9. Drive manifest verifier.
10. First restore drill.
11. API/MCP backup health and observability.
12. Migrate high-value modules incrementally with tests/history strategy.
13. Continue remaining P0 then P1.

## Execution policy
P0 unblocked > P1 unblocked > P2. Finish-before-replace where practical. Codex updates `STATUS.md` after meaningful execution and records architectural decisions in `DECISIONS.md`. A task is DONE only with acceptance evidence. Never perform destructive repository consolidation without verified backup and migration validation.