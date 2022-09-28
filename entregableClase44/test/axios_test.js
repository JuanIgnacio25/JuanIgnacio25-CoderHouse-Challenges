const axios = require('axios');


const obtenerProductos =async () => {
    const response =await axios.get('http://localhost:8080/api/products')
    console.log("---------------Productos---------")
    console.log(response.data)
};

const obtenerProductosConId =async () => {
    const response =await axios.get('http://localhost:8080/api/products/1')
    console.log("---------------Productos por id---------")
    console.log(response.data)
    console.log(response.config.url)
}

const guardarProductoNuevo =async () => {
    try{
    const response = await axios.post('http://localhost:8080/api/products', {
        nombre: 'pera',
        precio: 500,
        imagen:'imagen pera'
    }
    )
    console.log("---------------guardarProductos---------")
    console.log(response.data)
    console.log('status:',response.status)
}
catch(error){
    console.log(error)
}
};

const modificarProducto=async()=>{
    try{
    const response= await axios.put('http://localhost:8080/api/products/2',{
        precio:900
    })
    console.log("--------------modificarProducto-----------")
    console.log(response.data)
    console.log(response.status)
}
catch(error){
    console.log(error)
}
}

const eliminarProducto= async ()=>{
    const response =await axios.delete('http://localhost:8080/api/products/4',
    )
    console.log("------------borrarProducto------------")
    console.log(response.status, response.data)
}
const pruebasAxios=async()=>{
try{
await obtenerProductos().then(()=>console.log("finalizado, todos los productos"));

await obtenerProductosConId().then(()=>console.log("finalizado, producto por id"));

await guardarProductoNuevo().then(()=>console.log("finalizado producto guardado"));

await modificarProducto().then(()=>console.log("finalizado , producto modificado"));

await eliminarProducto().then(()=>console.log("pedido finalizado producto eliminado"))
}catch(error){
    console.log(error)
}
}
pruebasAxios()