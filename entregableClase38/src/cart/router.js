const router = require('express').Router();
const { cartController } = require('./controller');

router.get('/', cartController.renderCart);

router.post('/', cartController.addProductToCart);
router.delete('/delete',cartController.removeProductFromCart);
router.post('/buy',cartController.requestOrder);

module.exports = router;
