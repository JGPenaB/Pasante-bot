const { Message } = require('discord.js');
const axios = require("axios");

/**
 * Lista de alias válidos para el comando
 * 
 * @return { Array<string> }
 */
const aliases = () => {
    return ['youtube', 'yt'];
};

/**
 * Información sobre el comando
 * 
 * @return { Object }
 */
const help = () => {
    return {
        "usage": "!youtube {query}",
        "desc": "Busca un vídeo en Youtube y coloca el link.",
        "example": "Buscar un vídeo de programación:\n!yt programacion"
    }
};

/**
 * Manejador del comando
 * 
 * @param { Message } message Evento completo del mensaje
 */
const main = async (message) => {
    const query = message.content.substring(4);
    const regexp = new RegExp(/((watch\?v=)|(embed|v)\/)([^\?&"'>]+)/g);

    const { data } = await axios.get(`https://www.youtube.com/results?search_query=${query}`).catch(error => {
        message.channel.send('Mano, me salió sendo error buscando ese vídeo.');
    });

    const links = data.match(regexp);

    if (links) {
        return message.channel.send(`https://www.youtube.com/${links[0]}`);
    }

    message.channel.send('No pude encontrar el vídeo.');
};

module.exports = { aliases, help, main };