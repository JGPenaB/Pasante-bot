var request = require("request");

// cmd, users, bot, channelID, evt

// AIzaSyDXRDiDFiVs4kX-O3SZijMmZ6CriEWrbN0
// AIzaSyAeQz6NFOKJB53Z8LqCXp5x0OxAp36FD14


function def(cmd, users, bot, channelID, evt) {
  const query = cmd.substring(8);
  const key = "AIzaSyAeQz6NFOKJB53Z8LqCXp5x0OxAp36FD14";
  const cx = "003208579516977437485:krqbsnzmnrw";

  let url = `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cx}&q=${query}`;

  request( // Primer parametro un objeto con URL, y diciendo que será un JSON
    {
      url: url,
      json: true
    },
    function(error, response, body) {
      if (!error && response.statusCode === 403) { // Si entra acá es porque se agotaron los 100 querys
        if (body.error) {
          console.log(body.error.code+ "\n" +body.error.message);
        }
      }

      if (!error && response.statusCode === 200) { // Si entra acá todo se hizo correctamente
        // console.log(body); // Print the json response
        for (var i = 0; i < 1; i++) {
          let item = body.items[i];
          let title = item.title;
          let link = "no image";
          if (item.pagemap) {
            link = item.pagemap.cse_image[0].src;
          }
          console.log(link);
        }
      }
    }
  );
}

module.exports.def = def;