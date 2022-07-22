const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const mongoUsers = require('./mongoose');

passport.use('registro', new LocalStrategy(async (username, password, callback) => {
    try {
        const userReg = await mongoUsers.findUser(username);    
        if (userReg.length > 0) { return callback()};
        const passHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const newUser = { username, password: passHash }
        await mongoUsers.addUser(newUser)
        callback(null, newUser)
    }
    catch (err) {
        console.log(err)
    }
}))

passport.use('auth', new LocalStrategy(async (username, password, callback) => {
    const userLogArray = await mongoUsers.findUser(username);
    const userLog = userLogArray[0]
    if (!userLog || !bcrypt.compareSync(password, userLog.password)) return callback();
    callback(null, userLog);
}));


passport.serializeUser((user, callback) => {
    callback(null, user.username)
});

passport.deserializeUser((username, callback) => {
    const user = mongoUsers.findUser(username);
    callback(null, user)
});

module.exports = passport;