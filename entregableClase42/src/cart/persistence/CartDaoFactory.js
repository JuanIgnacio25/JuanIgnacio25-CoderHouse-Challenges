const {DaoCartFireBase} = require('./daos/CartDaoFirebase');
const Ej = require('./daos/EjDao');
const minimist = require('minimist');


class CartDaoFactory{

    getDao(type) {
        if (type === 'firebase') { return DaoCartFireBase.getInstance() }
        else if (type === 'otro') { return Ej.getInstance() }
        else { console.error('error al conectar repositorio') }
    }
}

module.exports = {
    CartDaoFactory
}

