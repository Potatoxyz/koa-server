"use strict";
exports.__esModule = true;
var Router = require("koa-router");
var path = require("path");
var fs = require("fs");
var koaBody = require("koa-body");
var savePath = path.join(__dirname, '../public/upload');
var router = new Router();
router.post('/', koaBody({ multipart: true }), function (ctx, next) {
    var files = ctx.request.files;
    var filesArr = [];
    for (var key in files) {
        var file = files[key];
        console.log(file.name);
        try {
            var reader = fs.createReadStream(file.path);
            var stream = fs.createWriteStream(savePath + ("/" + file.name), { encoding: 'UTF-8' });
            reader.pipe(stream);
            filesArr.push(file.name);
        }
        catch (err) {
            console.log(err);
        }
    }
    ctx.body = filesArr;
});
exports["default"] = router;
