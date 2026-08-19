# Atlas Master Engineering PRD

Status: ACTIVE
Canonical location: temporary under `DaCoderMan/workitu-tech-website/atlas/codex-to-do/`
Last updated: 2026-08-19

## Objective
Make Atlas progressively more powerful, reliable, useful, automatable and recoverable while preserving deterministic governance, observability and safe execution.

## Current verified state
- Google Drive canonical master-backup folder exists: `Atlas — Master Backup`.
- A populated and read-back-verified backup manifest exists: `Atlas — Complete Backup Manifest — 2026-08-19 14-45`.
- The manifest records Atlas architecture, skill suite, GitHub checkpoint, current core project domains, backup integrity rules and explicit gaps.
- Temporary canonical Atlas engineering queue exists at `DaCoderMan/workitu-tech-website/atlas/codex-to-do/`.
- `README.md`, `PRD.md` and `STATUS.md` exist in that queue.
- Atlas repository governance and Atlas core skill specification have been committed to GitHub.
- Full verified exports are NOT yet complete for Neon/Postgres, all GitHub repos, ChatGPT history/memory, external connector datasets, and the local Atlas Runtime filesystem/configuration.

## P0 — Complete backup system
### P0.1 Source inventory and backup registry
- Build a machine-readable Backup Source Registry.
- Register every source: Neon/Postgres, GitHub, Google Drive, Atlas Runtime/local filesystem, ChatGPT-derived ingested state, Gmail/Calendar/Notion when approved, and future connectors.
- For every source track: source ID, owner, sensitivity, canonicality, export method, backup cadence, retention, last successful backup, checksum/version, verification status, restore method and health state.
- Never infer completeness from document creation alone.

### P0.2 Neon/Postgres full backup
- Implement schema + data export for canonical Atlas Postgres state.
- Support logical dump and portable restore path.
- Include schema version, migration state, row counts per critical table and checksum metadata.
- Store backup artifact in the approved backup destination and record a manifest entry.
- Verify restore into an isolated temporary database/branch before marking backup valid.
- Acceptance: a clean environment can be reconstructed from dump + migrations with expected row counts and integrity checks.

### P0.3 GitHub complete repository backup
- Inventory every repository accessible to the authenticated account.
- Classify each repo: CANONICAL, ACTIVE, SUPPORTING, EXPERIMENTAL, ARCHIVED, MIGRATION_CANDIDATE.
- For each non-disposable repo capture repository metadata, default branch, latest commit SHA, refs/tags where needed, and an archive or reproducible clone reference.
- Maintain a repo backup manifest with latest verified SHA.
- Do not modify archived/legacy repos merely to standardize them.
- Acceptance: every registered repo has a latest verified backup pointer and classification.

### P0.4 Atlas Runtime/config backup
- Export Atlas runtime source/config needed to rebuild the system.
- Include schemas, migrations, skill definitions, plugin/module manifests, LiteLLM routing config, MCP/API config templates, dependency locks and deployment definitions.
- Exclude raw secrets from Git/Drive; back up only secret names, scopes and recovery instructions.
- Add `CONFIG_INVENTORY.md` and machine-readable config manifest.
- Acceptance: Atlas can be rebuilt on a clean machine using documented dependencies and restored state without guessing configuration.

### P0.5 Conversation / ingestion state backup
- Persist all durable extracted state through the Atlas ingestion pipeline rather than relying on raw ChatGPT UI history as the only source.
- Preserve conversation_id, turn_id, timestamp, source, provenance and hashes where available.
- Implement export/import of canonical ingested events and derived entities.
- Keep raw conversation export as an additional source when platform access permits, not as the sole recovery mechanism.

### P0.6 Google Drive master backup structure
- Keep `Atlas — Master Backup` as the canonical human-readable master-backup location.
- Create deterministic substructure for manifests, snapshots, database exports, repo inventories, configuration inventories, restore reports and audit reports.
- Create versioned manifests with object ID, source, timestamp, version/SHA/checksum, destination, size when available, verification status and restore-test status.
- Backups must be incremental, idempotent and versioned.

### P0.7 Backup verification
- Implement read-back verification for every important backup artifact.
- Compare expected vs actual checksums/SHAs/row counts.
- Detect missing, stale, partial or corrupt backups.
- No backup may become `VERIFIED` unless source export and destination read-back both succeed.
- States: `PENDING`, `EXPORTED`, `COPIED`, `VERIFIED`, `RESTORE_TESTED`, `FAILED`, `STALE`.

### P0.8 Restore and disaster recovery
- Implement documented restore order: infra/config -> database -> repositories/runtime -> manifests/artifacts -> derived indexes/caches.
- Automate periodic restore drills in isolated environments where practical.
- Produce restore reports with timestamp, duration, source versions, validation results and failures.
- Acceptance: restore is proven, not merely documented.

