const FireBaseContainer = require('../persistence/containers/FireBase');

class DaoFireBaseCart extends FireBaseContainer {
    constructor() {
        super('carts')
        this.id = 1
    }
    async save(cart) {
        try {
            const idCart = JSON.stringify(this.id);
            this.id++
            const cartToSave = this.collection.doc(idCart);
            await cartToSave.create(cart);
            return idCart;
        }
        catch (error) {
            console.log("error al guardar): ", error);
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

module.exports = DaoFireBaseCart;