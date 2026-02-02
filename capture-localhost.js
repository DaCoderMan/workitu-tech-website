const { chromium } = require('playwright');
const path = require('path');

async function captureLocalhost() {
  console.log('🚀 Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    console.log('📸 Navigating to localhost:3000...');
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
    
    // Scroll to bottom to trigger animations
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
    
    // Scroll back up
    await page.evaluate(() => window.scrollTo(0, 0));
    // Wait for header animation
    await page.waitForTimeout(1000);

    const outputPath = path.join(__dirname, 'public/localhost_preview.png');
    await page.screenshot({ path: outputPath, fullPage: true });
    console.log(`✅ Screenshot saved to ${outputPath}`);
    
  } catch (error) {
    console.error('❌ Error capturing screenshot:', error);
  } finally {
    await browser.close();
  }
}

captureLocalhost();
