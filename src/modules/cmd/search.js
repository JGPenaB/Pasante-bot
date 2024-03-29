const { Message } = require('discord.js');
const request = require('request');
const cheerio = require('cheerio');
const botUtils = require('../../utils/bot');

const messages = require('../messages/search');

/**
 * Lista de alias válidos para el comando
 *
 * @return { Array<string> }
 */
const aliases = () => ['search', 'busqueda'];

/**
 * Información sobre el comando
 *
 * @return { Object }
 */
const help = () => ({
  usage: '!search {query}',
  desc:
    'Busca una imagen en Bing usando un query, y lo postea en el chat. El SafeSearch está habilitado para los canales corrientes.',
  example:
    'Si busco una imagen de Venezuela:\n!search Venezuela\n\nSi busco una película como Toy Story:\n!search toy story'
});

/**
 * Manejador del comando
 *
 * @param { Message } message Evento completo del mensaje
 */
const main = async (message) => {
  let query = botUtils.getParams(message.content);

  if (query == undefined) {
    return message.channel.send(`Coño que noooo verga ENTIENDE. Escribe algo nojoda.`);
  } else {
    query = encodeURI(query);
  }

  let url = `https://www.bing.com/images/search?q=${query}`;

  if (message.channel.nsfw === true) {
    url += '&safesearch=off';
  }

  const answer = messages[Math.floor(Math.random() * messages.length)];

  request(url, (err, res, body) => {
    if (err || res.statusCode !== 200) {
      return message.channel.send({
        embed: {
          color: 5396735,
          footer: {
            text: 'Dificultades técnicas brother'
          },
          image: {
            url: 'https://i.ytimg.com/vi/a3rmgGoibsE/maxresdefault.jpg'
          }
        }
      });
    }

    const $ = cheerio.load(body);
    let links = [].filter.call($('img'), (el) => {
      return el.attribs.src != null && el.attribs.src.indexOf('bing.net/th/id/OIP') != -1;
    });

    if (links.length == 0) {
      return message.channel.send({
        embed: {
          color: 5396735,
          footer: {
            text: 'Ma-marico no encontre nada loco'
          },
          image: {
            url: 'https://pbs.twimg.com/profile_images/3154875175/a9ae20484550484c7958e364380a5913_400x400.jpeg'
          }
        }
      });
    }

    let link = links[0].attribs.src;

    // Quita los parámetros que recortan la img
    link = link.substr(0, 61);

    message.channel.send(answer, {
      embed: {
        color: 5396735,
        footer: {
          text: 'Powered by Bing.'
        },
        image: {
          url: link
        }
      }
    });
  });
};

module.exports = { aliases, help, main };
