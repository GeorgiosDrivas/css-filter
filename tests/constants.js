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

module.exports = { cssContent, htmlContent, secondHtmlContent, cssFilePath };