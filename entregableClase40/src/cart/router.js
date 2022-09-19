const router = require('express').Router();
const { cartController } = require('./controller');
const {checkLogin} = require('../middlewares/checkLogin');

router.get('/',checkLogin,cartController.renderCart);

router.post('/', cartController.addProductToCart);
router.delete('/delete',cartController.removeProductFromCart);
router.post('/buy',cartController.requestOrder);

module.exports = router;
