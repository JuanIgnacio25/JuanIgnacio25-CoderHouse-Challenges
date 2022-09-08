const router = require('express').Router();
const {cartController} = require('./controller');

router.get('/',cartController.renderCart);

module.exports = router;
