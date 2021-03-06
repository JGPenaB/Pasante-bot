const { Message } = require('discord.js');
const botUtils = require('../../utils/bot');
const { randomWithLimit } = require('../../utils/numbers');
const generateEmbed = require('../messages/embed');
const messages = require('../messages/8b');

/**
 * Lista de alias válidos para el comando
 *
 * @return { Array<string> }
 */
const aliases = () => ['8ball', '8b'];

/**
 * Información sobre el comando
 *
 * @return { Object }
 */
const help = () => ({
  usage: '!8ball {pregunta}',
  desc: 'Te responde una pregunta que hagas.',
  example: '!8ball ¿programar es fácil?'
});

/**
 * Manejador del comando
 *
 * @param { Message } message Evento completo del mensaje
 * @param { string } userName Nombre del usuario que triggereó el evento
 */
const main = (message, userName) => {
  const query = botUtils.getParams(message.content);

  if (query === undefined) {
    return message.channel.send({
      embed: generateEmbed('ingresar una pregunta para poder usar el comando !8ball.', '!8ball {pregunta}')
    });
  }

  const answer = messages[randomWithLimit(messages.length)];

  return message.channel.send(`\`${query}\`\n${answer}, **${userName}**`);
};

module.exports = { aliases, help, main };
