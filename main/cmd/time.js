function def(cmd, user, users, bot, channelID, evt) {
	var Fecha = new Date();
	bot.sendMessage({
		"to": channelID,
		"embed": {
			"color": 700605,
			"fields": [
				{
					"name": ":flag_ve: Venezuela",
					"value": Fecha.toLocaleString(undefined, {
						day: "2-digit",
						month: "2-digit",
						year: "numeric",
						hour: "2-digit",
						minute: "2-digit",
						timeZone: "America/Caracas"
					})
				},
				{
					'name': ':flag_co: Colombia',
					"value": Fecha.toLocaleString(undefined, {
						day: "2-digit",
						month: "2-digit",
						year: "numeric",
						hour: "2-digit",
						minute: "2-digit",
						timeZone: "America/Bogota"
					})
				},
				{
					'name': ':flag_cl: Chile',
					"value": Fecha.toLocaleString(undefined, {
						day: "2-digit",
						month: "2-digit",
						year: "numeric",
						hour: "2-digit",
						minute: "2-digit",
						timeZone: "America/Santiago"
					})
				},
				{
					'name': ':flag_do: República Dominicana',
					"value": Fecha.toLocaleString(undefined, {
						day: "2-digit",
						month: "2-digit",
						year: "numeric",
						hour: "2-digit",
						minute: "2-digit",
						timeZone: "America/Santo_Domingo"
					})
				}
			]
		}
	});
}

module.exports.def = def;
