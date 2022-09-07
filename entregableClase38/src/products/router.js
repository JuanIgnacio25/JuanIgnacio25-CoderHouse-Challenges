const router = require('express').Router();
const {showAllProducts} = require('./controller');

router.get('/', showAllProducts);

module.exports = router;