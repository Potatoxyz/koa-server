var puppeteer = require('puppeteer-core');
var path='D:\\Program Files (x86)\\chrome-win\\chrome-win\\chrome.exe';
(async () => {
    const browser = await puppeteer.launch(
        {executablePath:path}
    );
    const page = await browser.newPage();
    await page.goto('https://example.com');
    await page.screenshot({path: 'example.png'});
    await browser.close();
})();