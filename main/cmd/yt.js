const scrapper = require("scrape-youtube").default;

function def(cmd, user, users, bot, channelID, evt) {
    const query = cmd.substring(4);
    console.log(query);

    scrapper.searchOne(query).then(result => {
        console.log(result);

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
    });
}

module.exports.def = def;