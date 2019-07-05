const axios = require('axios')

Number.prototype.moneda = function() {
	var re = '\\d(?=(\\d{3})+\\D)',
		num = this.toFixed(Math.max(2))
	return (num.replace('.', ',')).replace(new RegExp(re, 'g'), '$&.')
}

function def(cmd, user, users, bot, channelID, evt) {
	const Sitios = [
		axios.get('https://s3.amazonaws.com/dolartoday/data.json'),
		axios.get('https://airtmrates.com/rates')
	]
	axios.all(Sitios).then(axios.spread((dolar, air) => {
		var DolarUSD = dolar.data.USD.dolartoday
		var DolarEUR = dolar.data.EUR.dolartoday
		var AirTmPos = air.data
			.search('VES')
		var AirTmUSD = air.data
			.substring(AirTmPos,AirTmPos + 70)
			.split("\n")[0]
			.split(',')[4]
		var Fields = []
		if(DolarUSD == null) {
			Fields.push({
				'name': 'DolarToday',
				'value': '**Error**'
			})
		}
		else {
			Fields.push({
				'name': 'DolarToday (USD)',
				'value': '**' + Number(DolarUSD).moneda() + ' Bs.S**',
				'inline': true
			})
			Fields.push({
				'name': 'DolarToday (EUR)',
				'value': '**' + Number(DolarEUR).moneda() + ' Bs.S**',
				'inline': true
			})
		}
		if(AirTmUSD == null) {
			Fields.push({
				'name': 'AirTM',
				'value': '**Error**'
			})
		}
		else {
			Fields.push({
				'name': 'AirTM (USD)',
				'value': '**' + Number(AirTmUSD).moneda() + ' Bs.S**'
			})
		}
		bot.sendMessage({
			'to': channelID,
			'message': 'Mano, tuve que usar VPN y todo para ver esta vaina:',
			'embed': {
				'color': 2264407,
				'title': 'Tasa de conversión actual',
				'fields': Fields
			}
		}, (error, response) => {
			console.log(error)
		})
	}
}

module.exports.def = def
