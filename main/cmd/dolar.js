function def(cmd, user, users, bot, channelID, evt){
	const https = require("https");
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
					if(arr[4] == null){arr[4]="OFFLINE";}			
								
					//\n ```cs\n Tasa DolarToday:\n $1 => "+jsondata.USD.transferencia+" VES\n €1 => "+jsondata.EUR.transferencia+" VES\n\n Tasa AirTM:\n $1 => "+arr[4]+" VES```
					bot.sendMessage({
						to: channelID,
						message: "Mano, tuve que usar VPN y todo para ver esta vaina:",
						embed:{    
							color: 3141900,	
							title: "Tasa de conversión actual",
							fields: [
								{
									name: "Tasa DolarToday",
									value: "$1 => **"+jsondata.USD.transferencia+"** VES\n€1 => **"+jsondata.EUR.transferencia+"** VES"
								},
								{
									name: "Tasa AirTM",
									value: "$1 => **"+arr[4]+"** VES"
								}
							],
							
						}
					}, function(error, response){console.log(error);});
				});
			});	
							
		});

	}).on("error", (err) => {
		console.log("Error: " + err.message);
		bot.sendMessage({
			to: channelID,
			message: "Lo siento mano, yo no me voy a arriesgar a que me quiten el internet solo por esa vaina."
			}); 
		});
};

module.exports.def = def;