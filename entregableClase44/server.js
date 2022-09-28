const express = require('express');
const {router:productRouter} = require('./products/router');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRouter);


app.listen(8080, () => {
    console.log(`Listening on port 8080`);
});

module.exports = {
    app
}
