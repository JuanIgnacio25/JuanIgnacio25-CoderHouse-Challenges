const mongoose = require('mongoose');
const MongoDbContainer = require('../../configs/MongoDb');

const userSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    name: { type: String },
    address: { type: String },
    age: { type: Number },
    phone_number: { type: String },
    cart_Id: { type: Number }
});

class DaoSessionMongoDb extends MongoDbContainer {
    constructor() {
        super('users', userSchema);
    }

    async addUser(user) {
        try {
            const saveNew = this.collection(user);
            await saveNew.save();
        }
        catch (error) {
            console.log(error)
        }
    }

    async findUser(username) {
        try {
            const filterUser = this.collection.find({ username: username });
            return filterUser;
        } catch (error) {
            console.log(error)
        }
    }

    async updateUser(email, user) {
        try {
            const updateUser = this.collection.updateOne({ username: email }, { $set: { name: user.name, address: user.address, phone_number: user.number, age: user.age, cart_Id: user.cart_Id } })
            return updateUser;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DaoSessionMongoDb;