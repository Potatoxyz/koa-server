import * as Router from 'koa-router';
var router = new Router();
import * as koaBody from 'koa-body';
import * as Path from "path";
var filePath = Path.resolve(__dirname, '../../data/saihe-transport.json');
import getTransport from './fuc.getTransportWays';
router.get('/', koaBody(), async (ctx, next) => {
    let {pageSize, pageIndex} = ctx.request.query;
    pageSize = +pageSize || 5;
    pageIndex = +pageIndex || 1;
    console.log(pageSize);
    console.log(pageIndex);
    ctx.body=await getTransport(filePath,pageSize,pageIndex);
});
export default router;