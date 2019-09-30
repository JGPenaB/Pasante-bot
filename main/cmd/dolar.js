const axios = require('axios');

Number.prototype.moneda = function () {
    const re = '\\d(?=(\\d{3})+\\D)',
        num = this.toFixed(Math.max(2));
    return (num.replace('.', ',')).replace(new RegExp(re, 'g'), '$&.')
};

function def(cmd, user, users, bot, channelID, evt) {
    const Sitios = [
        axios.get('https://s3.amazonaws.com/dolartoday/data.json')
    ];

    axios.all(Sitios).then(axios.spread((dolar) => {
        var DolarUSD = dolar.data.USD.dolartoday
        var DolarEUR = dolar.data.EUR.dolartoday
        var Fields = []
        if (DolarUSD == null) {
            Fields.push({
                'name': 'DolarToday',
                'value': '**Error**'
            })
        } else {
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
        });
    })).catch(function(err){
		bot.sendMessage({
            'to': channelID,
            'message': 'Mano, no sé que pasa. El Internet Explorer dice esto:',
			'embed': {
				'color': 2264407,
				'title': err.response.statusText+" ("+err.response.status+")",
				'fields': [
						{
							name: "Sitio web del error",
							value: err.response.config.url
                        }
						]
			}
        }, (error, response) => {
            console.log(error)
        });
	});
}

module.exports.def = def
