function def(cmd, user, users, bot, channelID, evt) {
	function fecha(fecha, tz) {
		var op = {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			timeZone: tz
		}
		return fecha.toLocaleString(undefined, op)
			.replace(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/, '$4:$5 | $3.$2.$1');
	}
	var Ahora = new Date();
	bot.sendMessage({
		"to": channelID,
		"embed": {
			"color": 700605,
			"fields": [
				{
					"name": ":flag_ve: Venezuela",
					"value": fecha(Ahora, "America/Caracas")
				},
				{
					'name': ':flag_co: Colombia',
					"value": fecha(Ahora, "America/Bogota")
				},
				{
					'name': ':flag_cl: Chile',
					"value": fecha(Ahora, "America/Santiago")
				},
				{
					'name': ':flag_do: República Dominicana',
					"value": fecha(Ahora, "America/Santo_Domingo")
				}
			]
		}
	});
}

module.exports.def = def;
