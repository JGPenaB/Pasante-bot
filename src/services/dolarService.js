const axios = require("axios");
const cheerio = require("cheerio");

/**
 * Formatea un número y lo pone bonito
 * 
 * @param { number } formattingNumber
 * 
 * @return { number }
 */
const formatNumber = (formattingNumber) => new Intl.NumberFormat().format(formattingNumber);

/**
 * Obtiene las tasas de los dólares
 * 
 * @return { Array<number> }
 */
const getExchangeRates = async () => {
    const list = [];

    await axios.get(`https://monitordolarvenezuela.com`).then((dolar) => {

        let $ = cheerio.load(dolar.data);

        //Extrae el valor desde el CSS, ya que usan pseudo-elementos
        const regexp = /content:(\s+)\'([^\s]+)\'/g;
        const matches = [...dolar.data.matchAll(regexp)];

        $(".box-prices").each((index, el) => {
            let title = $("div", el).first().text();
            let price = matches[index][2];

            price = (price.replace(/\./g,"")).replace(",",".");

            //Guarda el "valor" convertido para realizar operaciones matemáticas
            if ( !isNaN(price) )
                list.push({title, rate: formatNumber(Number(price)), value: price});
                
        });

    });
    
    return list;
}

module.exports = { getExchangeRates, formatNumber };