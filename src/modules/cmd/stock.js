const { Message } = require('discord.js')
const axios = require('axios')
const random = require('../../utils/random')
const messages = require('../messages/stock')

/**
 * Lista de alias válidos para el comando
 * @return { Array<string> }
 */
const aliases = () => ['stock', 'bolsa']

/**
 * Información sobre el comando
 * @return { Object }
 */
const help = () => ({
  usage: '!stock {SYMBOL}',
  desc: 'Pasante googlea el ultimo precio de una acción',
  example: 'Si quiero buscar el precio de GameStop: \n!stock GME'
})

/**
 * Manejador del comando
 * @param { Message } message Evento completo del mensaje
 */
const main = async (message) => {
  const query = message.content.substring(7).replace(/\s/g,'')

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
    const signo = quote.change > 0 ? '+' : ''
    const embedData = {
      color: quote.change > 0 ? 3141900 : 16711680,
      title: quote.companyName,
      fields: [
       { 
         name: 'Precio',
         value:`$${Math.round((quote.latestPrice*100)/100).toLocaleString()}`
       },
       { 
         name:'Cambio %',
         value: `${signo}${Math.round(quote.change*100)/100}  ( ${signo}${Math.round(quote.changePercent*10000)/100}% )`
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
    console.log('Error en cmd stock', err.message)
    return  message.channel.send(`El mio no te encontre na, acuerdate que es el simbolo. \nEjemplo AAPL para rescatarte apple`)
  }
}

module.exports = { aliases, help, main }
