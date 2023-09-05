const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    ],
  });
  const page = await browser.newPage();

  try {
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
    );

    await page.goto('https://www.oddschecker.com/football');
    await page.waitForTimeout(5000);

    console.log('here');

    await page.screenshot({ path: './foo.png' });

    console.log('in try block');

    const elements = await page.$$('.OddsTableContainer_o16zgpun');
    for (const element of elements) {
      const text = await element.evaluate((el) => el.textContent);
      fs.appendFileSync('./results.txt', text + '\n');
    }
  } catch (error) {
    console.log('unexpected error', error);
  } finally {
    await browser.close();
  }
})();
