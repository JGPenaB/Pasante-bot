const fs = require('fs');
const path = require('path');
const util = require('util');

const { Message } = require('discord.js');

const messages = require('../messages/despedir');
const flow = require('../../utils/flow');
const random = require('../../utils/random');

/**
 * Lista de alias válidos para el comando
 * 
 * @return { Array<string> }
 */
const aliases = () => {
    return ['despedir', 'despido'];
};

/**
 * Información sobre el comando
 * 
 * @return { Object }
 */
const help = () => {
    return {
        "usage": "!despedir",
        "desc": "Despide al pasante de turno.",
        "example": "!despedir"
    }
};

/**
 * Manejador del comando
 * 
 * @param { Message } message Evento completo del mensaje
 */
const main = async (message) => {
    const readDir = util.promisify(fs.readdir);
    const readFile = util.promisify(fs.readFile);

    const avataresFolder = path.join(__dirname, '../../img/avatares');

    const bot = message.client.user;
    
    try {
        const files = await readDir(avataresFolder);

        const randomRambling = messages.fired[random.num(messages.fired.length)];
        const randomIntroduction = messages.introduction[random.num(messages.introduction.length)];

        const images = files.filter(file => {
            const fileParts = file.split('.');
            const extension = fileParts[fileParts.length - 1];

            return extension === 'jpg' || extension === 'png' || extension === 'jpeg';
        });

        let randomAvatar = images[random.num(images.length)];
        randomAvatar = await readFile(`${avataresFolder}/${randomAvatar}`);

        message.channel.send(randomRambling[0]);

        randomRambling.shift();

        for (const rambling of randomRambling) {
            await flow.sleep(2000);
            
            message.channel.send(rambling);
        }

        await bot.setAvatar(randomAvatar);
        
        await flow.sleep(5000);

        message.channel.send(randomIntroduction);

    } catch (error) {
        console.log(error);

        const answer = messages.error[Math.floor(Math.random() * messages.error.length)];

        message.channel.send(answer);
    }

    /* bot.setAvatar() */
};

module.exports = { aliases, help, main };
