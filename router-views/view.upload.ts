import * as Router from 'koa-router';
import apiList from '../router-api/api-list';
var router=new Router();
router.get('/',(ctx,next)=>{
    ctx.render('upload/upload.html',{
        title:'文件上传',
        url:apiList.upload
    });
});
export default router;