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
var targetPath1 = "http://demate.irobotbox.com/IrobotBox/Delivery/TransportList2.aspx?PageSize=300&OrderBy=&SubmitType=0&TrspName=&SuperName=&WareType=&MoveWare=&Active=1&TrspType=&DeclarRule=";
var targetPath2 = "http://demate.irobotbox.com/IrobotBox/Delivery/TransportEditv3.aspx?TransportID=";
var checkNavigatedDone = {
    waitUntil: ['networkidle0']
};
var browserSetting = {
    executablePath: static_1.exePath,
    headless: true
};
(function () { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var browser, page, result, page1, ge, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, puppeteer.launch(browserSetting)];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.setViewport(static_1.viewPort)];
            case 3:
                _a.sent();
                //设置UserAgent  否则有headless字样
                return [4 /*yield*/, page.setUserAgent(static_1.userAgent)];
            case 4:
                //设置UserAgent  否则有headless字样
                _a.sent();
                return [4 /*yield*/, UPuppeteer_1.addCookies(static_1.saiheCookie, page, '.irobotbox.com')];
            case 5:
                _a.sent();
                return [4 /*yield*/, page.goto(targetPath1)];
            case 6:
                _a.sent();
                return [4 /*yield*/, page.evaluate(function () {
                        var result = [];
                        $("#strTbody tr").each(function (index, tr) {
                            var transportId = $(tr).children('td:nth-of-type(2)').text();
                            var transportName = $(tr).children('td:nth-of-type(3)').text();
                            result.push({ transportId: transportId, transportName: transportName });
                        });
                        return result;
                    })];
            case 7:
                result = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 8:
                page1 = _a.sent();
                ge = function (transportItem, index) { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, page1.goto(targetPath2 + transportItem.transportId, checkNavigatedDone)];
                            case 1:
                                _c.sent();
                                return [4 /*yield*/, page.waitFor(2000)];
                            case 2:
                                _c.sent();
                                _a = result[index];
                                _b = 'transportCode';
                                return [4 /*yield*/, page1.evaluate(function () {
                                        return $('#txtCode').text();
                                    })];
                            case 3:
                                _a[_b] = _c.sent();
                                console.log(transportItem.transportName + ":done");
                                return [2 /*return*/, Promise.resolve(result[index])];
                        }
                    });
                }); };
                i = 0;
                _a.label = 9;
            case 9:
                if (!(i < result.length)) return [3 /*break*/, 12];
                return [4 /*yield*/, ge(result[i], i)];
            case 10:
                _a.sent();
                _a.label = 11;
            case 11:
                i++;
                return [3 /*break*/, 9];
            case 12: return [4 /*yield*/, page1.close()];
            case 13:
                _a.sent();
                return [4 /*yield*/, page.close()];
            case 14:
                _a.sent();
                console.log(result.length);
                Util_1.createFile(result, 'saihe-transport.json');
                return [2 /*return*/];
        }
    });
}); })();
