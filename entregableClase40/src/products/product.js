class Product {
    constructor(title, price, code , description ,stock,thumbnail) {
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
            const prod = new Product(e.title,e.price,e.code,e.description,e.stock,e.thumbnail);
            productos.push(prod);
        })
        return productos
    }

    productsToDto() {
        const {title, price, code, description, stock, thumbnail, timestamp} = this
        return {
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