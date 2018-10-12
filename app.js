"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var logger = require("koa-logger");
var koaBody = require("koa-body");
var koaStatic = require("koa-static");
var path = require("path");
var router_1 = require("./router");
var render = require('koa-art-template');
var app = module.exports = new Koa();
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});
app.use(logger());
app.use(router_1.default.routes());
app.use(koaStatic(__dirname + '/views'));
app.use(koaStatic(__dirname + '/public'));
app.use(koaBody({ multipart: true }));
app.listen(3000);
console.log('app start on port 3000');
