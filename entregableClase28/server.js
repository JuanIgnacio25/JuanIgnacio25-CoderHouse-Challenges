require('dotenv').config();

const minimist = require("minimist");
const args = minimist(process.argv, {alias: {"p": "port"}});

const { fork } = require ("child_process");

const express = require('express');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const session = require('express-session')
const passport = require('./passport');
const advanceOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
        mongoUrl: process.env.mongoUrl,
        mongoOptions: advanceOptions
    }),
    secret: process.env.secret,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}))

app.use(passport.initialize());
app.use(passport.session());

app.set('views', './public/hbs_views');
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
    res.render('signUp');
});
app.post('/register', passport.authenticate('registro', { failureRedirect: '/error_register', failureMessage: true }), (req, res) => {   
    res.redirect('/registered');
});

app.get('/registered', (_,res) => {
    res.render('registered');
});


app.get('/login', (req, res) => {
    res.render('logIn')
});
app.post('/login' ,passport.authenticate('auth',{ failureRedirect: '/error_login', failureMessage: true }), (req,res) => {
    res.render('loged');
});

app.get('/error_register', (req, res) => {
    res.render('errorSignUp')
});
app.get('/error_login', (req,res) => {
    res.render('errorLogIn');
});
app.get('/logout',(req,res,next) => {
    req.logout((err) => {
      if (err) return next(err);
    })
    res.render("logout");
})

app.get("/info", ( req, res ) => {
    const info= {
        args: args,
        sistema:process.platform,
        nodeVersion: process.version,
        memory: process.memoryUsage.rss(),
        path: process.cwd(),
        processId:process.pid,
        file:__dirname
    }
    info.keys= Object.keys(info.args)
    res.render("info", {info:info})
})

app.get("/api/random/:num?", ( req, res ) => {
    const num = req.query.num || "100000000";
  
    const calcFork = fork("./fork")
    calcFork.send(num)
    calcFork.on("message", (numbers) => {
        res.send(numbers)
    })
  })

app.use((error, req, res, next) => {
    res.status(500).send(error.message);
  });

app.listen(args.port || 8080, () => {
    console.log('Server listening on Port: ', args.port || 8080);
});