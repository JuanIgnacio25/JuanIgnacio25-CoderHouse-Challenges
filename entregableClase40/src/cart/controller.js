const cartService  = require('./service');
const sessionService = require('../session/service');
const {productService:productService} = require('../products/service');

const renderCart = async (req, res) => {
    try {
        const username = req.session.passport.user;
        const user = (await sessionService.findUser(username))[0];
        const cart = await cartService.findCart(user);
        const products = cart.products;
        res.render('cart', { products: products });
    } catch (error) {
        console.log(error);
    }

}

const addProductToCart = async(req,res) => {
    const title = req.body.title;
    const username = req.session.passport.user;
    const product = await productService.getByTitle(title);
    const user = (await sessionService.findUser(username))[0];
    await cartService.addToCart(user,product);
    res.redirect('/api/products');
};

const removeProductFromCart = async(req,res) => {

};

const requestOrder = async(req,res) => {
    const username = req.session.passport.user;
    const user = (await sessionService.findUser(username))[0];
    const cart = await cartService.findCart(user);
    await cartService.buy(user,cart);
    res.redirect('/api/products');
};

module.exports = { cartController: { renderCart , addProductToCart , removeProductFromCart, requestOrder} };