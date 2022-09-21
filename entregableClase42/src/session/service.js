const DaoSessionMongoDb = require('./dao');
const sessionDao = new DaoSessionMongoDb();
const transport = require('../utils/transport');
const cartService = require('../cart/service');

class SessionService {
    constructor() {
        this.sessionDao = sessionDao;
        this.cartService = cartService;
    }

    async updateRegisteredUser(username, info) {
        try {
            const idCart = await this.cartService.createCart();
            info.cart_Id = idCart;
            await this.sessionDao.updateUser(username, info)
            const user = (await this.sessionDao.findUser(username))[0];
            transport.sendMail({
                from: "Juan Ignacio <nachocolli1@gmail.com>",
                to: process.env.GMAIL,
                html: `<h1>Datos del nuevo usuario</h1>
                      <p>Email: ${user.username}</p>
                      <p>Nombre: ${user.name}</p>
                      <p>Dirección: ${user.address}</p>
                      <p>Edad: ${user.age}</p>
                      <p>Teléfono: ${user.phone_number}</p>`,
                subject: "Nuevo Usuario Creado!"
            }).then((result) => {
                console.log(result);
            }).catch(console.log)

            return user;
        } catch (error) {
            console.log(error);
        }
    }

    async findUser(username) {
        const result = await this.sessionDao.findUser(username);
        return result;
    }

    async addUser(user) {
        const result = await this.sessionDao.addUser(user);
        return result;
    }
}




module.exports = sessionService = new SessionService();