"use strict";
exports.__esModule = true;
var node_xlsx_1 = require("node-xlsx");
var path = require('path');
var _ = require('../public/underscore.min.js');
var filepath = path.resolve(__dirname, '../public/test.xls');
var workSheetsFromFile = node_xlsx_1["default"].parse(filepath);
console.log(workSheetsFromFile);
var Sheet1 = workSheetsFromFile[0];
Sheet1.data.forEach(function (value) {
    console.log(value);
});
// [ { name: 'Sheet1', data: [ [Array], [Array], [Array] ] } ]
//     [ '物流名', '价格', '运费' ]
//     [ '平邮', 13, 10 ]
//     [ '挂号', 11, 5 ]
