const { Message } = require('discord.js')
const axios = require('axios')
const random = require('../../utils/random')
const messages = require('../messages/stock')

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

  if( query.length<1 ) {
    return message.channel.send('Ingresa el simbolo de tu stock favorita, TSLA para Tesla')
  }
  try {
    const { data: { quote , news } } = await axios.get(`https://cloud.iexapis.com/stable/stock/${query}/batch?types=quote,news`, {
      params: {
        token: process.env.IEX_KEY
      }
    })
    
    //Extraemos las primeras 2 noticias en ingles
    const englishNews = news
    .filter((newsItem)=>newsItem.lang==='en')
    .map((newsItem)=>`[${newsItem.headline}](${newsItem.url})`)
    .slice(0,2)
    
    let signo = quote.change > 0 ? '+' : ''
    const embedData = {
      color: quote.changePercent > 0 ? 3141900 : 16711680,
      title: quote.companyName,
      fields: [
       { 
         name: 'Precio',
         value:`$${quote.latestPrice}`
       },
       { 
         name:'Cambio %',
         value: `${signo}${quote.change}  ( ${signo}${Math.round(quote.changePercent*100)/100}% )`
       },
       { 
         name:'Volumen',
         value: `${quote.avgTotalVolume}`
       },
       {
         name:'Noticias',
         value:englishNews,
       }
      ],
      footer: { text: `Bolsa: ${quote.isUSMarketOpen ? 'abierta' : 'cerrada'}` }
    }

   return message.channel.send(`${messages[random.num(messages.length)]} ${quote.symbol}`, {
     embed: embedData
   })
  } catch (err) {
    console.log(err.message)
    return  message.channel.send(`El mio no te encontre na, acuerdate que es el simbolo. \nEjemplo AAPL para rescatarte apple`)
  }
}

module.exports = { aliases, help, main }
