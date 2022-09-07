const {getAllProducts} = require('./service');

const showAllProducts = async(req,res) => {
    const products = await getAllProducts();
    res.send({products: products});
}

module.exports = {showAllProducts};