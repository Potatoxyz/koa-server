import * as  Koa from 'koa';
import * as logger from 'koa-logger';

import * as koaStatic from 'koa-static';
import * as path from 'path';
import router from './router';
const render = require('koa-art-template');
var app=module.exports=new Koa();

render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});

app.use(logger());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(koaStatic(__dirname+'/views'));
app.use(koaStatic(__dirname+'/public'));

app.listen(3000);
console.log('app start on port 3000');