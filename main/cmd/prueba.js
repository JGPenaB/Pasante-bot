function def(cmd, users, bot, channelID, evt){
	bot.sendMessage({
        to: channelID,
        message: 'TEST'
    });
};

module.exports.def = def;