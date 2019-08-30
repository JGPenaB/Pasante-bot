#!/usr/bin/env node

const Discord = require("discord.io");
require("dotenv").config();
const logger = require("winston");

//Prefijo
const pfix = "!";

//Configuración del logger
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), {
    colorize: true
});

logger.level = "debug";

//Inicializar el cliente de Discord (bot)
const bot = new Discord.Client({
    token: process.env.TOKEN,
    autorun: true
});

bot.on("ready", function (evt) {
    logger.info("Conectado");
    logger.info("Conectado como: ");
    logger.info(bot.username + " - (" + bot.id + ")");
});

bot.on("message", function (user, userID, channelID, message, evt) {
    if (message.substring(0, pfix.length) === pfix) {
        let args = message.substring(pfix.length).split(" ");
        let cmd = args[0].toLowerCase();
        let MemberList = bot.servers[bot.channels[channelID].guild_id].members;

        //Archivo que contiene los posibles comandos y los archivos a ejecutar.
        let cmdlist = require("./cmd_list.js");

        //Extraer el username de los usuarios a un array
        let users = [];
        for (let key in MemberList) {
            if (
                MemberList[key].status !== undefined &&
                MemberList[key].status !== "offline" &&
                !bot.users[key].bot
            ) {
                users.push(bot.users[key].username);
            }
        }

        /*
         Executa un archivo en base al comando proporcionado. Si el comando existe como propiedad de la lista de comandos,
         llama al archivo que tiene como valor y ejecuta su función.
        */
        if (cmdlist.binds.hasOwnProperty(cmd)) {
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
bot.on("any", function (event) {
    //Si un usuario se une al server
    if (event.t === "GUILD_MEMBER_ADD" && bot.servers[event.d.guild_id].name === "Sin barreras") {

        // Se le manda saludo al nuevo novato que acaba de entrar
        bot.sendMessage({
            to: bot.servers[event.d.guild_id].system_channel_id,
            message: "Bienvenido <@!" + event.d.user.id + ">, al server de **Sin barreras**."
        });
    }
});
