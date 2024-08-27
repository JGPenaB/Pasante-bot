const { Message } = require('discord.js');

/**
 * Lista de alias válidos para el comando
 *
 * @return { Array<string> }
 */
const aliases = () => ['ai'];

/**
 * Información sobre el comando
 *
 * @return { Object }
 */
const help = () => ({
  usage: '!ai {query}',
  desc: 'test',
  example: 'test'
});

/**
 * Manejador del comando
 *
 * @param { Message } message Evento completo del mensaje
 * @param { string } userName Nombre del usuario que triggereó el evento
 */
const main = (message, userName) => {
  return message.channel.send(`test`);
};

module.exports = { aliases, help, main };
