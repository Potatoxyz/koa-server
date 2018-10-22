var puppeteer = require('puppeteer-core');
var path = 'D:\\我的硬盘\\program files\\chrome-win\\chrome-win\\chrome.exe';
var targetPath = "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=%E7%99%BE%E5%BA%A6&oq=wo&rsv_pq=8201331b0000b9d8&rsv_t=b392tm0657wJmuLJh77GxJj1jS901N0OTuA4ucT5PfdZSvRSnTXeOPk4%2FKI&rqlang=cn&rsv_enter=1&inputT=1240&rsv_sug3=17&rsv_sug1=19&rsv_sug7=101&bs=wo";
(async () => {
    const browser = await puppeteer.launch(
        {
            executablePath: path,
            headless: false
        }
    );
    const page = await browser.newPage();
    await page.goto(targetPath);
    let table = await page.evaluate(() => {
        let tbody = $("#con-ar .opr-toplist1-table tbody");
        let results = [];
        $(tbody).each(function (index, tbody) {
            let tr = $(tbody).children('tr');
            $(tr).each(function (index1, tri) {
                let text = $(tri).find("a").text();
                let times = $(tri).find(".opr-toplist1-right").text();
                results.push({text: text, times: times});
            });
        });
        return results;
    });
    console.log(table);
})();