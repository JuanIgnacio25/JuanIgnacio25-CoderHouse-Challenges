const {DaoFireBaseProducts} = require('./daos/daoFireBase');
const {Ej} = require('./daos/Ej');

class DaoFactory {
    getDao(type) {
        if (type === 'firebase') { return DaoFireBaseProducts.getInstance() }
        else if (type === 'otro') { return Ej.getInstance() }
        else { console.error('error al conectar repositorio') }

    }
}

module.exports = {
    DaoFactory
}