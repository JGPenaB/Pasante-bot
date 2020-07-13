/* 
    Lista de alias válidos para el comando
*/
function aliases(){
    return [
        "time",
        "hora",
        "tiempo"
    ]
}

/**
 * Información sobre el comando
 */
function help(){
    return {
        "usage": "!time",
        "desc": "Muestra la fecha y hora actual de Venezuela y de otros países.",
        "example": "!time"
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
    function fecha(fecha, tz) {
        const op = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            timeZone: tz
        };

        return fecha.toLocaleString('en-US', op)
            .replace(/^(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2}) (\w{2})/, '$4:$5 $6 | $2/$1/$3');
    }

    const Ahora = new Date();

    bot.sendMessage({
        "to": channelID,
        "embed": {
            "color": 700605,
            "fields": [
                {
                    "name": ":flag_ve: Venezuela",
                    "value": fecha(Ahora, "America/Caracas")
                },
                {
                    'name': ':flag_cl: Chile',
                    "value": fecha(Ahora, "America/Santiago")
                }
            ]
        }
    });
}

module.exports = {aliases, help, main};
