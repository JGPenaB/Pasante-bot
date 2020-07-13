const scrapper = require("scrape-youtube").default;

/* 
    Lista de alias válidos para el comando
*/
function aliases(){
    return [
        "youtube",
        "yt"
    ]
}

/**
 * Información sobre el comando
 */
function help(){
    return {
        "usage": "!youtube {query}",
        "desc": "Busca un vídeo en Youtube y coloca el link.",
        "example": "Buscar un vídeo de programación:\n!yt programacion"
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
    const query = cmd.substring(4);
    //console.log(query);

    scrapper.searchOne(query).then(result => {
        //console.log(result);

        if (result) {
            bot.sendMessage(
                {
                    to: channelID,
                    message: `${result}`
                }
            );
        } else {
            bot.sendMessage(
                {
                    to: channelID,
                    message: `404`
                }
            );
        }
    }).catch(err => {
        bot.sendMessage({
            to: channelID,
            message: `El Autz no sabe programar. Error: ${err}`,
            embed: {
                color: 6826080,
                footer: {
                    text: "Dificultades tecnicas brother"
                },
                image: {
                    url: "https://i.ytimg.com/vi/a3rmgGoibsE/maxresdefault.jpg"
                }
            }
        });

        //console.error(err);
    });
}

module.exports = {aliases, help, main};