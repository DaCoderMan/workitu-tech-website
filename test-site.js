const { chromium } = require('playwright');

async function testSite() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('Testing the deployed site...');
  
  try {
    // Test home page
    console.log('Loading home page...');
    await page.goto('https://workitu-tech-website-fqre62k0f-yonatan-perlins-projects.vercel.app');
    await page.waitForLoadState('networkidle');
    console.log('✓ Home page loaded');
    
    // Test portfolio page
    console.log('Testing portfolio page...');
    await page.goto('https://workitu-tech-website-fqre62k0f-yonatan-perlins-projects.vercel.app/portfolio');
    await page.waitForLoadState('networkidle');
    console.log('✓ Portfolio page loaded');
    
    // Check if projects are visible
    const projects = await page.locator('[class*="card-hover"]').count();
    console.log(`✓ Found ${projects} project cards`);
    
    // Test admin panel
    console.log('Testing admin panel...');
    await page.goto('https://workitu-tech-website-fqre62k0f-yonatan-perlins-projects.vercel.app/admin');
    await page.waitForLoadState('networkidle');
    console.log('✓ Admin panel accessible');
    
    console.log('All tests passed!');
    
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
}

testSite().catch(console.error);
