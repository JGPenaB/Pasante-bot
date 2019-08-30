function def(cmd, user, users, bot, channelID, evt) {
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
                    'name': ':flag_co: Colombia',
                    "value": fecha(Ahora, "America/Bogota")
                },
                {
                    'name': ':flag_cl: Chile',
                    "value": fecha(Ahora, "America/Santiago")
                },
                {
                    'name': ':flag_do: República Dominicana',
                    "value": fecha(Ahora, "America/Santo_Domingo")
                }
            ]
        }
    });
}

module.exports.def = def;
