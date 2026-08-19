# Atlas Repository Governance

This repository policy defines how Atlas manages repositories for Yonatan / Workitu Tech.

## Canonical principles

1. GitHub is the canonical home for executable code, schemas, migrations, tests, CI/CD, runtime configuration, versioned skills, technical PRDs that drive Codex/Antigravity work, and repository-specific implementation state.
2. Google Drive is the canonical human-readable master backup/archive for durable documents and exported snapshots.
3. Neon/Postgres is canonical for structured operational state, registry data, tasks/projects/relationships/provenance and machine-readable Atlas state.
4. Repositories must not be created or split without a clear module/product boundary.
5. Existing repositories must not be deleted, archived/unarchived, made public/private, renamed, force-pushed or rewritten automatically without a dedicated migration decision.

## Required canonical repositories

- `codex-to-do` — master engineering PRD / execution queue for Atlas and Workitu Factory.
- Atlas Runtime repository — orchestrator, ingestion, persistence, APIs/MCP, memory, routing, observability, security and backup runtime.
- Workitu Factory repository — reusable product-factory orchestration and module registry.
- Product/module repositories only when isolation is justified by deployment, lifecycle, security, ownership, or dependency boundaries.

## Repository lifecycle

`discover -> classify -> register -> assess -> plan -> implement -> test -> backup -> verify -> maintain -> archive`

Atlas must maintain a Repository Registry with:
- owner/name
- purpose
- product/module
- canonical status
- visibility
- lifecycle state
- default branch
- deploy target
- dependencies
- CI status
- security sensitivity
- backup status
- latest audit timestamp
- PRD path
- Codex-ready status

## Safety

Repository-wide destructive actions require an explicit migration plan. Atlas may autonomously add non-destructive governance, documentation, tests, issues, PRDs and additive configuration when scope is clear. Existing business/application code must not be bulk-rewritten merely to standardize repositories.

## Codex integration

Every canonical engineering repository should expose enough context for Codex to work deterministically. Preferred files:
- `README.md`
- `PRD.md` or `docs/PRD.md`
- `AGENTS.md`
- `docs/ARCHITECTURE.md`
- `docs/STATUS.md`
- `docs/DECISIONS.md`
- `skills/` where applicable
- tests and acceptance criteria

The master `codex-to-do` repository owns cross-repository priorities, dependencies and execution order.

## Backup rule

Every canonical repository must be represented in the Atlas Master Backup manifest in Google Drive with repository identity, default branch, latest known commit, snapshot/export timestamp and verification status. GitHub remains canonical for executable source history; Drive is disaster-recovery/master-backup coverage, not a replacement for Git history.
