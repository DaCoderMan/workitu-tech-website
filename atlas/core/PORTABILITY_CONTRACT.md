# Atlas Ecosystem Portability Contract

Atlas is the product/system. Codex, Gemini/Antigravity, Claude Code, Cursor, local Ollama, Vercel and other ecosystems are execution/development environments, not the identity of Atlas.

## Non-negotiable rule
Strategic Atlas domain logic MUST NOT depend directly on one vendor when a stable provider/adapter contract can be used instead.

## Layers
1. Core Contracts — schemas, events, skill contracts, tool contracts, memory/state interfaces, permissions, manifests, error model.
2. Core Runtime — orchestration, ingestion, routing, jobs, state transitions and policy enforcement.
3. Providers — LLM, database/storage, object storage, secrets, queues, observability, identity.
4. Ecosystem Adapters — Codex, Gemini/Antigravity, Claude, Cursor, local, MCP and deployment environments.
5. Products/Modules — Workitu Factory, agents, voice, games and future products.

## Target layout
- `atlas/core/`
- `atlas/runtime/`
- `atlas/providers/llm/`
- `atlas/providers/storage/`
- `atlas/providers/database/`
- `atlas/providers/secrets/`
- `atlas/providers/observability/`
- `atlas/adapters/codex/`
- `atlas/adapters/gemini/`
- `atlas/adapters/claude/`
- `atlas/adapters/cursor/`
- `atlas/adapters/local/`
- `atlas/adapters/mcp/`
- `atlas/conformance/`

## Provider rules
Domain code calls interfaces, not vendor SDKs directly. Vendor SDK usage belongs behind provider/adaptor boundaries. Provider selection must be configuration-driven where practical. Credentials remain outside source control.

## Conformance
Every ecosystem/provider implementation must pass shared contract tests before being considered supported. Conformance covers schemas, skill lifecycle, routing, idempotency, persistence semantics, backup/restore contracts, permission behavior, error semantics and MCP/API compatibility where applicable.

## Development lanes
Ecosystem-specific work may use dedicated branches/worktrees, e.g. `atlas/ecosystem-codex`, `atlas/ecosystem-gemini`, `atlas/ecosystem-claude`, while shared contracts remain authoritative in `atlas/core` and changes to them require integration review.

## Exit criterion
Atlas must be rebuildable and operable after replacing any single LLM vendor or development ecosystem, subject only to explicitly documented capabilities that have no equivalent provider.