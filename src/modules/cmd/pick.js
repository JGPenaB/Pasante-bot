const { Message } = require('discord.js');
const { randomWithLimit } = require('../../utils/numbers');
const messages = require('../messages/pick');
const botUtils = require('../../utils/bot');

/**
 * Lista de alias válidos para el comando
 *
 * @return { Array<string> }
 */
const aliases = () => ['pick'];

/**
 * Información sobre el comando
 *
 * @return { Object }
 */
const help = () => ({
  usage: '!pick',
  desc: 'Te ayuda a elegir cuando estás indeciso.',
  example: '!pick opcion 1, opcion 2, opcion N'
});

/**
 * Manejador del comando
 *
 * @param { Message } message Evento completo del mensaje
 */
const main = async (message, userName) => {
  // Se elimina el !pick
  // let args = message.content.substring(prefix.length + 4);
  let args = botUtils.getParams(message.content);

  if (args == undefined) {
    return message.channel.send(`Maldito mongolico escribe algo piaso e pajero.`);
  }

  // Se separa por ','
  args = args.split(',');
  args = args.filter((el) => el != '' && el != ' ');

  if (args.length <= 1) {
    return message.channel.send(`Maldito mongolico escribe dos (2) o mas opciones.`);
  }

  console.log(args);

  const option = args[randomWithLimit(args.length)];

  const answer = messages[randomWithLimit(messages.length)]
    .replace('__USERNAME__', userName)
    .replace('__OPTION__', option.trim());

  return message.channel.send(answer);
};

module.exports = { aliases, help, main };
