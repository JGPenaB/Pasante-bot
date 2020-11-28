const { Message } = require('discord.js');

/**
 * Lista de alias válidos para el comando
 * 
 * @return { Array<string> }
 */
const aliases = () => {
    return ['wiki', 'define', 'def'];
};

/**
 * Información sobre el comando
 * 
 * @return { Object }
 */
const help = () => {
    return {
        "usage": "!wiki {palabra o frase}",
        "desc": "Busca un artículo en la Wikipedia en **Inglés**, y muestra una pequeña definición con el link al artículo.",
        "example": "Si busco a Venezuela:\n!define venezuela\n\nSi busco algo relacionado con software, como Docker:\n!define docker software"
    }
};

/**
 * Manejador del comando
 * 
 * @param { Message } message Evento completo del mensaje
 */
const main = async (message) => {

    const axios = require("axios");
    const query = message.content.substring(message.content.search(" ") + 1, message.content.length);

    if (message.content === query)
        return message.channel.send("Inserta un término para buscar.");

    const { data } = await axios.get(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${query}`).catch(error => {
        if(error) console.log(error);
        return message.channel.send('Lo siento mano, estuve ocupado con la geva y no pude hacer lo que me pediste. ¿Tal vez otra oportunidad?');
    });

    //Si no devuelve un título o link, no encontró nada
    if (!data[1].length || !data[3].length)
        return message.channel.send("Estuve pegado toda la tarde, pero no encontré nada.");

    let embedData = {
        color: 13030341,
        footer: {
            text: "Powered by Wikimedia."
        },
        thumbnail: {
            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Wikipedia-logo-v2-es.svg/557px-Wikipedia-logo-v2-es.svg.png"
        },
        title: data[1][0].toString(),
        description: data[2][0].toString(),
        url: data[3][0].toString()
    };

    //Si no hay un extracto definido, busca uno
    if (!embedData.description.length) {

        let second = await axios.get(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${query}`).catch(error => {
            if(error) console.log(error);
            return message.channel.send('Encontré varios links, pero me da flojera hacer el resumen. Sé más específico.');
        });

        let pages = second.data.query.pages;

        //Busca el primer extracto disponible de la lista de páginas
        embedData.description = Object.values(pages)
        .filter((el) => {
            return el.hasOwnProperty("extract");
        })
        [0]
        .extract
        .toString()
        .substring(0,1020);
    }

    message.channel.send("Mano, esto fue lo primero que me apareció en la wikipedia:", {
        embed: embedData
    });
}

module.exports = {aliases, help, main};