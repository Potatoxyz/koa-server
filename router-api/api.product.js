"use strict";
exports.__esModule = true;
var Router = require("koa-router");
var Product = require('../data/product.json');
var router = new Router();
router.get('/', function (ctx, next) {
    ctx.body = Product;
});
exports["default"] = router;
