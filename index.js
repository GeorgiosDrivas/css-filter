const puppeteer = require("puppeteer");
const path = require("path");

const htmlFilePath = process.argv[2];

if (!htmlFilePath) {
  console.error("Please provide the path to an HTML file.");
  process.exit(1);
}

(async () => {
  const browser = await puppeteer.launch({
    args: ["--allow-file-access-from-files"],
  });
  const page = await browser.newPage();
  await page.goto(`file://${path.resolve(htmlFilePath)}`);

  const unusedCssFinder = await page.evaluate(() => {
    const rules = document.styleSheets;
    const unusedRules = [];

    for (let j = 0; j < rules.length; j++) {
      try {
        let ruleSet = rules[j].cssRules;
        for (let i = 0; i < ruleSet.length; i++) {
          let rule = ruleSet[i].selectorText.substring(1);
          if (document.getElementsByClassName(rule).length === 0) {
            unusedRules.push(rule);
          }
        }
      } catch (e) {
        console.warn(
          `Could not access stylesheet: ${rules[j].href}. Error: ${e.message}`
        );
      }
    }
    return unusedRules;
  });

  console.log("Unused CSS rules:", unusedCssFinder);
  await browser.close();
})();
