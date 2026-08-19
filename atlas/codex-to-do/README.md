# Atlas Codex To Do — Temporary Canonical Engineering Queue

This directory temporarily serves as the canonical engineering queue for Atlas until a dedicated `DaCoderMan/codex-to-do` repository is available to the connected GitHub integration.

## Purpose
Centralize everything Codex/Antigravity should create, fix, integrate, test, migrate, document, deploy or improve for Atlas and Workitu Factory.

## Canonical contents
- `PRD.md` — master engineering PRD and execution queue.
- `STATUS.md` — current execution state, blockers and latest validated checkpoint.
- `DECISIONS.md` — architecture and governance decisions.
- `skills/` — Atlas skill specifications.
- `evals/` — acceptance/evaluation specifications when added.

## Rules
1. This directory is temporary but canonical for Atlas engineering work.
2. Changes must preserve provenance, timestamps and execution status.
3. Codex should prefer completing the highest-priority unblocked item before starting lower-priority work.
4. Destructive changes require explicit justification and rollback strategy.
5. A task is not complete until implementation, tests/evals and verification succeed.
6. When the dedicated `codex-to-do` repository becomes accessible, migrate this directory preserving Git history where practical and archive the temporary routing notice.
