const DaoFireBaseProducts = require('./dao');
const producsDao = new DaoFireBaseProducts();
const sessionService = require('../session/service');

const getAllProducts = async () => {
    try {
        const result = await producsDao.getAll();
        return result;
    } catch (error) {
        console.log(error);
    }
}

const findUser = async(username) => {
    const result = await sessionService.findUser(username);
    return result[0];
}

const getByTitle = async(title) => {
    const result = await producsDao.getByTitle(title);
    return result[0];
}

module.exports = { productService:{getAllProducts,findUser,getByTitle} };