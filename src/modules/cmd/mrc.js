const { Message } = require('discord.js');

const messages = require('../messages/mrc');

/**
 * Lista de alias válidos para el comando
 * 
 * @return { Array<string> }
 */
const aliases = () => {
    return ['mrc', 'marico'];
};

/**
 * Información sobre el comando
 * 
 * @return { Object }
 */
const help = () => {
    return {
        "usage": "!mrc",
        "desc": "Cuenta un secreto que solo Pasante sabe.",
        "example": "!mrc"
    }
};

/**
 * Manejador del comando
 * 
 * @param { Message } message Evento completo del mensaje
 */
const main = async (message) => {
    const members = message.guild.members.cache.map(member => member.id);

    const randomUserIndex = Math.floor(Math.random() * members.length);
    const userName = message.guild.member(members[randomUserIndex]).displayName;

    const randomAnswerIndex = Math.floor(Math.random() * messages.length);
    const answer = messages[randomAnswerIndex].replace('__USERNAME__', userName);

    message.channel.send(answer);
};

module.exports = { aliases, help, main };