
/* 
    Lista de alias válidos para el comando
*/
function aliases(){
    return [
        "mrc",
        "marico"
    ]
}

/**
 * Información sobre el comando
 */
function help(){
    return {
        "usage": "!mrc",
        "desc": "Cuenta un secreto que solo Pasante sabe.",
        "example": "!mrc"
    }
}

/**
 * Función principal del comando
 * @param {*} cmd comando original
 * @param {*} user usuario que escribió el comando
 * @param {*} users lista de usuarios en el server
 * @param {*} bot el cliente
 * @param {*} channelID el canal donde se envió el comando
 * @param {*} evt lista de eventos
 */
function main(cmd, user, users, bot, channelID, evt) {

    let marico = ``;
    let ind = Math.floor(Math.random() * (users.length));
    switch (Math.floor(Math.random() * 11) + 1) {

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
            marico = `Oí que **${users[ind]}** mea sentada.`;
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

        case 11:
            marico = `A **${users[ind]}** le gustan los garrotes.`;
            break;

        case 11:
            marico = `A **${users[ind]}** le limpian las cañerias a diario.`;
            break;
    }

    bot.sendMessage({
        to: channelID,
        message: marico
    });
}

module.exports = {aliases, help, main};