const { DaoFactory } = require('./ProductDaoFactory');
const { Product } = require('../product');
const minimist = require('minimist');

const argType = minimist(process.argv.slice(2), { alias: { 'tp': 'type_product' }, default: { 'type_product': 'firebase' } });
const type = argType.type_product;
console.log(type);

const FactoryDao = new DaoFactory().getDao(type);

class ProductsRepository {
    constructor() {
        this.dao = FactoryDao;
    }

    async createId() {
        try {
            let id = 1
            const array = await this.getAll();
            if (array.length > 0) {
                const i = array.length - 1
                id = (array[i].id) + 1
            }
            return id;
        } catch (error) {
        }
    }

    async getAll() {
        try {
            const dto = await this.dao.getAll();
            const products = Product.productsFromDto(dto);
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    async getByTitle(title) {
        const product = await this.dao.getByTitle(title);
        return product;
    }

    async save(newProduct) {
        const { title, price, code, description, stock, thumbnail } = newProduct;
        const id = await this.createId();
        const product = new Product(id, title, price, code, description, stock, thumbnail);
        const dto = product.productsToDto();
        const result = await this.dao.save(dto);
        return result
    }

}

module.exports = {
    ProductsRepository
}
