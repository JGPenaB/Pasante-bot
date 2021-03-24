const request = require('request');
const cheerio = require('cheerio');
const botUtils = require('../../utils/bot');
const { Message } = require('discord.js');

/**
 * Lista de alias válidos para el comando
 *
 * @return { Array<string> }
 */
const aliases = () => ['stack', 'so'];

/**
 * Información sobre el comando
 *
 * @return { Object }
 */
const help = () => ({
  usage: '!stack {query}',
  desc:
    'Busca una pregunta en StackOverflow y muestra la respuesta de la primera pregunta encontrada.\n Es preferible que la pregunta se haga en **Inglés** para obtener un resultado más relevante.',
  example: '!stack how to install gentoo'
});

/**
 * Manejador del comando
 *
 * @param { Message } message Evento completo del mensaje
 */
const main = async (message) => {
  const query = botUtils.getParams(message.content);

  if (query === undefined) {
    return message.channel.send('Necesito que me digas lo que debo buscar.');
  }

  const url = `https://api.stackexchange.com/2.2/similar?pagesize=1&order=desc&sort=relevance&title=${query}&site=stackoverflow&key=${process.env.SO_KEY}`;

  request({ uri: url, gzip: true }, (err, res, body) => {
    if (err || res.statusCode !== 200) {
      console.log(res.statusCode);
      return message.channel.send('No pude encontrar nada en Stack Overflow.');
    }

    const jsonData = JSON.parse(body);

    if (jsonData.items.length < 1) {
      return message.channel.send('No pude encontrar nada en Stack Overflow.');
    }

    if (!jsonData.items[0].is_answered) {
      return message.channel.send(
        'Encontré una pregunta, pero no posee una respuesta definitiva. Puedes revisarlo si te interesa: \n' +
          JsonData.items[0].link
      );
    }

    request({ uri: jsonData.items[0].link, gzip: true }, (err, res, body) => {
      if (err || res.statusCode !== 200) {
        console.log(res.statusCode);
        return message.channel.send('No pude encontrar nada en Stack Overflow.');
      }

      let $ = cheerio.load(body);
      let pred = $('.answercell').first().text();
      let FinalText = pred.substring(0, pred.indexOf('Share')).trim();

      //Para evitar errores con el embed
      if (FinalText.length > 1020) {
        FinalText = FinalText.substring(0, 1020) + '...';
      }

      message.channel.send({
        embed: {
          color: 16749596,
          title: jsonData.items[0].title,
          url: jsonData.items[0].link,
          fields: [
            {
              name: 'Respuesta',
              value: FinalText.trim()
            }
          ]
        }
      });
    });
  });
};

module.exports = { aliases, help, main };
