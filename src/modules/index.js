'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const directory = __dirname + '/cmd';
const commandMap = {};
const aliasMap = {};

/**
 * Carga todos los archivos en el directorio cmd, y a cada alias le asigna la función
 * principal
 */
fs.readdirSync(directory)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    console.log('\nCargando modulo: ' + file);
    const module = require(path.join(directory, file));
    const aliases = module.aliases();
    let aliasControl;

    Object.keys(aliases).forEach((alias, index) => {
      if (!index) {
        aliasControl = aliases[alias];
        console.log('Usando "' + aliasControl + '" como alias de control');
      }

      console.log('Cargando alias de ' + file + ': ' + aliases[alias]);
      if (commandMap[aliases[alias]] !== undefined) {
        throw new Error('El alias "' + aliases[alias] + '" ya esta en uso cuando el archivo ' + file + ' lo declara');
      } else {
        commandMap[aliases[alias]] = module;
        aliasMap[aliases[alias]] = aliasControl;
      }
    });
  });

module.exports = { commandMap, aliasMap };
