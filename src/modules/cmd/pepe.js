const { Message } = require('discord.js');
const axios = require('axios');

/**
 * Lista de alias válidos para el comando
 * @return { Array<string> }
 */
const aliases = () => ['pepe', 'sapo'];

/**
 * Información sobre el comando
 * @return { Object }
 */
const help = () => ({
    usage: '!pepe',
    desc: 'Pasante busca un pepe aleatorio',
    example: `coño novato, es solo !pepe y ya`
});

/**
 * Manejador del comando
 * @param { Message } message Evento completo del mensaje
 */
const main = async (message) => {
    const urlAPI = `https://wojakparadise.net/category/req/Pepe`;
    let urlPepeImage = 'https://wojakparadise.net/wojak/##ID_PEPE##/img';


    await axios.get(urlAPI)
        .then(function (response) {
            let pepeData = response.data[Math.floor(Math.random() * (response.data.length - 0 + 1))];
            urlPepeImage = urlPepeImage.replace('##ID_PEPE##', pepeData.id)
        }).catch(function (error) {
            console.error(error);

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
        });

    return message.channel.send({
        embed: {
            color: 5396735,
            footer: {
                text: 'el SAPO'
            },
            image: {
                url: urlPepeImage
            }
        }
    });
};

module.exports = { aliases, help, main };
