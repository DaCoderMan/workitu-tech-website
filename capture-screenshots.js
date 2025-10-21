const { chromium } = require('playwright');

async function captureScreenshots() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set viewport size
  await page.setViewportSize({ width: 1024, height: 768 });
  
  // Capture Hebrew Flow screenshot
  console.log('Capturing Hebrew Flow screenshot...');
  await page.goto('https://www.hebrewflow.com', { waitUntil: 'networkidle' });
  await page.screenshot({ 
    path: 'public/images/projects/hebrewflow-screenshot.png',
    fullPage: false
  });
  
  // Capture Adventures AI screenshot
  console.log('Capturing Adventures AI screenshot...');
  await page.goto('https://adventuresai.app', { waitUntil: 'networkidle' });
  await page.screenshot({ 
    path: 'public/images/projects/adventuresai-screenshot.png',
    fullPage: false
  });
  
  await browser.close();
  console.log('Screenshots captured successfully!');
}

captureScreenshots().catch(console.error);
