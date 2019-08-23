function def(cmd, user, users, bot, channelID, evt){
	Number.prototype.moneda = function() {
		const re = '\\d(?=(\\d{3})+\\D)',
			num = this.toFixed(Math.max(2));
		return (num.replace('.', ',')).replace(new RegExp(re, 'g'), '$&.')
	};

	const https = require("https");
	let message = cmd.substring(1).split(" ");
	let modo = message[1].toUpperCase();
	let cantidad = parseFloat(message[2]);
	let fin = "Aquí está la conversión:\n ```cs\n";
	
	if((modo === "D" || modo === "B") && !isNaN(cantidad)){
	https.get("https://s3.amazonaws.com/dolartoday/data.json", (resp) => {
		let data = "";
		let data2 = "";
		let arr = [];
		let pos=0;
						
		resp.on("data", (chunk) => {
			data += chunk;
		});
	
		resp.on("end", () => {
						
			let jsondata=JSON.parse(data);
						
			https.get("https://airtmrates.com/rates", (resp2) => {
	
				resp2.on("data", (chunk2) => {
					data2 += chunk2;
				});
	
				resp2.on("end", () => {
					pos=data2.search("VES");
					arr=data2.substring(pos,pos+70).split("\n")[0].split(",");
					if(arr[4] === "undefined"){arr[4]="OFFLINE";}
					
					let TasaAir = parseFloat(arr[4]);
					let TasaDolar = parseFloat(jsondata.USD.transferencia);
					
					if(modo === "D"){
						bot.sendMessage({
							to: channelID,
							message: "Tuve que usar una calculadora, porque esto es demasiada matemática para mí",
							embed:{
								color: 3141900,	
								title: "Cambio de USD a VES",
								fields: [
									{
										name: "Tasa DolarToday("+TasaDolar+" VES):",
										value: "$**"+cantidad+"** => **"+(cantidad*TasaDolar).moneda()+"** VES"
									},
									{
										name: "Tasa AirTM("+TasaAir+" VES):",
										value: "$**"+cantidad+"** => **"+(cantidad*TasaAir).moneda()+"** VES"
									}
								],
							}
						}, function(error, response){console.log(error);});
						
					}else if(modo === "B"){
						
						bot.sendMessage({
							to: channelID,
							message: "Tuve que usar una calculadora, porque esto es demasiada matemática para mí",
							embed:{
								color: 3141900,	
								title: "Cambio de VES a USD",
								fields: [
									{
										name: "Tasa DolarToday("+TasaDolar+" VES):",
										value: "**"+cantidad+"** VES => $**"+(cantidad/TasaDolar).moneda()+"**"
									},
									{
										name: "Tasa AirTM("+TasaAir+" VES):",
										value: "**"+cantidad+"** VES => $**"+(cantidad/TasaAir).moneda()+"**"
									}
								],
							}
						}, function(error, response){console.log(error);});
						
						//fin=fin+"#VES => USD\n\nTasa DolarToday("+TasaDolar+" VES):\n "+cantidad+" VES => $"+(cantidad/TasaDolar)+"\n\nTasa AirTM("+TasaAir+" VES):\n "+cantidad+" VES => $"+(cantidad/TasaAir);
					}
					
				});
			});	
							
		});

	}).on("error", (err) => {
		console.log("Error: " + err.message);
		bot.sendMessage({
			to: channelID,
			message: "Lo siento mano, no tengo internet."
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