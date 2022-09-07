const FireBaseContainer = require('../persistence/containers/FireBase');

class DaoFireBaseProducts extends FireBaseContainer {
    constructor() {
        super('products')
    }

    async getAll() {
        const products = await this.collection.get();
        return products.docs.map(doc => doc.data());
    }
}

module.exports = DaoFireBaseProducts
