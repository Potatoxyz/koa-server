"use strict";
exports.__esModule = true;
var Router = require("koa-router");
var router_api_1 = require("./router-api");
var router_views_1 = require("./router-views");
var router = new Router();
router.get('/', function (ctx, next) {
    ctx.body = 'welcome to index';
});
//api router config
router.use('/api/product', router_api_1.productApi.routes());
router.use('/api/upload', router_api_1.uploadApi.routes());
//views router config
router.use('/views/upload', router_views_1.uploadView.routes());
exports["default"] = router;
