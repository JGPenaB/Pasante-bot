function def(cmd, user, users, bot, channelID, evt) {
	var Fecha = new Date()
	bot.sendMessage({
		'to': channelID,
		'embed': {
			'color': 700605,
			'fields': [
				{
					'name': ':flag_ve: Venezuela',
					'value': Fecha.toLocaleString('es-ES', {timeZone: 'America/Caracas'})
				},
				{
					'name': ':flag_co: Colombia',
					'value': Fecha.toLocaleString('es-ES', {timeZone: 'America/Bogota'})
				},
				{
					'name': ':flag_cl: Chile',
					'value': Fecha.toLocaleString('es-ES', {timeZone: 'America/Santiago'})
				},
				{
					'name': ':flag_do: República Dominicana',
					'value': Fecha.toLocaleString('es-ES', {timeZone: 'America/Santo_Domingo'})
				}
			]
		}
	})
}

module.exports.def = def
