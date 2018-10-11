function def(cmd, users, bot, channelID, evt){
	let hora = new Date().toLocaleTimeString;

	bot.sendMessage({
        to: channelID,
        message: hora
    });
};

module.exports.def = def;