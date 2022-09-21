const router = require('express').Router();
const {productsController} = require('./controller');
const {checkLogin} = require('../middlewares/checkLogin')

router.get('/',checkLogin,productsController.renderHome);
router.get('/addProduct',checkLogin,productsController.renderFormProduct);

router.post('/addProduct',productsController.saveProduct);

module.exports = router;