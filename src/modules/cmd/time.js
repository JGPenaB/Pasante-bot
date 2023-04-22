const { Message } = require('discord.js');

/**
 * Lista de alias válidos para el comando
 *
 * @return { Array<string> }
 */
const aliases = () => ['time', 'hora', 'tiempo'];

/**
 * Información sobre el comando
 *
 * @return { Object }
 */
const help = () => ({
  usage: '!time',
  desc: 'Muestra la fecha y hora actual de Venezuela y de otros países.',
  example: '!time'
});

/**
 * Convierte la fecha al formato que
 * hizo el autista anterior a mí.
 *
 * @param { Date } fecha
 * @param { string } tz
 *
 * @return { string }
 */
const formatDate = (fecha, tz) => {
  const op = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: tz
  };

  return fecha
    .toLocaleString('en-US', op)
    .replace(/^(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2}) (\w{2})/, '$4:$5 $6 | $2/$1/$3');
};

/**
 * Manejador del comando
 *
 * @param { Message } message Evento completo del mensaje
 */
const main = async (message) => {
  const date = new Date();

  message.channel.send({
    embed: {
      color: 700605,
      fields: [
        {
          name: ':flag_ve: Venezuela',
          value: formatDate(date, 'America/Caracas')
        },
        {
          name: ':flag_cl: Chile',
          value: formatDate(date, 'America/Santiago')
        },
        {
          name: ':flag_es: España',
          value: formatDate(date, 'Europe/Madrid')
        }
      ]
    }
  });
};

module.exports = { aliases, help, main };
