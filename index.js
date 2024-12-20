const fs = require("fs");
const findUnusedCSSRules = require("./findUnusedCSSRules");

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

findUnusedCSSRules(cssContent, htmlContent, cssFilePath);
