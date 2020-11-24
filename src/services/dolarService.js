const axios = require("axios");
const cheerio = require("cheerio");

Number.prototype.moneda = function () {
    const re = "\\d(?=(\\d{3})+\\D)",
    num = this.toFixed(Math.max(2));
    return (num.replace(".", ",")).replace(new RegExp(re, "g"), "$&.")
};

/**
 * Servicio de Dólar paralelo. Devuelve un array con los precios de cada tasa de cambio disponible
 */
async function dolarService(){
    var list = [];

    await axios.get(`https://monitordolarvenezuela.com`).then((dolar) => {

        let $ = cheerio.load(dolar.data);

        $(".box-prices").each((index, el) => {
            let title = $("div", el).first().text();
            let price = $("div", el).first().next().text();
            price = (price.replace(/\./g,"")).replace(",",".");

            //Guarda el "valor" convertido para realizar operaciones matemáticas
            list.push({"Titulo": title, "Precio": Number(price).moneda(), "Valor": price});
            console.log(price);
        });

    });
    
    return list;
}

module.exports = {dolarService};