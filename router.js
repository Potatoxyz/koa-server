"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
router.use('/api/saiheSync', router_api_1.transportApi.routes());
//views router config
// view.upload.html
router.use('/views/upload', router_views_1.uploadView.routes());
// view.transport.html
router.use('/views/transport', router_views_1.transportView.routes());
exports.default = router;
