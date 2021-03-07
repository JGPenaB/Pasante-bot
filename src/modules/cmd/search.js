const { Message } = require('discord.js');
const request = require('request');
const cheerio = require('cheerio');

const messages = require('../messages/search');

/**
 * Lista de alias válidos para el comando
 * 
 * @return { Array<string> }
 */
const aliases = () => {
    return ['search'];
};

/**
 * Información sobre el comando
 * 
 * @return { Object }
 */
const help = () => {
    return {
        "usage": "!search {query}",
        "desc": "Busca una imagen en Bing usando un query, y lo postea en el chat. El SafeSearch está habilitado para los canales corrientes.",
        "example": "Si busco una imagen de Venezuela:\n!search Venezuela\n\nSi busco una película como Toy Story:\n!search toy story"
    }
};

/**
 * Manejador del comando
 * 
 * @param { Message } message Evento completo del mensaje
 */
const main = async (message) => {
    const query = encodeURI(message.content.substring(8));
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
        let link = $('img')[11].attribs.src;

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
        })
    });
};

module.exports = { aliases, help, main };
