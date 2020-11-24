const { Message } = require('discord.js');

const generateEmbed = require('../messages/embed');
const messages = require('../messages/8b');

/**
 * Lista de alias válidos para el comando
 * 
 * @return { Array<string> }
 */
const aliases = () => {
    return ['8ball', '8b']
};

/**
 * Información sobre el comando
 * 
 * @return { Object }
 */
const help = () => {
    return {
        "usage": "!8ball {pregunta}",
        "desc": "Te responde una pregunta que hagas.",
        "example": "!8ball ¿programar es fácil?"
    }
};

/**
 * Manejador del comando
 * 
 * @param { Message } message Evento completo del mensaje
 * @param { string } userName Nombre del usuario que triggereó el evento
 */
const main = (message, userName) => {
    const pos = message.content.search(' ');
    const query = message.content.substring(pos + 1);

    if (!query || pos === -1) {
        return message.channel.send({
            embed: generateEmbed('ingresar una pregunta para poder usar el comando !8ball.', '!8ball {pregunta}')
        });
    }

    const index = Math.floor(Math.random() * messages.length);
    const answer = messages[index - 1];

    return message.channel.send(`\`${query}\`\n${answer}, **${userName}**`);
};

module.exports = { aliases, help, main };

