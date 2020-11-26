/**
 * Genera un número aleatorio entre 0 y el límite
 * 
 * @param { number } limit Número máximo de aleatoreidad
 * 
 * @return { number }
 */
const num = (limit) => {
    return Math.floor(Math.random() * limit)
};

module.exports = { num };