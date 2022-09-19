const router = require('express').Router();
const {productsController} = require('./controller');
const {checkLogin} = require('../middlewares/checkLogin')

router.get('/',checkLogin,productsController.renderHome);

module.exports = router;