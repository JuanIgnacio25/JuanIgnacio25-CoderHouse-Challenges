class Product {
    constructor(id, title, price, code, description, stock, thumbnail) {
        this.id = id
        this.title = title
        this.price = price
        this.code = code
        this.description = description
        this.stock = stock
        this.thumbnail = thumbnail
        this.timestamp = Date.now();
    }
    static productsFromDto(dto) {
        const productos = [];

        dto.map((e) => {
            const prod = new Product(e.id, e.title, e.price, e.code, e.description, e.stock, e.thumbnail);
            productos.push(prod);
        })
        return productos
    }

    productsToDto() {
        const { id, title, price, code, description, stock, thumbnail, timestamp } = this
        return {
            id,
            title,
            price,
            code,
            description,
            stock,
            thumbnail,
            timestamp
        }
    }

}

module.exports = {
    Product
}