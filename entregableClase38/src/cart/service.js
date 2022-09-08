const DaoFireBaseCart = require('./dao');
const cartDao = new DaoFireBaseCart();
const {sessionService} = require('../session/service');


const createCart = async () => {
    const newCart = {
        timestamp: Date.now(),
        products: []
    }
    const saveCart = cartDao.save(newCart);
    return saveCart;
}

const findCart = async (username) => {
    try {
        const user = await sessionService.findUser(username);
        console.log(user);
        const cart = await this.findById(user.cart_Id);
        return cart;
    } catch (error) {
        console.log(error);
    }
};

const findById = async (id) => {
    const result = await cartDao.getById(id);
    return result;
}

module.exports = { cartService: { createCart, findById, findCart } }