const puppeteer = require('puppeteer-core');
const path = 'D:\\Program Files (x86)\\chrome-win\\chrome-win\\chrome.exe';
//判断新页面跳转完成参数
const checkNavigatedDone = {
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
        let loginButton = $('div.auth-main a.btn');
        $(loginButton).click(() => {
            console.log('?');
            setTimeout(()=>{
                console.log($('form .login-body input[formcontrolname="workerNo"]')[0])
                $('form .login-body input[formcontrolname="workerNo"]')[0].focus();
            },1000)
        });
        $(loginButton)[0].click();
    });
    // await page.$('div.auth-main a.btn').then(ctx=>{console.log(ctx)});
    // await page.$('form .login-body input[formcontrolname="workerNo"]');
    // await page.$('form .login-body input[formcontrolname="password"]');
})();