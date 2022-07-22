const express = require('express');
const { engine } = require('express-handlebars');
const { Server: HTTPServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { faker } = require("@faker-js/faker");
const DaoFirebaseMessages = require('./src/daos/messageDaoFireBase');

const messagesList = new DaoFirebaseMessages();

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
    })
);

app.set('views', './public/hbs_views');
app.set('view engine', 'hbs');

const httpServer = new HTTPServer (app);
const io = new IOServer (httpServer);

const randomProduct = () => {
    const fakerObj = {
        name: faker.commerce.product(),
        price: faker.random.numeric(7),
        thumbnail:faker.image.abstract(200, 150, true)
    }
    return fakerObj;
}

io.on("connection", async (socket) => {
 
    socket.emit("messages", await messagesList.normalize());
    
    socket.on("new_message",async (message) => {
        await messagesList.save(message)
        const mensajesNormalizados = await messagesList.normalize();
        io.sockets.emit("messages", await messagesList.normalize())
    })

})

app.get('/api/products-test',(req,res) => {
    const products = [];
    for (let i = 0; i < 5; i++) {
        products.push(randomProduct());
    }
    res.render('products',{products:products})
})

httpServer.listen(8080, ()=> {
    console.log("Server Listening port: 8080");
})