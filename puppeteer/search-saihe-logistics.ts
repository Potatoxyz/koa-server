import {addCookies} from "../Util/UPuppeteer";

var puppeteer = require('puppeteer-core');
import {exePath, saiheCookie, userAgent, viewPort} from '../static';
import {createFile} from '../Util/Util';

var targetPath1 = "http://demate.irobotbox.com/IrobotBox/Delivery/TransportList2.aspx?PageSize=300&OrderBy=&SubmitType=0&TrspName=&SuperName=&WareType=&MoveWare=&Active=1&TrspType=&DeclarRule=";
var targetPath2 = "http://demate.irobotbox.com/IrobotBox/Delivery/TransportEditv3.aspx?TransportID=";
var checkNavigatedDone = {
    waitUntil: ['networkidle0']
};
var browserSetting = {
    executablePath: exePath,
    headless: true
};

(async () => {
    const browser = await puppeteer.launch(browserSetting);
    const page = await browser.newPage();
    await page.setViewport(viewPort);
    //设置UserAgent  否则有headless字样
    await page.setUserAgent(userAgent);
    await addCookies(saiheCookie, page, '.irobotbox.com');
    await page.goto(targetPath1);
    //获取已启用的物流方式列表和ID
    let result = await page.evaluate(() => {
        let result = [];
        $("#strTbody tr").each(function (index, tr) {
            let transportId = $(tr).children('td:nth-of-type(2)').text();
            let transportName = $(tr).children('td:nth-of-type(3)').text();
            result.push({transportId: transportId, transportName: transportName})
        });
        return result;
    });
    var page1 = await browser.newPage();
    var ge = async (transportItem, index) => {
        await page1.goto(targetPath2 + transportItem.transportId, checkNavigatedDone);
        await page.waitFor(2000);
        result[index]['transportCode'] = await page1.evaluate(() => {
            return $('#txtCode').text();
        });
        console.log(transportItem.transportName + ":done");
        return Promise.resolve(result[index]);
    };
    for (var i = 0; i < result.length; i++) {
        await ge(result[i], i);
    }
    await page1.close();
    await page.close();
    console.log(result.length);
    createFile(result, 'saihe-transport.json');
})();