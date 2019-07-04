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
                  value: "Lamento informarle que Aparte de que bayke sigue sin trabajo usted debe ingresar el nombre del meme."
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
                      value: "Lamento informarle que Aparte de que bayke sigue sin trabajo usted debe ingresar el nombre del meme."
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
    
    return bot.sendMessage(
    {
        to: channelID,
        message: "Burlemonos de bayke",
        embed: {
        color: 5396735,
        footer: {
            text: "Powered by Pecueca y Dario."
        },
        image: {
            url: `../temp/bayke/${images[index]}.gif`
        }
    }
    }, function(error, response){
        if(error){
            console.log(error);
            bot.sendMessage({
                to: channelID,
                message: "No pude encontrar la imagen que me pediste.",
            });
        }
    });
  }

module.exports.def = def;
