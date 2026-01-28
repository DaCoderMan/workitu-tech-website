# AI Development Rules & Guardrails

**For:** Site-Wide Fixer Function
**Priority:** CRITICAL - These rules are non-negotiable

---

## RULE 1: NEVER BREAK EXISTING FUNCTIONALITY

This is the **#1 priority**. No exception.

### What This Means
- All existing pages must continue to load
- All existing links must continue to work
- All existing API endpoints must continue to function
- All existing tests must continue to pass
- All existing features must continue to operate

### How to Ensure
```bash
# ALWAYS run before AND after changes
npm run build && npx playwright test
```

### If Tests Fail After Change
1. **STOP** - Do not commit
2. **ANALYZE** - Understand what broke
3. **REVERT** - Restore from stamp/backup
4. **RETRY** - Take a different approach

---

## RULE 2: NEVER LIE

### What This Means
- Be honest about what you can and cannot do
- Do not claim to have fixed something without verification
- Do not claim tests pass without running them
- Do not fabricate results or data
- Admit when you don't know something

### Examples

**WRONG:**
```
"I've fixed all the issues and everything works perfectly."
(Without actually testing)
```

**RIGHT:**
```
"I've made the changes. Running tests to verify..."
[Actually runs tests]
"Tests passed. The fix is verified."
```

---

## RULE 3: STAMP BEFORE MODIFY

### Required Before ANY Data/Code Change

```bash
# Create timestamp
STAMP=$(date +%Y%m%d_%H%M%S)

# Create backups directory if not exists
mkdir -p src/data/backups

# Backup data files
cp src/data/projects.json src/data/backups/projects.$STAMP.json
cp src/data/content.json src/data/backups/content.$STAMP.json
```

### When Modifying Code Files
```bash
# Backup the specific file
cp src/app/portfolio/page.js src/app/portfolio/page.js.backup.$STAMP
```

### Never Delete Stamps
Stamps are your safety net. Keep at least the last 10 backups.

---

## RULE 4: TEST EVERYTHING

### Mandatory Test Protocol

```bash
# 1. Before making changes
npm run build
npx playwright test

# 2. After making changes
npm run build
npx playwright test

# 3. If tests fail, REVERT
```

### Test Checklist
- [ ] Build succeeds (`npm run build`)
- [ ] All Playwright tests pass
- [ ] No console errors
- [ ] Pages load correctly
- [ ] Links work
- [ ] Forms submit

---

## RULE 5: ONE CHANGE AT A TIME

### Why
- Easier to debug if something breaks
- Cleaner git history
- Simpler rollbacks

### Pattern
```
1. Make ONE logical change
2. Test it
3. Commit it
4. Move to next change
```

### Example

**WRONG:**
```bash
# Change 5 files, add 2 features, fix 3 bugs in one commit
git commit -m "Various improvements"
```

**RIGHT:**
```bash
# Fix one bug
git commit -m "fix: broken portfolio image loading"

# Add one feature
git commit -m "feat: add search to portfolio page"

# Improve one thing
git commit -m "perf: optimize image lazy loading"
```

---

## RULE 6: COMMIT MESSAGE FORMAT

Use conventional commits:

```
type(scope): description

Types:
- fix:      Bug fix
- feat:     New feature
- perf:     Performance improvement
- refactor: Code refactoring
- style:    Formatting, no code change
- docs:     Documentation
- test:     Adding/updating tests
- chore:    Maintenance tasks
```

### Examples
```bash
git commit -m "fix(portfolio): resolve broken image URLs"
git commit -m "feat(contact): add email validation"
git commit -m "perf(home): reduce hero image size"
git commit -m "refactor(api): simplify projects endpoint"
```

---

## RULE 7: SECURITY FIRST

### Never Introduce
- XSS vulnerabilities (always sanitize user input)
- Injection attacks (validate all inputs)
- Exposed secrets (never hardcode credentials)
- Insecure dependencies (check for vulnerabilities)

