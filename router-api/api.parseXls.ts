import xlsx from 'node-xlsx';
var path=require('path');
var _=require('../public/underscore.min.js');
const filepath=path.resolve(__dirname,'../public/test.xls');
const workSheetsFromFile = xlsx.parse(filepath);
console.log(workSheetsFromFile);
let Sheet1:any=workSheetsFromFile[0];
Sheet1.data.forEach(value => {
    console.log(value)
});

// [ { name: 'Sheet1', data: [ [Array], [Array], [Array] ] } ]
//     [ '物流名', '价格', '运费' ]
//     [ '平邮', 13, 10 ]
//     [ '挂号', 11, 5 ]

