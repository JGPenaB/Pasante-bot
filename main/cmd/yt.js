const scrapper = require("scrape-youtube").default;

function def(cmd, user, users, bot, channelID, evt) {
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

module.exports.def = def;