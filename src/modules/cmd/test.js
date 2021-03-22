const { Message } = require('discord.js');

/**
 * Lista de alias válidos para el comando
 *
 * @return { Array<string> }
 */
const aliases = () => ['test'];

/**
 * Información sobre el comando
 *
 * @return { Object }
 */
const help = () => ({
  usage: '!test',
  desc: 'Te dice cuántas fallas tiene tu mugroso código.',
  example: '!test'
});

/**
 * Manejador del comando
 *
 * @param { Message } message Evento completo del mensaje
 * @param { string } userName Nombre del usuario que triggereó el evento
 */
const main = (message) => {
  const tests = Math.floor(Math.random() * 8) + 1;
  const assertions = Math.floor(Math.random() * 255) + 1;

  let emoji = message.guild.emojis.cache.find((emoji) => emoji.name === 'pepekek');
  emoji = emoji !== undefined ? emoji : ':poop:';

  return message.channel.send(
    `El código tiene: **${tests}** tests, **${assertions}** assertions y **${assertions}** fallos. \n ¿Quién programó eso? ¿Cristian? ${emoji}`
  );
};

module.exports = { aliases, help, main };
