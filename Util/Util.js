"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var dir = path.resolve(__dirname, '../data');
var createDir = function () {
    return new Promise(function (resolve, reject) {
        fs.access(dir, function (err) {
            if (err) {
                fs.mkdir(dir, function (err) {
                    console.log('mkdir');
                    resolve();
                });
                return;
            }
            resolve();
        });
    });
};
var createFile = function (data, fileName) {
    createDir().then(function (re) {
        var filePath = dir + '\\' + fileName;
        return new Promise(function (resolve, reject) {
            fs.writeFile(filePath, JSON.stringify(data), function (err) {
                console.log("文件写入成功  " + filePath);
                resolve();
            });
        });
    }, function (rej) {
        console.log('创建文件夹失败!');
    });
};
exports.createFile = createFile;
