const Discord = require('discord.io');
const dotenv = require('dotenv').config();
const logger = require('winston');
const https = require('https');
const PNGImage = require('pngjs-image');
const imageDataURI = require('image-data-uri');

//Prefijo
const pfix = "!";

const port = process.env.PORT || 8080;

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), {
    colorize: true
});

logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: process.env.TOKEN,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Conectado');
    logger.info('Conectado como: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});


bot.on('message', function (user, userID, channelID, message, evt) {
    if (message.substring(0, 1) == pfix) {
		let args = message.substring(1).split(' ');
        let cmd = args[0];
		let nd = bot.servers[bot.channels[channelID].guild_id].members;
		
		//Extraer el username de los usuarios a un array
		let users = [];
		for (let key in nd){
			if (nd[key].status != undefined && nd[key].status != 'offline' && !(bot.users[key].bot)){ users.push(bot.users[key].username);}
		}
		
		//Carga un archivo que contiene la lógica del comando y ejecuta su función.
		try{
			let exec = require("./cmd/"+cmd+".js");
			exec.def(message, user, users, bot, channelID, evt);
		}catch(err){
			console.log(err);
			bot.sendMessage({
                to: channelID,
                message: '¿Perdón? No te entendí muy bien. Intenta esto:```cs\n !ayuda ```'
            });
		}
		
     }
});


