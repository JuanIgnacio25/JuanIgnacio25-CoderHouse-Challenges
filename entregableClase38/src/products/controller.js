const {productService} = require('./service');

const renderHome = async(req,res) => {
    const products = await productService.getAllProducts();
    const data = await productService.findUser(req.session.passport.user);
    const {username , name , address , age , phone_number} = data;
    res.render('home',{username , name , address , age , phone_number,products: products});
}

module.exports = {productsController:{renderHome}};