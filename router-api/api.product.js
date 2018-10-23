"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require("koa-router");
var Product = require('../data/product.json');
var router = new Router();
router.get('/', function (ctx, next) {
    ctx.body = Product;
});
exports.default = router;
