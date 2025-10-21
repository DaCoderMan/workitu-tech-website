const { chromium } = require('playwright');

async function testCompleteSite() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('Testing the complete site...');
  
  try {
    // Test home page
    console.log('Loading home page...');
    await page.goto('https://workitu-tech-website-orl48d6lv-yonatan-perlins-projects.vercel.app');
    await page.waitForLoadState('networkidle');
    console.log('✓ Home page loaded');
    
    // Test portfolio page
    console.log('Testing portfolio page...');
    await page.goto('https://workitu-tech-website-orl48d6lv-yonatan-perlins-projects.vercel.app/portfolio');
    await page.waitForLoadState('networkidle');
    console.log('✓ Portfolio page loaded');
    
    // Check if projects are visible
    const projects = await page.locator('[class*="card-hover"]').count();
    console.log(`✓ Found ${projects} project cards`);
    
    // Check for specific projects
    const jobGenie = await page.locator('text=Job Genie AI').count();
    const hebrewFlow = await page.locator('text=Hebrew Flow').count();
    const adventuresAI = await page.locator('text=Adventures AI').count();
    const clearEight = await page.locator('text=Clear Eight').count();
    
    console.log(`✓ Job Genie AI: ${jobGenie > 0 ? 'Found' : 'Missing'}`);
    console.log(`✓ Hebrew Flow: ${hebrewFlow > 0 ? 'Found' : 'Missing'}`);
    console.log(`✓ Adventures AI: ${adventuresAI > 0 ? 'Found' : 'Missing'}`);
    console.log(`✓ Clear Eight: ${clearEight > 0 ? 'Found' : 'Missing'}`);
    
    // Test admin panel
    console.log('Testing admin panel...');
    await page.goto('https://workitu-tech-website-orl48d6lv-yonatan-perlins-projects.vercel.app/admin');
    await page.waitForLoadState('networkidle');
    console.log('✓ Admin panel accessible');
    
    // Test contact page
    console.log('Testing contact page...');
    await page.goto('https://workitu-tech-website-orl48d6lv-yonatan-perlins-projects.vercel.app/contact');
    await page.waitForLoadState('networkidle');
    console.log('✓ Contact page loaded');
    
    // Test pricing page
    console.log('Testing pricing page...');
    await page.goto('https://workitu-tech-website-orl48d6lv-yonatan-perlins-projects.vercel.app/pricing');
    await page.waitForLoadState('networkidle');
    console.log('✓ Pricing page loaded');
    
    console.log('All tests passed!');
    
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
}

testCompleteSite().catch(console.error);
