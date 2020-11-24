#!/usr/bin/env node
require("dotenv").config();

const Discord = require("discord.js");
const logger = require("winston");
const commands = require("./modules");

const client = new Discord.Client({
    fetchAllMembers: true,
});

//Prefijo
const prefix = process.env.PREFIX;

//Configuración del logger
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), {
    colorize: true
});

logger.level = "debug";

client.once('ready', () => {
    console.log('Connected to discord');
});

client.login(process.env.TOKEN);

client.on('message', (message) => {
    if (message.author.bot || !message.content.startsWith(prefix)) {
        return;
    }

    const member = message.guild.member(message.author);
    const cmd = message.content.substring(prefix.length).split(' ')[0].toLowerCase();

    if (commands.hasOwnProperty(cmd)) {
        return commands[cmd].main(message, member.displayName, commands);
    }

    message.channel.send('¿Disculpa? No te entendí muy bien. Intenta esto:```cs\n !ayuda ```');
});
