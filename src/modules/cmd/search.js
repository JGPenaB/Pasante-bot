const { Message } = require('discord.js')
const axios = require('axios')
const cheerio = require('cheerio')

const random = require('../../utils/random')
const messages = require('../messages/search')

/**
 * Lista de alias válidos para el comando
 *
 * @return { Array<string> }
 */
const aliases = () => ['search']

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
})

/**
 * Manejador del comando
 *
 * @param { Message } message Evento completo del mensaje
 */
const main = async (message) => {
  const query = encodeURI(message.content.substring(8))
  let url = `https://www.bing.com/images/search?q=${query}`

  if (message.channel.nsfw === true) {
    url += '&safesearch=off'
  }

  try {
    const { data } = await axios.get(url)
    const $ = cheerio.load(data)
    let imageLink = $('img')[11].attribs.src
    // Quita los parámetros que recortan la img
    imageLink = imageLink.substring(0, 61)

    return message.channel.send(messages[random.num(messages.length)], {
      embed: {
        color: 5396735,
        footer: {
          text: 'Powered by Bing.'
        },
        image: {
          url: imageLink
        }
      }
    })
  } catch (err) {
    console.log(err.message)

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
    })
  }
}

module.exports = { aliases, help, main }
