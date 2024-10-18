const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const { JSDOM } = require("jsdom");

const cssFilePath = process.argv[2];
const htmlFilePath = process.argv[3];

if (!cssFilePath || !htmlFilePath) {
  console.error(
    "Please provide the paths to both a CSS file and an HTML file."
  );
  process.exit(1);
}

// Read and parse the CSS file
const cssContent = fs.readFileSync(cssFilePath, "utf-8");
const htmlContent = fs.readFileSync(htmlFilePath, "utf-8");

// Parse HTML content using JSDOM
const dom = new JSDOM(htmlContent);
const document = dom.window.document;

postcss.parse(cssContent).walkRules((rule) => {
  const selector = rule.selector;

  // Check if any elements match the selector
  const elements = document.querySelectorAll(selector);

  if (elements.length === 0) {
    console.log(`Unused CSS rule: ${selector}`);
  }
});
