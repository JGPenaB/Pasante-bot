#!/usr/bin/env node
const Discord = require("discord.io");
require("dotenv").config();
const logger = require("winston");

const commands = require("./modules");

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

        //Extraer el username de los usuarios a un array
        let users = [];
        for (let key in MemberList) {
            if (
                MemberList[key].status !== undefined &&
                MemberList[key].status !== "offline" &&
                !bot.users[key].bot
            ) {
                if (MemberList[key].nick) {

                    //Reemplaza el username por el nick para el que inició un evento
                    if(MemberList[key].username === user){
                        user = MemberList[key].nick;
                    }
                    
                    users.push(MemberList[key].nick);
                } else {
                    users.push(bot.users[key].username);
                }
            }
        }

        /*
            Ejecuta un comando en base al alias proporcionado. Si el comando existe como propiedad de la lista de comandos,
            ejecuta su función que tiene asignada.
        */
        if (commands.hasOwnProperty(cmd)) {
            commands[cmd].main(message, user, users, bot, channelID, evt);
        } else {
            /*
                Caso contrario, verifica si se escribió el comando para la ayuda
            */
            if (cmd === "h" || cmd === "help" || cmd === "ayuda") {
                let subcmd = message.substring(1).split(" ")[1];

                if (subcmd == null) {
                    let cmdlist = "";

                    //Armando la lista de comandos para presentarla
                    Object.keys(commands).forEach(element => {
                        let cmdalias = commands[element].aliases()[0];
                        if (cmdlist.indexOf(cmdalias) === -1) {
                            cmdlist += cmdalias+"\n";
                        }
                    });

                    bot.sendMessage({
                        to: channelID,
                        message: "Buenos días a todos, soy pasante en este server porque necesito la experiencia para el currículum. Cualquier duda:",
                        embed: {
                            color: 16749596,
                            title: "Pasante Bot",
                            fields: [
                                {
                                    name: "Lista de comandos:",
                                    value: cmdlist
                                },
                                {
                                    name: "¿Ayuda más específica?",
                                    value: "Usa el comando **!ayuda** seguido del nombre del comando que vayas a usar:\n\n!ayuda dolar\n!ayuda define\n..."
                                }
                            ],
            
                        }
                    }, function (error, response) {
                        if (error) {
                            console.log(error);
                        }
                    });
                } else if (commands.hasOwnProperty(subcmd)) {
                    
                    //Pidiendo la información del comando con un formato específico
                    let commandInfo = commands[subcmd].help();
                    let commandAliases = commands[subcmd].aliases();
                    let commandTitle = "";
                    let response = "";

                    //Crea el título del comando en base a los alias existentes
                    commandAliases.forEach(alias => {
                        commandTitle += pfix + alias+"   ";
                    });

                    switch (Math.floor(Math.random() * 5) + 1) {
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

                    bot.sendMessage({
                        to: channelID,
                        message: response,
                        embed: {
                            color: 16749596,
                            title: commandTitle,
                            fields: [
                                {
                                    name: "Descripción:",
                                    value: commandInfo.desc
                                },
                                {
                                    name: "Uso:",
                                    value: commandInfo.usage
                                },
                                {
                                    name: "Ejemplos:",
                                    value: commandInfo.example
                                }
                            ],
    
                        }
                    }, function (error, response) {
                        if(error){
                            console.log(error);
                        }
                    });
                }else{
                    bot.sendMessage({
                        to: channelID,
                        message: "Lo siento, ese comando no lo conozco. Cuando firmé para la pasantía en este server, no me pidieron eso."
                    });
                }
            }else{
                bot.sendMessage({
                    to: channelID,
                    message:
                        "¿Disculpa? No te entendí muy bien. Intenta esto:```cs\n !ayuda ```"
                });
            }
        }
    }
});


//Evento personalizado
bot.on("any", function (event) {
    //Si un usuario se une al server
    if (event.t === "GUILD_MEMBER_ADD") {
        // Se le manda saludo al nuevo novato que acaba de entrar
        bot.sendMessage({
            to: bot.servers[event.d.guild_id].system_channel_id,
            message: "Bienvenido <@!" + event.d.user.id + ">, al server. Rolitranco e pato."
        });
    }
});
