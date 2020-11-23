/* 
    Lista de alias válidos para el comando
*/
function aliases(){
    return [
		"rip",
		"ripper",
		"rippea"
    ]
}

/**
 * Información sobre el comando
 */
function help(){
    return {
        "usage": "!rip {url a un hilo de hispachan}",
        "desc": "Descarga imagenes/videos del hilo, los comprime y te manda un link para que lo descargues.",
        "example": "!rip https://www.hispachan.org/##/res/######.html#######"
    }
}

/**
 * Función principal del comando
 * @param {*} cmd comando original
 * @param {*} user usuario que escribió el comando
 * @param {*} users lista de usuarios en el server
 * @param {*} bot el cliente
 * @param {*} channelID el canal donde se envió el comando
 * @param {*} evt lista de eventos
 */
function main(cmd, user, users, bot, channelID, evt) {
    const url = cmd.substring(1).split(" ")[1];

    const request = require('request');
    const cheerio = require('cheerio');
    const fs = require('fs');
    const zipFolder = require('zip-a-folder');
    const rimraf = require('rimraf');
    const { exec } = require('child_process');
    const mergeImg = require('merge-img');


    function recursiveDownload (urlArray, nameArray, i, path) {
        if (i < urlArray.length) {
            if(!fs.existsSync(path)){
                fs.mkdirSync(path);
            }

            if (!fs.existsSync(`${path}/${nameArray[i]}`)){
                console.log(`[${i+1}/${urlArray.length}] - ${nameArray[i]} - descargando`);

                request.get(urlArray[i])                                                                                  
                    .on('error', function(err) {console.log(err)} )                                                   
                    .pipe(fs.createWriteStream(`${path}/${nameArray[i]}`))                                                                 
                    .on('close', function () { recursiveDownload (urlArray, nameArray, i+1, path); });
            }else {
                console.log(`[${i+1}/${urlArray.length}] - ${nameArray[i]} - ya existe`);
                recursiveDownload (urlArray, nameArray, i+1);
            }        
        } else {
            const imagenes = [];

            nameArray.forEach(el => {
                imagenes.push(`${path}/${el}`);
            });

            mergeImg(imagenes, {direction: true}).then(img => {
                img.write('out.png', () => {
                    bot.uploadFile({
                        "to": channelID,
                        "file": 'out.png',
                        "message": `Pajero`,
                    });
                });
            });

            zipFolder.zipFolder(`./${path}`, `./${path}.zip`, function(err) {
                if(err) {
                    console.log('Something went wrong!', err);
                } else {
                    bot.sendMessage({
                        "to": channelID,
                        "message": `Subiendo a file.io`
                    });

                    exec(`curl -F "file=@${path}.zip" https://file.io`, (err, stdout, stderr) => {
                        if (err) {
                            //some err occurred
                            console.error(err)
                        } else {
                            // the *entire* stdout and stderr (buffered)
                            console.log(`stdout: ${stdout}`);
                            const link = JSON.parse(stdout);

                            bot.sendMessage({
                                "to": channelID,
                                "message": `${link.link}`,
                            });

                            rimraf.sync(path);
                            fs.unlinkSync(path+".zip");
                            fs.unlinkSync("out.png");      
                        }
                    });
                }
            });
        }
    }

    if(/(http[s]?:\/\/)?([^\/\s]+\/)(.*)/.test(url) == false) {
        console.error("Error: no hay url valida, url debe ser: https://www.hispachan.org/XX/res/XXX.html#XXX");
        bot.sendMessage({
            "to": channelID,
            "message": "URL invalida",
        });
    } else {
        const partes = url.split("/");

        const info = {
            host: partes[2],
            tablon: partes[3],
            hilo: partes[5].split(".")[0]
        };

        const path = `${info.host}.${info.tablon}.${info.hilo}`;

        bot.sendMessage({
            "to": channelID,
            "message": `Rippeando hispachan ${info.tablon}/${info.hilo}`,
        });

        if(!info.tablon || !info.hilo) {
            console.error("Error al obtener tablon o hilo");
            bot.sendMessage({
                "to": channelID,
                "message": "Error al obtener tablon o hilo",
            });
        } else {
            var src = [];
            var names = [];

            console.log("Obteniendo HTML");

            request(url, (error, resp, body) => {
                if (!error && resp.statusCode === 200) {
                    console.log("Obteniendo href");

                    let $ = cheerio.load(body);

                    // Obtiene el archivo del post que empezó el hilo
                    $(".thread > span > a").each((i, el) => {
                        let href = el.attribs.href;
                        names.push(href.substring(href.lastIndexOf("/")+1));
                        src.push(href);
                    });

                    // Obtiene el resto de archivos
                    $(".filenamereply > a").each((i, el) => {
                        let href = el.attribs.href;
                        names.push(href.substring(href.lastIndexOf("/")+1));
                        src.push(href);
                    });

                    if(src.length == 0) {
                        console.error("No hay imagenes/videos para descargar");
                        bot.sendMessage({
                            "to": channelID,
                            "message": "No hay imagenes/videos para descargar",
                        });
                    } else {
                        recursiveDownload(src, names, 0, path);
                    }
                }
            });
        }
    }
}

module.exports = {aliases, help, main};