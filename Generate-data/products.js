"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mock = require("mockjs");
var fs = require("fs");
var path = require("path");
var Random = Mock.Random;
var filePath = path.resolve(__dirname, '../data/product.json');
var dir = path.resolve(__dirname, '../data');
var products = Mock.mock({
    'content|20': [
        {
            'id|+1': 1,
            'productId|+1': 1,
            'Sku': function () { return Random.string(8); },
            'weight|20-100': 1,
            'time': function () { return Random.datetime('yyyy-MM-dd HH:mm:ss'); },
            'operator': function () { return Random.cname(); }
        }
    ],
});
var createFile = function (data) {
    return new Promise(function (resolve, reject) {
        fs.access(filePath, function (err) {
            if (err) {
                fs.writeFile(filePath, JSON.stringify(data), function (err) {
                    resolve();
                });
            }
        });
    });
};
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
createDir().then(function (resolve) {
    createFile(products.content);
});
