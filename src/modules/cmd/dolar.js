const { Message } = require('discord.js')

const dolarService = require('../../services/dolarService')

/**
 * Lista de alias válidos para el comando
 *
 * @return { Array<string> }
 */
const aliases = () => ['dolar']

/**
 * Información sobre el comando
 *
 * @return { Object }
 */
const help = () => ({
  usage: '!dolar',
  desc: 'Consulta la tasa de cambio actual de distintas fuentes.',
  example: '!dolar'
})

/**
 * Manejador del comando
 *
 * @param { Message } message Evento completo del mensaje
 */
const main = async (message) => {
  let exchanges = await dolarService.getExchangeRates().catch((error) => {
    console.log('Error en cmd dolar', error)
    message.channel.send(
      'MonitorDolar dejó de funcionar... O me bloquearon, no sé.'
    )
  })

  //Caso extremo
  if (!exchanges.length) {
    return message.channel.send('No pude extraer nada de MonitorDolar.')
  }

  exchanges = exchanges.map((exchange) => {
    return {
      name: exchange.title,
      value: `**${dolarService.formatNumber(exchange.value)} VES**`,
      inline: false
    }
  })

  message.channel.send('Mano, tuve que usar VPN y todo para ver esta vaina:', {
    embed: {
      color: 3141900,
      title: 'Tasas de conversión del momento',
      fields: exchanges
    }
  })
}

module.exports = { aliases, help, main }
