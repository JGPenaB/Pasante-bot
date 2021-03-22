const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const zipFolder = require('zip-a-folder');
const rimraf = require('rimraf');
const { exec } = require('child_process');
const { Message } = require('discord.js');
const http = require('http');

/**
 * Lista de alias válidos para el comando
 *
 * @return { Array<string> }
 */
const aliases = () => ['rip', 'ripper', 'rippea'];

/**
 * Información sobre el comando
 *
 * @return { Object }
 */
const help = () => ({
  usage: '!rip',
  desc: 'Rippea un hilo de hispachan',
  example: '!rip https://www.hispachan.org/##/res/######.html#######'
});

/**
 * Manejador del comando
 *
 * @param { Message } message Evento completo del mensaje
 */
const main = async (message) => {
  const prefix = process.env.PREFIX;
  const args = message.content.substring(prefix.length).split(' ');
  const url = args[1];
  var info;

  function recursiveDownload(urlArray, nameArray, i, path) {
    if (i < urlArray.length) {
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
      }

      if (!fs.existsSync(`${path}/${nameArray[i]}`)) {
        console.log(`[${i + 1}/${urlArray.length}] - ${nameArray[i]} - descargando`);

        request
          .get(urlArray[i])
          .on('error', function (err) {
            console.log(err);
          })
          .pipe(fs.createWriteStream(`${path}/${nameArray[i]}`))
          .on('close', function () {
            recursiveDownload(urlArray, nameArray, i + 1, path);
          });
      } else {
        console.log(`[${i + 1}/${urlArray.length}] - ${nameArray[i]} - ya existe`);
        recursiveDownload(urlArray, nameArray, i + 1);
      }
    } else {
      zipFolder.zipFolder(`./${path}`, `./${path}.zip`, function (err) {
        if (err) {
          console.error('Error al comprimir la carpeta rippeada: ' + err);
        } else {
          console.log('Subiendo archivo a File.io');
          message.channel.send('Subiendo a File.io');

          exec(`curl -F "file=@${path}.zip" https://file.io`, (err, stdout, stderr) => {
            if (err) {
              console.error('Error subiendo el archivo a file.io' + err);
            } else {
              const link = JSON.parse(stdout);
              console.log(`file.io upload result: ${link.success}`);

              if (link.success == false) {
                rimraf.sync(path);
                fs.unlinkSync(path + '.zip');

                return message.channel.send(`Hubo un malpario error subiendo tu mierda a file.io`);
              }

              html = `
                            <html>
                                <head>
                                    <style>
                                        div.gallery {
                                        margin: 5px;
                                        border: 1px solid #ccc;
                                        float: left;
                                        width: 180px;
                                    }

                                    div.gallery:hover {
                                        border: 1px solid #777;
                                    }

                                    div.gallery img {
                                        width: 100%;
                                        height: auto;
                                    }

                                    div.desc {
                                        padding: 15px;
                                        text-align: center;
                                    }
                                    </style>
                                </head>

                                <body>
                                    <h3>Descargando desde <a target='_blank' href='https://${info.host}/${info.tablon}/res/${info.hilo}.html'>${info.host}/${info.tablon}/${info.hilo}</a></h3>
                                    <a target='_blank' href='${link.link}'>Descargar zip</a><br>
                            `;

              src.forEach((el) => {
                html += `
                                    <div class="gallery">
                                        <a target="_blank" href="${el}">
                                            <img src="${el}" alt="chanero" width="600" height="400">
                                        </a>
                                    </div>
                                `;
              });

              html += `
                                </body>
                            </html>
                            `;

              // se crea el servidor http
              const requestListener = function (req, res) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(html);
                server.close();
              };

              const server = http.createServer(requestListener);

              const host = process.env.HOST_ADDR || 'localhost';
              const port = process.env.HOST_PORT || 8000;

              server.listen(port, host, () => {
                message.channel.send(`Descarga tu mierda en ${host}:${port}`);
              });

              const sockets = new Set();

              server.on('connection', (socket) => {
                sockets.add(socket);

                server.once('close', () => {
                  sockets.delete(socket);
                });
              });

              /**
               * Muerte al http server.
               */
              const close = (callback) => {
                for (const socket of sockets) {
                  socket.destroy();

                  sockets.delete(socket);
                }

                server.close(callback);
              };

              //message.channel.send(`${link.link}`);

              rimraf.sync(path);
              fs.unlinkSync(path + '.zip');

              console.log('Rippeo terminado');
            }
          });
        }
      });
    }
  }

  if (/(http[s]?:\/\/)?([^\/\s]+\/)(.*)/.test(url) == false) {
    console.error('Error: no hay url valida, url debe ser: https://www.hispachan.org/XX/res/XXX.html#XXX');

    message.channel.send('URL invalida');
  } else {
    const partes = url.split('/');

    info = {
      host: partes[2],
      tablon: partes[3],
      hilo: partes[5].split('.')[0]
    };

    const path = `${info.host}.${info.tablon}.${info.hilo}`;

    message.channel.send(`Rippeando ${info.host}/${info.tablon}/${info.hilo}`);

    if (!info.tablon || !info.hilo) {
      console.error('Error al obtener tablon o hilo');

      message.channel.send(`Error al obtener tablon o hilo`);
    } else {
      var src = [];
      var names = [];

      console.log('Obteniendo HTML');

      request(url, (error, resp, body) => {
        if (!error && resp.statusCode === 200) {
          console.log('Obteniendo href');

          let $ = cheerio.load(body);

          // Obtiene el archivo del post que empezó el hilo
          $('.thread > span > a').each((i, el) => {
            let href = el.attribs.href;
            names.push(href.substring(href.lastIndexOf('/') + 1));
            src.push(href);
          });

          // Obtiene el resto de archivos
          $('.filenamereply > a').each((i, el) => {
            let href = el.attribs.href;
            names.push(href.substring(href.lastIndexOf('/') + 1));
            src.push(href);
          });

          if (src.length == 0) {
            console.error('No hay imagenes/videos para descargar');
            message.channel.send(`No hay imagenes/videos para descargar`);
          } else {
            recursiveDownload(src, names, 0, path);
          }
        }
      });
    }
  }
};

module.exports = { aliases, help, main };
