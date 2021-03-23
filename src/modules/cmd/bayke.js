const { Message } = require('discord.js');
const botUtils = require('../../utils/bot');

const generateEmbed = require('../messages/embed');

/**
 * Lista de alias válidos para el comando
 *
 * @return { Array<string> }
 */
const aliases = () => ['bayke'];

/**
 * Información sobre el comando
 *
 * @return { Object }
 */
const help = () => ({
  usage: '!bayke {boing|ditto|DVD|laserman|spin|thanos}',
  desc: 'Muestra a la mascota del server.',
  example: '!bayke dvd'
});

/**
 * Manejador del comando
 *
 * @param { Message } message Evento completo del mensaje
 */
const main = async (message) => {
  const query = botUtils.getParams(message.content);

  const images = ['boing', 'ditto', 'dvd', 'laserman', 'spin', 'thanos'];

  if (!query || images.indexOf(query) === -1) {
    return message.channel.send({
      embed: generateEmbed(
        'ingresar el nombre del meme CORRECTAMENTE OK?.',
        '!bayke (boing|ditto|DVD|laserman|spin|thanos)'
      )
    });
  }

  const index = images.indexOf(query);

  await message.channel
    .send({
      files: [
        {
          attachment: `./src/img/bayke/${images[index]}.gif`,
          name: 'bayke_gay.gif'
        }
      ]
    })
    .catch((error) => {
      console.log('Error en cmd bayke', error);
      message.channel.send('El Autz no sabe programar, error al enviar el meme');
    });
};

module.exports = { aliases, help, main };
