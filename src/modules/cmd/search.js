const request = require("request");
const cheerio = require("cheerio");

/* 
    Lista de alias válidos para el comando
*/
function aliases(){
    return [
        "search"
    ]
}

/**
 * Información sobre el comando
 */
function help(){
    return {
        "usage": "!search {query}",
        "desc": "Busca una imagen en Bing usando un query, y lo postea en el chat. El SafeSearch está habilitado para los canales corrientes.",
        "example": "Si busco una imagen de Venezuela:\n!search Venezuela\n\nSi busco una película como Toy Story:\n!search toy story"
    }
}

/**
 * Función principal del comando
 * @param {*} cmd comando original
 * @param {*} user usuario que escribió el comando
 * @param {*} users lista de usuarios en el server
 * @param {*} bot el cliente
 * @param {*} channelID el canal donde se envió el comando
 * @param {*} evt lista de eventos
 */
function main(cmd, user, users, bot, channelID, evt) {
    const query = encodeURI(cmd.substring(8));
    // const query = encodeURI("Mia Khalifa");

    let url = `https://www.bing.com/images/search?q=${query}&safesearch=off`;

    //Si el comando fue ejecutado en un canal que no es NSFW
    if (!bot.servers[evt.d.guild_id].channels[channelID].nsfw) {
        url = `https://www.bing.com/images/search?q=${query}`;
    }

    let finalmsg = "";
    // Si entra acá todo bien
    request(url, (err, res, body) => {
        if (!err && res.statusCode === 200) {
            let $ = cheerio.load(body);
            let link = $("img")[2].attribs.src;

            // Quita los parametros que recortan la img
            link = link.substr(0, 61);

            switch (Math.floor(Math.random() * 3) + 1) {
                case 1:
                    finalmsg = "Esta es la imagen que encontré.";
                    break;

                case 2:
                    finalmsg = "Esto fue lo primero que me salió en el gugul pirata.";
                    break;

                case 3:
                    finalmsg = "Aquí tiene la imagen que pidió.";
                    break;

                case 4:
                    finalmsg = "El primer resultado en Bing es este.";
                    break;
            }

            // Si entra acá todo bien al mandar el msg a discord
            bot.sendMessage(
                {
                    to: channelID,
                    message: finalmsg,
                    embed: {
                        color: 5396735,
                        footer: {
                            text: "Powered by Bing."
                        },
                        image: {
                            url: link
                        }
                    }
                }, function (error, response) {
                    if (error) {
                        console.log(error);
                        bot.sendMessage({
                            to: channelID,
                            message: "No pude encontrar la imagen que me pediste.",
                        });
                    }
                });

            // console.log(link);
        } else if (err || res.statusCode !== 200) {
            // Si entra acá hubo un error al hacer el request, posible mal URL

            bot.sendMessage({
                to: channelID,
                message: "",
                embed: {
                    color: 5396735,
                    footer: {
                        text: "Dificultades técnicas brother"
                    },
                    image: {
                        url: "https://i.ytimg.com/vi/a3rmgGoibsE/maxresdefault.jpg"
                    }
                }
            });
            // console.error(error, response.statusCode);
        }
    });
}


module.exports = {aliases, help, main};
