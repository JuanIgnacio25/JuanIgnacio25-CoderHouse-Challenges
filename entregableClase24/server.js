const express = require('express');
const cookieParser = require('cookie-parser');
const { engine } = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();

app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
    })
);

app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://Juanignacio:juanignacio21@cluster0.xkudr.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
    }),
    secret: 'JuanIgnacio',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('views', './public/hbs_views');
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
    res.render('form');
});

app.post('/formulario', (req, res) => {
    const username = req.body.userName;
    req.session.userName = username;
    const session = req.session;
    res.render('loged', session)
});

app.get('/logOut', (req, res) => {
    const session = req.session
    req.session.destroy((err)=>{
        console.log(err)
        res.render('logout',session)
    });   
});



app.listen(8080, () => {
    console.log('Server listening on port 8080')
});