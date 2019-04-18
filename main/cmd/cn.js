function def(cmd, user, users, bot, channelID, evt){
	
	const https = require('https');
	let message = cmd.substring(1).split(' ');
	let modo = message[1].toUpperCase();
	let cantidad = parseFloat(message[2]);
	let fin = "Aquí está la conversión:\n ```cs\n";
	
	if((modo == "D" || modo == "B") && !isNaN(cantidad)){
	https.get('https://s3.amazonaws.com/dolartoday/data.json', (resp) => {
		let data = '';
		let data2 = '';
		let arr = [];
		let pos=0;
						
		resp.on('data', (chunk) => {
			data += chunk;
		});
	
		resp.on('end', () => {
						
			jsondata=JSON.parse(data);
						
			https.get('https://airtmrates.com/rates', (resp2) =>{
	
				resp2.on('data', (chunk2) => {
					data2 += chunk2;
				});
	
				resp2.on('end', () => {
					pos=data2.search('VES');
					arr=data2.substring(pos,pos+70).split('\n')[0].split(',');
					if(arr[4] == 'undefined'){arr[4]="OFFLINE";}
					
					let tasa_air = parseFloat(arr[4]);
					let tasa_dolar = parseFloat(jsondata.USD.transferencia);
					
					if(modo == 'D'){
						bot.sendMessage({
							to: channelID,
							message: "Tuve que usar una calculadora, porque esto es demasiada matemática para mí",
							embed:{
								color: 3141900,	
								title: "Cambio de USD a VES",
								fields: [
									{
										name: "Tasa DolarToday("+tasa_dolar+" VES):",
										value: "$**"+cantidad+"** => **"+(cantidad*tasa_dolar)+"** VES"
									},
									{
										name: "Tasa AirTM("+tasa_air+" VES):",
										value: "$**"+cantidad+"** => **"+(cantidad*tasa_air)+"** VES"
									}
								],
							}
						}, function(error, response){console.log(error);});
						
					}else if(modo == 'B'){
						
						bot.sendMessage({
							to: channelID,
							message: "Tuve que usar una calculadora, porque esto es demasiada matemática para mí",
							embed:{
								color: 3141900,	
								title: "Cambio de VES a USD",
								fields: [
									{
										name: "Tasa DolarToday("+tasa_dolar+" VES):",
										value: "**"+cantidad+"** VES => $**"+(cantidad/tasa_dolar)+"**"
									},
									{
										name: "Tasa AirTM("+tasa_air+" VES):",
										value: "**"+cantidad+"** VES => $**"+(cantidad/tasa_air)+"**"
									}
								],
							}
						}, function(error, response){console.log(error);});
						
						//fin=fin+"#VES => USD\n\nTasa DolarToday("+tasa_dolar+" VES):\n "+cantidad+" VES => $"+(cantidad/tasa_dolar)+"\n\nTasa AirTM("+tasa_air+" VES):\n "+cantidad+" VES => $"+(cantidad/tasa_air);
					}
					
				});
			});	
							
		});

	}).on("error", (err) => {
		console.log("Error: " + err.message);
		bot.sendMessage({
			to: channelID,
			message: 'Lo siento mano, no tengo internet.'
			}); 
		});
	}else{
		bot.sendMessage({
			to: channelID,
			message: 'Mano, no puedo hacer la conversión si faltan datos o los datos que me das estan malos.'
			}); 
	}
};

module.exports.def = def;