"use strict";
exports.__esModule = true;
var Router = require("koa-router");
var transportDatas = [];
var router = new Router();
router.get('/', function (ctx, next) {
    ctx.render('transport/transport.html', {
        title: '赛和物流列表',
        transportDatas: transportDatas
    });
});
exports["default"] = router;
