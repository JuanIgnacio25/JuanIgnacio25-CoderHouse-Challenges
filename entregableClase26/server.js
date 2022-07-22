const express = require('express');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const session = require('express-session')
const passport = require('./passport');
const advanceOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
    })
);

app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://Juanignacio:juanignacio21@cluster0.xkudr.mongodb.net/?retryWrites=true&w=majority`,
        mongoOptions: advanceOptions
    }),
    secret: 'secreto',
    resave: true,
    rolling:true,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
})) 

app.use(passport.initialize());
app.use(passport.session());

app.set('views', './public/hbs_views');
app.set('view engine', 'hbs');

app.get('/loged', (req,res) => {
    res.render('loged',{userName: req.session.userName});
})

app.get('/', (req,res) => {
    res.render('signUp');
});
app.post('/register',passport.authenticate('registro',{failureRedirect:'/error_registro'}),(req,res) => {
    res.redirect('/login');
});
app.get('/error_registro',(req,res) => {

});

app.listen(8080, () => {
    console.log('Listen on Port 8080');
});