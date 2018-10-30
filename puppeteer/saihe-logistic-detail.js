"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var UPuppeteer_1 = require("../Util/UPuppeteer");
var puppeteer = require('puppeteer-core');
var static_1 = require("../static");
var Util_1 = require("../Util/Util");
var _ = require("underscore");
var targetPath1 = "http://demate.irobotbox.com/IrobotBox/Delivery/TransportEditv3.aspx?TransportID=";
var targetPath2 = "http://demate.irobotbox.com/IrobotBox/Delivery/TransportFeeEditV2.aspx";
var browserSetting = {
    executablePath: static_1.exePath,
    headless: true
};
var transportDetail = function (transportId) { return __awaiter(_this, void 0, void 0, function () {
    var browser, page, result, page1, i, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!_.isNumber(transportId)) {
                    return [2 /*return*/, Promise.reject('transportId 为空')];
                }
                return [4 /*yield*/, puppeteer.launch(browserSetting)];
            case 1:
                browser = _c.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _c.sent();
                return [4 /*yield*/, page.setViewport(static_1.viewPort)];
            case 3:
                _c.sent();
                return [4 /*yield*/, page.setUserAgent(static_1.userAgent)];
            case 4:
                _c.sent();
                return [4 /*yield*/, UPuppeteer_1.addCookies(static_1.saiheCookie, page, '.irobotbox.com')];
            case 5:
                _c.sent();
                return [4 /*yield*/, page.goto(targetPath1 + transportId).catch(function (e) {
                        page.close();
                        console.log(e);
                    })];
            case 6:
                _c.sent();
                return [4 /*yield*/, page.evaluate(function () {
                        var result = [];
                        $('#tbodyarea tr').each(function (index, value) {
                            var suplid = $("#tdtransname").attr("val"); //物流id
                            var chktsid = $("#tbodyarea tr").eq(index).find("input[type='checkbox']").val(); //区域国家id
                            var areaName = ($(value).children("td:nth-of-type(2)").text()).replace(/\s|\r|\n+/g, "");
                            var countries = ($(value).children("td:nth-of-type(3)").text()).replace(/\s|\r|\n+/g, "");
                            result.push({ chktsid: chktsid, areaName: areaName, countries: countries, suplid: suplid });
                        });
                        return result;
                    })];
            case 7:
                result = _c.sent();
                return [4 /*yield*/, browser.newPage()];
            case 8:
                page1 = _c.sent();
                i = 0;
                _c.label = 9;
            case 9:
                if (!(i < result.length)) return [3 /*break*/, 13];
                result[i]['transportId'] = transportId;
                return [4 /*yield*/, page1.goto(targetPath2 + "?id=" + result[i].chktsid + "&suplid=" + result[i].suplid + "&transid=" + transportId)
                        .catch(function (e) {
                        page1.close();
                        console.log(e);
                    })];
            case 10:
                _c.sent();
                _a = result[i];
                _b = 'priceDetail';
                return [4 /*yield*/, page1.evaluate(function () {
                        var priceCount = $("#TableSapce table tbody tr").length - 2;
                        var priceResult = [];
                        if (priceCount) {
                            for (var j = 0; j < priceCount; j++) {
                                var o = j + 1;
                                var MinWeight = "#MinWeight" + o; //最小重量
                                var MaxWeight = "#MaxWeight" + o; //最大重量
                                var Pirce = "#Pirce" + o; //一口价
                                var UnitPirce = "#UnitPirce" + o; //单克价格
                                var FuelFee = "#FuelFee" + o; //燃油费
                                var FuelFeeRate = "#FuelFeeRate" + o; //燃油费用率
                                var OtherFee = "#OtherFee" + o; //其他费用
                                console.log($(MinWeight).val());
                                priceResult.push({ MinWeight: $(MinWeight).val(),
                                    MaxWeight: $(MaxWeight).val(),
                                    Pirce: $(Pirce).val(),
                                    UnitPirce: $(UnitPirce).val(),
                                    FuelFee: $(FuelFee).val(),
                                    FuelFeeRate: $(FuelFeeRate).val(),
                                    OtherFee: $(OtherFee).val()
                                });
                            }
                        }
                        return priceResult;
                    })];
            case 11:
                _a[_b] = _c.sent();
                _c.label = 12;
            case 12:
                i++;
                return [3 /*break*/, 9];
            case 13:
                Util_1.createFile(result, "saihe-transport-detail-" + transportId + ".json");
                // await page.close();
                // await page1.close();
                return [2 /*return*/, Promise.resolve("爬取成功！")];
        }
    });
}); };
exports.default = transportDetail;
