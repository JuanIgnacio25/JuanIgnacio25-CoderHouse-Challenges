const numerosAleatorios = (num) => {
    const resultados = {}
    for (let i = 0; i < num; i++) {
        const numeroAleatorio = (Math.floor(Math.random() * 1000)) + 1;
        if (resultados[numeroAleatorio]) resultados[numeroAleatorio]++;
        else resultados[numeroAleatorio] = 1;
    }
    return resultados
}
module.exports = {numerosAleatorios};