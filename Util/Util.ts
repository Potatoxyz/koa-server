import * as fs from 'fs';
import * as path from 'path';

var dir = path.resolve(__dirname, '../data');
var createDir = () => {
    return new Promise((resolve, reject) => {
        fs.access(dir, (err) => {
            if (err) {
                fs.mkdir(dir, err => {
                    console.log('mkdir');
                    resolve();
                });
                return;
            }
            resolve();
        });
    })
};
var createFile = (data, fileName) => {
    createDir().then(re => {
        let filePath = dir + '\\' + fileName;
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, JSON.stringify(data), err => {
                console.log("文件写入成功  " + filePath);
                resolve();
            });
        })
    }, rej => {
        console.log('创建文件夹失败!');
    });
};


export {createFile}