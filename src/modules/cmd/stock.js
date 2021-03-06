const { Message } = require('discord.js')
const axios = require('axios')

/**
 * Información sobre el comando
 * 
 * @return { Object }
 */
const aliases = () => ['stock', 'bolsa']

/**
 * Lista de alias válidos para el comando
 * 
 * @return { Array<string> }
 */
const help = () => ({
  usage: '!stock {SYMBOL}',
  desc: 'Pasante googlea el ultimo precio de una acción',
  example: 'Si quiero buscar el precio de GameStop: \n!stock GME'
})

/**
 * Manejador del comando
 * 
 * @param { Message } message Evento completo del mensaje
 */
const main = async (message) => {
  let query = message.content.substring(7).replace(/\s/g,'')

  if(query.length<1) {
    return message.channel.send('¿Que es lo que voy a buscar? Sacate el webo de la boca')
  }

  try {
    const { data: { symbol, latestPrice } } = await axios.get(`https://cloud.iexapis.com/stable/stock/${query}/quote`, {
      params: {
        token: process.env.IEX_KEY
      }
    })
   return message.channel.send(`Rescata, ${symbol} anda ahorita en $${latestPrice}`)
  } catch (err) {
    console.log(err.message)
    return  message.channel.send(`El mio no te encontre na, acuerdate que es el symbol. \nPor ejemplo AAPL para conseguirte apple`)
  }
}

module.exports = { aliases, help, main }
