function def(cmd, user, users, bot, channelID, evt) {
	var Fecha = new Date();
	bot.sendMessage({
		"to": channelID,
		"embed": {
			"color": 700605,
			"fields": [
				{
					"name": ":flag_ve: Venezuela",
					"value": Fecha.toLocaleString("es-VE", {timeZone: "America/Caracas"}) + "VE"
				},
				{
					'name': ':flag_co: Colombia',
					"value": Fecha.toLocaleString("en-US", {timeZone: "America/Bogota"}) + "US"
				},
				{
					'name': ':flag_cl: Chile',
					"value": Fecha.toLocaleString("en-GB", {timeZone: "America/Santiago"}) + "GB"
				},
				{
					'name': ':flag_do: República Dominicana',
					"value": Fecha.toLocaleString("es-ES", {timeZone: "America/Santo_Domingo"})
				}
			]
		}
	});
}

module.exports.def = def;
