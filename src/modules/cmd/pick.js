const { Message } = require('discord.js');
const random = require('../../utils/random');
const messages = require('../messages/pick');

/**
 * Información sobre el comando
 * 
 * @return { Object }
 */
const help = () => {
    return {
        "usage": "!pick",
        "desc": "Te ayuda a elegir cuando estás indeciso.",
        "example": "!pick opcion 1, opcion 2, opcion N"
    }
};

/**
 * Lista de alias válidos para el comando
 * 
 * @return { Array<string> }
 */
const aliases = () => {
    return ['pick'];
};


/**
 * Manejador del comando
 * 
 * @param { Message } message Evento completo del mensaje
 */
const main = async (message, userName) => {
    const prefix = process.env.PREFIX;

    // Se elimina el !pick
    let args = message.content.substring(prefix.length+4).split(',');

    args = args.filter(el => el != '' && el != ' ');

    if (args.length <= 1) {
        message.channel.send(`Maldito mongolico tienes dos o mas opciones.`);
    } else {
        const option = args[random.num(args.length)];
        console.log(args);

        const answer = messages[random.num(messages.length)].replace('__USERNAME__', userName).replace('__OPTION__', option.trim());
        
        message.channel.send(answer);
    }    
};

module.exports = { aliases, help, main };
