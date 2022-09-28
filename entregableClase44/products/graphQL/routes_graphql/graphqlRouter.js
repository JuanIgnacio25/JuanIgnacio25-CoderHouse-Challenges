const fs = require('fs');
const graphqlRouter = require('express').Router();
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const path = require('path');
const { addProduct, deleteProduct, modifyProduct, getProducts } = require('../resolvers/graphqlResolver');


const schemaContenido = fs.readFileSync(path.join(__dirname, '../schemas/products.graphql')).toString();
const schema = buildSchema(schemaContenido);

const graphqlMiddleware = graphqlHTTP({
    schema,
    rootValue: {
        getProducts,
        addProduct,
        modifyProduct,
        deleteProduct
    },
    graphiql: true,
});

graphqlRouter.use('/graphql', graphqlMiddleware);

module.exports = {
    graphqlRouter
}