import * as Router from 'koa-router';
import {productApi,uploadApi,transportApi,transportWays} from './router-api';
import {uploadView,transportView} from './router-views';
var router = new Router();
router.get('/', (ctx, next) => {
    ctx.redirect('/views/transport');
    // ctx.body = 'welcome to index';
});
//api router config
router.use('/api/product',productApi.routes());
router.use('/api/upload',uploadApi.routes());
router.use('/api/saiheSync',transportApi.routes());
router.use('/api/saiheTransportWays',transportWays.routes());

//views router config

// view.upload.html
router.use('/views/upload',uploadView.routes());
// view.transport.html
router.use('/views/transport',transportView.routes());

export default router;
