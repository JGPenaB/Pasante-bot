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
  const regexTitles = new RegExp(/^(dolar today|airtm)$/, 'i');

  await axios.get(`https://monitordolarvenezuela.com`).then((dolar) => {
    let $ = cheerio.load(dolar.data);

    //Extrae el valor desde el CSS, ya que usan pseudo-elementos
    const regexp = /content:(\s+)\'([^\s]+)\'/g;
    const matches = [...dolar.data.matchAll(regexp)];

    $('.box-prices').each((index, el) => {
      let title = $('div', el).first().text();
      let price = matches[index][2];
      let shouldPush = true;

      price = price.replace(/\./g, '').replace(',', '.');
      
      if (useRegex && !regexTitles.test(title)) {
        shouldPush = false
      }

      // Guarda el "valor" convertido para realizar operaciones matemáticas
      if (!isNaN(price) && shouldPush) {
        list.push({ title, rate: formatNumber(Number(price)), value: price, nationalCurrency: 'VED' })
      };
    });
  });

  return list;
};

module.exports = { getExchangeRates };
