const request = require("request");
const cheerio = require("cheerio");

function def(cmd, user, users, bot, channelID, evt) {
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

// def("!yt ali primera");
module.exports.def = def;