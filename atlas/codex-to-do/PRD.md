# Atlas Master Engineering PRD

Status: ACTIVE
Canonical repository: `DaCoderMan/workitu-tech-website` (temporary Atlas monorepo)
Canonical engineering queue: `atlas/codex-to-do/`
Last updated: 2026-08-19

## Objective
Make Atlas progressively more powerful, reliable, useful, automatable and recoverable while consolidating Atlas engineering into one canonical repository where practical. Use Git branches + local `git worktree` checkouts to let Codex, Gemini/Antigravity and other approved ecosystems work on independent fronts in parallel without duplicating repositories or forking Atlas into incompatible implementations.

## Mandatory multi-ecosystem requirement
Atlas MUST be usable and developable from Gemini/Antigravity as a first-class supported ecosystem, not merely as a future compatibility target. Codex and Gemini/Antigravity are peer execution/development ecosystems behind shared Atlas contracts.

Required outcomes:
- Gemini/Antigravity can clone/open the canonical monorepo and understand the same source of truth as Codex.
- Gemini/Antigravity can consume the same master PRD, task/status registries, skill contracts, architecture decisions and acceptance criteria.
- Gemini/Antigravity gets its own adapter/config/instructions under `atlas/adapters/gemini/` while shared business/domain logic stays outside vendor-specific directories.
- Gemini/Antigravity must be able to execute Atlas engineering tasks, run tests/evals, update STATUS/DECISIONS and produce PR-ready changes using the same governance as Codex.
- Atlas runtime features must not require Codex to exist.
- Any ecosystem-specific capability must expose a portable contract or be explicitly documented as optional/vendor-specific.
- Shared conformance tests must verify that Gemini and Codex integrations preserve the same Atlas contracts for skills, state, routing, backup, permissions and handoffs where applicable.

## Repository strategy — MONOREPO FIRST
Until a dedicated Atlas repository is available, `DaCoderMan/workitu-tech-website` is the temporary canonical monorepo for Atlas engineering. Existing unrelated/legacy repositories are not destructively merged. Instead, Atlas builds a Repository Registry and migrates/imports only components that belong in the canonical Atlas product.

Target structure:
- `atlas/codex-to-do/` — master PRD, status, decisions, registries and shared engineering queue (name is legacy; content is ecosystem-neutral).
- `atlas/core/` — provider/ecosystem-neutral contracts, schemas and policy.
- `atlas/runtime/` — orchestrator, ingestion, memory/state, workers and core runtime.
- `atlas/skills/` — versioned Atlas skills and skill registry.
- `atlas/api/` — REST API and MCP surfaces.
- `atlas/integrations/` — Drive, GitHub, Neon, Gmail/Calendar and other service adapters.
- `atlas/adapters/codex/` — Codex-specific handoff/config/instructions.
- `atlas/adapters/gemini/` — Gemini/Antigravity-specific handoff/config/instructions.
- `atlas/adapters/claude/` — Claude ecosystem adapter when supported.
- `atlas/adapters/local/` — local/Ollama execution adapter.
- `atlas/conformance/` — shared ecosystem/provider conformance tests.
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
- `atlas/ecosystem-codex`
- `atlas/ecosystem-gemini`
- `atlas/ecosystem-claude`

Recommended local layout:
- primary checkout -> `main`
- `../atlas-wt-runtime` -> branch `atlas/runtime`
- `../atlas-wt-backup` -> branch `atlas/backup`
- `../atlas-wt-integrations` -> branch `atlas/integrations`
- `../atlas-wt-factory` -> branch `atlas/factory`
- `../atlas-wt-codex` -> branch `atlas/ecosystem-codex`
- `../atlas-wt-gemini` -> branch `atlas/ecosystem-gemini`

Rules:
1. One worktree = one branch = one bounded engineering lane.
2. Never have two agents mutate the same files concurrently.
3. Shared contracts/schema changes land first or are coordinated through dependency order.
4. Each lane must run tests/evals before merge.
5. Merge through reviewed PRs or deterministic integration workflow.
6. Rebase/update from `main` before final verification where appropriate.
7. Delete/prune local worktrees only after branch work is safely merged/preserved.
8. Worktrees are an execution mechanism, not a backup mechanism.
9. Ecosystem-specific branches may not fork shared Atlas semantics; deviations require ADR + conformance coverage.

