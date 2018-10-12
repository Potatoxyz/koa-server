"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require("koa-router");
var path = require("path");
var savePath = path.join(__dirname, '../public/upload');
var router = new Router();
router.post('/', function (ctx, next) {
    var files = ctx.request.body.files;
    console.log(files);
});
exports.default = router;
