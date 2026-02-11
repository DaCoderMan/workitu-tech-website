const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const TARGETS = [
  { name: 'local', url: 'http://localhost:3000' },
  {
    name: 'deployed',
    url: 'https://workitu.com',
  },
];

async function runSmoke(target) {
  const options = new chrome.Options()
    .addArguments('--headless=new')
    .addArguments('--disable-gpu')
    .addArguments('--window-size=1400,1000')
    .addArguments('--no-sandbox');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  const result = {
    target: target.name,
    url: target.url,
    passed: false,
    details: [],
    error: null,
  };

  try {
    await driver.get(target.url);

    await driver.wait(until.titleContains('Workitu'), 15000);
    result.details.push('Home title contains "Workitu"');

    const heroHeading = await driver.wait(until.elementLocated(By.css('h1')), 15000);
    await driver.wait(until.elementIsVisible(heroHeading), 15000);
    result.details.push('Home hero heading is visible');

    const portfolioLink = await driver.findElement(By.css('a[href="/portfolio"]'));
    await portfolioLink.click();
    await driver.wait(until.urlContains('/portfolio'), 15000);
    result.details.push('Navigation to /portfolio works');

    const portfolioHeading = await driver.wait(until.elementLocated(By.css('h1')), 15000);
    await driver.wait(until.elementIsVisible(portfolioHeading), 15000);
    result.details.push('Portfolio page heading is visible');

    await driver.get(`${target.url}/contact`);
    const contactForm = await driver.wait(until.elementLocated(By.css('form')), 15000);
    await driver.wait(until.elementIsVisible(contactForm), 15000);
    result.details.push('Contact form is visible');

    result.passed = true;
  } catch (err) {
    result.error = err?.message || String(err);
  } finally {
    await driver.quit();
  }

  return result;
}

async function main() {
  console.log('Running Selenium smoke checks...\n');
  const results = [];

  for (const target of TARGETS) {
    console.log(`→ Testing ${target.name}: ${target.url}`);
    const result = await runSmoke(target);
    results.push(result);

    if (result.passed) {
      console.log(`  ✅ PASS (${result.target})`);
      for (const line of result.details) console.log(`     - ${line}`);
    } else {
      console.log(`  ❌ FAIL (${result.target})`);
      console.log(`     - ${result.error}`);
    }
    console.log('');
  }

  const passCount = results.filter((r) => r.passed).length;
  console.log(`Summary: ${passCount}/${results.length} targets passed.`);

  process.exit(passCount === results.length ? 0 : 1);
}

main().catch((err) => {
  console.error('Unexpected runner error:', err);
  process.exit(1);
});