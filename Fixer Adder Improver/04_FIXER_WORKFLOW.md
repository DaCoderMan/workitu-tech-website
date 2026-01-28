# Site-Wide Fixer - Operational Workflow

**Step-by-step guide for autonomous site fixing**

---

## Workflow Overview

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   ANALYZE   │────▶│   EXECUTE   │────▶│  VALIDATE   │
└─────────────┘     └─────────────┘     └─────────────┘
      │                   │                   │
      ▼                   ▼                   ▼
  Understand          Make Changes        Test & Verify
  Current State       One at a Time       Before Commit
```

---

## Phase 1: ANALYZE

### Step 1.1 - Check Current State
```bash
# Check git status
git status

# Verify build works
npm run build

# Run existing tests
npx playwright test
```

**STOP if any of these fail.** Fix the existing issue first.

### Step 1.2 - Identify Issues to Fix

Scan for:
- [ ] Console errors (browser dev tools)
- [ ] Broken links (404s)
- [ ] Missing images
- [ ] Accessibility violations
- [ ] Performance issues
- [ ] SEO gaps
- [ ] Code quality issues (linting)

### Step 1.3 - Prioritize

| Priority | Type | Action |
|----------|------|--------|
| P0 | Site broken / major errors | Fix immediately |
| P1 | Broken features / links | Fix same session |
| P2 | Performance / SEO | Fix when possible |
| P3 | Code quality / style | Fix opportunistically |

---

## Phase 2: PREPARE

### Step 2.1 - Create Backup Stamps
```bash
# Set timestamp
STAMP=$(date +%Y%m%d_%H%M%S)

# Create backups directory
mkdir -p src/data/backups

# Backup data files
cp src/data/projects.json src/data/backups/projects.$STAMP.json
cp src/data/content.json src/data/backups/content.$STAMP.json
```

### Step 2.2 - Document Plan

Create a mental or written checklist:
```
Fix Plan:
1. [Issue description] → [File to modify] → [Expected fix]
2. [Issue description] → [File to modify] → [Expected fix]
...
```

---

## Phase 3: EXECUTE

### Step 3.1 - Single Change Pattern

For EACH fix:

```bash
# 1. Make the change
[edit file]

# 2. Verify build
npm run build

# 3. Run tests
npx playwright test

# 4. If PASS → Commit
git add [specific-files]
git commit -m "fix(scope): description"

# 5. If FAIL → Revert
git checkout -- [file]
# OR
cp src/data/backups/[file].$STAMP.json src/data/[file].json
```

### Step 3.2 - Fix Types & Approaches

#### Bug Fixes
1. Identify the error source
2. Understand the expected behavior
3. Make minimal change to fix
4. Test the specific functionality
5. Commit

#### Performance Improvements
1. Identify the bottleneck
2. Measure current performance
3. Apply optimization
4. Measure new performance
5. Commit only if improved

#### SEO Improvements
1. Check current meta tags
2. Verify structured data
3. Add/update as needed
4. Validate with tools
5. Commit

#### Accessibility Fixes
1. Identify WCAG violations
2. Add ARIA labels, alt text
3. Test with keyboard navigation
4. Verify contrast ratios
5. Commit

#### Code Quality
1. Run linter: `npm run lint`
2. Fix reported issues
3. Maintain functionality
4. Test
5. Commit

---

## Phase 4: VALIDATE

### Step 4.1 - Full Test Suite
```bash
# Complete validation
npm run build && npx playwright test
```

### Step 4.2 - Manual Verification Checklist

- [ ] Home page loads correctly
- [ ] All navigation links work
- [ ] Portfolio displays all projects
- [ ] Pricing shows all cards
- [ ] Contact form submits
- [ ] No console errors
- [ ] Mobile responsive works
- [ ] Language toggle works

### Step 4.3 - Final Commit
```bash
# If all checks pass
git push
```

---

## Phase 5: ROLLBACK (If Needed)

### Option A: Git Revert
```bash
# Undo last commit (keeps history)
git revert HEAD
```

### Option B: Git Reset
```bash
# Undo last commit (removes from history)
git reset --hard HEAD~1
```

### Option C: Restore from Stamp
```bash
# Find latest stamp
ls -la src/data/backups/

# Restore specific file
cp src/data/backups/projects.20260128_143022.json src/data/projects.json
```

### Option D: Discard All Changes
```bash
# Discard all uncommitted changes
git checkout -- .
```

---

## Common Fix Recipes

### Recipe: Fix Broken Portfolio Image

```bash
# 1. Identify the project with broken image
cat src/data/projects.json | grep -A5 "[project-name]"

# 2. Check if URL is valid
curl -I "[image-url]"

# 3. If broken, update the image URL
# Edit src/data/projects.json

# 4. Verify fix
npm run build && npx playwright test

# 5. Commit
git add src/data/projects.json
git commit -m "fix(portfolio): update broken image for [project]"
```

### Recipe: Add New Portfolio Project

```bash
# 1. Backup
cp src/data/projects.json src/data/backups/projects.$(date +%Y%m%d_%H%M%S).json

# 2. Add new project entry
# Edit src/data/projects.json
# Add object with: id, title, description, image, link, category, dateAdded, featured

# 3. Verify
npm run build && npx playwright test

# 4. Commit
git add src/data/projects.json
git commit -m "feat(portfolio): add [project-name] project"
```

### Recipe: Update Site Content

```bash
# 1. Backup
cp src/data/content.json src/data/backups/content.$(date +%Y%m%d_%H%M%S).json

# 2. Edit content
# Edit src/data/content.json

# 3. Verify
npm run build && npx playwright test

# 4. Commit
git add src/data/content.json
git commit -m "content: update [section] content"
```

### Recipe: Fix Linting Issues

```bash
# 1. Find issues
npm run lint

# 2. Fix each file
# Edit files to resolve linting errors

# 3. Verify fix
npm run lint

# 4. Verify build
npm run build && npx playwright test

# 5. Commit
git add .
git commit -m "style: fix linting issues"
```

### Recipe: Improve SEO

```bash
# 1. Check current SEO
# Review src/app/sitemap.js
# Review src/app/robots.js
# Review meta tags in layout.js

# 2. Add structured data
# Edit src/components/StructuredData.js

# 3. Update meta tags
# Edit relevant page.js files

# 4. Verify build
npm run build

# 5. Commit
git add .
git commit -m "seo: improve meta tags and structured data"
```

---

## Troubleshooting

### Build Fails

```bash
# Check error message
npm run build 2>&1 | head -50

# Common fixes:
# - Missing import
# - Syntax error
# - Type error
# - Missing dependency
```

### Tests Fail

```bash
# See which test failed
npx playwright test --reporter=list

# Run specific test
npx playwright test -g "test name"

# Debug mode
npx playwright test --debug
```

### Git Conflicts

```bash
# See conflicts
git status

# Reset to remote
git fetch origin
git reset --hard origin/[branch]
```

---

## Session Checklist

### Start of Session
- [ ] `git pull` (get latest)
- [ ] `npm run build` (verify build)
- [ ] `npx playwright test` (verify tests)
- [ ] Create backups

### During Session
- [ ] One change at a time
- [ ] Test after each change
- [ ] Commit working changes

### End of Session
- [ ] All tests pass
- [ ] Build succeeds
- [ ] `git push` (save work)
- [ ] Clean up old backups (keep last 10)

---

**Remember: ANALYZE → PREPARE → EXECUTE → VALIDATE**
