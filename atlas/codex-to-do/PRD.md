# Atlas Master Engineering PRD

Status: ACTIVE
Canonical location: temporary under `DaCoderMan/workitu-tech-website/atlas/codex-to-do/`

## Objective
Make Atlas progressively more powerful, reliable, useful, automatable and recoverable while preserving deterministic governance, observability and safe execution.

## P0 — Core reliability
- Harden mandatory post-turn ingestion pipeline.
- Guarantee idempotency, provenance, deduplication and deterministic routing.
- Add transactional outbox / route receipts for external writes.
- Add checkpoint/cursor semantics so checkpoints only advance after safe persistence.
- Add retry policy, backoff, DLQ/FAILED_REVIEW and replay tooling.
- Add capability health checks before writes to GitHub, Drive, Neon and other connectors.
- Add read-back verification for important writes.

## P0 — Backup and recovery
- Implement Google Drive Master Backup skill.
- Use `Atlas — Master Backup` as preferred human-readable master backup destination.
- Create versioned manifests with object ID, source, version, timestamp, checksum, destination and verification state.
- Implement incremental backup, reconciliation and stale/missing backup detection.
- Implement restore/recovery procedure plus scheduled restore drills.
- Never mark an empty snapshot as a completed backup.

## P0 — Canonical data architecture
- Neon/Postgres = canonical structured operational state.
- Google Drive = canonical human-readable docs, exports, archives and master backup.
- GitHub/runtime = executable source, configs, migrations, tests/evals and skill definitions.
- ChatGPT Memory = compact durable preferences/rules when supported.
- Add explicit routing matrix for every data category.

## P0 — Atlas skill system
Implement and register: post-turn-ingestion, canonical-router, dedup-reconciliation, entity-crm, task-project, artifact-registry, drive-master-backup, backup-verifier, restore-recovery, github-sync, checkpoint-cursor, retry-dlq, provenance-audit, sensitivity-retention, capability-health, planner-executor-verifier, skill-registry, snapshot-export, repository-manager, repository-registry, prd-maintainer, codex-handoff, dependency-governance, ci-eval-gate, deploy-release-manager.

## P1 — API / MCP / Codex integration
- Maintain stable REST API + MCP surface for Atlas.
- Add authenticated write paths with clear permission boundaries.
- Ensure Codex can consume this PRD deterministically.
- Add Codex handoff bundle: target repo, scope, acceptance criteria, dependencies, tests, rollback instructions and verification command.
- Add model-routing compatibility via LiteLLM where useful.

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

## Acceptance criteria
- Atlas can process a completed turn and persist durable outputs without duplicate side effects.
- Canonical destination is deterministic for every durable item.
- External writes are verifiable and recoverable.
- Failed operations remain visible and replayable.
- Master backup has verified manifests and can be restored.
- Codex can pick the next engineering item from this PRD without ambiguity.
- CI/evals gate completion of implementation tasks.
- Repository and skill registries remain current.

## Execution policy
Priority order: P0 unblocked > P1 unblocked > P2. Finish-before-replace where possible. Codex must update `STATUS.md` after meaningful execution and record architecture decisions in `DECISIONS.md`.
