"use strict";
exports.__esModule = true;
var Router = require("koa-router");
var api_list_1 = require("../router-api/api-list");
var router = new Router();
router.get('/', function (ctx, next) {
    ctx.render('upload/upload.html', {
        title: '文件上传',
        url: api_list_1["default"].upload
    });
});
exports["default"] = router;
