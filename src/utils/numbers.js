// Todas las funciones relacionadas con numeros.

/**
 * Genera un número aleatorio entre 0 y el límite
 *
 * @param { number } limit Número máximo de aleatoreidad
 *
 * @return { number }
 */
const randomWithLimit = (limit) => Math.floor(Math.random() * limit);

/**
 * Restringe a 2 decimales y coloca un separador de miles
 *
 * @param { number } num
 *
 * @return { string }
 */
const decimalFix = (num) => (Math.round(num * 100) / 100).toLocaleString();

/**
 * Formatea un número y lo pone bonito
 *
 * @param { number } formattingNumber
 *
 * @return { number }
 */
const formatNumber = (formattingNumber) => new Intl.NumberFormat().format(formattingNumber);

module.exports = { randomWithLimit, decimalFix, formatNumber };
