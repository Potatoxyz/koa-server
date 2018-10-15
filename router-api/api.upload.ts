import * as Router from 'koa-router';

import * as path from 'path';
import * as fs from 'fs';

import * as koaBody from 'koa-body';
const savePath=path.join(__dirname,'../public/upload');

var router=new Router();
router.post('/',koaBody({multipart:true}),(ctx,next)=>{
    let files=ctx.request.files;
    let filesArr=[];
    for(let key in files){
        let file=files[key];
        console.log(file.name)
        try{
            let reader=fs.createReadStream(file.path);
            let stream=fs.createWriteStream(savePath+`/${file.name}`,{encoding :'UTF-8'});
            reader.pipe(stream);
            filesArr.push(file.name);
        }catch (err){
            console.log(err)
        }
    }
    ctx.body=filesArr;
});
export default router;