### Always Preserve
- Input sanitization in `src/utils/validation.js`
- Rate limiting in `src/utils/rateLimit.js`
- JWT authentication in `src/utils/auth.js`
- Security headers in `next.config.js`

### Before Adding User Input Handling
```javascript
// ALWAYS use the sanitization utility
import { sanitizeInput, sanitizeUrl } from '@/utils/validation';

const safeName = sanitizeInput(userInput);
const safeUrl = sanitizeUrl(userUrl);
```

---

## RULE 8: PRESERVE ERROR HANDLING

### Never Remove
- Try/catch blocks
- Error boundaries
- Fallback UI states
- Validation checks
- Null/undefined guards

### Example: What NOT to Do

**WRONG - Removing error handling:**
```javascript
// Before (safe)
try {
  const data = await fetch('/api/projects');
  return data.json();
} catch (error) {
  console.error('Failed:', error);
  return [];
}

// After (unsafe - DON'T DO THIS)
const data = await fetch('/api/projects');
return data.json();
```

---

## RULE 9: RESPECT EXISTING PATTERNS

### Code Style
- Follow existing naming conventions
- Match existing file organization
- Use same import patterns
- Maintain consistent formatting

### Data Patterns
- Use existing ID generation (timestamp-based)
- Follow existing schema structures
- Maintain data validation rules

### Component Patterns
- Use 'use client' for client components
- Follow existing animation patterns
- Use existing utility functions

---

## RULE 10: DOCUMENT SIGNIFICANT CHANGES

### When to Document
- Adding new API endpoints
- Changing data schemas
- Modifying authentication
- Adding new dependencies
- Changing build configuration

### How to Document
1. Update relevant comments in code
2. Update this documentation if needed
3. Include details in commit message

---

## EMERGENCY PROCEDURES

### If Something Breaks

1. **DON'T PANIC**
2. **Check git status**
   ```bash
   git status
   git diff
   ```
3. **Identify the breaking change**
4. **Revert to last working state**
   ```bash
   # Option 1: Discard uncommitted changes
   git checkout -- .

   # Option 2: Revert last commit
   git revert HEAD

   # Option 3: Restore from stamp
   cp src/data/backups/projects.{latest-stamp}.json src/data/projects.json
   ```
5. **Verify recovery**
   ```bash
   npm run build && npx playwright test
   ```

### If Tests Won't Pass

1. **Read the error message carefully**
2. **Identify which test failed**
3. **Check if it's a real bug or flaky test**
4. **Fix the issue or revert**
5. **Never skip tests to make them pass**

---

## QUICK REFERENCE CARD

```
+------------------------------------------+
|           AI FIXER RULES                 |
+------------------------------------------+
| 1. NEVER break existing functionality    |
| 2. NEVER lie about results               |
| 3. ALWAYS stamp before modifying         |
| 4. ALWAYS test before and after          |
| 5. ONE change at a time                  |
| 6. USE conventional commits              |
| 7. SECURITY first                        |
| 8. PRESERVE error handling               |
| 9. RESPECT existing patterns             |
| 10. DOCUMENT significant changes         |
+------------------------------------------+
| BEFORE CHANGES:                          |
| npm run build && npx playwright test     |
|                                          |
| AFTER CHANGES:                           |
| npm run build && npx playwright test     |
|                                          |
| IF BROKEN:                               |
| git checkout -- . OR restore from stamp  |
+------------------------------------------+
```

---

## VIOLATIONS

These will cause immediate rollback:

| Violation | Severity | Action |
|-----------|----------|--------|
| Breaking existing feature | CRITICAL | Full revert |
| Skipping tests | HIGH | Revert + retest |
| No backup before change | HIGH | Create backup immediately |
| Multiple changes without commits | MEDIUM | Separate and commit |
| Missing commit message | LOW | Amend commit |

---

**Remember: When in doubt, DON'T. Ask for clarification or take the safer approach.**
