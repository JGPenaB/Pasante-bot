//const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const { formatNumber } = require('../utils/numbers');

/**
 * Obtiene las tasas de los dólares
 *
 * @return { Array<number> }
 */
const getExchangeRates = async (useRegex = false) => {
  const list = [];
  const regexTitles = new RegExp(/(dolar\s{0,}today|bcv|airtm|binance)/, 'gi');

  //MonitorDolar nunca ganará
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://monitordolarvenezuela.com/');
  await page.waitForSelector('h3', { timeout: 5000 });

  const body = await page.evaluate(() => {
    return document.querySelector('html').innerHTML;
  });

  let $ = cheerio.load(body);

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

  return list;
};

module.exports = { getExchangeRates };
