const axios = require('axios');
const cheerio = require('cheerio');
const { formatNumber } = require('../utils/numbers');

/**
 * Obtiene las tasas de los dólares
 *
 * @return { Array<number> }
 */
const getExchangeRates = async (useRegex = false) => {
  const list = [];
  const regexTitles = new RegExp(/(dolar\s{0,}today|bcv|airtm|binance)/, 'gi');

  await axios.get(`https://monitordolarvenezuela.com/`).then((dolar) => {
    let $ = cheerio.load(dolar.data);

    //MonitorDolar nunca ganará
    $('h3').each((index, el) => {
      let title = $(el).first().text();
      let price = $(el).first().next().next().next().text();
     
      let shouldPush = true;

      price = price.replace(/\S{1,}\s=\s{1,}/i, '');
      price = price.replace(/\./g, '').replace(',', '.');

      title = title.replace('@','');
      
      if (useRegex && !regexTitles.test(title)) {
        shouldPush = false
      }

      // Guarda el "valor" convertido para realizar operaciones matemáticas
      if (price && !isNaN(price) && shouldPush) {
        list.push({ title, rate: formatNumber(Number(price)), value: price, nationalCurrency: 'VED' })
      };
    });
  });

  return list;
};

module.exports = { getExchangeRates };
