const {DaoFactory} = require('./ProductDaoFactory');
const {Product} = require('../product');
const minimist = require('minimist');

const argType = minimist(process.argv.slice(2), { alias: { 'tp': 'type_product' }, default: { 'type_product': 'firebase'} });
const type = argType.type_product;
console.log(type);

const FactoryDao =  new DaoFactory().getDao(type);

class ProductsRepository{
    constructor(){
        this.dao = FactoryDao;
    }

    async getAll(){
        const products = await this.dao.getAll();
        return products;
    }

    async getByTitle(title){
        const product = await this.dao.getByTitle(title);
        return product;
    }

}

module.exports = {
    ProductsRepository
}
