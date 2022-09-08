const router = require('express').Router();
const upload = require('../utils/multer');
const passport = require('./middlewares/passport');
const {sessionController} = require('./controller');

router.post('/signin',upload.single('file'),passport.authenticate('signIn', { failureRedirect: '/error_signIn', failureMessage: true }),sessionController.registerUser);
router.post('/login',passport.authenticate('auth', { failureRedirect: '/error', failureMessage: true }),sessionController.authUser);

router.get('/',sessionController.renderRegister);
router.get('/login',sessionController.renderLogin);
router.get('/logout',sessionController.logOut);
router.get('/error',sessionController.renderError);

module.exports = router;