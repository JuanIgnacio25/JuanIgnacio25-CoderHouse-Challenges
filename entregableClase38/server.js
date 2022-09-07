require('dotenv').config();

const express = require('express');
const session = require('express-session');
const {engine} = require('express-handlebars');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const sessionOptions = require('./src/utils/session_options');
const engine_options = require('./src/utils/engine_hbs');
const logger = require('./src/utils/winston');
const productsRouter = require('./src/products/router');
const sessionRouter = require('./src/session/router');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(compression());
app.use(session(sessionOptions));
app.use(logger.info);

app.engine('hbs',engine(engine_options));

app.set('views', './public/hbs_views');
app.set('view engine', 'hbs');


app.use('/', productsRouter);
app.use('/session',sessionRouter);

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Listen at port ${port}`);
});

