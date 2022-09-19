const  sessionService  = require('./service');


const registerUser = async (req, res) => {
    const info = {
        name: req.body.name,
        address: req.body.address,
        number: req.body.phone,
        age: req.body.age
    }
    await sessionService.updateRegisteredUser(req.body.username, info);
    res.redirect('/api/products');
}

const authUser = (req, res) => {
    res.redirect('/api/products')
}

const renderRegister = (req, res) => {
    res.render('signin');
}

const renderLogin = (req, res) => {
    res.render('login');
};

const renderError = (req,res) => {
    res.render('error');
};

const logOut = (req, res, next) => {
    req.session.destroy((error) => {
        if (error) return next(error)
    })
    res.redirect('/login');
}

module.exports = { sessionController: { registerUser, renderRegister, renderLogin, authUser, logOut,renderError } };