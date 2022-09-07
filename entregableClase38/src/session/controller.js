const {updateRegisteredUser} = require('./service');

const registerUser = async(req,res) => {
    const obj = {
        name: req.body.name,
        address: req.body.address,
        number: req.body.phone,
        age: req.body.age
    }
    await updateRegisteredUser(req.body.username,obj)
    res.send({user: user});
}

module.exports = {registerUser};