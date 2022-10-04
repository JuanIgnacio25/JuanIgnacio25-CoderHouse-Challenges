const {ProductService} = require('./service');
const productService = new ProductService();

class ProductController {

    async getProducts(ctx) {
        try {
            const { id }  = ctx.request.params
            const products = await productService.findProducts(id);
            if((typeof products) === 'string'){
                ctx.status = 404;
                ctx.body = products;
            }
            ctx.body = products;
        } catch (error) {
            console.log(error);
        }
    }

    async saveProduct(ctx) {
        try {
            const {nombre,precio,imagen} = ctx.request.body;
            const product = {nombre,precio,imagen};
            const save = await productService.saveProduct(product);
            ctx.status = 201;
            ctx.body = save;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(ctx) {
        try {
            const {id} = ctx.request.params;
            const deleteProd = await productService.deleteProduct(id);
            if((typeof deleteProd) === 'string'){
                ctx.status = 404;
                ctx.body = deleteProd;
            }
            ctx.body = deleteProd;
        } catch (error) {
            console.log(error);
        }
    }

    async modifyProduct (ctx) {
        try {
            const {id} = ctx.request.params;
            const {nombre,precio,imagen} = ctx.request.body;
            const product = {nombre,precio,imagen};
            const modifiedProduct = await productService.modifyProduct(id,product);
            if((typeof modifiedProduct) === 'string'){
                ctx.status = 404;
                ctx.body = modifiedProduct;
            }
            ctx.body = modifiedProduct;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    ProductController
}