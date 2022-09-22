const FireBaseContainer = require('../../../../configs/FireBase');
let instance = null;

class DaoCartFireBase extends FireBaseContainer {
    constructor() {
        super('carts')
    }

    static getInstance() {
        if (!instance) instance = new DaoCartFireBase();
        return instance;
    }

    async save(cart) {
        try {
            const idCart = String(cart.id);
            const cartToSave = this.collection.doc(idCart);
            await cartToSave.create(cart);
            return idCart;
        }
        catch (error) {
            console.log("error al guardar): ", error);
        }

    }

    async getAll() {
        try {
            const carts = await this.collection.get();
            return carts.docs.map(doc => doc.data());
        } catch (error) {
            console.log(error);
        }

    }

    async getById(id) {
        try {
            const doc = await this.collection.doc(id).get();
            return doc.data();
        }
        catch (error) {
            console.log("error al buscar por id: ", error);
        }
    }

    async replaceById(id, data) {
        try {
            const result = await this.collection.doc(id).update(data);
            return result;
        }
        catch (error) {
            console.log("error al reemplazar datos: ", error);
            return null;
        }
    }
}

module.exports = {
    DaoCartFireBase
}