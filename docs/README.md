# Workitu Tech - AI Fixer Documentation

**Documentation for the Site-Wide Fixer Function**

---

## Documents Overview

| Document | Purpose | When to Use |
|----------|---------|-------------|
| **FIXER_PRD.md** | Full product requirements document | Understanding the complete scope |
| **AI_RULES.md** | Non-negotiable rules and guardrails | Before making any changes |
| **SITE_CONTEXT.md** | Quick reference for site structure | When you need to find something |
| **FIXER_WORKFLOW.md** | Step-by-step operational guide | During fix sessions |
| **CODEX_PROMPT.md** | System prompt for Codex/Cursor | Copy into AI context |

---

## Quick Start

### For Codex/Cursor Setup

1. Open `CODEX_PROMPT.md`
2. Copy the entire content
3. Paste into your AI context/system prompt
4. Start fixing!

### For Manual Reference

Read in this order:
1. `AI_RULES.md` - Understand the constraints
2. `SITE_CONTEXT.md` - Know the codebase
3. `FIXER_WORKFLOW.md` - Follow the process
4. `FIXER_PRD.md` - Deep dive when needed

---

## Key Takeaways

### The 3 Commandments

1. **NEVER BREAK** existing functionality
2. **ALWAYS TEST** before and after changes
3. **ALWAYS BACKUP** before modifying

### The Workflow

```
ANALYZE → STAMP → EXECUTE → TEST → COMMIT
```

### The Commands

```bash
# Before changes
npm run build && npx playwright test

# After changes
npm run build && npx playwright test

# Commit
git add . && git commit -m "type(scope): description"
```

---

## File Locations

```
docs/
├── README.md           ← You are here
├── FIXER_PRD.md       ← Full requirements
├── AI_RULES.md        ← Rules & guardrails
├── SITE_CONTEXT.md    ← Site structure
├── FIXER_WORKFLOW.md  ← Step-by-step guide
└── CODEX_PROMPT.md    ← AI system prompt

src/data/backups/      ← Stamp backups go here
```

---

## Version

- **Version:** 1.0
- **Created:** 2026-01-28
- **Target LLM:** Codex 5.1 Max Medium (128K context)

---

## Questions?

Refer to the specific document for details, or run:

```bash
# Check site status
npm run build && npx playwright test

# See all docs
ls -la docs/
```
