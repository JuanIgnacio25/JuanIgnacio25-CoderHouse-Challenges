const { ProductsRepository } = require('./persistence/ProductsRepository');
const sessionService = require('../session/service');

class ProductService {
    constructor() {
        this.producsDao = new ProductsRepository();
        this.sessionService = sessionService;
    }

    async getAllProducts() {
        try {
            const result = await this.producsDao.getAll();
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async findUser(username) {
        const result = await this.sessionService.findUser(username);
        return result[0];
    }

    async getByTitle(title) {
        const result = await this.producsDao.getByTitle(title);
        return result[0];
    }

    async saveProduct(newProduct) {
        const result = await this.producsDao.save(newProduct);
        return result;
    }
}


module.exports =  productService = new ProductService();
