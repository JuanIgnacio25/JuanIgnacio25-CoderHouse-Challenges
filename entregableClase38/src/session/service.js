const DaoSessionMongoDb = require('./dao');
const sessionDao = new DaoSessionMongoDb();
const transport = require('../utils/transport');

const updateRegisteredUser = async(username,user) => {
    try {
        const result = await sessionDao.updateUser(username,user)
        return result;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {sessionDao,updateRegisteredUser};