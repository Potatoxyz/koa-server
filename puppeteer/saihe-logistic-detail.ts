import {addCookies} from "../Util/UPuppeteer";
var puppeteer = require('puppeteer-core');
import {exePath, saiheCookie, userAgent, viewPort} from '../static';
import {createFile} from '../Util/Util';
import * as _ from "underscore";
import Handle from "./public-handle";
var targetPath1 = "http://demate.irobotbox.com/IrobotBox/Delivery/TransportEditv3.aspx?TransportID=";
var browserSetting = {
    executablePath: exePath,
    headless: false
};

var transportDetail=async (transportId) => {
    if(!_.isNumber(transportId)){
        return Promise.reject('transportId 为空');
    }
    const browser = await puppeteer.launch(browserSetting);
    const page = await browser.newPage();
    Handle.onError.call(this,page);
    await page.setViewport(viewPort);
    await page.setUserAgent(userAgent);
    await addCookies(saiheCookie, page, '.irobotbox.com');
    await page.goto(targetPath1+transportId);
    let result = await page.evaluate(() => {
        let result = [];
        $('#tbodyarea tr').each(function (index,value) {
            let areaName=($(value).children("td:nth-of-type(2)").text()).replace(/\s|\r|\n+/g,"");
            let countries=($(value).children("td:nth-of-type(3)").text()).replace(/\s|\r|\n+/g,"");
            result.push({areaName:areaName,countries:countries})
        });
        return result;
    });
    createFile(result, `saihe-transport-detail-${transportId}.json`);
    await page.close();
    return Promise.resolve("爬取成功！");
};
export default transportDetail;