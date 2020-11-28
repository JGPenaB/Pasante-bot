const { Message } = require('discord.js');

/**
 * Información sobre el comando
 * 
 * @return { Object }
 */
const help = () => {
    return {
        "usage": "!avatar",
        "desc": "Obtiene el avatar de algun usuario que menciones",
        "example": "!avatar @bayke"
    }
};

/**
 * Lista de alias válidos para el comando
 * 
 * @return { Array<string> }
 */
const aliases = () => {
    return ['avatar'];
};


/**
 * Manejador del comando
 * 
 * @param { Message } message Evento completo del mensaje
 */
const main = async (message, userName) => {
    const prefix = process.env.PREFIX;
    const args = message.content.substring(prefix.length+7);
    let members = message.guild.members.cache
        .map(member => member.user.username.toLowerCase());

    const alias = message.guild.members.cache.filter(member => {
        return member.nickname != null;
    }).map(member => member.nickname.toLowerCase());

    members = members.concat(alias);

    let user, mensaje;

    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
        mensaje = `El avatar del panita mencionado: ${user.username}`;

        //console.log("Lo menciono");

    } else if (args && members.indexOf(args.toLowerCase()) > -1) {
        user = message.guild.members.cache.filter(member => {
            return member.user.username.toLowerCase() == args.toLowerCase() || (member.nickname && member.nickname.toLowerCase() == args.toLowerCase());
        });
        user = user.values().next().value.user;

        mensaje = `El avatar del panita: ${user.username}`;

        //console.log("Lo escribio pelao");
    } else {
        user = message.author;

        mensaje = `Medio marico que eres, no encontre a nadie asi. Toma tu avatar ${user.username}`;

        //console.log("404");
    }

    //console.log(user);

    message.channel.send('Ay vale,  pendiente del avatar de los tipos', {
        embed: {
            color: 2264407,
            title: `${mensaje}`,
            image: {
                url: user.avatarURL({size: 2048})
            }
        }
    });
};

module.exports = { aliases, help, main };
