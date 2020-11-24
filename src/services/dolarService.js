const axios = require("axios");
const cheerio = require("cheerio");

Number.prototype.moneda = function () {
    const re = "\\d(?=(\\d{3})+\\D)",
    num = this.toFixed(Math.max(2));
    return (num.replace(".", ",")).replace(new RegExp(re, "g"), "$&.")
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
            list.push({title, "rate": Number(price).moneda(), "value": price});
            console.log(price);
        });

    });
    
    return list;
}

module.exports = {getExchangeRates};