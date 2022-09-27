const router = require('express').Router();
const {ProductController} = require('./controller');
const productController = new ProductController();

router.get('/:id?',productController.getProducts)

router.delete('/:id',productController.deleteProduct);

router.post('/',productController.saveProduct);

router.put('/:id',productController.modifyProduct);

module.exports = {
    router
}