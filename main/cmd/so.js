function def(cmd, user, users, bot, channelID, evt){
	
	/*
	Misión cumplida, señor Anderson?
	*/
	
	const https = require('https');
	const request = require("request");
	const cheerio = require("cheerio");
	
	let query=cmd.substring(cmd.search(" "),cmd.length);
	let url = "https://api.stackexchange.com/2.2/similar?pagesize=1&order=desc&sort=relevance&title="+query+"&site=stackoverflow&key="+process.env.SO_KEY;

	request({uri: url, gzip: true}, function (err, res, body) {
		jsondata_base=JSON.parse(body);
		let final_data = '';
		console.log(jsondata_base);
		
		if(jsondata_base.items.length > 0){
			
			if(!jsondata_base.items[0].is_answered){
			bot.sendMessage({
				to: channelID,
				message: "Encontré una pregunta, pero no posee una respuesta definitiva. Puedes revisarlo si te interesa: \n"+jsondata_base.items[0].link
			});
			}else{
				https.get(jsondata_base.items[0].link, function(resp){
					resp.on('data', (c) => {
						final_data += c;
					});
		
					resp.on('end', () =>{
						let $ = cheerio.load(final_data);
						let pred = $(".answercell").first().text();
						let final_text = pred.substring(0,pred.search("share"));
					
						//Para evitar errores con el embed
						if(final_text.length > 1020) final_text=final_text.substring(0,1020)+"...";
				
						bot.sendMessage({
							to: channelID,
							message: 'Esto fue lo primero que encontré en Stack Overflow:',
							embed:{    
								color: 16749596,	
								title: jsondata_base.items[0].title,
								url: jsondata_base.items[0].link,
								fields: [
									{
										name: "Respuesta",
										value: final_text.trim()
									}
								],
							}
						}, function(error, response){console.log(error);});
					});
				});
			}
		}else{
			bot.sendMessage({
				to: channelID,
				message: "No pude encontrar nada en Stack Overflow."
			});
		}
	});
};

module.exports.def = def;