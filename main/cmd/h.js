function def(cmd, user, users, bot, channelID, evt){
	let command = cmd.substring(3);
	let response = "";
	let content = "";
	
	if (command.length === 0){
		bot.sendMessage({
			to: channelID,
			message: 'Buenos días a todos, soy pasante en este server porque necesito la experiencia para el currículum. Cualquier duda:',
			embed:{    
				color: 16749596,	
				title: "Pasante Bot",
				fields: [
					{
						name: "Lista de comandos:",
						value: "cafe\ncn\ncr\ndef\ndolar\nh\nmrc\nsearch\ntime\n"
					},
					{
						name: "¿Ayuda más específica?",
						value: "Usa el comando **!h** seguido del nombre del comando que vayas a usar:\n\n!h dolar\n!h def\n..."
					}
				],
						
			}
		});
		
	}else{
		
		switch(Math.floor(Math.random()*5)+1){
			case 1:
				response = "Bueno manao, así es el beta.";
			break;
			case 2:
				response = "Así es como se usa el comando que pediste.";
			break;
			case 3:
				response = "El comando se usa de la siguiente manera.";
			break;
			case 4:
				response = "El comando tiene estas instrucciones.";
			break;
			case 5:
				response = "El betulio es así manaurem.";
			break;
			case 6:
				response = "Así es como se hace la vaina, menor.";
			break;
		}
		
		switch(command.toUpperCase()){
			case "H":
				bot.sendMessage({
					to: channelID,
					message: response,
					embed:{    
						color: 16749596,	
						title: "!h",
						fields: [
							{
								name: "Descripción:",
								value: "Se usa para visualizar información referente a los comandos del bot."
							},
							{
								name: "Uso:",
								value: "!h\n!h [nombre del comando]"
							},
							{
								name: "Ejemplos:",
								value: "Traer información del comando def:\n!h def\n\nTraer información del comando dolar:\n!h dolar"
							}
						],
						
					}
				}, function(error, response){console.log(error);});
			break;
			
			case "MRC":
				bot.sendMessage({
					to: channelID,
					message: response,
					embed:{    
						color: 16749596,	
						title: "!mrc",
						fields: [
							{
								name: "Descripción:",
								value: "Cuenta un secreto que solo Pasante sabe."
							},
							{
								name: "Uso:",
								value: "!mrc"
							}
						],
						
					}
				}, function(error, response){console.log(error);});
			break;
			
			case "DOLAR":
				bot.sendMessage({
					to: channelID,
					message: response,
					embed:{    
						color: 16749596,	
						title: "!dolar",
						fields: [
							{
								name: "Descripción:",
								value: "Consulta la tasa de cambio actual de AirTM y DolarToday."
							},
							{
								name: "Uso:",
								value: "!dolar"
							}
						],
						
					}
				}, function(error, response){console.log(error);});
			break;
			
			case "CN":
				bot.sendMessage({
					to: channelID,
					message: response,
					embed:{    
						color: 16749596,	
						title: "!cn",
						fields: [
							{
								name: "Descripción:",
								value: "Convierte USD a VES (o vice versa) usando las tasas de cambio de AirTM y DolarToday."
							},
							{
								name: "Uso:",
								value: "!cn [B o D] [monto]"
							},
							{
								name: "Ejemplos:",
								value: "Si quiero convertir $10 a Bolívares Soberanos (VES):\n!cn d 10\n\nSi quiero convertir 500 Bolívares Soberános a Dólar (USD):\n!cn b 500"
							}
						],
						
					}
				}, function(error, response){console.log(error);});
			break;
			
			case "DEF":
				bot.sendMessage({
					to: channelID,
					message: response,
					embed:{    
						color: 16749596,	
						title: "!def",
						fields: [
							{
								name: "Descripción:",
								value: "Busca un artículo en la Wikipedia en **Inglés**, y muestra una pequeña definición con el link al artículo."
							},
							{
								name: "Uso:",
								value: "!def [palabra o frase]"
							},
							{
								name: "Ejemplos:",
								value: "Si busco a Venezuela:\n!def venezuela\n\nSi busco algo relacionado con software, como Docker:\n!def docker software"
							}
						],
						
					}
				}, function(error, response){console.log(error);});
			break;
			
			case "CR":
				bot.sendMessage({
					to: channelID,
					message: response,
					embed:{    
						color: 16749596,	
						title: "!CR",
						fields: [
							{
								name: "Descripción:",
								value: "Consulta las 10 mejores criptomonedas del mercado, o busca el valor de una criptomoneda en específico."
							},
							{
								name: "Uso:",
								value: "!cr\n!cr [moneda]"
							},
							{
								name: "Ejemplos:",
								value: "Si quiero la lista de las 10 mejores criptomonedas:\n!cr\n\nSi busco una moneda en específico, uso el símbolo de la misma:\n!cr BTC (para bitcoin)\n!cr XMR (para monero)"
							}
						],
						
					}
				}, function(error, response){console.log(error);});
			break;
			
			case "TIME":
				bot.sendMessage({
					to: channelID,
					message: response,
					embed:{    
						color: 16749596,	
						title: "!time",
						fields: [
							{
								name: "Descripción:",
								value: "Muestra la fecha y hora actual de Venezuela"
							},
							{
								name: "Uso:",
								value: "!time"
							}
						],
						
					}
				}, function(error, response){console.log(error);});
			break;
			
			case "SEARCH":
				bot.sendMessage({
					to: channelID,
					message: response,
					embed:{    
						color: 16749596,	
						title: "!search",
						fields: [
							{
								name: "Descripción:",
								value: "Busca una imagen en Google usando un query, y lo postea en el chat. **Los queries son limitados**."
							},
							{
								name: "Uso:",
								value: "!search [query]"
							},
							{
								name: "Ejemplos:",
								value: "Si busco una imagen de Venezuela:\n!search Venezuela\n\nSi busco una película como Toy Story:\n!search toy story"
							}
						],
						
					}
				}, function(error, response){console.log(error);});
			break;
			
			case "CAFE":
				bot.sendMessage({
					to: channelID,
					message: response,
					embed:{    
						color: 16749596,	
						title: "!cafe",
						fields: [
							{
								name: "Descripción:",
								value: "Te trae un café imaginario."
							},
							{
								name: "Uso:",
								value: "!cafe"
							}
						],
						
					}
				}, function(error, response){console.log(error);});
			break;
			
			
			default:
				bot.sendMessage({
					to: channelID,
					message: "Lo siento, ese comando no lo conozco. Cuando firmé para la pasantía en este server, no me pidieron eso."
				});
			break;
		}
	}
	
};

module.exports.def = def;