# Fixer Adder Improver

**AI-Powered Site Maintenance for Workitu Tech**

---

## Quick Start (For Codex/Cursor)

### Option 1: Use ALL_IN_ONE.md (Recommended)

1. Open `ALL_IN_ONE.md`
2. Select All (Ctrl+A)
3. Copy (Ctrl+C)
4. Paste into your Codex/Cursor system prompt or context
5. Start fixing!

### Option 2: Use Individual Files

Copy files in this order:
1. `01_CODEX_PROMPT.md` - System prompt
2. `02_AI_RULES.md` - Rules
3. `03_SITE_CONTEXT.md` - Codebase reference
4. `04_FIXER_WORKFLOW.md` - Workflow guide

---

## Files in This Directory

| File | Description | Tokens |
|------|-------------|--------|
| **ALL_IN_ONE.md** | Everything combined in one file | ~12K |
| **01_CODEX_PROMPT.md** | System prompt for AI identity | ~1.5K |
| **02_AI_RULES.md** | 10 non-negotiable rules | ~2K |
| **03_SITE_CONTEXT.md** | Site structure quick reference | ~2K |
| **04_FIXER_WORKFLOW.md** | Step-by-step workflow | ~3K |
| **05_FIXER_PRD.md** | Full product requirements | ~4K |

---

## What This Does

The Site-Wide Fixer is an autonomous AI function that:

- Fixes bugs (broken links, errors, console warnings)
- Improves code quality (linting, formatting)
- Optimizes performance (load times, images)
- Enhances SEO (meta tags, structured data)
- Improves accessibility (ARIA, keyboard nav)
- Updates content (portfolio, copy)
- Adds features (when requested)

**All while NEVER breaking existing functionality.**

---

## The 3 Commandments

1. **NEVER BREAK** existing functionality
2. **ALWAYS TEST** before and after changes
3. **ALWAYS BACKUP** before modifying

---

## The Workflow

```
ANALYZE → STAMP → EXECUTE → TEST → COMMIT
```

---

## Key Commands

```bash
# Before changes
npm run build && npx playwright test

# After changes
npm run build && npx playwright test

# Commit
git add [files] && git commit -m "type(scope): description"
```

---

## Project Location

**Local Path:** `D:\Projects\Workitu 2026`
**Tech Stack:** Next.js 14, React 18, Tailwind CSS, Playwright

---

## Designed For

- Codex 5.1 Max Medium (128K context)
- Also works with: Claude, GPT-4, other LLMs

---

## Version

- **Version:** 1.0
- **Created:** 2026-01-28

---

## Need Help?

Ask the AI:
- "What files exist in this project?"
- "How do I add a new portfolio project?"
- "Fix all linting issues"
- "Improve SEO on the home page"
