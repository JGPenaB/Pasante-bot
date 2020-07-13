const axios = require("axios");

Number.prototype.moneda = function () {
    const re = "\\d(?=(\\d{3})+\\D)",
        num = this.toFixed(Math.max(2));
    return (num.replace(".", ",")).replace(new RegExp(re, "g"), "$&.")
};

/* 
    Lista de alias válidos para el comando
*/
function aliases(){
    return [
		"dolar"
    ]
}

/**
 * Información sobre el comando
 */
function help(){
    return {
        "usage": "!dolar",
        "desc": "Consulta la tasa de cambio actual de distintas fuentes.",
        "example": "!dolar"
    }
}

/**
 * Función principal del comando
 * @param {*} cmd comando original
 * @param {*} user usuario que escribió el comando
 * @param {*} users lista de usuarios en el server
 * @param {*} bot el cliente
 * @param {*} channelID el canal donde se envió el comando
 * @param {*} evt lista de eventos
 */
function main(cmd, user, users, bot, channelID, evt) {
    const Sitios = [
        //axios.get("https://s3.amazonaws.com/dolartoday/data.json")
        axios.get("https://monitordolar.com/api/index.php?action=ver")
    ];

    axios.all(Sitios).then(axios.spread((dolar) => {
        var DolarToday = dolar.data.actual.dolarToday;
        var AirTM = dolar.data.actual.airTM;
        var LocalBit = dolar.data.actual.localBitcoin;
        var bolCucuta = dolar.data.actual.bolivarCucuta;
        var promedio = dolar.data.actual.promedioTotal;
        var Fields = []
        if (DolarToday === null && AirTM === null && LocalBit === null && bolCucuta === null && promedio === null) {
            Fields.push({
                "name": "Error",
                "value": "**Sin datos**"
            });
        } else {
            Fields.push({
                "name": "DolarToday",
                "value": `**${Number(DolarToday).moneda()} VES**`,
                "inline": false
            });
            Fields.push({
                "name": "AirTM",
                "value": `**${Number(AirTM).moneda()} VES**`,
                "inline": false
            });
            Fields.push({
                "name": "LocalBitcoin",
                "value": `**${Number(LocalBit).moneda()} VES**`,
                "inline": false
            });
            Fields.push({
                "name": "Bolívar Cúcuta",
                "value": `**${Number(bolCucuta).moneda()} VES**`,
                "inline": false
            });
            Fields.push({
                "name": "Promedio",
                "value": `**${Number(promedio).moneda()} VES**`,
                "inline": false
            });
        }
        bot.sendMessage({
            "to": channelID,
            "message": "Mano, tuve que usar VPN y todo para ver esta vaina:",
            "embed": {
                "color": 2264407,
                "title": "Tasa de conversión actual",
                "fields": Fields
            }
        }, (error, response) => {

            if(error){
                console.log(error);

                bot.sendMessage({
                    "to": channelID,
                    "message": "Mano, no sé que pasa. El Internet Explorer dice que me quedé sin Internet.",
                });
            }
        });
    }));
}

module.exports = {aliases, help, main};
