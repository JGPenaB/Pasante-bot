const request = require("request");
const cheerio = require("cheerio");

function def(cmd, user, users, bot, channelID, evt) {
  const query = encodeURI(cmd.substring(4));
  // const query = encodeURI("Ali primera");
  const url = `https://www.youtube.com/results?search_query=${query}`;

  request(url, (err, res, body) => {
    if (err || res.statusCode != 200) {
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
      // console.error(err);
    }

    if (!err && res.statusCode == 200) {
      // console.log("good");
      let $ = cheerio.load(body);
      let link = $("a")[39].attribs.href;
      link = `https://www.youtube.com${link}`;

      // console.log(`https://www.youtube.com${link}`);

      // Si entra acá todo bien al mandar el msg a discord
      bot.sendMessage(
        {
          to: channelID,
          message: "Un video",
          embed: {
            color: 6826080,
            footer: {
              text: "Powered by Lloutube."
            },
            image: {
              url: link
            }
          }
        },
        function(err, res) {
          // Si entra acá hubo un error para mandar el msg a discord
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
        }
      );
    }
  });
}

// def();
module.exports.def = def;
