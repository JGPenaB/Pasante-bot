function def(cmd, user, users, bot, channelID, evt) {
  const query = encodeURI(cmd.substring(4));

  if (!query) {
    return bot.sendMessage(
      {
        to: channelID,
        message: `No puedes mandar una pregunta vacia coño e tu madre`
      }
    );
  }
  
  const answers = [
    'En mi opinión, sí',
    'Es cierto',
    'Es decididamente así',
    'Probablemente',
    'Buen pronóstico',
    'Todo apunta a que sí',
    'Sin duda',
    'Sí',
    'Sí - definitivamente',
    'Debes confiar en ello',
    'Respuesta vaga, vuelve a intentarlo',
    'Pregunta en otro momento',
    'Será mejor que no te lo diga ahora',
    'No puedo predecirlo ahora',
    'Concéntrate y vuelve a preguntar',
    'Puede ser',
    'No cuentes con ello',
    'Mi respuesta es no',
    'Mis fuentes me dicen que no',
    'Las perspectivas no son buenas',
    'Muy dudoso'
  ];
  
  const index = Math.floor(Math.random() * 21) + 1;
  
  return bot.sendMessage(
    {
      to: channelID,
      message: `Pregunta: ${query}\n\nRespuesta: ${answers[index - 1]}`
    }
  );
}

module.exports.def = def;

