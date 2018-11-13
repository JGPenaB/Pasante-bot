const request = require("request");
const cheerio = require("cheerio");

function def(cmd, user, users, bot, channelID, evt) {
  const query = encodeURI(cmd.substring(8));
  // const query = encodeURI("Mia Khalifa");
  const url = `https://www.bing.com/images/search?q=${query}&safesearch=off`;

  // Si entra acá todo bien
  request(url, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      let $ = cheerio.load(body);
      let link = $("img")[2].attribs.src;

      // Quita los parametros que recortan la img
      link = link.substr(0, 61);

      // Si entra acá todo bien al mandar el msg a discord
      bot.sendMessage(
        {
          to: channelID,
          message: "Una imagen",
          embed: {
            color: 6826080,
            footer: {
              text: "Powered by Bing."
            },
            image: {
              url: link
            }
          }
        }
      );
      // console.log(link);
    }

    if (err || res.statusCode != 200) {
      // Si entra acá hubo un error al hacer el request, posible mal URL

      bot.sendMessage({
        to: channelID,
        message: "El Autz no sabe programar",
        embed: {
          color: 6826080,
          footer: {
            text: "Dificultades tecnicas brother"
          },
          image: {
            url: "https://i.ytimg.com/vi/a3rmgGoibsE/maxresdefault.jpg"
          }
        }
      });
      // console.error(error, response.statusCode);
    }
  });
}
// def();
module.exports.def = def;
