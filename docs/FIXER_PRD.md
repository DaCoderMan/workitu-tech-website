# Site-Wide Fixer Function - Product Requirements Document

**Version:** 1.0
**Target LLM:** Codex 5.1 Max Medium (128K context)
**Project:** Workitu Tech Website
**Location:** D:\Projects\Workitu 2026

---

## 1. Executive Summary

The Site-Wide Fixer is an autonomous AI function designed to analyze, fix, improve, and maintain the Workitu Tech website. It operates within strict guardrails to ensure zero breakage of existing functionality while enabling rapid iteration and improvement.

### Core Principles
1. **NEVER BREAK** - Existing functionality must remain intact
2. **NEVER LIE** - Be honest about capabilities and limitations
3. **TEST FIRST** - Validate all changes with Playwright
4. **STAMP CHANGES** - Create timestamped backups before modifications
5. **AUTONOMOUS** - Operate without human approval (within defined rules)

---

## 2. Objectives

### Primary Goals
- Fix bugs (broken links, errors, console warnings)
- Improve code quality (linting, formatting, best practices)
- Optimize performance (load times, bundle size, caching)
- Enhance SEO (meta tags, structured data, sitemap)
- Improve accessibility (ARIA labels, keyboard navigation, contrast)
- Add new features when requested
- Update content/copy as needed
- Refactor code architecture for maintainability

### Success Metrics
- Zero regressions (all existing tests pass)
- Zero console errors in production
- Lighthouse score improvements
- Successful Playwright test runs
- Clean git history with meaningful commits

---

## 3. Scope of Operations

### 3.1 What the Fixer CAN Do

#### Files & Code
- Read, modify, create, delete any file
- Refactor components and utilities
- Update dependencies (with testing)
- Modify API routes and endpoints
- Update styles and animations
- Change configuration files

#### Portfolio Projects
- Read all projects from `/src/data/projects.json`
- Update project metadata (title, description, category)
- Modify images and screenshots
- Add new projects
- Remove deprecated projects
- Reorder project display
- Update project links and URLs

#### Content Management
- Update `/src/data/content.json`
- Modify page copy and text
- Update translations in `/src/lib/translations.js`
- Change pricing information
- Update contact details

#### Testing & Validation
- Run Playwright tests
- Execute npm scripts (build, lint, test)
- Validate changes before committing
- Generate test reports

### 3.2 What the Fixer MUST NOT Do

- Break existing functionality (CRITICAL)
- Delete backup/stamp files
- Modify `.env` files without explicit instruction
- Push to production without test validation
- Make changes that cause test failures
- Introduce security vulnerabilities
- Remove error handling or validation logic

---

## 4. Technical Specifications

### 4.1 Tech Stack Reference

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | Next.js | 14.0.4 |
| UI Library | React | 18.x |
| Styling | Tailwind CSS | 3.3.0 |
| State | Zustand | 5.0.10 |
| Forms | React Hook Form | 7.48.2 |
| Animation | Framer Motion | 10.16.16 |
| Auth | JWT + bcrypt | 9.0.2 / 2.4.3 |
| Testing | Playwright | 1.56.1 |

### 4.2 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API endpoints
│   │   ├── projects/      # Public portfolio API
│   │   ├── admin/         # Protected admin APIs
│   │   ├── auth/          # Authentication
│   │   ├── contact/       # Contact form
│   │   └── analytics/     # Tracking
│   ├── page.js            # Home
│   ├── portfolio/         # Portfolio page
│   ├── pricing/           # Pricing page
│   ├── contact/           # Contact page
│   ├── about/             # About page
│   ├── services/          # Services page
│   └── admin/             # Admin dashboard
├── components/            # React components
│   ├── layout/           # Header, Footer
│   ├── animations/       # Page animations
│   └── audio/            # Music player
├── lib/                   # Zustand stores, translations
├── utils/                 # Auth, validation, analytics
├── data/                  # JSON data storage
│   ├── projects.json     # Portfolio projects
│   ├── content.json      # Site content
│   ├── submissions.json  # Contact submissions
│   └── analytics.json    # Analytics data
└── styles/               # Global CSS
```

### 4.3 Key Data Schemas

#### Project Schema
```javascript
{
  id: string,              // Timestamp-based unique ID
  title: string,           // Project name (min 3 chars)
  description: string,     // Description (min 10 chars)
  image: string,           // Image URL
  link: string,            // Project URL
  category: string,        // Category name
  dateAdded: ISO8601,      // Creation timestamp
  featured: boolean,       // Featured flag
  videoId?: string,        // YouTube video ID (optional)
  isVideo?: boolean,       // Is video type
  websiteUrl?: string,     // Website URL (optional)
  isWebsite?: boolean      // Is website type
}
```

#### Content Schema
```javascript
{
  home: { title, subtitle, description, mission, services, tagline },
  pricing: { title, subtitle, description, services[], promise },
  contact: { title, subtitle, description, email, linkedin }
}
```

---

## 5. Workflow Protocol

### 5.1 Pre-Change Protocol

1. **Analyze** - Understand current state
   ```bash
   npm run build          # Verify build works
   npx playwright test    # Run existing tests
   ```

2. **Stamp** - Create timestamped backup
   ```bash
   # Create backup with timestamp
   cp src/data/projects.json src/data/projects.backup.{timestamp}.json
   ```

3. **Plan** - Document intended changes
   - List files to modify
   - Describe expected outcomes
   - Identify potential risks

### 5.2 Change Execution

1. **Single Responsibility** - One logical change at a time
2. **Incremental** - Small, testable modifications
3. **Documented** - Clear commit messages
4. **Validated** - Test after each change

### 5.3 Post-Change Protocol

1. **Build Verification**
   ```bash
   npm run build
   ```

2. **Test Execution**
   ```bash
   npx playwright test
   ```

3. **Rollback if Failed**
   ```bash
   # Restore from stamp
   cp src/data/projects.backup.{timestamp}.json src/data/projects.json
   ```

4. **Commit if Passed**
   ```bash
   git add .
   git commit -m "fix: [description of change]"
   ```

---

## 6. Testing Requirements

### 6.1 Mandatory Tests (Must Pass)

All tests in `tests/site.spec.js`:
- Home page loads correctly
- Navigation to all pages works
- Contact form submission succeeds
- Portfolio page displays projects
- Admin panel accessible

### 6.2 Test Commands

```bash
# Run all tests
npx playwright test

