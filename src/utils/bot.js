const { Message } = require('discord.js')

const flow = require('./flow')

/**
 * Detiene la ejecución por el tiempo dado
 *
 * @param { Message } event El evento completo del mensaje
 * @param { string } message El mensaje a enviar
 *
 * @return { void }
 */
const simulateTyping = async (event, message) => {
  event.channel.startTyping()

  await flow.sleep(message.length * 40)

  event.channel.stopTyping()

  event.channel.send(message)
}

module.exports = { simulateTyping }
