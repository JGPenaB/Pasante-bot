const { Message } = require('discord.js');

const dolarService = require('../../services/dolarService');
const chileanPesoService = require('../../services/chileanPesoService');
const { formatNumber } = require('../../utils/numbers');

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
  usage: '!cambio {B o D o P} {monto}',
  desc: 'Convierte USD o CLP o VED a USD/CLP/VED (sin incluir moneda origen) usando distintas tasas de cambio.',
  example:
    'Si quiero convertir 10 Dolares Americanos a VED y CLP:\n!cambio d 10\n\nSi quiero convertir 500 Bolívares a USD y CLP:\n!cambio b 500\n\nSi quiero convertir 800 Pesos Chilenos a USD y VED:\n!cambio p 800'
});

/**
 * Manejador del comando
 *
 * @param { Message } message Evento completo del mensaje
 */
const main = async (message) => {
  const prefix = process.env.PREFIX;
  const args = message.content.substring(prefix.length).split(' ');
  const mode = args[1] && typeof args[1] === 'string' ? args[1].toUpperCase() : null;
  const amount = parseFloat(args[2]);
  let title = null;
  const exchange = [];

  if (mode === null || !(mode === 'B' || mode === 'D' || mode === 'P') || isNaN(amount)) {
    return message.channel.send(
      'Mano, no puedo hacer la conversión si faltan datos o los datos que me das están malos.'
    );
  }

  const exchangeRatesB = await dolarService.getExchangeRates(true).catch(() => {
    message.channel.send('MonitorDolar dejó de funcionar... O me bloquearon, no sé.');
  });

  const exchangeRatesP = await chileanPesoService.getExchangeRates().catch(() => {
    message.channel.send('API tasas de cambio CLP dejó de funcionar... O me bloquearon, no sé.');
  });

  const exchangeRates = exchangeRatesB.concat(exchangeRatesP);

  switch (mode) {
    case 'B':
      title = `Cambio de VED a USD y CLP`;

      exchangeRates.forEach(exchangeRate => {
        let result = 0, resultFrom = '', resultTo = '';

        switch (exchangeRate.nationalCurrency) {
          case 'CLP':
            resultFrom = 'VED';
            resultTo = 'CLP';
            // 1ro hay que pasar los bolos a USD, cristo perdoname por quemar valores
            result = (amount / exchangeRatesB[0].value) * exchangeRate.value;
            break;

          case 'VED':
            resultFrom = 'VED';
            resultTo = 'USD';
            result = amount / exchangeRate.value;
            break;
        }

        exchange.push({
          name: `Tasa ${exchangeRate.title} (${exchangeRate.rate} ${exchangeRate.nationalCurrency}):`,
          value: `**${resultFrom} ${formatNumber(amount)}** => **${resultTo} ${formatNumber(result)}**`
        });
      });
      break;

    case 'D':
      title = `Cambio de USD a VED y CLP`;

      exchangeRates.forEach(exchangeRate => {
        let result = 0, resultFrom = '', resultTo = '';

        switch (exchangeRate.nationalCurrency) {
          case 'CLP':
            resultFrom = 'USD';
            resultTo = 'CLP';
            result = amount * exchangeRate.value;
            break;

          case 'VED':
            resultFrom = 'USD';
            resultTo = 'VED';
            result = amount * exchangeRate.value;
            break;
        }

        exchange.push({
          name: `Tasa ${exchangeRate.title} (${exchangeRate.rate} ${exchangeRate.nationalCurrency}):`,
          value: `**${resultFrom} ${formatNumber(amount)}** => **${resultTo} ${formatNumber(result)}**`
        });
      });
      break;

    case 'P':
      title = `Cambio de CLP a USD y VED`;

      exchangeRates.forEach(exchangeRate => {
        let result = 0, resultFrom = '', resultTo = '';

        switch (exchangeRate.nationalCurrency) {
          case 'CLP':
            resultFrom = 'CLP';
            resultTo = 'USD';
            result = amount / exchangeRate.value;
            break;

          case 'VED':
            resultFrom = 'CLP';
            resultTo = 'VED';
            // 1ro hay que pasar los pesos a USD luego multiplicarlo por la tasa de USD->bolos, cristo perdoname por quemar valores
            result = amount / exchangeRatesP[0].value;
            result = result * exchangeRate.value;
            break;
        }

        exchange.push({
          name: `Tasa ${exchangeRate.title} (${exchangeRate.rate} ${exchangeRate.nationalCurrency}):`,
          value: `**${resultFrom} ${formatNumber(amount)}** => **${resultTo} ${formatNumber(result)}**`
        });
      });
      break;
  }

  if (exchange.length === 0) {
    return message.channel.send(
      'Mano no me cargo NI UNA tasa de cambio, que ladilla NOJODA.'
    );
  }

  message.channel.send('Tuve que usar una calculadora, porque esto es demasiada matemática para mí', {
    embed: {
      color: 3141900,
      title,
      fields: exchange
    }
  });
};

module.exports = { aliases, help, main };
