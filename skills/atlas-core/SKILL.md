# Atlas Core Skill Suite

Mandatory lifecycle: `capture -> normalize -> classify -> deduplicate -> resolve -> route -> persist -> verify -> backup -> audit -> checkpoint`.

## Skills

1. post-turn-ingestion
2. canonical-router
3. dedup-reconciliation
4. entity-crm
5. task-project
6. artifact-registry
7. drive-master-backup
8. backup-verifier
9. restore-recovery
10. github-sync
11. checkpoint-cursor
12. retry-dlq
13. provenance-audit
14. sensitivity-retention
15. capability-health
16. planner-executor-verifier
17. skill-registry
18. snapshot-export
19. repository-registry
20. repository-auditor
21. codex-handoff
22. prd-maintainer
23. dependency-mapper
24. ci-health
25. deployment-state

## Persistence routing
- Neon/Postgres: canonical structured operational state.
- Google Drive: canonical human-readable docs, archives, exports and master backup.
- GitHub/runtime: executable code, tests, config, schemas, migrations, technical PRDs and versioned skill definitions.
- ChatGPT Memory: compact durable preferences/rules when supported.

## Reliability
Use stable IDs, SHA-256 hashes where applicable, idempotent writes, route receipts, read-back verification, transactional/outbox-style persistence where possible, retries with backoff, DLQ, replay, checkpoints, reconciliation and provenance.

## Repository management
Atlas must discover accessible repositories, classify canonical vs legacy/archived/experimental, maintain a registry, avoid destructive bulk changes, and ensure canonical repos carry sufficient context for Codex/Antigravity execution.

## Backup
A backup is complete only after content/state is persisted, a manifest records source/version/checksum/timestamp/destination, and verification succeeds. Empty snapshot documents never count as completed backups.
