import {addCookies} from "../Util/UPuppeteer";
var puppeteer = require('puppeteer-core');
import {exePath, saiheCookie, userAgent, viewPort} from '../static';
import {createFile} from '../Util/Util';
import * as _ from "underscore";
var targetPath1 = "http://demate.irobotbox.com/IrobotBox/Delivery/TransportEditv3.aspx?TransportID=";
var targetPath2 = "http://demate.irobotbox.com/IrobotBox/Delivery/TransportFeeEditV2.aspx";
var browserSetting = {
    executablePath: exePath,
    headless: true
};

var transportDetail=async (transportId) => {
    if(!_.isNumber(transportId)){
        return Promise.reject('transportId 为空');
    }
    const browser = await puppeteer.launch(browserSetting);
    const page = await browser.newPage();
    await page.setViewport(viewPort);
    await page.setUserAgent(userAgent);
    await addCookies(saiheCookie, page, '.irobotbox.com');
    await page.goto(targetPath1+transportId).catch(e=>{
        page.close();
        console.log(e);
    });
    let result = await page.evaluate(() => {
        let result = [];
        $('#tbodyarea tr').each(function (index,value) {
                let suplid=$("#tdtransname").attr("val"); //物流id
                let chktsid=$("#tbodyarea tr").eq(index).find("input[type='checkbox']").val(); //区域国家id
                let areaName=($(value).children("td:nth-of-type(2)").text()).replace(/\s|\r|\n+/g,"");
                let countries=($(value).children("td:nth-of-type(3)").text()).replace(/\s|\r|\n+/g,"");
                result.push({chktsid,areaName,countries,suplid})
        });
        return result;
    });
    var page1=await browser.newPage();
    for(var i=0;i<result.length;i++){
        result[i]['transportId']=transportId;
        await page1.goto(`${targetPath2}?id=${result[i].chktsid}&suplid=${result[i].suplid}&transid=${transportId}`)
            .catch(e=>{
            page1.close();
            console.log(e);
        });
        result[i]['priceDetail']=await page1.evaluate(()=>{
            let priceCount=$("#TableSapce table tbody tr").length-2;
            let priceResult=[];
            if(priceCount){
                for(var j=0;j<priceCount;j++){
                    let o=j+1;
                    let MinWeight=`#MinWeight${o}`;  //最小重量
                    let MaxWeight=`#MaxWeight${o}`;  //最大重量
                    let Pirce=`#Pirce${o}`;         //一口价
                    let UnitPirce=`#UnitPirce${o}`;  //单克价格
                    let FuelFee=`#FuelFee${o}`;      //燃油费
                    let FuelFeeRate=`#FuelFeeRate${o}`;//燃油费用率
                    let OtherFee=`#OtherFee${o}`;     //其他费用
                    console.log($(MinWeight).val())
                    priceResult.push({MinWeight:$(MinWeight).val(),
                        MaxWeight:$(MaxWeight).val(),
                        Pirce:$(Pirce).val(),
                        UnitPirce:$(UnitPirce).val(),
                        FuelFee:$(FuelFee).val(),
                        FuelFeeRate:$(FuelFeeRate).val(),
                        OtherFee:$(OtherFee).val()
                    });
                }
            }
            return priceResult;
        });
    }
    createFile(result, `saihe-transport-detail-${transportId}.json`);
    // await page.close();
    // await page1.close();
    return Promise.resolve("爬取成功！");
};
export default transportDetail;