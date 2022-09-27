const fs = require('fs');

class FilePersistence{
    constructor(urlProducts) {
        this.urlProducts = urlProducts;
    }
    async addProduct(product) {
    try{
        await fs.promises.writeFile(this.urlProducts,product);
    }catch(error){
        console.log(error)
    }
    };

    async seeProducts() {
        try {
            const product = await fs.promises.readFile(this.urlProducts, 'utf-8');
            return  product;
        }
        catch (err) {
            console.log(err)
        }
    }
}

module.exports = {
    FilePersistence
}