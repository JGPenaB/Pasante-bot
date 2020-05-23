function def(cmd, user, users, bot, channelID, evt) {

    let marico = ``;
    let ind = Math.floor(Math.random() * (users.length));
    switch (Math.floor(Math.random() * 9) + 1) {

        case 1:
            marico = `¡**${users[ind]}** es ***ROLO'E MARICO!***`;
            break;

        case 2:
            marico = `Bueno, me dijeron que **${users[ind]}** es sendo pato. No lo pongo en duda.`;
            break;

        case 3:
            marico = `¿Sabían que a **${users[ind]}** le gustan los hombres?`;
            break;

        case 4:
            marico = `A **${users[ind]}** le gusta que le den por la puerta trasera.`;
            break;

        case 5:
            marico = `A **${users[ind]}** le gusta que lo hagan cagar pa dentro.`;
            break;

        case 6:
            marico = `**${users[ind]}** mea sentada.`;
            break;

        case 7:
            marico = `A **${users[ind]}** se le moja la canoa.`;
            break;

        case 8:
            marico = `**${users[ind]}** es senda piaso e bicha.`;
            break;

        case 9:
            marico = `**${users[ind]} piaso e puta.`;
            break;

        case 10:
            marico = `**${users[ind]}** muchacho marico.`;
            break;
    }

    bot.sendMessage({
        to: channelID,
        message: marico
    });
}

module.exports.def = def;