const router = require('koa-router');
const productRouter = new router({ prefix : '/products'});
const {ProductController} = require('./controller');
const productController = new ProductController();


productRouter.get('/:id?',productController.getProducts)

productRouter.delete('/:id',productController.deleteProduct);

productRouter.post('/',productController.saveProduct);

productRouter.put('/:id',productController.modifyProduct);

module.exports = {
    productRouter
}