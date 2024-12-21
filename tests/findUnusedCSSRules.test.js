const findUnusedCSSRules = require("../findUnusedCSSRules");
const { JSDOM } = require("jsdom");
const { cssContent, htmlContent, secondHtmlContent, cssFilePath } = require("./constants");

jest.mock("fs");

describe("testing", () => {

    it("Should display the unused css rule.", () => {
        expect(findUnusedCSSRules(cssContent, htmlContent, cssFilePath))
        .toEqual([{"selector": ".un-used", "vscodeLink": ".style.css:3:1"}])
    });

    it("Should not display anything since all rules are used", () => {
        expect(findUnusedCSSRules(cssContent, secondHtmlContent, cssFilePath))
        .toEqual([])
    });
});