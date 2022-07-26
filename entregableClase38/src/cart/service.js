const DaoFireBaseCart = require('./dao');
const cartDao = new DaoFireBaseCart();
const transport = require('../utils/transport');

class CartService {
    constructor() {
        this.cartDao = cartDao;
    }
    async createCart() {
        const newCart = {
            timestamp: Date.now(),
            products: []
        }
        const saveCart = this.cartDao.save(newCart);
        return saveCart;
    }

    async findCart(user) {
        try {
            const cart = await this.findById(String(user.cart_Id));
            return cart;
        } catch (error) {
            console.log(error);
        }
    };

    async findById(id) {
        const result = await this.cartDao.getById(id);
        return result;
    }

    async addToCart(user, product) {
        const cart = await this.findCart(user);
        const idCart = String(user.cart_Id);
        cart.products.push(product)
        await this.cartDao.replaceById(idCart, cart);
    }

    async buy(user, cart) {

        let li = ""

        cart.products.forEach(product => {
            li = li + `<li>${product.title} </li>`
        });

        transport.sendMail({
            from: "Juan Ignacio <nachocolli1@gmail.com>",
            to: process.env.GMAIL,
            html: `<h1>List of items:</h1>
                    <ul> 
                       ${li}
                    </ul>`,
            subject: `New Purchase from user ${user.name} email:${user.username}`
        }).then((result) => {
            console.log(result);
        }).catch(console.log)

    }
}


module.exports = cartService = new CartService();