const https = require('https');
const request = require('request');
const cheerio = require('cheerio');
const { Message } = require('discord.js');

/**
 * Lista de alias válidos para el comando
 * 
 * @return { Array<string> }
 */
const aliases = () => {
    return ['stack', 'so'];
};

/**
 * Información sobre el comando
 * 
 * @return { Object }
 */
const help = () => {
    return {
        "usage": "!stack {query}",
        "desc": "Busca una pregunta en StackOverflow y muestra la respuesta de la primera pregunta encontrada.\n Es preferible que la pregunta se haga en **Inglés** para obtener un resultado más relevante.",
        "example": "!stack how to install gentoo"
    }
};

/**
 * Manejador del comando
 * 
 * @param { Message } message Evento completo del mensaje
 */
const main = async (message) => {
    const query = encodeURI(message.content.substring(message.content.search(" ")+1, message.content.length));
    const url = `https://api.stackexchange.com/2.2/similar?pagesize=1&order=desc&sort=relevance&title=${query}&site=stackoverflow&key=${process.env.SO_KEY}`;

    request({ uri: url, gzip: true }, (err, res, body) => {
        
        if (err || res.statusCode !== 200) {
            console.log(res.statusCode);
            return message.channel.send('No pude encontrar nada en Stack Overflow.');
        }
        
        const jsonData = JSON.parse(body);

        if (jsonData?.items?.length < 1) {
            return message.channel.send('No pude encontrar nada en Stack Overflow.');
        }

        if (!jsonData.items[0].is_answered) {
            return message.channel.send('Encontré una pregunta, pero no posee una respuesta definitiva. Puedes revisarlo si te interesa: \n' + JsonData.items[0].link);
        }

        https.get(jsonData.items[0].link, (resp) => {
            let finalData = '';

            resp.on("data", (chunk) => {
                finalData += chunk;
            });

            resp.on("end", () => {
                let $ = cheerio.load(finalData);
                let pred = $(".answercell").first().text();
                let FinalText = pred.substring(0, pred.search("share"));

                //Para evitar errores con el embed
                if (FinalText.length > 1020) {
                    FinalText = FinalText.substring(0, 1020) + "...";
                }

                message.channel.send({
                    embed: {
                        color: 16749596,
                        title: jsonData.items[0].title,
                        url: jsonData.items[0].link,
                        fields: [
                            {
                                name: "Respuesta",
                                value: FinalText.trim()
                            }
                        ],
                    }
                })
            });
        });
    });
};

module.exports = { aliases, help, main };