## Current verified state
- Google Drive canonical master-backup folder exists: `Atlas — Master Backup`.
- Populated/read-back-verified manifest exists: `Atlas — Complete Backup Manifest — 2026-08-19 14-45`.
- Temporary canonical engineering queue exists at `atlas/codex-to-do/`.
- Atlas repository governance, core skill specification and portability contract are committed.
- Parallel branches for runtime, backup, integrations, factory, Codex, Gemini and Claude ecosystems exist.
- Full verified exports remain incomplete for Neon/Postgres, all important GitHub repos, ChatGPT history/memory, external connector datasets and local Atlas Runtime filesystem/configuration.

## P0 — Gemini/Antigravity first-class support
- Scaffold `atlas/adapters/gemini/`.
- Create Gemini/Antigravity instruction/handoff contract equivalent in capability to the Codex handoff.
- Define how Gemini reads the master PRD, STATUS, DECISIONS, registries and target worktree.
- Add commands/scripts or documented workflow for Gemini/Antigravity to initialize a worktree, select an unblocked task, run tests/evals, commit changes and update status.
- Ensure Gemini can access required tools through MCP/API/provider abstractions rather than Codex-only mechanisms.
- Add `atlas/conformance/ecosystem-gemini` tests covering task handoff, skill contract parsing, routing/state schemas, backup interfaces and deterministic status updates.
- Add compatibility matrix for Codex vs Gemini vs other ecosystems.
- Acceptance: the same bounded engineering task can be handed to Codex or Gemini and both produce changes conforming to the same contracts/acceptance criteria without modifying core semantics.

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
Implement/register: post-turn-ingestion, canonical-router, dedup-reconciliation, entity-crm, task-project, artifact-registry, drive-master-backup, backup-verifier, restore-recovery, github-sync, checkpoint-cursor, retry-dlq, provenance-audit, sensitivity-retention, capability-health, planner-executor-verifier, skill-registry, snapshot-export, repository-manager, repository-registry, prd-maintainer, codex-handoff, gemini-handoff, dependency-governance, ci-eval-gate, deploy-release-manager, monorepo-migrator, worktree-manager, ecosystem-conformance.

Each skill declares purpose, inputs, outputs, side effects, permissions, dependencies, idempotency, failure states, tests/evals and version.

## P1 — API / MCP / ecosystem integration
Maintain stable authenticated REST + MCP surfaces. Ecosystem handoff bundles must include target worktree/branch, scope, file ownership, dependencies, acceptance criteria, tests, rollback and verification commands. Expose backup/health/latest checkpoint through API/MCP. LiteLLM routing where useful. No API/MCP contract may assume Codex is the caller.

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
- `atlas/codex-to-do/ECOSYSTEM_COMPATIBILITY.json`
- `atlas/codex-to-do/MIGRATION_PLAN.md`
- `atlas/codex-to-do/DECISIONS.md`
- `atlas/adapters/gemini/README.md`
- `atlas/adapters/gemini/HANDOFF.md`
- `atlas/conformance/README.md`

## Acceptance criteria
- One canonical monorepo contains Atlas engineering components where technically appropriate.
- Gemini/Antigravity and Codex are both first-class supported engineering ecosystems.
- Every retained external repo has a documented reason and registry entry.
- Worktree lanes can execute independently without overlapping file ownership.
- Atlas persists durable outputs without duplicate side effects.
- External writes/backups are verifiable/recoverable.
- Neon restore is tested.
- Important repos have verified backup pointers/SHA.
- Runtime/config can be reconstructed without embedded secrets.
- At least one successful restore drill exists.
- Codex OR Gemini can select and execute the next compatible task without ambiguity.
- Shared ecosystem conformance tests pass before compatibility is marked SUPPORTED.
- CI/evals gate merges.

## Execution order
1. Scaffold Gemini/Antigravity adapter + handoff + ecosystem conformance baseline.
2. Create Repository Registry + Migration Plan + Worktree Registry + Ecosystem Compatibility registry.
3. Scaffold monorepo target directories/contracts.
4. Inventory existing repos and map components to monorepo destinations.
5. Create local worktrees for runtime, backup, integrations, factory, Codex and Gemini lanes.
6. Build Backup Source Registry.
7. Neon export + restore test.
8. GitHub inventory/verified SHA manifest.
9. Runtime/config rebuild inventory.
10. Drive manifest verifier.
11. First restore drill.
12. API/MCP backup health and observability.
13. Migrate high-value modules incrementally with tests/history strategy.
14. Continue remaining P0 then P1.

## Execution policy
P0 unblocked > P1 unblocked > P2. Finish-before-replace where practical. Any supported ecosystem may execute an unblocked task if it satisfies the same handoff contract. The executing ecosystem must update `STATUS.md` after meaningful execution and record architectural decisions in `DECISIONS.md`. A task is DONE only with acceptance evidence. Never perform destructive repository consolidation without verified backup and migration validation.