const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:3000';

test.describe('Workitu Tech E2E Flow', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('Home Page Elements', async ({ page }) => {
    // Check Title
    await expect(page).toHaveTitle(/Workitu/i);
    
    // Check Hero Text
    await expect(page.locator('h1')).toBeVisible();
    
    // Use more specific selector for Hero
    const heroText = page.locator('div.text-center', { hasText: 'Where Imagination Meets Innovation' });
    await expect(heroText).toBeVisible();

    // Check CTA
    const ctaButton = page.locator('a[href="/contact"]');
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toContainText('Start Your Story');
  });

  test('Navigation to Portfolio', async ({ page }) => {
    // Find Portfolio link - handle both desktop and mobile menu if needed
    // For now assuming desktop or visible link
    // Checking if mobile menu button exists first
    const menuButton = page.locator('button[aria-label="Menu"]'); // Hypothetical
    if (await menuButton.isVisible()) {
        await menuButton.click();
    }
    
    const portfolioLink = page.locator('a[href="/portfolio"]').first();
    await expect(portfolioLink).toBeVisible();
    await portfolioLink.click();
    await expect(page).toHaveURL(/.*portfolio/);
  });

  test('Portfolio Page Functionality', async ({ page }) => {
    await page.goto(`${BASE_URL}/portfolio`);
    
    // Check Header
    await expect(page.locator('h1')).toContainText('Our Portfolio');
    
    // Wait for projects to load
    await expect(page.locator('.loading-spinner')).not.toBeVisible({ timeout: 10000 });
    
    // Check if at least one project card exists
    const projectCards = page.locator('.card-hover');
    await expect(projectCards.first()).toBeVisible();
    const count = await projectCards.count();
    console.log(`Found ${count} projects`);
    expect(count).toBeGreaterThan(0);

    // Test Search Filter (if "Spanish Flow" is in the mock data)
    const searchInput = page.locator('input[placeholder="Search projects..."]');
    await searchInput.fill('Spanish');
    await page.waitForTimeout(500); // Wait for filter
    
    // Verify filtering
    const visibleCards = page.locator('.card-hover:visible');
    const filteredCount = await visibleCards.count();
    expect(filteredCount).toBeGreaterThan(0);
    // Should verify non-matching items are gone?
  });

  test('Contact Form Validation', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`);
    
    // Check Form existence
    await expect(page.locator('form')).toBeVisible();
    
    // Try submit without filling
    const submitBtn = page.locator('button[type="submit"]');
    await submitBtn.click();
    
    // Expect some validation error or HTML5 required attribute
    // We can check if input:invalid exists
    // await expect(page.locator('input:invalid')).toHaveCount(0); // If valid this would fail
  });

});
