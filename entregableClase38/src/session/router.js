const router = require('express').Router();
const upload = require('../utils/multer');
const passport = require('./middlewares/passport');
const {registerUser} = require('./controller');

router.post('/',upload.single('file'),passport.authenticate('signIn', { failureRedirect: '/error_signIn', failureMessage: true }),registerUser);

module.exports = router;