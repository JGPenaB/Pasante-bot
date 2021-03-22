/**
 * Detiene la ejecución por el tiempo dado
 *
 * @param { int } time tiempo en milisegundos
 *
 * @return { Promise }
 */
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time))

module.exports = { sleep }
