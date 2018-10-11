function def(cmd, users, bot, channelID, evt){
	let hora = new Date().toLocaleTimeString();
	let fecha = new Date().toLocaleDateString();

	bot.sendMessage({
        to: channelID,
        message: `La fecha actual es: ${fecha} y la hora actual es: ${hora}`
    });
};

module.exports.def = def;