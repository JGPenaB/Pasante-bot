function def(cmd, users, bot, channelID, evt){
	
	let marico = "";
	let ind = Math.floor(Math.random()*(users.length));
		switch(Math.floor(Math.random()*4)+1){
					
			case 1:
				marico="¡**"+users[ind]+"** es ROLO'E MARICO!";
			break;
					
			case 2:
				marico="Bueno, me dijeron que **"+users[ind]+"** es sendo pato. No lo pongo en duda.";
			break;
					
			case 3:
				marico="¿Sabían que a **"+users[ind]+"** le gusta los hombres?";
			break;
					
			case 4:
				marico="A **"+users[ind]+"** le gusta que le den por la puerta trasera.";
			break;
		}
				
	bot.sendMessage({
		to: channelID,
		message: marico
	});
};

module.exports.def = def;