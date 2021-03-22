const { Message } = require('discord.js')
const axios = require('axios')
const { decimalFix } = require('../../utils/numbers')

/**
 * Lista de alias válidos para el comando
 * @return { Array<string> }
 */
const aliases = () => ['cripto', 'crypto']

/**
 * Información sobre el comando
 * @return { Object }
 */
const help = () => ({
  usage: '!cripto {criptomoneda}',
  desc: 'Pasante busca en youtube el ultimo precio de la criptomoneda',
  example: `Si quieres buscar el precio de Bitcoin escribe: \n!cripto btc
            \nSi quieres buscar el precio de las top 10 criptomonedas escribe: \n!cripto`
})

/**
 * Manejador del comando
 * @param { Message } message Evento completo del mensaje
 */
const main = async (message) => {
  let query = message.content.substring(8)
  const url = query
    ? 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest'
    : 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'

  try {
    let params = {
      start: '1',
      limit: '10',
      convert: 'USD'
    }

    query &&
      // Se reemplaza los espacios por guiones en busquedas pequeñas por ejemplo (Bitcoin Cash)
      // Se convierte edge cases como (B   T   C) en strings válidos (BTC)
      (query.split(' ').length - 1 >= 3
        ? (query = query.replace(/\s/g, ''))
        : (query = query.replace(/\s/g, '-')),
      // Cambia el params para buscar por simbolo (BTC) o por nombre (Bitcoin)
      query.length >= 5
        ? (params = { slug: query })
        : (params = { symbol: query }))

    let { data: { data } } = await axios.get(url, {
      headers: {
        'Accept-Encoding': 'deflate, gzip',
        'X-CMC_PRO_API_KEY': process.env.CMC_KEY
      },
      params
    })

    !Array.isArray(data) && (data = [data[Object.keys(data)[0]]])
    const criptos = data.map((cripto) => {
      const { name, symbol, quote: { USD: { price, percent_change_24h } } } = cripto
      const signo = percent_change_24h > 0 ? '+' : ''
      return {
        name: `${name} - ${symbol}`,
        value: `$${decimalFix(price)} (${signo}${decimalFix(percent_change_24h)}%)`   
      }
    })

    return message.channel.send({
      embed: {
        color: 8388736,
        title: (query ? 'Criptomoneda' : 'Criptomonedas') + ' del imperio',
        fields: criptos
      }
    })
  } catch (err) {
    console.log('Error en cmd cripto', err.message)
    return message.channel.send(
      `El mio el sebin me bloqueo la conexion, dice que solo se puede buscar precios del petro`
    )
  }
}

module.exports = { aliases, help, main }
