function def(cmd, user, users, bot, channelID, evt) {
    let pos = cmd.search(" ");
    const query = cmd.substring(pos+1).toLowerCase();
    
    if (!query || pos===-1) {
      return bot.sendMessage({
        to: channelID,
        message: "",
        embed: {
          color: 5396735,
          fields: [
              {
                  name: "Querido usuario",
                  value: "Lamento informarle que aparte de que bayke tiene trabajo, usted debe ingresar algun nombre de un meme."
              },
              {
                  name: "Uso",
                  value: "!bayke (boing|ditto|DVD|laserman|spin|thanos)"
              }
          ],
          image: {
            url: "https://www.bkconnection.com/system/refinery/blog/posts/thumbnails/000/003/323/post_detail/family-friendly-app-store.gif?1432824720"
          }
        }
      });
    }
    
    const images = [
      'boing',
      'ditto',
      'dvd',
      'laserman',
      'spin',
      'thanos'
    ];

    const index = images.indexOf(query);
    
    if (index === -1) {
        return bot.sendMessage({
            to: channelID,
            message: "",
            embed: {
              color: 5396735,
              fields: [
                  {
                      name: "Querido usuario",
                      value: "Lamento informarle que aparte de que bayke sigue sin trabajo usted debe ingresar el nombre del meme CORRECTAMENTE OK?."
                  },
                  {
                      name: "Uso",
                      value: "!bayke (boing|ditto|DVD|laserman|spin|thanos)"
                  }
              ],
              image: {
                url: "https://www.bkconnection.com/system/refinery/blog/posts/thumbnails/000/003/323/post_detail/family-friendly-app-store.gif?1432824720"
              }
            }
          });
    }
    
    return bot.uploadFile({
          to: channelID,
          file: `./main/temp/bayke/${images[index]}.gif`
        }, function (error, response) {
          if (error) {
            console.log(error);
  
            return bot.sendMessage({
              to: channelID,
              message: "El Autz no sabe programar, error al enviar el meme"
            });
          }
        });
  }

module.exports.def = def;
