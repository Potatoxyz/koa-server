import * as Mock from 'mockjs';
import * as fs from 'fs';
import * as path from 'path';

const Random = Mock.Random;
const filePath = path.resolve(__dirname, '../data/product.json');
const dir = path.resolve(__dirname, '../data');
var products = Mock.mock(
    {
        'content|20': [
            {
                'id|+1': 1,
                'productId|+1': 1,
                'Sku': () => Random.string(8),
                'weight|20-100': 1,
                'time': () => Random.datetime('yyyy-MM-dd HH:mm:ss'),
                'operator': () => Random.cname()
            }
        ],
    }
);
var createFile = (data) => {
    return new Promise((resolve, reject) => {
        fs.access(filePath, (err) => {
            if (err) {
                fs.writeFile(filePath, JSON.stringify(data), err => {
                    resolve();
                });
            }
        });
    })
};
var createDir = () => {
    return new Promise((resolve, reject) => {
        fs.access(dir, (err) => {
            if (err) {
                fs.mkdir(dir, err => {
                    console.log('mkdir')
                    resolve();
                });
                return;
            }
            resolve();
        });
    })
};
createDir().then(resolve=>{
    createFile(products.content);
});