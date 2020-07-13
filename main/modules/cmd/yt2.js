const request = require("request");
const cheerio = require("cheerio");

/* 
    Lista de alias válidos para el comando
*/
function aliases(){
    return [
        "yt2"
    ]
}

/**
 * Información sobre el comando
 */
function help(){
    return {
        "usage": "!yt2 {query}",
        "desc": "Backup de la antigua funcion de youtubiste. Dario no lo ha arreglao menol",
        "example": "!yt2"
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
    const query = encodeURI(cmd.substring(4));
    const url = `https://www.youtube.com/results?search_query=${query}`;

    request(url, (err, res, body) => {
        if (err || res.statusCode !== 200) {
            bot.sendMessage({
                to: channelID,
                message: "El Autz no sabe programar",
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

            // console.error(err);
        }

        if (!err && res.statusCode === 200) {
            let $ = cheerio.load(body);
            let links = [];
            const regexp = new RegExp(/^(https?\:\/\/)?(www\.youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)$/);

            $("a").each((index, el) => {
                links.push(el.attribs.href);
            });

            //console.log(links)

            let link = links.find((el) => {
                let test = `https://www.youtube.com${el}`;
                return regexp.test(test);
            });

            // Si entra acá todo bien al mandar el msg a discord
            if (link) {
                bot.sendMessage(
                    {
                        to: channelID,
                        message: `https://www.youtube.com${link}`
                    }
                );
            } else {
                bot.sendMessage(
                    {
                        to: channelID,
                        message: `La marisquera que buscas no ha sido localizada rata`
                    }
                );
            }
        }
    });
}

module.exports = {aliases, help, main};