require('dotenv').config();

const minimist = require("minimist");

const { fork } = require("child_process");

const express = require('express');
const compression = require('compression');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const passport = require('./passport');
const cluster = require('cluster');
const os = require('os');
const logger = require('./winston');
const numCpus = os.cpus.length;
const advanceOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const app = express();
const args = minimist(process.argv.slice(2), { alias: { 'p': 'port' }, default: { 'port': 8080, 'modo': 'FORK' } })

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.use((req,res,next)=>{
    logger.info(`ruta ${req.url}, método ${req.method}`)
    next()
})  

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

app.get('/registered', (_, res) => {
    res.render('registered');
});


app.get('/login', (req, res) => {
    res.render('logIn')
});
app.post('/login', passport.authenticate('auth', { failureRedirect: '/error_login', failureMessage: true }), (req, res) => {
    res.render('loged');
});

app.get('/error_register', (req, res) => {
    res.render('errorSignUp')
});
app.get('/error_login', (req, res) => {
    res.render('errorLogIn');
});
app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
    })
    res.render("logout");
})

app.get("/info", compression() ,(req, res) => {
    const info = {
        args: process.argv,
        system: process.platform,
        nodeVersion: process.version,
        memory: process.memoryUsage(),
        path: process.cwd(),
        processId: process.pid,
        proccessTitle: process.title,
        cpus: os.cpus().length
    }
    res.send(info);
})

app.get("/info_log", (req, res) => {
    const info = {
        args: process.argv,
        system: process.platform,
        nodeVersion: process.version,
        memory: process.memoryUsage(),
        path: process.cwd(),
        processId: process.pid,
        proccessTitle: process.title,
        cpus: os.cpus().length
    }
    console.log('test info')
    res.send(info);
})

app.get("/api/random/:num?", (req, res) => {
    const num = req.query.num || "100000000";
    const calcFork = fork("./fork")
    calcFork.send(num)
    calcFork.on("message", (numbers) => {
        res.send(numbers)
    })
})

app.use((req, res) => {
    logger.warn(`ruta ${req.url}, método ${req.method} no implementada`)
    res.status(404).send({
        error: 404,
        descripción: `ruta ${req.url}, método ${req.method} no implementada`
    })
})
app.use((error, req, res, next) => {
    logger.error(error.message)
    res.status(500).send(error.message);
});


if (args.modo == 'CLUSTER') {
    if (cluster.isPrimary) {
        for (let i = 0; i < numCpus; i++) {
            cluster.fork()
        }
    } else {
        app.listen(args.port, () => { });

    }
}
if (args.modo == 'FORK') {
    app.listen(args.port, () => {
        console.log(`Escuchando en el puerto ${args.port}`);
    });
}