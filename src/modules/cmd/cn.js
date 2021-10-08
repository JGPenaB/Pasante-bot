const { Message } = require('discord.js');

const dolarService = require('../../services/dolarService');

/**
 * Lista de alias válidos para el comando
 *
 * @return { Array<string> }
 */
const aliases = () => ['cambio', 'cn', 'cmb'];

/**
 * Información sobre el comando
 *
 * @return { Object }
 */
const help = () => ({
  usage: '!cambio {B o D} {monto}',
  desc: 'Convierte USD a VED (o vice versa) usando distintas tasas de cambio.',
  example:
    'Si quiero convertir $10 a Bolívares Soberanos (VED):\n!cambio d 10\n\nSi quiero convertir 500 Bolívares Soberanos a Dólar (USD):\n!cambio b 500'
});

/**
 * Manejador del comando
 *
 * @param { Message } message Evento completo del mensaje
 */
const main = async (message) => {
  const prefix = process.env.PREFIX;
  const args = message.content.substring(prefix.length).split(' ');
  const mode = args[1];
  const amount = parseFloat(args[2]);

  if (mode === undefined || !(mode.toUpperCase() === 'B' || mode.toUpperCase() === 'D') || isNaN(amount)) {
    return message.channel.send(
      'Mano, no puedo hacer la conversión si faltan datos o los datos que me das están malos.'
    );
  }

  let title = 'Cambio de USD a VED';
  let from = '$';
  let to = 'VED';
  const exchange = [];

  const exchangeRates = await dolarService.getExchangeRates().catch(() => {
    message.channel.send('MonitorDolar dejó de funcionar... O me bloquearon, no sé.');
  });

  const dolarToday = exchangeRates[0].value;
  const airTM = exchangeRates[3].value;

  if (mode.toUpperCase() === 'D') {
    exchange.push(amount * dolarToday);
    exchange.push(amount * airTM);
  } else {
    title = 'Cambio de VED a USD';
    from = 'VED';
    to = '$';

    exchange.push(amount / dolarToday);
    exchange.push(amount / airTM);
  }

  console.log('EXCHANGE:::', exchange);

  message.channel.send('Tuve que usar una calculadora, porque esto es demasiada matemática para mí', {
    embed: {
      color: 3141900,
      title,
      fields: [
        {
          name: `Tasa DolarToday (${dolarService.formatNumber(dolarToday)} VED):`,
          value: `**${from} ${dolarService.formatNumber(amount)}** => **${dolarService.formatNumber(
            exchange[0]
          )} ${to}**`
        },
        {
          name: `Tasa AirTM (${dolarService.formatNumber(airTM)} VED):`,
          value: `**${from} ${dolarService.formatNumber(amount)}** => **${dolarService.formatNumber(
            exchange[1]
          )} ${to}**`
        }
      ]
    }
  });
};

module.exports = { aliases, help, main };
