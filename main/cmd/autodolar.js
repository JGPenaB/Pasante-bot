function def(cmd, user, users, bot, channelID, evt) {
  bot.sendMessage({
    to: channelID,
    message: `Se activo el autodolar, se imprimira el precio cada 20 minutos`
  });
  setInterval(function() {
    // Funcion para mostrar la fecha correcamente
    function dateFormat(d) {
      return (
        d.getDate() +
        "/" +
        (d.getMonth() + 1) +
        "/" +
        d.getFullYear() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds()
      );
    }

    let dateNow = new Date();
    // cogemos la fecha utc
    let dateUTC = new Date(
      dateNow.getUTCFullYear(),
      dateNow.getUTCMonth(),
      dateNow.getUTCDate(),
      dateNow.getUTCHours(),
      dateNow.getUTCMinutes(),
      dateNow.getUTCSeconds()
    );

    // Definimos la diferencia en horas del time zone
    // Para la diferencia horaria de dos horas y media seria 2.5
    let tz = -4;
    // Calculamos los segundos de la zona horaria
    let seconds = tz * 60 * 60 * 1000;

    // Aplicamos la diferencia horaria añadiendo los segundos al timestamp de la
    // fecha UTC
    dateUTC.setTime(dateUTC.getTime() + seconds);

    let fechaUTC_timeZone = "Fecha y Hora en Venezuela: " + dateFormat(dateUTC);

    const https = require("https");
    https
      .get("https://s3.amazonaws.com/dolartoday/data.json", resp => {
        let data = "";
        let data2 = "";
        let arr = [];
        let pos = 0;

        resp.on("data", chunk => {
          data += chunk;
        });

        resp.on("end", () => {
          jsondata = JSON.parse(data);

          https.get("https://airtmrates.com/rates", resp2 => {
            resp2.on("data", chunk2 => {
              data2 += chunk2;
            });

            resp2.on("end", () => {
              pos = data2.search("VES");
              arr = data2
                .substring(pos, pos + 70)
                .split("\n")[0]
                .split(",");
              if (arr[4] == "undefined") {
                arr[4] = "OFFLINE";
              }

              bot.sendMessage({
                to: channelID,
                message:
                  fechaUTC_timeZone + "\nTasa de cambio actual:\n ```cs\n Tasa DolarToday:\n $1 => " +
                  jsondata.USD.transferencia +
                  " VES\n €1 => " +
                  jsondata.EUR.transferencia +
                  " VES\n\n Tasa AirTM:\n $1 => " +
                  arr[4] +
                  " VES```"
              });
            });
          });
        });
      })
      .on("error", err => {
        console.log("Error: " + err.message);
        bot.sendMessage({
          to: channelID,
          message:
            "Lo siento mano, yo no me voy a arriesgar a que me quiten el internet solo por esa vaina."
        });
      });
  }, 1.2e6);
}

module.exports.def = def;