'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const directory = __dirname + '/cmd';
const commands = {};

/**
 * Carga todos los archivos en el directorio cmd, y a cada alias le asigna la función
 * principal
 */
fs.readdirSync(directory)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    console.log('Cargando: ' + file);
    const module = require(path.join(directory, file));
    const aliases = module.aliases();

    Object.keys(aliases).forEach((alias) => {
      console.log('Alias de ' + file + ': ' + aliases[alias]);
      if (commands[aliases[alias]] !== undefined) {
        throw new Error('El alias "' + aliases[alias] + '" ya esta en uso cuando el archivo ' + file + ' lo declara');
      } else {
        commands[aliases[alias]] = module;
      }
    });
  });

module.exports = commands;
