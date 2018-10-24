function def(cmd, users, bot, channelID, evt){
	bot.sendMessage({
        to: channelID,
        message: 'Buenos días a todos, soy pasante en este server porque necesito la experiencia para el currículum. Cualquier duda:\n ```cs\n !cr => Muestra las 10 mejores criptomonedas del mercado.\n\n !cr [moneda] => muestra información sobre una moneda específica (debe ser solo el símbolo. Ej: BTC, XRP, ETH...).\n\n !mrc => cuenta un secreto.\n\n !def [query] => Busca la palabra o frase introducida en la Wikipedia en inglés, y muestra una pequeña definición.\n\n !dolar => muestra el precio del Innombrable\n\n !cn [D,B] [Monto] => Convierte USD a VES o vice-versa usando las tasas AirTM y DolarToday\n\n!time te muestra la fecha y hora actual en Venezuela\n```'
    });
};

module.exports.def = def;