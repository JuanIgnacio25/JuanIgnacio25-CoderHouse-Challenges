const {ProductService} = require('./service');
const productService = new ProductService();

class ProductController {

    async getProducts(req, res) {
        try {
            const id = req.params.id;
            const products = await productService.findProducts(id);
            res.send(products);
        } catch (error) {
            console.log(error);
        }
    }

    async saveProduct(req, res) {
        try {
            const save = await productService.saveProduct(req.body);
            res.send(save);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(req, res) {
        try {
            const id = req.params.id;
            const deleteProd = await productService.deleteProduct(id);
            res.send(deleteProd);
        } catch (error) {
            console.log(error);
        }
    }

    async modifyProduct (req, res) {
        try {
            const id = req.params.id;
            const modifiedProduct = await productService.modifyProduct(id,req.body);
            res.send(modifiedProduct);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    ProductController
}