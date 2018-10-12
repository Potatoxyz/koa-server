import * as Router from 'koa-router';
var Product=require('../data/product.json');
var router=new Router();
router.get('/',(ctx,next)=>{
   ctx.body=Product;
});
export default router;