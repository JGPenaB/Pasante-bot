/* 
    Lista de alias válidos para el comando
*/
function aliases(){
    return [
        "8ball",
        "8b"
    ]
}

/**
 * Información sobre el comando
 */
function help(){
    return {
        "usage": "!8ball {pregunta}",
        "desc": "Te responde una pregunta que hagas.",
        "example": "!8ball ¿programar es fácil?"
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
    let pos = cmd.search(" ");
    const query = cmd.substring(pos + 1);

    if (!query || pos === -1) {
        return bot.sendMessage({
            to: channelID,
            message: "",
            embed: {
                color: 5396735,
                fields: [
                    {
                        name: "Querido usuario",
                        value: "Lamento informarle que usted debe ingresar una pregunta para poder usar el comando !8ball."
                    },
                    {
                        name: "Uso",
                        value: "!8ball {pregunta}"
                    }
                ],
                image: {
                    url: "https://www.bkconnection.com/system/refinery/blog/posts/thumbnails/000/003/323/post_detail/family-friendly-app-store.gif?1432824720"
                }
            }
        });
    }

    const answers = [
        "En mi opinión, sí",
        "Es cierto",
        "Es decididamente así",
        "Probablemente",
        "Buen pronóstico",
        "Todo apunta a que sí",
        "Sin duda",
        "Sí",
        "Sí - definitivamente",
        "Debes confiar en ello",
        "Respuesta vaga, vuelve a intentarlo",
        "Pregunta en otro momento",
        "Será mejor que no te lo diga ahora",
        "No puedo predecirlo ahora",
        "Concéntrate y vuelve a preguntar",
        "Puede ser",
        "No cuentes con ello",
        "Mi respuesta es no",
        "Mis fuentes me dicen que no",
        "Las perspectivas no son buenas",
        "Muy dudoso"
    ];

    const index = Math.floor(Math.random() * 21) + 1;

    return bot.sendMessage(
        {
            to: channelID,
            message: "`" + query + "`\n" + answers[index - 1] + ", **" + user + "**."
        }
    );
}

module.exports = {aliases, help, main};

