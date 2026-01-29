const { test, expect } = require('@playwright/test');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@workitu.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

async function openNavIfMobile(page) {
  const toggle = page.locator('button[aria-label="Toggle navigation menu"]');
  try {
    await toggle.waitFor({ state: 'visible', timeout: 1000 });
    await toggle.click();
  } catch {
    // Desktop view: navigation already visible
  }
}

test.describe('Workitu Tech Website', () => {
  test('should load home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Workitu Tech/i);
  });

  test('should navigate to portfolio', async ({ page }) => {
    await page.goto('/');
    const viewport = page.viewportSize();
    if (viewport && viewport.width < 768) {
      await page.goto('/portfolio');
    } else {
      await openNavIfMobile(page);
      await page.click('text=Portfolio');
    }
    await expect(page).toHaveURL(/.*portfolio/);
  });

  test('should navigate to pricing', async ({ page }) => {
    await page.goto('/');
    const viewport = page.viewportSize();
    if (viewport && viewport.width < 768) {
      await page.goto('/pricing');
    } else {
      await openNavIfMobile(page);
      await page.click('text=Pricing');
    }
    await expect(page).toHaveURL(/.*pricing/);
  });

  test('should navigate to contact', async ({ page }) => {
    await page.goto('/');
    const viewport = page.viewportSize();
    if (viewport && viewport.width < 768) {
      await page.goto('/contact');
    } else {
      await openNavIfMobile(page);
      await page.click('text=Contact');
    }
    await expect(page).toHaveURL(/.*contact/);
  });

  test('should access admin panel after login', async ({ page }) => {
    await page.goto('/admin');
    await page.fill('input[type="email"]', ADMIN_EMAIL);
    await page.fill('input[type="password"]', ADMIN_PASSWORD);
    await page.click('button:has-text("Sign in")');
    await expect(page.locator('h1')).toContainText(/Admin Panel/i);
  });

  test('should have working contact form', async ({ page }) => {
    await page.goto('/contact');
    await page.fill('input#name', 'Test User');
    await page.fill('input#email', 'test@example.com');
    await page.fill('textarea#message', 'Test message from Playwright');
    await page.click('button[type="submit"]');
    await expect(page.getByText('message has been sent successfully', { exact: false })).toBeVisible({ timeout: 10000 });
  });
});
