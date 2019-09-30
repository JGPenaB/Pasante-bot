function def(cmd, user, users, bot, channelID, evt) {
	Number.prototype.moneda = function () {
		const re = '\\d(?=(\\d{3})+\\D)',
			num = this.toFixed(Math.max(2));
		return (num.replace('.', ',')).replace(new RegExp(re, 'g'), '$&.')
	};

	const https = require("https");
	let message = cmd.substring(1).split(" ");
	let modo = message[1].toUpperCase();
	let cantidad = parseFloat(message[2]);
	let fin = "Aquí está la conversión:\n ```cs\n";

	if ((modo === "D" || modo === "B") && !isNaN(cantidad)) {
		https.get("https://s3.amazonaws.com/dolartoday/data.json", (resp) => {
			let data = "";
			let data2 = "";
			let arr = [];
			let pos = 0;

			resp.on("data", (chunk) => {
				data += chunk;
			});

			resp.on("end", () => {

				let jsondata = JSON.parse(data);
				let TasaDolar = parseFloat(jsondata.USD.transferencia);

				if (modo === "D") {
					bot.sendMessage({
						to: channelID,
						message: "Tuve que usar una calculadora, porque esto es demasiada matemática para mí",
						embed: {
							color: 3141900,
							title: "Cambio de USD a VES",
							fields: [
								{
									name: "Tasa DolarToday(" + TasaDolar + " VES):",
									value: "$**" + cantidad + "** => **" + (cantidad * TasaDolar).moneda() + "** VES"
								}
							],
						}
					}, function (error, response) {
								console.log(error);
					});

				} else if (modo === "B") {
					bot.sendMessage({
						to: channelID,
						message: "Tuve que usar una calculadora, porque esto es demasiada matemática para mí",
						embed: {
							color: 3141900,
							title: "Cambio de VES a USD",
							fields: [
								{
									name: "Tasa DolarToday(" + TasaDolar + " VES):",
									value: "**" + cantidad + "** VES => $**" + (cantidad / TasaDolar).moneda() + "**"
								}
							],
						}
					}, function (error, response) {
								console.log(error);
					});
				}
			});
		});
	}else{
		bot.sendMessage({
			to: channelID,
			message: "Mano, no puedo hacer la conversión si faltan datos o los datos que me das están malos."
		});
	}
}

module.exports.def = def;