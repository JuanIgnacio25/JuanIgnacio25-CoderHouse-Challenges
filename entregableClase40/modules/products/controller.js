const productService = require('./service');

const renderHome = async(req,res) => {
    const products = await productService.getAllProducts();
    const data = await productService.findUser(req.session.passport.user);
    const {username , name , address , age , phone_number} = data;
    res.render('home',{username , name , address , age , phone_number,products: products});
}

const renderFormProduct = async(req,res) => {
    res.render('addproduct');
}

const saveProduct = async(req,res) => {
    const newProduct = req.body;
    const savedProduct = await productService.saveProduct(newProduct);
    console.log(savedProduct);
    res.redirect('/login');
}

module.exports = {productsController:{renderHome,renderFormProduct,saveProduct}};