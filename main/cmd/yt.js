const scrapper = require("scrape-youtube").default;

function def(cmd, user, users, bot, channelID, evt) {
    const query = cmd.substring(4);
    console.log(query);

    scrapper.searchOne(query).then(result => {
        console.log(result);

        /*bot.sendMessage(
            {
                to: channelID,
                message: `https://www.youtube.com${link}`
            }
        );*/
    });
    
    // Si entra acá todo bien al mandar el msg a discord
    /*if (link) {
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
    }*/
}

// def("!yt ali primera");
module.exports.def = def;