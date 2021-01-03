const { Message } = require('discord.js');

const messages = require('../messages/invite');
const random = require('../../utils/random');
/**
 * Información sobre el comando
 * 
 * @return { Object }
 */
const help = () => {
    return {
        "usage": "!invite",
        "desc": "Muestra el link de invitación de Pasante para invitarlo a otros servers.",
        "example": "!invite"
    }
};

/**
 * Lista de alias válidos para el comando
 * 
 * @return { Array<string> }
 */
const aliases = () => {
    return ['invite', 'cv', 'curriculum'];
};


/**
 * Manejador del comando
 * 
 * @param { Message } message Evento completo del mensaje
 */
const main = async (message) => {
    
    const answer = messages[random.num(messages.length)];

    answer += "\nhttps://discord.com/api/oauth2/authorize?client_id=489634750156242974&permissions=2081422545&scope=bot";

    message.channel.send(answer);
};

module.exports = { aliases, help, main };
