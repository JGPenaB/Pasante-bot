const axios = require("axios");
const cheerio = require("cheerio");

/**
 * Formatea un número y lo pone bonito
 * 
 * @param { number } formattingNumber
 * 
 * @return { number }
 */
const formatNumber = (formattingNumber) => {
    return new Intl.NumberFormat().format(formattingNumber);
};

/**
 * Obtiene las tasas de los dólares
 * 
 * @return { Array<number> }
 */
const getExchangeRates = async () => {
    const list = [];

    await axios.get(`https://monitordolarvenezuela.com`).then((dolar) => {

        let $ = cheerio.load(dolar.data);

        $(".box-prices").each((index, el) => {
            let title = $("div", el).first().text();
            let price = $("div", el).first().next().text();
            price = (price.replace(/\./g,"")).replace(",",".");

            //Guarda el "valor" convertido para realizar operaciones matemáticas
            list.push({title, rate: formatNumber(Number(price)), value: price});
            console.log(price);
        });

    });
    
    return list;
}

module.exports = { getExchangeRates, formatNumber };