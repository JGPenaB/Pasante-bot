function def(cmd, user, users, bot, channelID, evt){
	const https = require('https');
	let args = cmd.substring(1).split(' ');
    let mcmd = args[0];
	let other = args[1];
	let top5 = "```cs\n";
	
	//Moneda específica
	if (typeof other != 'undefined'){
					
		https.get('https://api.coinmarketcap.com/v2/ticker/', (resp) => {
			let data = '';
			let lista = [];
						
			resp.on('data', (chunk) => {
				data += chunk;
			});
	
			resp.on('end', () => {
							
				jsondata=JSON.parse(data);
							
				for(key in jsondata.data){
					lista.push(jsondata.data[key]);
				}
							
				lista.sort(function(a,b){
					return parseInt(a.rank) - parseInt(b.rank);
				});
							
				//concatenación de toda la info
				for(let i=0; i<lista.length;i++){
					if(lista[i].symbol == other.toUpperCase()){
						bot.sendMessage({
							to: channelID,
							message: "Pana, al fín encontré info sobre esa moneda que me dijiste: \n ```cs\n #"+(i+1)+". "+lista[i].name+" \n"+lista[i].symbol+" => $"+lista[i].quotes.USD.price+"\n```"
						});
						break;
					}
				}
			});

			}).on("error", (err) => {
				console.log("Error: " + err.message);
				bot.sendMessage({
					to: channelID,
					message: 'Lo siento mano, estuve ocupado con la geva y no pude hacer lo que me pediste. ¿Tal vez otra oportunidad?'
				}); 
			});
					
	}else{
					
		//Top 10 de monedas
		https.get('https://api.coinmarketcap.com/v2/ticker/?limit=10', (resp) => {
			let data = '';
			let lista = [];
						
			resp.on('data', (chunk) => {
				data += chunk;
			});
	
			resp.on('end', () => {
							
				jsondata=JSON.parse(data);
							
				for(key in jsondata.data){
					console.log(key);
					lista.push(jsondata.data[key]);
				}
							
				lista.sort(function(a,b){
					return parseInt(a.rank) - parseInt(b.rank);
				});
							
				//concatenación de toda la info
				for(let i=0; i<lista.length;i++){
					top5+="#"+(i+1)+". "+lista[i].name+" \n"+lista[i].symbol+" => $"+lista[i].quotes.USD.price+"\n\n";
				}
							
				bot.sendMessage({
				to: channelID,
				message: 'Buenas, estuve investigando y la vaina está así: \n'+top5+"```"
				});
		});

		}).on("error", (err) => {
			console.log("Error: " + err.message);
			bot.sendMessage({
				to: channelID,
				message: 'Lo siento mano, estuve ocupado con la geva y no pude hacer lo que me pediste. ¿Tal vez otra oportunidad?'
			}); 
		});
					
	}
};

module.exports.def = def;