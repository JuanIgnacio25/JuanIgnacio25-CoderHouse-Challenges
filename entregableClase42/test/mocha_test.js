const { describe, it } = require('mocha');
const { expect } = require('chai');
const supertest = require('supertest');
const { app } = require('../server');


const request = supertest(app)

describe('Traer productos todos o por id', () => {
    describe("Mostrar todos los productos", () => {
        it("retornar estatus 200", async () => {
            const response = await request.get('/api/products/:id?')
            expect(response.status).to.eql(200)
        })
        it("retornar un array mayor a 0", async () => {
            const response = await request.get('/api/products')
            expect(response.body.length).greaterThan(0)
        })
    })
    describe("mostrar un producto por id", () => {
        it("retornar un producto", async () => {
            const response = await request.get('/api/products/1')
            expect(response.body[0].nombre).to.eq('Botella')
        });
        it("producto no encontrado cuando id no existe", async () => {
            const response = await request.get('/api/products/20')
            expect(response.text).to.eq('producto no encontrado')
        })
    })
})

describe("guardar producto", () => {
    it("guardar el producto enviado", async () => {
        const newProduct = { nombre: "pera", precio: 800, imagen: "imagen pera" }
        const response = await request.post('/api/products').send(newProduct)
        expect(response.body).to.include.keys("id")
        expect(response.body.nombre).to.eq(newProduct.nombre)
        expect(response.body.precio).to.eq(newProduct.precio)
        expect(response.body.imagen).to.eq(newProduct.imagen)
    })
})


describe('modificar un producto', () => {
    it("si el producto no existe", async () => {
        const response = await request.put('/api/products/20')
        expect(response.text).to.eq("producto inexistente")
    })
    it("modifica el producto si existe", async () => {
        const newProduct={precio:1500}
        const response = await request.put('/api/products/4').send(newProduct)
        expect(response.body.precio).to.eq(newProduct.precio)
    })
})

describe("eliminar un producto", () => {
    it("si no existe el id", async () => {
        const response = await request.delete('/api/products/20')
        expect(response.text).to.eq("El producto no existe")
    })
    it("elimina el producto si encuentra el id", async () => {
        const response = await request.delete("/api/products/4")
        expect(response.text).to.eq("producto con id 4 eliminado exitosamente")
    })
})