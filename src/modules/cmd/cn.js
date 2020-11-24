const { Message } = require('discord.js');

const dolarService = require("../../services/dolarService");

/**
 * Lista de alias válidos para el comando
 * 
 * @return { Array<string> }
 */
const aliases = () => {
    return ['cambio', 'cn', 'cmb']
};

/**
 * Información sobre el comando
 * 
 * @return { Object }
 */
const help = () => {
    return {
        "usage": "!cambio {B o D} {monto}",
        "desc": "Convierte USD a VES (o vice versa) usando distintas tasas de cambio.",
        "example": "Si quiero convertir $10 a Bolívares Soberanos (VES):\n!cambio d 10\n\nSi quiero convertir 500 Bolívares Soberanos a Dólar (USD):\n!cambio b 500"
    }
};

/**
 * Manejador del comando
 * 
 * @param { Message } message Evento completo del mensaje
 */
const main = async (message) => {
	const prefix = process.env.PREFIX;
	const args = message.content.substring(prefix.length).split(' ');
	const mode = args[1];
	const amount = parseFloat(args[2]);

	if (mode === undefined || !(mode.toUpperCase() === 'B' || mode.toUpperCase() === 'D') || isNaN(amount)) {
		return message.channel.send('Mano, no puedo hacer la conversión si faltan datos o los datos que me das están malos.');
	}

	let title = 'Cambio de USD a VES';
	let from = '$';
	let to = 'VES';
	const exchange = [];


	const exchangeRates = await dolarService.getExchangeRates().catch(error => {
		message.channel.send('MonitorDolar dejó de funcionar... O me bloquearon, no sé.');
	});

	const dolarToday = exchangeRates[0].value;
	const airTM = exchangeRates[3].value;

	if (mode === 'D') {
		exchange.push(amount * dolarToday);
		exchange.push(amount * airTM);
	} else {
		title = 'Cambio de VES a USD';
		from = 'VES';
		to = '$';
		
		exchange.push(amount / dolarToday);
		exchange.push(amount / airTM);
	}

	message.channel.send('Tuve que usar una calculadora, porque esto es demasiada matemática para mí', {
		embed: {
			color: 3141900,
			title,
			fields: [
				{
					name: `Tasa DolarToday (${dolarToday} VES):`,
					value: `${from} **${amount}** => **${exchange[0].moneda()}** ${to}`
				},
				{
					name: `Tasa AirTM (${airTM} VES):`,
					value: `${from} **${amount}** => **${exchange[1].moneda()}** ${to}`
				}
			],
		}
	});
};

module.exports = { aliases, help, main };