## P0 — Core reliability
- Harden mandatory post-turn ingestion pipeline.
- Guarantee idempotency, provenance, deduplication and deterministic routing.
- Add transactional outbox / route receipts for external writes.
- Add checkpoint/cursor semantics so checkpoints only advance after safe persistence.
- Add retry policy, backoff, DLQ/FAILED_REVIEW and replay tooling.
- Add capability health checks before writes to GitHub, Drive, Neon and other connectors.
- Add read-back verification for important writes.

## P0 — Canonical data architecture
- Neon/Postgres = canonical structured operational state.
- Google Drive = canonical human-readable docs, exports, archives and master backup.
- GitHub/runtime = executable source, configs, migrations, tests/evals and skill definitions.
- ChatGPT Memory = compact durable preferences/rules when supported.
- Add explicit routing matrix for every data category.

## P0 — Atlas skill system
Implement and register:
- post-turn-ingestion
- canonical-router
- dedup-reconciliation
- entity-crm
- task-project
- artifact-registry
- drive-master-backup
- backup-verifier
- restore-recovery
- github-sync
- checkpoint-cursor
- retry-dlq
- provenance-audit
- sensitivity-retention
- capability-health
- planner-executor-verifier
- skill-registry
- snapshot-export
- repository-manager
- repository-registry
- prd-maintainer
- codex-handoff
- dependency-governance
- ci-eval-gate
- deploy-release-manager

Each skill must declare purpose, inputs, outputs, side effects, permissions, dependencies, idempotency strategy, failure states, tests/evals and version.

## P1 — API / MCP / Codex integration
- Maintain stable REST API + MCP surface for Atlas.
- Add authenticated write paths with clear permission boundaries.
- Ensure Codex can consume this PRD deterministically.
- Add Codex handoff bundle: target repo, scope, acceptance criteria, dependencies, tests, rollback instructions and verification command.
- Add model-routing compatibility via LiteLLM where useful.
- Expose backup status, health and latest verified checkpoint through API/MCP.

## P1 — Repository governance
- Build a canonical Repository Registry.
- Classify repos as ACTIVE, CANONICAL, SUPPORTING, EXPERIMENTAL, ARCHIVED or MIGRATION_CANDIDATE.
- Avoid destructive mass cleanup.
- Each active project should have owner/purpose/status/PRD/CI/deploy/backup metadata.
- Migrate this temporary queue to dedicated `DaCoderMan/codex-to-do` when accessible.

## P1 — Workitu Factory / modular architecture
- Preserve modular plugin/extension architecture.
- Maintain Plugin Registry and Module Contracts.
- Integrate Voice Module, R2/Mage Agent Factory, game mode, universal ingestion, memory, knowledge/RAG and observability through explicit contracts.
- Keep executable module code in canonical repositories, not Drive.

## P1 — Observability and security
- Structured logs, traces, metrics, health state and audit events.
- Permission scopes for every skill and connector.
- Secrets management outside repos.
- Sensitivity classification and retention policies.
- Backup encryption/permission review where appropriate.
- Alert on failed/stale backup sources and failed restore drills.

## Required machine-readable artifacts
Codex must create and maintain, at minimum:
- `atlas/codex-to-do/backup/source-registry.json`
- `atlas/codex-to-do/backup/latest-manifest.json`
- `atlas/codex-to-do/backup/restore-plan.md`
- `atlas/codex-to-do/backup/restore-report-latest.md`
- `atlas/codex-to-do/REPOSITORY_REGISTRY.json`
- `atlas/codex-to-do/SKILL_REGISTRY.json`
- `atlas/codex-to-do/DECISIONS.md`

## Acceptance criteria
- Atlas can process a completed turn and persist durable outputs without duplicate side effects.
- Canonical destination is deterministic for every durable item.
- External writes are verifiable and recoverable.
- Failed operations remain visible and replayable.
- Every registered backup source has explicit status and last verified checkpoint.
- Neon/Postgres restore is tested from backup.
- Every important GitHub repo has a verified backup pointer/SHA.
- Runtime/config can be reconstructed without secrets embedded in repos.
- Master backup has verified manifests and at least one successful restore drill.
- Codex can pick the next engineering item from this PRD without ambiguity.
- CI/evals gate completion of implementation tasks.
- Repository, skill and backup registries remain current.

## Execution order for Codex
1. Build Backup Source Registry.
2. Implement Neon/Postgres export + isolated restore test.
3. Implement GitHub repository inventory + verified SHA manifest.
4. Implement Atlas Runtime/config inventory and rebuild instructions.
5. Implement Drive manifest writer + verifier.
6. Implement restore orchestration and first restore drill.
7. Wire backup health/status to API/MCP and observability.
8. Continue remaining P0 reliability work.
9. Then execute P1 items.

## Execution policy
Priority order: P0 unblocked > P1 unblocked > P2. Finish-before-replace where possible. Codex must update `STATUS.md` after meaningful execution and record architecture decisions in `DECISIONS.md`. A task may only be marked DONE when acceptance criteria and verification evidence exist.