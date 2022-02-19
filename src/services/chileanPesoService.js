const axios = require('axios');
const { formatNumber } = require('../utils/numbers');

/**
 * Obtiene las tasas de los pesos chiles (CLP)
 *
 * @return { Array<number> }
 */
const getExchangeRates = async () => {
  const list = [];

  await axios.get(`https://mindicador.cl/api`).then((response) => {
    const clpExchangeRate = response.data.dolar.valor ?? 0;
    const title = 'API chileca';

    if (!isNaN(clpExchangeRate)) list.push({ title, rate: formatNumber(Number(clpExchangeRate)), value: clpExchangeRate, nationalCurrency: 'CLP' });
  });

  return list;
};

module.exports = { getExchangeRates };
