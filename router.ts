import * as Router from 'koa-router';
import {productApi,uploadApi} from './router-api';
import {uploadView} from './router-views';
var router = new Router();
router.get('/', (ctx, next) => {
    ctx.body = 'welcome to index';
});
//api router config
router.use('/api/product',productApi.routes());
router.use('/api/upload',uploadApi.routes());

//views router config
router.use('/views/upload',uploadView.routes());

export default router;
