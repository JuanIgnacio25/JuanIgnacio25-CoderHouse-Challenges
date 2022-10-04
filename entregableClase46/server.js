const koa = require('koa');
const koaBody = require('koa-body');
const { productRouter } = require('./products/router');


const app = new koa();

app.use(koaBody());

app.use(productRouter.routes());


app.listen(8080, () => {
    console.log(`Listening on port 8080`);
});

module.exports = {
    app
}

