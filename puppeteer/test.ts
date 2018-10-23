var puppeteer = require('puppeteer-core');
var path = 'D:\\Program Files (x86)\\chrome-win\\chrome-win\\chrome.exe';
//判断新页面跳转完成参数
var checkNavigatedDone = {
    waitUntil: ['networkidle0']
};
(async () => {
    const browser = await puppeteer.launch(
        {
            executablePath: path,
            headless: false,
        }
    );
    const page = await browser.newPage();
    page.on('error', msg => {
        console.log('浏览器崩溃');
    });

    page.on('console', msg => {
        for (let i = 0; i < msg.args().length; ++i)
            console.log(`${i}: ${msg.args()[i]}`); // 译者注：这句话的效果是打印到你的代码的控制台
    });
    await page.goto('http://localhost:4500', checkNavigatedDone);

    await page.evaluate(() => {
       window.localStorage.setItem('jwtToken',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjMsIlRpbWUiOjE1NDAxNzQ5NDZ9.qBKuK-MghBkXHw4IVeOX8QkcbwdUHqqLGW2bBmrQXcI")
        window.location.href="http://localhost:4500/#/pages/home";
    });
})();