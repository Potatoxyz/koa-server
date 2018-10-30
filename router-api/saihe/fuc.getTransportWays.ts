var fs = require('fs');
export default async (filePath,pageSize,pageIndex)=>{
    await new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                reject('查询出错');
                return;
            }
            let dataSource = JSON.parse(data);
            // let len = dataSource.length;
            // let totalPage = Math.floor(len / pageSize);
            let startIndex = pageSize * pageIndex;
            resolve(dataSource.slice(startIndex, startIndex + pageSize));
        });
    })
}