const { chromium } = require('playwright');

async function captureClearEight() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set viewport size
  await page.setViewportSize({ width: 1024, height: 768 });
  
  // Capture Clear Eight screenshot
  console.log('Capturing Clear Eight screenshot...');
  await page.goto('https://clear-eight.vercel.app/', { waitUntil: 'networkidle' });
  await page.screenshot({ 
    path: 'public/images/projects/cleareight-screenshot.png',
    fullPage: false
  });
  
  await browser.close();
  console.log('Clear Eight screenshot captured successfully!');
}

captureClearEight().catch(console.error);
