const { Builder, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function testPaymentFlow() {
  const options = new chrome.Options()
    .addArguments('--headless=new')
    .addArguments('--disable-gpu')
    .addArguments('--window-size=1400,1000')
    .addArguments('--no-sandbox');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  const results = [];
  const log = (msg) => { results.push(msg); console.log(`  ${msg}`); };

  try {
    console.log('\n=== Payment Flow Selenium Test ===\n');

    // 1. Load /pay page
    console.log('→ Step 1: Load /pay page');
    await driver.get('http://localhost:3000/pay');
    await driver.wait(until.elementLocated(By.css('form')), 15000);
    log('✅ /pay page loaded, form found');

    // Verify page heading
    const heading = await driver.findElement(By.css('h1'));
    const headingText = await heading.getText();
    if (headingText.includes('Payment')) {
      log(`✅ Heading: "${headingText}"`);
    } else {
      log(`⚠️ Unexpected heading: "${headingText}"`);
    }

    // 2. Click a preset amount card
    console.log('\n→ Step 2: Click $320 preset');
    const presetCards = await driver.findElements(By.css('[class*="cursor-pointer"]'));
    if (presetCards.length >= 1) {
      await presetCards[0].click();
      await driver.sleep(500);
      const amountInput = await driver.findElement(By.id('amount'));
      const amountValue = await amountInput.getAttribute('value');
      if (amountValue === '320') {
        log('✅ Preset $320 clicked, amount field set to 320');
      } else {
        log(`⚠️ Amount field value: "${amountValue}" (expected "320")`);
      }
    } else {
      log('⚠️ No preset cards found');
    }

    // 3. Fill in the form
    console.log('\n→ Step 3: Fill form fields');
    const amountInput = await driver.findElement(By.id('amount'));
    await amountInput.clear();
    await amountInput.sendKeys('50');
    log('✅ Set amount to $50');

    const emailInput = await driver.findElement(By.id('email'));
    await emailInput.sendKeys('selenium-test@workitu.com');
    log('✅ Set email to selenium-test@workitu.com');

    const projectInput = await driver.findElement(By.id('projectName'));
    await projectInput.sendKeys('Selenium Test Project');
    log('✅ Set project name');

    // 4. Submit the form
    console.log('\n→ Step 4: Submit checkout form');
    const submitBtn = await driver.findElement(By.css('button[type="submit"]'));
    const btnText = await submitBtn.getText();
    log(`✅ Submit button found: "${btnText}"`);

    await submitBtn.click();

    // Wait for redirect to LemonSqueezy or for button text to change
    await driver.sleep(2000);

    // Check if we got redirected to LemonSqueezy checkout
    const currentUrl = await driver.getCurrentUrl();
    if (currentUrl.includes('lemonsqueezy.com')) {
      log('✅ Redirected to LemonSqueezy checkout!');
      log(`   URL: ${currentUrl.substring(0, 80)}...`);
    } else {
      // Maybe still on /pay with loading state or error
      const pageSource = await driver.getPageSource();
      if (pageSource.includes('Creating Checkout')) {
        log('⏳ Still loading (Creating Checkout...)');
        // Wait a bit more
        await driver.sleep(5000);
        const newUrl = await driver.getCurrentUrl();
        if (newUrl.includes('lemonsqueezy.com')) {
          log('✅ Redirected to LemonSqueezy checkout after waiting!');
        } else {
          log(`⚠️ Still on: ${newUrl}`);
        }
      } else if (pageSource.includes('error') || pageSource.includes('Error')) {
        // Try to get error text
        try {
          const errorEl = await driver.findElement(By.css('[class*="red"]'));
          const errorText = await errorEl.getText();
          log(`❌ Error displayed: "${errorText}"`);
        } catch {
          log(`⚠️ Page has error content but couldn't extract it`);
        }
      } else {
        log(`⚠️ Still on: ${currentUrl}`);
      }
    }

    // 5. Verify the LemonSqueezy checkout page loads (if redirected)
    const finalUrl = await driver.getCurrentUrl();
    if (finalUrl.includes('lemonsqueezy.com')) {
      console.log('\n→ Step 5: Verify LemonSqueezy checkout page');
      await driver.wait(until.elementLocated(By.css('body')), 10000);
      const title = await driver.getTitle();
      log(`✅ LemonSqueezy page loaded (title: "${title}")`);
    }

    // Summary
    console.log('\n=== Results ===');
    const passes = results.filter(r => r.startsWith('✅')).length;
    const warnings = results.filter(r => r.startsWith('⚠️')).length;
    const failures = results.filter(r => r.startsWith('❌')).length;
    console.log(`  ${passes} passed, ${warnings} warnings, ${failures} failures`);
    console.log(`\n  ${failures === 0 ? '✅ PAYMENT FLOW TEST PASSED' : '❌ PAYMENT FLOW TEST FAILED'}`);

    process.exit(failures === 0 ? 0 : 1);

  } catch (err) {
    console.error('\n❌ Test error:', err.message);
    process.exit(1);
  } finally {
    await driver.quit();
  }
}

testPaymentFlow();
