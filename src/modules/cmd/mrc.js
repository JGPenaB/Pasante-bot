const { Message } = require('discord.js');

const messages = require('../messages/mrc');
const random = require('../../utils/random');

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
    const members = message.guild.members.cache
        .filter(member => member.presence.status !== 'offline')
        .map(member => member.id);

    const randomUserKey = members[random.num(members.length)];
    const userName = message.guild.member(randomUserKey).displayName;

    const answer = messages[random.num(messages.length)].replace('__USERNAME__', userName);

    message.channel.send(answer);
};

module.exports = { aliases, help, main };