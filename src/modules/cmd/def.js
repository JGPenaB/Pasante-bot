/* 
    Lista de alias válidos para el comando
*/
function aliases(){
    return [
		"wiki",
		"define",
		"def"
    ]
}

/**
 * Información sobre el comando
 */
function help(){
    return {
        "usage": "!wiki {palabra o frase}",
        "desc": "Busca un artículo en la Wikipedia en **Inglés**, y muestra una pequeña definición con el link al artículo.",
        "example": "Si busco a Venezuela:\n!define venezuela\n\nSi busco algo relacionado con software, como Docker:\n!define docker software"
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
    const https = require("https");
    let pos = cmd.search(" ");
    console.log(cmd.substring(pos + 1));
    https.get("https://en.wikipedia.org/w/api.php?action=opensearch&search=" + cmd.substring(pos + 1) + "&limit=1&namespace=0&format=json", (resp) => {
        let data = "";
        let exdata = "";
        let extract = "";

        resp.on("data", (chunk) => {
            data += chunk;
        });

        resp.on("end", () => {
            //Convertir en JSON
            let jsondata = JSON.parse(data);

            if (!jsondata[2].toString().length) {
                if (!jsondata[3].toString().length) {

                    bot.sendMessage({
                        to: channelID,
                        message: "estuve pegado toda la tarde buscando, pero no encontré nada."
                    });
                } else {

                    https.get("https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=" + jsondata[3].toString().substring(30), (aditional) => {

                        aditional.on("data", (exchunck) => {
                            exdata += exchunck;
                        });

                        aditional.on("end", () => {
                            let exjsondata = JSON.parse(exdata);

                            for (var k in exjsondata.query.pages) {
                                if (exjsondata.query.pages[k].hasOwnProperty("extract")) {
                                    extract = exjsondata.query.pages[k].extract.toString();
                                }
                            }

                            if (extract.length > 1020) {
                                extract = extract.substring(0, 1020) + "...";
                            }

                            bot.sendMessage({
                                to: channelID,
                                message: "Mano, esto fue lo primero que me apareció en el gugul:",
                                embed: {
                                    color: 13030341,
                                    footer: {
                                        text: "Powered by Wikimedia."
                                    },
                                    thumbnail: {
                                        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Wikipedia-logo-v2-es.svg/557px-Wikipedia-logo-v2-es.svg.png"
                                    },
                                    title: jsondata[1].toString(),
                                    description: extract,
                                    url: jsondata[3].toString()
                                }
                            }, function (error, response) {
                                console.log(error);
                            });

                        });
                    }).on("error", (exerr) => {
                        console.log("Error:" + exerr.message);
                    });
                }
            } else {
                extract = jsondata[2].toString();
                bot.sendMessage({
                    to: channelID,
                    message: "Mano, esto fue lo primero que me apareció en el gugul:",
                    embed: {
                        color: 13030341,
                        footer: {
                            text: "Powered by Wikimedia."
                        },
                        thumbnail: {
                            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Wikipedia-logo-v2-es.svg/557px-Wikipedia-logo-v2-es.svg.png"
                        },
                        title: jsondata[1].toString(),
                        description: extract,
                        url: jsondata[3].toString()
                    }
                }, function (error, response) {
                    console.log(error);
                });
            }

        });

    }).on("error", (err) => {
        bot.sendMessage({
            to: channelID,
            message: "Lo siento mano, estuve ocupado con la geva y no pude hacer lo que me pediste. ¿Tal vez otra oportunidad?"
        });
        console.log("Error: " + err.message);
    });
}

module.exports = {aliases, help, main};