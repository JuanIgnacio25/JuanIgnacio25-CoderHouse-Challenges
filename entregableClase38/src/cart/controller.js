const {cartService} = require('./service');

const renderCart = async(req,res) => {
    const username = req.session.passport.user;
    const cart = await cartService.findCart(username);
    console.log(cart);
    const products = cart.products;
    res.render('cart',{products:products});
}

module.exports = {cartController:{renderCart}};