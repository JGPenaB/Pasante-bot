const { Message } = require('discord.js');
const botUtils = require('../../utils/bot');

/**
 * Lista de alias válidos para el comando
 *
 * @return { Array<string> }
 */
const aliases = () => ['avatar'];

/**
 * Información sobre el comando
 *
 * @return { Object }
 */
const help = () => ({
  usage: '!avatar',
  desc: 'Obtiene el avatar de algun usuario que menciones',
  example: '!avatar @bayke'
});

/**
 * Manejador del comando
 *
 * @param { Message } message Evento completo del mensaje
 */
const main = async (message) => {
  const username = botUtils.getParams(message.content);
  let members = message.guild.members.cache.map((member) => member.user.username.toLowerCase());

  const alias = message.guild.members.cache
    .filter((member) => {
      return member.nickname != null;
    })
    .map((member) => member.nickname.toLowerCase());

  members = members.concat(alias);

  let user, mensaje;

  if (message.mentions.users.first()) {
    user = message.mentions.users.first();
    mensaje = `El avatar del panita mencionado: ${user.username}`;
  } else if (username && members.indexOf(username.toLowerCase()) > -1) {
    user = message.guild.members.cache.filter((member) => {
      return (
        member.user.username.toLowerCase() == username.toLowerCase() ||
        (member.nickname && member.nickname.toLowerCase() == username.toLowerCase())
      );
    });
    user = user.values().next().value.user;
    mensaje = `El avatar del panita: ${user.username}`;
  } else {
    user = message.author;
    mensaje = `Medio marico que eres, no encontre a nadie asi. Toma tu avatar ${user.username}`;
  }

  message.channel.send('Ay vale,  pendiente del avatar de los tipos', {
    embed: {
      color: 2264407,
      title: `${mensaje}`,
      image: {
        url: user.avatarURL({ size: 2048 })
      }
    }
  });
};

module.exports = { aliases, help, main };
