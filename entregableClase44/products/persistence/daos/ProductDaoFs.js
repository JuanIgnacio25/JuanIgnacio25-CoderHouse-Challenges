const {FilePersistence} = require('../fsPersistence');

class ProductDao{
    constructor(){
        this.persistence = new FilePersistence('public/products.json');
    }

    async saveProduct(newProduct){
        const productString = JSON.stringify(newProduct);
        await this.persistence.addProduct(productString);
    }

    async getProducts(){
        try {
            const products = JSON.parse(await this.persistence.seeProducts());
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    async getProductsById(id){
        try {
            const products = JSON.parse(await this.persistence.seeProducts());
            const product = products.filter((x) => x.id == id);
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(filteredProducts){
        try {
            const filteredProductsString = JSON.stringify(filteredProducts);
            await this.persistence.addProduct(filteredProductsString);
        } catch (error) {
            console.log(error);
        }
    }

    async modifyProduct(){
        try {
            
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    ProductDao
}