const { Message } = require('discord.js')
const axios = require("axios")

/**
 * Lista de alias válidos para el comando
 * 
 * @return { Array<string> }
 */
const aliases = () => ['noticias', 'news', 'artículos', 'articles']
  
/**
  * Información sobre el comando
  *
  * @return { Object }
  */
const help = () => ({
  usage: '!noticias {query}',
  desc: 'Trae noticias relevantes en base al query.',
  example:
    "Busca un artículo con la palabra 'porgramación' en el título:\n!noticias programación\n\nPuedes mezclar palabras claves usando AND, OR y NOT:\n!noticias crypto AND (Ethereum OR litecoin) NOT bitcoin"
})

/**
 * Manejador del comando
 * 
 * @param { Message } message Evento completo del mensaje
 */
const main = async (message) => {
    const query = encodeURI(message.content.substring(message.content.search(" ") + 1, message.content.length));
    const date = new Date();

    const { data } = await axios.get(`
        http://newsapi.org/v2/everything?qInTitle=${query}&from=${date.toISOString()}pageSize=5&sortBy=publishedAt&language=en&apiKey=${process.env.NEWSKEY}`
    ).catch(error => {
        console.log('error en cmd news, GET newsapi', error)
        message.channel.send('Perdona, no sé cómo debo interpretar eso.')
    })

    if (data.articles.length === 0) {
        return message.channel.send('Lo siento. no pude encontrar nada con esas palabras.')
    }

    const fields = data.articles.slice(0, 5).map(data => ({
            name: `:newspaper: ${data.title}`,
            value: data.url
    }))

    message.channel.send({
        embed: {
            color: 2264407,
            title: ':newspaper2: Notícias más relevantes',
            fields: fields
        }
    })
}

module.exports = { aliases, help, main }