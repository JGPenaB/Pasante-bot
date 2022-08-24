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

  await axios.get(`https://monitordolarvenezuela.com/inicio-amp`, 
  { headers: {
    "User-Agent": 
    "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Mobile Safari/537.36"
    }
  }).then((dolar) => {
    let $ = cheerio.load(dolar.data);

    //Extrae el valor desde la version mobile del sitio, que no la han actualizado
    $('.box-prices').each((index, el) => {
      let title = $("div", el).first().text();
      let price = $("div", el).first().next().text();
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
