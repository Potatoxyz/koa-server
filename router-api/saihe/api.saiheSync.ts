import * as Router from 'koa-router';
var router=new Router();
import * as koaBody from 'koa-body';
import transportDetail from "../../puppeteer/saihe-logistic-detail";

router.post('/',koaBody(),async (ctx,next)=>{
    console.log(ctx.request.body);
    let transportId=+ctx.request.body.transportId||null;
    ctx.body=await transportDetail(transportId);
});
export default router;