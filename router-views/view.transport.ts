import * as Router from 'koa-router';
var transportDatas=require('../data/saihe-transport.json');
var router=new Router();
router.get('/',(ctx,next)=>{
    ctx.render('transport/transport.html',{
        title:'赛和物流列表',
        transportDatas:transportDatas
    });
});
export default router;