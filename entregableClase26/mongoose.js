const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: { type: String },
        password: { type: String }
    }
)

const users = mongoose.model('usuario', userSchema);

const connection= `mongodb+srv://Juanignacio:juanignacio21@cluster0.xkudr.mongodb.net/?retryWrites=true&w=majority`

class MongoUser{
    constructor(){
            this.connection= connection
            this.model= users
    }
    mongoConnected() {
    mongoose.connect(this.connection, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }
    async addUser(user) {
        try {
            this.mongoConnected()
            const saveNew = this.model(user);
            await saveNew.save()
        }
        catch (err) {
            console.log(err)
        }
    }
    async findUser(username) {
        try {
            this.mongoConnected()
            const filterUser = this.model.find({username:username})
            return filterUser
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = MongoUser