const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");
const TwoCaptcha = require("2captcha");


// const solver = new TwoCaptcha('YOUR_API_KEY');
const chromeOptions = new chrome.Options();
chromeOptions.addArguments("--headless");
chromeOptions.addArguments(
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"
);

(async () => {
  const driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();

  try {
    await driver.get("https://www.oddschecker.com/football");
    await driver.sleep(5000);

    console.log("here");

    await driver.takeScreenshot().then((data) => {
      fs.writeFileSync("./foo.png", data, "base64");
    });

    console.log("in try block");

    await driver.sleep(3000);

    driver
      .findElements({
        className: "OddsTableContainer_o16zgpun",
      })
      .then((elements) => {
        elements.filter((value) => {
          value.getText().then((str) => {
            fs.appendFileSync("./results.txt", str + "\n");
          });
        });
      })
      .catch(error=>{
        console.log('error caught',error)
      });
  } catch (error) {
    console.log("unexpected schitz", error);
  } finally {
    await driver.quit();
  }
})();
