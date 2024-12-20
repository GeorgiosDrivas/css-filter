const findUnusedCSSRules = require("../findUnusedCSSRules");
const { JSDOM } = require("jsdom");

jest.mock("fs");

describe("testing", () => {
    const cssContent = `
        .used {color: red; }    
        .un-used {color: red; }    
    `;

    const htmlContent = `
        <p class="used"></p>
    `;

    const secondHtmlContent = `
        <p class="used"></p>
        <p class="un-used"></p>
    `;

    const cssFilePath = '.style.css';

    it("Should display the unused css rule.", () => {
        expect(findUnusedCSSRules(cssContent, htmlContent, cssFilePath))
        .toEqual([{"selector": ".un-used", "vscodeLink": ".style.css:3:9"}])
    });

    it("Should not display anything since all rules are used", () => {
        expect(findUnusedCSSRules(cssContent, secondHtmlContent, cssFilePath))
        .toEqual([])
    });
});