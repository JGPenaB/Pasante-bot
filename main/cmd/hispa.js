function def(cmd, user, users, bot, channelID, evt) {
    let url = cmd.split(" ")[1];

    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python3', ["main/cmd/hispachan-scraping.py", url]);

    var zipFolder = require('zip-folder');
    var rimraf = require("rimraf");
    var fs = require("fs");

    pythonProcess.stdout.on('close', (code) => {
        zipFolder('imgs', 'archive.zip', function (err) {
            if (err) {
                console.log('oh no!', err);
            } else {
                // console.log("Descarga de imagenes terminada");
                bot.sendMessage({
                    to: channelID,
                    message: `Imagenes descargadas, procedo a comprimir y subir a file.io`
                });

                var link = "";

                const curlProcess = spawn('curl', ["-F", "file=@archive.zip", "https://file.io"]);

                curlProcess.stdout.on('data', (data) => {
                    let obj = JSON.parse(data);
                    // console.log("link:" + obj.link);
                    link = obj.link;
                });

                curlProcess.stderr.on('data', (data) => {
                    // console.log("error: " + data);
                });

                curlProcess.on('close', code => {
                    // console.log("Codigo:" + code);
                    rimraf.sync("imgs");
                    fs.unlinkSync("archive.zip");

                    return bot.sendMessage({
                        to: channelID,
                        message: `Tu link de descarga es: ${link}`
                    });
                });
            }
        });
    });
}

module.exports.def = def;