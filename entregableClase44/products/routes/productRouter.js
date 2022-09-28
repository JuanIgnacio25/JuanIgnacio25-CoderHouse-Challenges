const productRouter = require('express').Router();
const {ProductController} = require('../controllers/productsController');
const productController = new ProductController();

productRouter.get('/:id?',productController.getProducts)

productRouter.delete('/:id',productController.deleteProduct);

productRouter.post('/',productController.saveProduct);

productRouter.put('/:id',productController.modifyProduct);

module.exports = {
    productRouter
}