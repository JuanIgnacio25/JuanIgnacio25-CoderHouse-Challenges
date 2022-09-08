const router = require('express').Router();
const {productsController} = require('./controller');

router.get('/', productsController.renderHome);

module.exports = router;