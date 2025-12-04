//const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const { formatNumber } = require('../utils/numbers');
const chromium = require('chromium');

/**
 * Obtiene las tasas de los dólares
 *
 * @return { Array<number> }
 */
const getExchangeRates = async (useRegex = false) => {
  const list = [];
  const regexTitles = new RegExp(/(dolar\s{0,}today|bcv|airtm|binance|monitor|promedio)/, 'gi');

  //MonitorDolar nunca ganará
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    executablePath: chromium.path,
    args: ["--no-sandbox", "--disabled-setupid-sandbox"]
  });
  const page = await browser.newPage();
  await page.goto('https://exchangemonitor.net/dolar-venezuela', {timeout: 60000, waitUntil: 'networkidle2'});
  await page.waitForSelector('.rate-container', { timeout: 5000 });

  const body = await page.evaluate(() => {
    return document.querySelector('html').innerHTML;
  });

  let $ = cheerio.load(body);

  //MonitorDolar perdió la batalla, hora de ver ExchangeMonitor
  $('.rate-container').each((index, el) => {

    let text = $(el).first().text().match(/\S+/gi);

    let condition = text[1] !== "VES";

    let title = `${text[0].replace(/\s+/gi, "")}${condition ? " "+text[1].replace(/\s+/gi, "") : ""}`
    let price = `${text[3 + condition]}`
    let shouldPush = true;
    price = price.replace(',', '.');
    title = title.trim();
    
    if ((useRegex && !regexTitles.test(title)) || list.length > 5) {
      shouldPush = false
    }

    // Guarda el "valor" convertido para realizar operaciones matemáticas
    if (price && !isNaN(price) && shouldPush) {
      list.push({ title, rate: formatNumber(Number(price)), value: price, nationalCurrency: 'VED' })
    };
  });

  //Closing browser
  await page.close();
  await browser.close();
  return list;
};

module.exports = { getExchangeRates };
