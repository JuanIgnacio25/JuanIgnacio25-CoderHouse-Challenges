const express = require('express');
const {productRouter} = require('./products/routes/productRouter');
const {graphqlRouter} = require('./products/graphQL/routes_graphql/graphqlRouter')


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(graphqlRouter);
app.use('/api/products', productRouter);


app.listen(8080, () => {
    console.log(`Listening on port 8080`);
});

module.exports = {
    app
}
