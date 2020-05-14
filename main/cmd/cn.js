const axios = require('axios');

Number.prototype.moneda = function () {
	const re = '\\d(?=(\\d{3})+\\D)',
		num = this.toFixed(Math.max(2));
	return (num.replace('.', ',')).replace(new RegExp(re, 'g'), '$&.')
};

function def(cmd, user, users, bot, channelID, evt) {
	
	let message = cmd.substring(1).split(" ");
	let modo = message[1].toUpperCase();
	let cantidad = parseFloat(message[2]);
	const Sitios = [
        //axios.get('https://s3.amazonaws.com/dolartoday/data.json')
        axios.get('https://monitordolar.com/api/index.php?action=ver')
    ];

	if ((modo === "D" || modo === "B") && !isNaN(cantidad)) {

		axios.all(Sitios).then(axios.spread((dolar) => {
			var DolarToday = dolar.data.actual.dolarToday;
        	var AirTM = dolar.data.actual.airTM;
			var promedio = dolar.data.actual.promedioTotal;
			var titulo = "";
			var cambio = [];
			var desde = "$"
			var hasta = "VES"
			
			if (modo === "D"){
				titulo = "Cambio de USD a VES";
				desde = "$"
			    hasta = "VES"
				cambio.push(cantidad*DolarToday);
				cambio.push(cantidad*AirTM);
				cambio.push(cantidad*promedio);
			} else if (modo === "B"){
				titulo = "Cambio de VES a USD";
				desde = "VES"
			    hasta = "$"
				cambio.push(cantidad/DolarToday);
				cambio.push(cantidad/AirTM);
				cambio.push(cantidad/promedio);
			}

			bot.sendMessage({
				to: channelID,
				message: "Tuve que usar una calculadora, porque esto es demasiada matemática para mí",
				embed: {
					color: 3141900,
					title: titulo,
					fields: [
						{
							name: "Tasa DolarToday (" + Number(DolarToday).moneda() + " VES):",
							value: desde+" **" + cantidad + "** => **" + Number(cambio[0]).moneda() + "** "+hasta
						},
						{
							name: "Tasa AirTM (" + Number(AirTM).moneda() + " VES):",
							value: desde+" **" + cantidad + "** => **" + Number(cambio[1]).moneda() + "** "+hasta
						},
						{
							name: "Promedio de tasas (" + Number(promedio).moneda() + " VES):",
							value: desde+" **" + cantidad + "** => **" + Number(cambio[2]).moneda() + "** "+hasta
						},
					],
				}
			}, function (error, response) {
						console.log(error);
			});

		}));
	}else{
		bot.sendMessage({
			to: channelID,
			message: "Mano, no puedo hacer la conversión si faltan datos o los datos que me das están malos."
		});
	}
}

module.exports.def = def;