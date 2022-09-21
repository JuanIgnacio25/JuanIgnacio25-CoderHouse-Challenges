const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const sessionService = require('../service');
 

passport.use('signIn', new LocalStrategy(async (username, password,callback) => {
    const userReg = await sessionService.findUser(username);
    if (userReg.length > 0) {
        return callback(null, false, { message: 'el usuario ya existe' });
    }
    const passHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUser = { username, password: passHash }
    await sessionService.addUser(newUser)
    callback(null, newUser)
}))

passport.use('auth', new LocalStrategy(async (username, password, callback) => {
    const userLogArray = await sessionService.findUser(username);
    const userLog = userLogArray[0];
    if (!userLog || !bcrypt.compareSync(password, userLog.password)) return callback(null,false,{message: 'Usuario inexistente'});
    callback(null, userLog);
}));


passport.serializeUser((user, callback) => {
    callback(null, user.username)
});

passport.deserializeUser(async (username, callback) => {
    const user = await sessionService.findUser(username);
    callback(null, user)
});

module.exports = passport;