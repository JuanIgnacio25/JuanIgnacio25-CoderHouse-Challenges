const { ProductService } = require("../../services/productService");

const resolveGQL = new ProductService();

const getProducts = async (args) => {
    try {
        const { id } = args;
        return await resolveGQL.findProducts(id);

    } catch (error) {
        console.log(error)
    }
}
const addProduct = async (args) => {
    try {
        return await resolveGQL.saveProduct(args);
    } catch (error) {
        console.log(error)
    }
}


const modifyProduct = async (args) => {
    try {
        const { id, nombre, precio, imagen } = args;
        const body = { nombre, precio, imagen };
        return await resolveGQL.modifyProduct(id, body);

    } catch (error) {
        console.log(error)
    }
}

const deleteProduct = async (args) => {
    try {
        const { id } = args;
        return await resolveGQL.deleteProduct(id);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {deleteProduct,addProduct,getProducts,modifyProduct}