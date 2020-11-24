const dolarService = require("../../services/dolarService");

/* 
    Lista de alias válidos para el comando
*/
function aliases(){
    return [
		"cambio",
		"cn",
		"cmb"
    ]
}

/**
 * Información sobre el comando
 */
function help(){
    return {
        "usage": "!cambio {B o D} {monto}",
        "desc": "Convierte USD a VES (o vice versa) usando distintas tasas de cambio.",
        "example": "Si quiero convertir $10 a Bolívares Soberanos (VES):\n!cambio d 10\n\nSi quiero convertir 500 Bolívares Soberanos a Dólar (USD):\n!cambio b 500"
    }
}

/**
 * Función principal del comando
 * @param {*} cmd comando original
 * @param {*} user usuario que escribió el comando
 * @param {*} users lista de usuarios en el server
 * @param {*} bot el cliente
 * @param {*} channelID el canal donde se envió el comando
 * @param {*} evt lista de eventos
 */
function main(cmd, user, users, bot, channelID, evt) {
	let message = cmd.substring(1).split(" ");
	let modo = message[1];
	let cantidad = parseFloat(message[2]);

	if (modo !== undefined && (modo.toUpperCase() === "B" || modo.toUpperCase() === "D") && !isNaN(cantidad)) {
		modo = modo.toUpperCase();
		
		dolarService.dolarService().then(dolar => {
			var DolarToday = dolar[0].Valor;
			var AirTM = dolar[3].Valor;
			var titulo = "";
			var cambio = [];
			var desde = "$";
			var hasta = "VES";
			
			if (modo === "D"){
				titulo = "Cambio de USD a VES";
				desde = "$";
				hasta = "VES";
				cambio.push(cantidad*DolarToday);
				cambio.push(cantidad*AirTM);
			} else if (modo === "B"){
				titulo = "Cambio de VES a USD";
				desde = "VES";
				hasta = "$";
				cambio.push(cantidad/DolarToday);
				cambio.push(cantidad/AirTM);
			}

			bot.sendMessage({
				to: channelID,
				message: "Tuve que usar una calculadora, porque esto es demasiada matemática para mí",
				embed: {
					color: 3141900,
					title: titulo,
					fields: [
						{
							name: "Tasa DolarToday (" + dolar[0].Precio + " VES):",
							value: desde+" **" + cantidad + "** => **" + Number(cambio[0]).moneda() + "** "+hasta
						},
						{
							name: "Tasa AirTM (" + dolar[3].Precio + " VES):",
							value: desde+" **" + cantidad + "** => **" + Number(cambio[1]).moneda() + "** "+hasta
						}
					],
				}
			}, function (error, response) {
				if(error)
					console.log(error);
			});

		}).catch(() => {
			bot.sendMessage({
				"to": channelID,
				"message": "MonitorDolar dejó de funcionar... O me bloquearon, no sé.",
			});
		});
	}else{
		bot.sendMessage({
			to: channelID,
			message: "Mano, no puedo hacer la conversión si faltan datos o los datos que me das están malos."
		});
	}
}

module.exports = {aliases, help, main};