const DaoFireBaseProducts = require('./dao');
const producsDao = new DaoFireBaseProducts();


const getAllProducts = async () => {
    try {
        const result = await producsDao.getAll();
        return result;
    } catch (error) {
        console.log(error);
    }

}

module.exports = { getAllProducts };