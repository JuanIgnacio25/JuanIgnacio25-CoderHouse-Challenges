require('dotenv').config();

const express = require('express');
const session = require('express-session');
const {engine} = require('express-handlebars');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const sessionOptions = require('./src/utils/session_options');
const engine_options = require('./src/utils/engine_hbs');
const passport = require('passport');
const logger = require('./src/middlewares/logger');
const productsRouter = require('./src/products/router');
const sessionRouter = require('./src/session/router');
const cartRouter = require('./src/cart/router');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(compression());
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger.info);

app.engine('hbs',engine(engine_options));

app.set('views', './public/hbs_views');
app.set('view engine', 'hbs');

app.use('/api/cart',cartRouter);
app.use('/api/products', productsRouter);
app.use('/',sessionRouter);

app.use(logger.errorRoute);
app.use(logger.catchError);

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

