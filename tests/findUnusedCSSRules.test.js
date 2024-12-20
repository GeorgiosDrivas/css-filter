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

    const cssFilePath = '.style.css';


    it("Should display the used css rules.", () => {
        expect(
    findUnusedCSSRules(cssContent, htmlContent, cssFilePath)
        ).toEqual([{"selector": ".un-used", "vscodeLink": ".style.css:3:9"}])
    });
});