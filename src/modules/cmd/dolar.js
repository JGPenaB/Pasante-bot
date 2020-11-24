const { Message } = require('discord.js');

const dolarService = require("../../services/dolarService");

/**
 * Lista de alias válidos para el comando
 * 
 * @return { Array<string> }
 */
const aliases = () => {
    return ['dolar'];
};

/**
 * Información sobre el comando
 * 
 * @return { Object }
 */
const help = () => {
    return {
        "usage": "!dolar",
        "desc": "Consulta la tasa de cambio actual de distintas fuentes.",
        "example": "!dolar"
    }
};

/**
 * Manejador del comando
 * 
 * @param { Message } message Evento completo del mensaje
 */
const main = async (message) => {
    let exchanges = await dolarService.getExchangeRates().catch(error => {
        message.channel.send('MonitorDolar dejó de funcionar... O me bloquearon, no sé.');
    });

    exchanges = exchanges.map(exchange => {
        return {
            name: exchange.title,
            value: exchange.value,
            inline: false
        }
    });

    message.channel.send('Mano, tuve que usar VPN y todo para ver esta vaina:', {
        embed: {
            color: 2264407,
            title: "Tasas de conversión del momento",
            fields: exchanges
        }
    });
};

module.exports = { aliases, help, main };
