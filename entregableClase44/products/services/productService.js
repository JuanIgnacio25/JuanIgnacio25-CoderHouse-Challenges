const { ProductDao } = require('../persistence/daos/ProductDaoFs');

class ProductService {
    constructor() {
        this.dao = new ProductDao();
    };

    async createId() {
        let id = 0
        try {
            let products = await this.dao.getProducts();
            if (products.length === 0) id = 1
            else id = Number(products[products.length - 1].id) + 1;
            return id
        }
        catch (error) {
            console.log(error)
        }
    }

    async validateProduct(id) {
        try {
            const validateId = await this.dao.getProducts()
            const valid = validateId.findIndex(e => e.id == id);
            return valid

        } catch (error) {
            console.log(error)
        }
    }

    async findProducts(id) {
        try {
            if (!id) {
                const product = await this.dao.getProducts()
                return (product.length < 1) ? 'No hay productos aun' : product;
            } else {
                const product = await this.dao.getProductsById(id);
                return (product.length < 1) ? 'producto no encontrado' : product;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async saveProduct(product) {
        try {
            const id = await this.createId();
            product.id = id;
            const products = await this.dao.getProducts();
            products.push(product);
            await this.dao.saveProduct(products);
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id) {
        try {
            const i = await this.validateProduct(id);
            if (i < 0) return 'El producto no existe'
            else {
                let products = await this.dao.getProducts();
                let filteredProducts = products.filter((x) => x.id !== Number(id))
                await this.dao.deleteProduct(filteredProducts);
                return products[i];
            }
        } catch (error) {
            console.log(error);
        }
    }

    async modifyProduct(id, body) {
        try {
            let i = await this.validateProduct(id)
            if (i < 0) return "producto inexistente"
            else {
                const allProducts = await this.dao.getProducts();
                (body.nombre) ? allProducts[i].nombre = body.nombre : null;
                (body.imagen) ? allProducts[i].imagen = body.imagen : null;
                (body.precio) ? allProducts[i].precio = body.precio : null;
                await this.dao.saveProduct(allProducts);
                return allProducts[i];
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    ProductService
}