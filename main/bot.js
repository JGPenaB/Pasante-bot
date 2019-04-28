const Discord = require("discord.io");
const dotenv = require("dotenv").config();
const logger = require("winston");
const https = require("https");
const PNGImage = require("pngjs-image");
const imageDataURI = require("image-data-uri");

//Prefijo
const pfix = "!";

const port = process.env.PORT || 8080;

//Configuración del logger
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), {
  colorize: true
});

logger.level = "debug";

//Inicializar el cliente de Discord (bot)
var bot = new Discord.Client({
  token: process.env.TOKEN,
  autorun: true
});

bot.on("ready", function(evt) {
  logger.info("Conectado");
  logger.info("Conectado como: ");
  logger.info(bot.username + " - (" + bot.id + ")");
});

bot.on("message", function(user, userID, channelID, message, evt) {
  if (message.substring(0, 1) == pfix) {
    let args = message.substring(1).split(" ");
    let cmd = args[0].toLowerCase();
    let nd = bot.servers[bot.channels[channelID].guild_id].members;
	
	//Archivo que contiene los posibles comandos y los archivos a ejecutar.
	let cmdlist = require("./cmd_list.js");
	
    //Extraer el username de los usuarios a un array
    let users = [];
    for (let key in nd) {
      if (
        nd[key].status !== undefined &&
        nd[key].status !== "offline" &&
        !bot.users[key].bot
      ) {
        users.push(bot.users[key].username);
      }
    }

	/*
	 Executa un archivo en base al comando proporcionado. Si el comando existe como propiedad de la lista de comandos,
	 llama al archivo que tiene como valor y ejecuta su función.
	*/
	if(cmdlist.binds.hasOwnProperty(cmd)){
      let exec = require("./cmd/" + cmdlist.binds[cmd]);
	  //console.log(exec);
      exec.def(message, user, users, bot, channelID, evt);
    } else {
      bot.sendMessage({
        to: channelID,
        message:
          "¿Perdón? No te entendí muy bien. Intenta esto:```cs\n !ayuda ```"
      });
    }
  }
});


//Evento personalizado
bot.on("any", function(event) {
	//console.log(event);
	//if(bot.servers[event.d.guild_id] != undefined){console.log(bot.servers[event.d.guild_id].roles);}
	
	//Si un usuario se une al server
	if(event.t === "GUILD_MEMBER_ADD"){
		
		//event.d.user.{username, id, discriminator, avatar}
		//event.d.roles
		//event.d.nick
		//event.d.mute
		
		bot.sendMessage({
			to: bot.servers[event.d.guild_id].system_channel_id,
			message: "Bienvenido <@!"+event.d.user.id+">, al server de **Web Development Venezuela**. Ve al canal <#502873450432692224> y saluda a la comunidad."
		});
		
		for(let key in bot.servers[event.d.guild_id].roles){
			if(bot.servers[event.d.guild_id].roles[key].name === "Member"){
				bot.addToRole({
					serverID: event.d.guild_id,
					userID: event.d.user.id,
					roleID: key
				}, function(error, response){console.log(error);});
				break;
			}
		}
		
	}
});
