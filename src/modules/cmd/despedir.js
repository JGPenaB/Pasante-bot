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
const main = async (message, userName) => {
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

        for (const rambling of randomRambling) {

            //Simula escritura en tiempo real (44 ms por caracter)
            message.channel.startTyping();

            await flow.sleep(rambling.length*40);

            message.channel.stopTyping();

            message.channel.send(rambling.replace('__USERNAME__', userName));

            //Aguanta un poco antes del siguiente mensaje
            await flow.sleep(500);
        }

        await bot.setAvatar(randomAvatar);
        
        await flow.sleep(5000);
        
        message.channel.startTyping();

        await flow.sleep(randomIntroduction.length*40);
        
        message.channel.stopTyping();

        message.channel.send(randomIntroduction);

    } catch (error) {
        console.log(error);

        const answer = messages.error[Math.floor(Math.random() * messages.error.length)];

        message.channel.send(answer);
    }

    /* bot.setAvatar() */
};

module.exports = { aliases, help, main };
