const dolarService = require("../../services/dolarService");

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
    var Fields = [];

    dolarService.dolarService().then(dolar => {
        Fields.push({
            "name": "DolarToday",
            "value": `**${dolar[0].Precio} VES**`,
            "inline": false
        });
        Fields.push({
            "name": "AirTM",
            "value": `**${dolar[3].Precio} VES**`,
            "inline": false
        });
        Fields.push({
            "name": "LocalBitcoin",
            "value": `**${dolar[1].Precio} VES**`,
            "inline": false
        });
        Fields.push({
            "name": "Bolívar Cúcuta",
            "value": `**${dolar[4].Precio} VES**`,
            "inline": false
        });
    
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
    }).catch(() => {
        bot.sendMessage({
            "to": channelID,
            "message": "MonitorDolar dejó de funcionar... O me bloquearon, no sé.",
        });
    });


}

module.exports = {aliases, help, main};
