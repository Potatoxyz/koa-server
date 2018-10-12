import * as Router from 'koa-router';

import * as path from 'path';

const savePath=path.join(__dirname,'../public/upload');

var router=new Router();
router.post('/',(ctx,next)=>{
    let files=ctx.request.body.files;
    console.log(files);
});
export default router;