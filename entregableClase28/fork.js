const {numerosAleatorios} = require("./randomNumbers");

process.on("message", (msg) => {
    const num = parseInt(msg)
    const numbers = numerosAleatorios(num);
    process.send(numbers)
})