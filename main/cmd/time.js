function def(cmd, users, bot, channelID, evt){
	// Funcion para mostrar la fecha correcamente

	function dateFormat(d) {
		return d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
	}
 
	let dateNow = new Date();
	// cogemos la fecha utc
	let dateUTC = new Date(dateNow.getUTCFullYear(), dateNow.getUTCMonth(), dateNow.getUTCDate(), dateNow.getUTCHours(), dateNow.getUTCMinutes(), dateNow.getUTCSeconds())
 
	// Definimos la diferencia en horas del time zone
	// Para la diferencia horaria de dos horas y media seria 2.5
	let tz = -4;
	// Calculamos los segundos de la zona horaria
	let seconds = (tz * 60 * 60) * 1000;
 
	let fechaActual = "Fecha actual => " + dateFormat(dateNow);
	let fechaUTC = "Fecha UTC => " + dateFormat(dateUTC);
 
	// Aplicamos la diferencia horaria añadiendo los segundos al timestamp de la
	// fecha UTC
	dateUTC.setTime(dateUTC.getTime() + seconds);
 
	let timeZone = "TimeZone => " + tz;
	let fechaUTC_timeZone = "La fecha y hora actuales en Venezuela son => " + dateFormat(dateUTC);

	bot.sendMessage({
        to: channelID,
        message: `${fechaUTC_timeZone}`
    });
};

module.exports.def = def;