const { Message } = require('discord.js');

const flow = require('./flow');

/**
 * Detiene la ejecución por el tiempo dado
 *
 * @param { Message } event El evento completo del mensaje
 * @param { string } message El mensaje a enviar
 *
 * @return { void }
 */
const simulateTyping = async (event, message) => {
  event.channel.startTyping();

  await flow.sleep(message.length * 40);

  event.channel.stopTyping();

  event.channel.send(message);
};

/**
 * Obtiene los parámetros de un comando
 *
 * @param { String } message El mensaje del cual extraer los parámetros
 *
 * @return { String }
 */
const getParams = (message) => {
  const pos = message.indexOf(' ');
  let result;

  if(pos !== -1){
    result = message.substring(pos + 1).trim();
  }

  return result;
};

module.exports = { simulateTyping, getParams };
