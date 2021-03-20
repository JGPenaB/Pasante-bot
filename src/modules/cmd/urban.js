const { Message } = require('discord.js');
const request = require('request');

/**
 * Lista de alias válidos para el comando
 * 
 * @return { Array<string> }
 */
const aliases = () => {
    return ['urban', 'dialecto', 'venequismo'];
};

/**
 * Información sobre el comando
 * 
 * @return { Object }
 */
const help = () => {
    return {
        "usage": "!urban {termino}",
        "desc": "Busca el termino que le pases por parametro en https://www.urbandictionary.com/",
        "example": "Si busco la definición del termino :\n!urban wyswyg"
    }
};

/**
 * Manejador del comando
 * 
 * @param { Message } message Evento completo del mensaje
 */
const main = async (message) => {
    const query = encodeURI(message.content.substring(message.content.search(" ") + 1, message.content.length));
    let url = `https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${query}`;

    // Si el query está vacio
    if (query == '') {
        return message.channel.send({
            embed: {
                color: 5396735,
                footer: {
                    text: 'Que mierda se supone que voy a buscar. Maldito pajero'
                },
                image: {
                    url: 'https://cdn.generadormemes.com/media/templates/xnegra_wtf.jpg.pagespeed.ic.plantilla-memes.jpg'
                }
            }
        });
    }

    request({
        url,
        headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY,
            'x-rapidapi-host': 'mashape-community-urban-dictionary.p.rapidapi.com',
	        'useQueryString': true
        }
    }, (err, res, body) => {
        // Si ocurre un error
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

        const response = JSON.parse(body);

        // Si la respuesta devuelve 0 resultados
        if (response.list.length === 0) {
            return message.channel.send({
                embed: {
                    color: 5396735,
                    description: 'No encontre una maldita mierda. Also, mano me puedes colaborar pal fresco?',
                    image: {
                        url: 'https://preview.redd.it/xvzg61ls2mf51.png?auto=webp&s=f4f0337122f069dcef40dc72d96af91e7d7e8f06'
                    }
                }
            });
        } else {
            // Devuelve el 1er resultado
            return message.channel.send({
                embed: {
                    color: 5396735,
                    title: `_La definición gonsaladezca_`,
                    description: `**Termino**: ${response.list[0].word}\n\n**Definición**: ${response.list[0].definition}\n\n**Ejemplo**: ${response.list[0].example}`
                }
            });
        }
    });
};

module.exports = { aliases, help, main };
