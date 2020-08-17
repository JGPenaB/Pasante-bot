const axios = require("axios");

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

    axios.get(`https://www.youtube.com/results?search_query=${query}`).then((jewtube) => {

        let links = [];
        const regexp = new RegExp(/((watch\?v=)|(embed|v)\/)([^\?&"'>]+)/g);

        links = jewtube.data.match(regexp);

        if(links){
            bot.sendMessage(
                {
                    to: channelID,
                    message: `https://www.youtube.com/${links[0]}`
                }
            );
        }else{
            bot.sendMessage(
                {
                    to: channelID,
                    message: `No pude encontrar el vídeo.`
                }
            );
        }
    });
}

module.exports = {aliases, help, main};