const FireBaseContainer = require('../persistence/containers/FireBase');

class DaoFireBaseProducts extends FireBaseContainer {
    constructor() {
        super('products')
        this.id = 1
    }

    async getAll() {
        try {
            const products = await this.collection.get();
            return products.docs.map(doc => doc.data());
        } catch (error) {
            console.log(error);
        }

    }

    async save(product) {
        try {
            const idProduct = JSON.stringify(this.id);
            this.id++
            try {
                const productToSave = this.collection.doc(idProduct);
                await productToSave.create(product);
                return idDoc;
            }
            catch (error) {
                console.log("el error al guardar fue: ", error);
            }
        }
        catch (error) {
            console.log("error en Save): ", error);
        }
    }


    async replaceById(idSearch, data) {
        try {
            const result = await this.collection.doc(idSearch).update(data);
            return result;
        }
        catch (error) {
            console.log("error al reemplazar datos: ", error);
            return null;
        }
    }

    async getById(idSearch) {
        try {
            const doc = await this.collection.doc(idSearch).get();
            return doc.data();
        }
        catch (error) {
            console.log("error al buscar por id: ", error);
        }
    }

    async getByTitle(title){
        try {
            const products = await this.collection.where('title','==',`${title}`).get();
            return products.docs.map(doc => doc.data());

        } catch (error) {
            console.log(error);
        }
    }


    async deleteById(idSearch) {
        try {
            const doc = await this.collection.doc(idSearch).get();
            if (doc.data()) {
                const result = await this.collection.doc(idSearch).delete();
                return result;
            }
            else return null;
        }
        catch (error) {
            console.log("error en deleteById): ", error);
        }
    }
}

module.exports = DaoFireBaseProducts
