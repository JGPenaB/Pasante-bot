const { Message } = require('discord.js');
const axios = require('axios');
const { decimalFix, randomWithLimit } = require('../../utils/numbers');
const messages = require('../messages/stock');
const botUtils = require('../../utils/bot');

/**
 * Lista de alias válidos para el comando
 * @return { Array<string> }
 */
const aliases = () => ['stock', 'bolsa'];

/**
 * Información sobre el comando
 * @return { Object }
 */
const help = () => ({
  usage: '!stock {SYMBOL}',
  desc: 'Pasante googlea el ultimo precio de una acción',
  example: 'Si quiero buscar el precio de GameStop: \n!stock GME'
});

/**
 * Manejador del comando
 * @param { Message } message Evento completo del mensaje
 */
const main = async (message) => {
  const query = (botUtils.getParams(message.content) ?? '').replace(/\s/g, '');

  if (query.length < 1) {
    return message.channel.send('Ingresa el simbolo de tu stock favorita, TSLA para Tesla');
  }
  try {
    const { data: quote } = await axios.get(`https://cloud.iexapis.com/stable/stock/${query}/quote`, {
      params: {
        token: process.env.IEX_KEY,
        displayPercent: true
      }
    });
    const signo = quote.change > 0 ? '+' : '';
    let fieldsArr = [
      {
        name: 'Precio',
        value: `$${decimalFix(quote.latestPrice)}`
      },
      {
        name: 'Cambio',
        value: `${signo}${decimalFix(quote.change)}  ( ${signo}${decimalFix(quote.changePercent)}% )`
      },
      {
        name: 'Volumen',
        value: `${decimalFix(quote.avgTotalVolume)}`
      }
    ];
    return message.channel.send(`${messages[randomWithLimit(messages.length)]} ${quote.symbol}`, {
      embed: {
        color: quote.change > 0 ? 3141900 : 16711680,
        title: quote.companyName,
        fields:
          (!quote.isUSMarketOpen && quote.iexRealtimePrice)
            ? [...fieldsArr, { name: 'Precio off-market', value: `$${decimalFix(quote.iexRealtimePrice)}` }]
            : fieldsArr,
        url: `https://iextrading.com/apps/stocks/${query}`,
        footer: { text: `Bolsa ${quote.isUSMarketOpen ? 'abierta' : 'cerrada'}` }
      }
    });
  } catch (err) {
    console.log('Error en cmd stock: ', err.message);
    return message.channel.send(
      `El mio no te encontre na, acuerdate que es el simbolo. \nEjemplo AAPL para rescatarte apple`
    );
  }
};

module.exports = { aliases, help, main };