# Run specific test
npx playwright test tests/site.spec.js

# Run with UI
npx playwright test --ui

# Generate report
npx playwright show-report
```

### 6.3 Browser Coverage

- Chromium (Desktop)
- Firefox (Desktop)
- WebKit (Desktop)
- Pixel 5 (Mobile)
- iPhone 12 (Mobile)

---

## 7. Rollback Strategy

### 7.1 Timestamp Stamps

Before any modification:
```bash
STAMP=$(date +%Y%m%d_%H%M%S)

# Backup data files
cp src/data/projects.json src/data/backups/projects.$STAMP.json
cp src/data/content.json src/data/backups/content.$STAMP.json

# Backup modified code files
cp [file] [file].backup.$STAMP
```

### 7.2 Git-Based Rollback

```bash
# View recent commits
git log --oneline -10

# Revert specific commit
git revert [commit-hash]

# Hard reset (use cautiously)
git reset --hard [commit-hash]
```

### 7.3 Backup Directory Structure

```
src/data/backups/
├── projects.20260128_143022.json
├── projects.20260128_150145.json
├── content.20260128_143022.json
└── ...
```

---

## 8. Security Considerations

### 8.1 Input Validation

Always validate:
- User inputs (sanitize HTML)
- URLs (http/https only)
- File paths (no traversal)
- API payloads (type checking)

### 8.2 Avoid Introducing

- XSS vulnerabilities
- SQL/NoSQL injection (no DB, but still validate)
- CSRF issues
- Insecure direct object references
- Sensitive data exposure

### 8.3 Preserve Existing Security

- Rate limiting in `/src/utils/rateLimit.js`
- Input sanitization in `/src/utils/validation.js`
- JWT auth in `/src/utils/auth.js`
- Security headers in `next.config.js`

---

## 9. API Reference

### Public Endpoints
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/projects` | GET | Fetch portfolio projects |
| `/api/contact` | POST | Submit contact form |

### Admin Endpoints (JWT Protected)
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/admin/projects` | GET/POST/PUT/DELETE | CRUD projects |
| `/api/admin/content` | GET/PUT | Manage content |
| `/api/admin/submissions` | GET | View submissions |
| `/api/admin/backup` | GET | Download backup |

### Auth Endpoints
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/login` | POST | Admin login |
| `/api/auth/logout` | POST | Admin logout |
| `/api/auth/session` | GET | Check session |

---

## 10. LLM Integration Notes

### 10.1 Context Window (128K)

Optimized for efficient context usage:
- This PRD: ~4K tokens
- AI Rules: ~2K tokens
- Site Context: ~3K tokens
- Total overhead: ~10K tokens
- Available for code: ~118K tokens

### 10.2 Codex 5.1 Compatibility

- Use standard JavaScript/JSX syntax
- Prefer explicit over implicit patterns
- Include type hints in comments when helpful
- Use conventional commit messages

### 10.3 Future LLM Portability

Designed to work with:
- OpenAI Codex
- Claude (Anthropic)
- GPT-4/GPT-5
- Local models (Llama, etc.)

---

## 11. Quick Reference Commands

```bash
# Development
npm run dev              # Start dev server (port 3000)
npm run build            # Production build
npm run start            # Start production server
npm run lint             # Run ESLint

# Testing
npx playwright test      # Run all tests
npx playwright test --ui # Interactive UI mode
npx playwright show-report # View test report

# Git
git status              # Check changes
git add .               # Stage all
git commit -m "msg"     # Commit
git push                # Push to remote

# Backups
mkdir -p src/data/backups
cp src/data/projects.json src/data/backups/projects.$(date +%Y%m%d_%H%M%S).json
```

---

## 12. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-28 | Initial PRD creation |

---

**Document Owner:** Workitu Tech
**Last Updated:** 2026-01-28
**Next Review:** As needed
