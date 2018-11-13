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
      // let all = $("a").each( (i, e) => {
      //   console.log(i, e.attribs.href);
      // })
      // let link = $("a")[43].attribs.href;
      // let length = $("a").length;
      // link = `https://www.youtube.com${link}`;

      // console.log(link);

      $("a").each( (i, e) => {
        bot.sendMessage(
          {
            to: channelID,
            message: i + " " + e.attribs.href
          }
        );
      })

      // Si entra acá todo bien al mandar el msg a discord
      // bot.sendMessage(
      //   {
      //     to: channelID,
      //     message: "Tu maldito video:" + length + "\n " + link
      //   }
      // );
    }
  });
}

// def("!yt ali primera");
module.exports.def = def;
