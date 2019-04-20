function def(cmd, user, users, bot, channelID, evt) {
  const memeMaker = require('meme-maker');
  const request = require("request");
  const fs = require("fs");
  const exec = require('child_process').exec;

  const pos = cmd.split(" ");
  const imageURL = pos[1];
  const topText = pos[2];
  const bottomText = pos[3] || "";

  
  if(imageURL.search(/\.(jpg|jpeg|png)/i) == -1 || typeof imageURL != "string") {
    return bot.sendMessage({
      to: channelID,
      message: "El Autz no sabe programar, mira menor, esa URL de la imagen es invalida llave"
    });
  }

  const time = new Date().getTime();

  function download (uri, filename, callback) {
    request.head(uri, function(err, res, body){
      console.log('content-type:', res.headers['content-type']);
      console.log('content-length:', res.headers['content-length']);

      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };

  try {

    download(imageURL, `./main/temp/${time}.jpg`, function() {
      console.log('download done');
  
      const options = {
        image: `./main/temp/${time}.jpg`,         // Required
        outfile: `./main/temp/${time}-meme.jpg`,  // Required
        topText: topText,
        bottomText: bottomText
      }
  
      memeMaker(options, function (err) {
        if (err) {
          return bot.sendMessage({
            to: channelID,
            message: "El Autz no sabe programar, error en la funcion memeMaker"
          });
        }

        bot.uploadFile({
          to: channelID,
          file: `./main/temp/${time}-meme.jpg`,
		  message: "Por **"+user+"**"
        }, function (error, response) {
          if (error) {
            console.log(error);
  
            return bot.sendMessage({
              to: channelID,
              message: "El Autz no sabe programar, error al enviar el meme"
            });
          } else {
			bot.deleteMessage({
				channelID: channelID,
				messageID: evt.d.id
			});
		  }
        });
  
        // Meme creado exitosamente
		// Meme creado exitosamente, dario?
		// Efectivamente señor anderson
        console.log('Image saved: ' + options.outfile);

        exec(`rm -f ./main/temp/${time}-meme.jpg`, (err, stdout, stderr) => {
          if (err) console.log(err);
          /* console.log(stdout);
          console.log(stderr); */
        });

        exec(`rm -f ./main/temp/${time}.jpg`, (err, stdout, stderr) => {
          if (err) console.log(err);
          /* console.log(stdout);
          console.log(stderr); */
        });
      });
    }); 

  } catch (e) {

    return bot.sendMessage({
      to: channelID,
      message: "El Autz no sabe programar, probablemente un error con el image URL, error en la funcion download"
    });

  }  
}

module.exports.def = def;
