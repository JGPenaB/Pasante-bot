const { Message } = require('discord.js');
const botUtils = require('../../utils/bot');

/**
 * Lista de alias válidos para el comando
 *
 * @return { Array<string> }
 */
const aliases = () => ['wiki', 'define', 'def'];

/**
 * Información sobre el comando
 *
 * @return { Object }
 */
const help = () => ({
  usage: '!wiki {palabra o frase}',
  desc: 'Busca un artículo en la Wikipedia en **Inglés**, y muestra una pequeña definición con el link al artículo.',
  example:
    'Si busco a Venezuela:\n!define venezuela\n\nSi busco algo relacionado con software, como Docker:\n!define docker software'
});

/**
 * Manejador del comando
 *
 * @param { Message } message Evento completo del mensaje
 */
const main = async (message) => {
  console.log(message.content);
  const axios = require('axios');
  const cheerio = require('cheerio');
  let query = botUtils.getParams(message.content);

  if (query === undefined) return message.channel.send('Inserta un término para buscar.');

  query = encodeURI(query);

  const { data } = await axios
    .get(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${query}`)
    .catch((error) => {
      if (error) console.log('Error en cmd def, get wikipedia', error);
      return message.channel.send(
        'Lo siento mano, estuve ocupado con la geva y no pude hacer lo que me pediste. ¿Tal vez otra oportunidad?'
      );
    });

  //Si no devuelve un título o link, no encontró nada
  if (!data[1].length || !data[3].length)
    return message.channel.send('Estuve pegado toda la tarde, pero no encontré nada.');

  let embedData = {
    color: 13030341,
    footer: {
      text: 'Powered by Wikimedia.'
    },
    thumbnail: {
      url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Wikipedia-logo-v2-es.svg/557px-Wikipedia-logo-v2-es.svg.png'
    },
    title: data[1][0].toString(),
    description: data[2][0].toString(),
    url: data[3][0].toString()
  };

  //Si no hay un extracto definido, busca uno
  if (!embedData.description.length) {
    let second = await axios
      .get(
        `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${query}`
      )
      .catch((error) => {
        if (error) console.log(error);
        return message.channel.send('Encontré varios links, pero me da flojera hacer el resumen. Sé más específico.');
      });

    let pages = second.data.query.pages;

    //Busca el primer extracto disponible de la lista de páginas
    let candidates = Object.values(pages).filter((el) => {
      return el.hasOwnProperty('extract');
    });

    if (candidates.length) {
      embedData.description = candidates[0].extract.toString().substring(0, 1020);
    } else {
      embedData.description = '';
    }
  }

  //Caso extremo en el que no haya extracto alguno, lo crea
  if (!embedData.description.length) {
    let third = await axios.get(embedData.url).catch((error) => {
      if (error) console.log('Error en cmd def, get embed', error);
      return message.channel.send('La PC se me congeló haciendo el resumen.');
    });

    let $ = cheerio.load(third.data);

    //Extrae los primero párrafos
    $('p')
      .toArray()
      .slice(0, 3)
      .forEach((el) => {
        embedData.description += $(el).text();
      });

    //Elimina las citas "[1][2]... [citation needed]"
    embedData.description = embedData.description.replace(/(\[)([\s\S]*?)(\])/g, '');
    embedData.description = embedData.description.substr(0, 1020);
  }

  message.channel.send('Mano, esto fue lo primero que me apareció en la wikipedia:', {
    embed: embedData
  });
};

module.exports = { aliases, help, main };
