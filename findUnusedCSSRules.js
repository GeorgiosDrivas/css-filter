const postcss = require("postcss");
const { JSDOM } = require("jsdom");

function findUnusedCSSRules(cssContent, htmlContent, cssFilePath) {
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;
  const unusedRules = [];

  postcss.parse(cssContent).walkRules((rule) => {
    const selector = rule.selector;
    const elements = document.querySelectorAll(selector);
    const { line, column } = rule.source.start;
    const vscodeLink = `${cssFilePath}:${line}:${column}`;

    if (elements.length === 0) {
      unusedRules.push({ selector, vscodeLink });
    }
  });

  return unusedRules;
}

module.exports = findUnusedCSSRules;
