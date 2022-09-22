const MongoStore = require('connect-mongo');

const options = {
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: { useNewUrlParser: true , useUnifiedTopology: true }
    }),
    secret: process.env.SECRET,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: { maxAge: 600000 }
}

module.exports = options;