const { test, expect } = require('@playwright/test');

test.describe('Workitu Tech Website', () => {
  test('should load home page', async ({ page }) => {
    await page.goto('https://workitu-tech-website-fqre62k0f-yonatan-perlins-projects.vercel.app');
    await expect(page).toHaveTitle(/Workitu Tech/);
  });

  test('should navigate to portfolio', async ({ page }) => {
    await page.goto('https://workitu-tech-website-fqre62k0f-yonatan-perlins-projects.vercel.app');
    await page.click('text=Portfolio');
    await expect(page).toHaveURL(/.*portfolio/);
  });

  test('should navigate to pricing', async ({ page }) => {
    await page.goto('https://workitu-tech-website-fqre62k0f-yonatan-perlins-projects.vercel.app');
    await page.click('text=Pricing');
    await expect(page).toHaveURL(/.*pricing/);
  });

  test('should navigate to contact', async ({ page }) => {
    await page.goto('https://workitu-tech-website-fqre62k0f-yonatan-perlins-projects.vercel.app');
    await page.click('text=Contact');
    await expect(page).toHaveURL(/.*contact/);
  });

  test('should access admin panel without login', async ({ page }) => {
    await page.goto('https://workitu-tech-website-fqre62k0f-yonatan-perlins-projects.vercel.app/admin');
    // Should be able to access admin without authentication
    await expect(page.locator('h1')).toContainText(/Admin/);
  });

  test('should have working contact form', async ({ page }) => {
    await page.goto('https://workitu-tech-website-fqre62k0f-yonatan-perlins-projects.vercel.app/contact');
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'Test message');
    await page.click('button[type="submit"]');
    // Should show success message or redirect
    await expect(page.locator('text=Thank you')).toBeVisible({ timeout: 10000 });
  });
});
